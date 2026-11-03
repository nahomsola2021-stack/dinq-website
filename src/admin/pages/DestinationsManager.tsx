// src/admin/pages/DestinationsManager.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, MapPin, Edit3, Trash2, Loader2, Image as ImageIcon, X, UploadCloud, ChevronLeft, ChevronRight } from 'lucide-react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, uploadToCloudinary } from '../lib/firebase';
import { DESTINATIONS_DATA } from '../../data/content/destinations';

const ITEMS_PER_PAGE = 6;

export const DestinationsManager: React.FC = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // --- MODAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<any | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    regionCategory: 'north',
    highlight: '',
    summary: '',
    image: '',
    status: 'Active'
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'destinations'));
      const dbData = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
      
      let merged = [...DESTINATIONS_DATA];
      dbData.forEach(dbItem => {
        const existingIdx = merged.findIndex(d => d.id === dbItem.slug || d.id === dbItem.id);
        if (existingIdx > -1) {
          merged[existingIdx] = { ...merged[existingIdx], ...dbItem };
        } else {
          merged.push(dbItem as any);
        }
      });
      
      setDestinations(merged);
    } catch (err) {
      console.error("Error syncing destinations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingDest(null);
    setFormData({
      name: '',
      regionCategory: 'north',
      highlight: '',
      summary: '',
      image: '',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dest: any) => {
    setEditingDest(dest);
    setFormData({
      name: dest.name || '',
      regionCategory: dest.regionCategory || 'north',
      highlight: dest.signature || dest.highlight || '',
      summary: dest.summary || dest.description || '',
      image: dest.image || '',
      status: dest.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const secureUrl = await uploadToCloudinary(file);
      setFormData(prev => ({ ...prev, image: secureUrl }));
      alert("✅ Image uploaded successfully to Cloudinary!");
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(`❌ Image upload failed: ${error.message || 'Unknown error'}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const docId = editingDest ? (editingDest.slug || editingDest.id) : slug;

      const payload = {
        ...formData,
        slug: docId,
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'destinations', docId), payload, { merge: true });

      alert("✅ Destination saved and synced to the live site!");
      setIsModalOpen(false);
      fetchDestinations();
    } catch (err) {
      console.error("Failed to save destination:", err);
      alert("❌ Failed to save destination.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to hide this destination from the live website?")) return;
    try {
      await setDoc(doc(db, 'destinations', id), { status: 'Draft' }, { merge: true });
      setDestinations(destinations.map(d => d.id === id ? { ...d, status: 'Draft' } : d));
      alert("✅ Destination hidden from public view.");
    } catch (err) {
      alert("❌ Failed to update destination.");
    }
  };

  const filtered = destinations.filter(d => d.name?.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentDestinations = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900 mb-4" />
        <p className="text-sm font-medium">Syncing Live Destinations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-20 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Destinations Management</h1>
          <p className="text-sm text-slate-500 mt-1">Directly edit, upload images, or manage regional heritage sites.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New Destination</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search destinations..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900"
          />
        </div>
        <div className="text-xs font-medium text-slate-500"><strong className="text-slate-900">{filtered.length}</strong> total regions</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDestinations.map((dest) => (
          <div key={dest.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between relative">
            {dest.status === 'Draft' && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <span className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs">Hidden / Draft</span>
              </div>
            )}
            <div>
              <div className="h-40 bg-slate-100 relative flex items-center justify-center border-b border-slate-100">
                {dest.image ? <img src={dest.image} className="w-full h-full object-cover" alt={dest.name} /> : <ImageIcon className="h-8 w-8 text-slate-400" />}
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-white text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 shadow-sm">
                  {dest.status || 'Active'}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{dest.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{dest.summary}</p>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
              <span className="text-xs font-mono uppercase bg-slate-100 px-2 py-1 rounded text-slate-600">{dest.regionCategory || 'Region'}</span>
              <div className="flex items-center gap-2 relative z-20">
                <button 
                  onClick={() => handleOpenEdit(dest)}
                  className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                {dest.status !== 'Draft' && (
                  <button 
                    onClick={() => handleDelete(dest.id)}
                    className="p-2 text-rose-400 hover:text-rose-600 bg-rose-50 rounded-lg border border-rose-100 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- PAGINATION BAR --- */}
      {totalPages > 1 && (
        <div className="pt-6 flex items-center justify-center gap-3 border-t border-slate-200">
          <button 
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </button>
          
          <span className="text-xs font-medium text-slate-500">
            Page <strong className="text-slate-900">{currentPage}</strong> of {totalPages}
          </span>

          <button 
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* --- DESTINATION EDIT/CREATE MODAL WITH IMAGE UPLOAD & PREVIEW --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl my-8 border border-slate-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer">
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-6">{editingDest ? 'Edit Destination' : 'Create New Destination'}</h2>
            
            <form onSubmit={handleSaveDestination} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Destination Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-900" placeholder="e.g., Lalibela" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Region Category</label>
                  <select value={formData.regionCategory} onChange={e => setFormData({...formData, regionCategory: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white">
                    <option value="north">Northern Historic Circuit</option>
                    <option value="mountains">Highland Mountains</option>
                    <option value="rift-desert">Rift Valley & Deserts</option>
                    <option value="south-omo">South Omo Cultural</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white">
                    <option value="Active">Active (Live)</option>
                    <option value="Draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* IMAGE UPLOAD & LIVE PREVIEW */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Destination Image</label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-24 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {formData.image ? <img src={formData.image} alt="Preview" className="h-full w-full object-cover" /> : <ImageIcon className="h-6 w-6 text-slate-300" />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs" placeholder="Paste URL or upload file ->" />
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors">
                      {uploadingImage ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UploadCloud className="h-3.5 w-3.5 text-blue-600" />}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload from Computer'}</span>
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Summary Description</label>
                <textarea rows={4} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
              </div>
              <div className="pt-4 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-slate-800">Save & Sync</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};