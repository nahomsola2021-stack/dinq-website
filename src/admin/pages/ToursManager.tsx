// src/admin/pages/ToursManager.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, MapPin, Clock, Edit3, Trash2, Loader2, Image as ImageIcon, X, UploadCloud, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, uploadToCloudinary } from '../lib/firebase';
import { TOURS_DATA } from '../../data/content/tours';

const ITEMS_PER_PAGE = 6;

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export const ToursManager: React.FC = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // --- MODAL FORM STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<any | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    duration: '7 Days / 6 Nights',
    location: '',
    price: 1500,
    category: 'History',
    status: 'Published',
    description: '',
    coverImage: '',
    itinerary: [] as ItineraryDay[]
  });

  useEffect(() => {
    fetchDashboardTours();
  }, []);

  const fetchDashboardTours = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tours'));
      const dbData = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
      
      let merged = [...TOURS_DATA];
      dbData.forEach(dbTour => {
        const existingIdx = merged.findIndex(t => t.id === dbTour.slug || t.id === dbTour.id);
        if (existingIdx > -1) {
          merged[existingIdx] = { ...merged[existingIdx], ...dbTour };
        } else {
          merged.push(dbTour as any);
        }
      });
      
      setTours(merged);
    } catch (err: any) {
      console.error("Error syncing dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingTour(null);
    setFormData({
      title: '',
      duration: '7 Days / 6 Nights',
      location: '',
      price: 1500,
      category: 'History',
      status: 'Published',
      description: '',
      coverImage: '',
      itinerary: [
        { day: 1, title: 'Arrival & Welcome', description: 'Arrive in Addis Ababa and transfer to hotel.' }
      ]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tour: any) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title || '',
      duration: tour.duration || tour.durationLabel || '7 Days / 6 Nights',
      location: tour.location || tour.destination || '',
      price: Number(tour.priceFromUSD || tour.price) || 1500,
      category: tour.category || 'History',
      status: tour.status || 'Published',
      description: tour.summary || tour.description || '',
      coverImage: tour.image || tour.coverImage || '',
      itinerary: tour.itinerary || [
        { day: 1, title: 'Arrival & Welcome', description: 'Arrive in Addis Ababa and transfer to hotel.' }
      ]
    });
    setIsModalOpen(true);
  };

  // Itinerary Day management helpers
  const handleAddDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: prev.itinerary.length + 1, title: '', description: '' }
      ]
    }));
  };

  const handleRemoveDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index).map((d, idx) => ({ ...d, day: idx + 1 }))
    }));
  };

  const handleDayChange = (index: number, field: 'title' | 'description', value: string) => {
    setFormData(prev => {
      const updated = [...prev.itinerary];
      updated[index][field] = value;
      return { ...prev, itinerary: updated };
    });
  };

  // Handle direct file upload from computer to Cloudinary
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const secureUrl = await uploadToCloudinary(file);
      setFormData(prev => ({ ...prev, coverImage: secureUrl }));
      alert("✅ Image uploaded successfully to Cloudinary!");
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(`❌ Image upload failed: ${error.message || 'Unknown error'}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const docId = editingTour ? (editingTour.slug || editingTour.id) : slug;

      const payload = {
        ...formData,
        price: Number(formData.price),
        image: formData.coverImage,
        slug: docId,
        updatedAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'tours', docId), payload, { merge: true });

      alert("✅ Tour successfully saved and synced with itinerary!");
      setIsModalOpen(false);
      fetchDashboardTours();
    } catch (err: any) {
      console.error("Failed to save tour:", err);
      alert("❌ Failed to save tour.");
    }
  };

  const handleDelete = async (id: string, slug?: string) => {
    if (!window.confirm("Are you sure you want to hide this tour from the live website?")) return;
    try {
      const docId = slug || id;
      await setDoc(doc(db, 'tours', docId), { status: 'Draft' }, { merge: true });
      setTours(tours.map(t => t.id === id ? { ...t, status: 'Draft' } : t));
      alert("✅ Tour hidden from public view.");
    } catch (err) {
      alert("❌ Failed to update tour status.");
    }
  };

  const filteredTours = tours.filter(tour => 
    tour.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const currentTours = filteredTours.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900 mb-4" />
        <p className="text-sm font-medium">Loading Dashboard Control Center...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-20 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tour Management</h1>
          <p className="text-sm text-slate-500 mt-1">Directly edit, manage day-by-day itineraries, and sync live expeditions.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New Tour</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search tours..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900 transition-all"
          />
        </div>
        <div className="text-xs font-medium text-slate-500">
          <strong className="text-slate-900">{filteredTours.length}</strong> total tours
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTours.map((tour) => (
          <div key={tour.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-slate-300 transition-all relative">
            
            {tour.status === 'Draft' && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <span className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest text-xs">Hidden / Draft</span>
              </div>
            )}

            <div>
              <div className="h-40 bg-slate-100 relative flex items-center justify-center border-b border-slate-100">
                {tour.image || tour.coverImage ? (
                  <img src={tour.image || tour.coverImage} className="w-full h-full object-cover" alt="tour cover" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-slate-300" />
                )}
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm border ${tour.status === 'Draft' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-white text-emerald-700 border-emerald-100'}`}>
                  {tour.status || 'Published'}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{tour.title}</h3>
                <div className="space-y-2.5 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" /> {tour.duration || tour.durationLabel || '7 Days'}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" /> {tour.location || tour.destination}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
              <div className="text-lg font-bold text-slate-900 font-mono">
                ${tour.priceFromUSD || tour.price || 0}
              </div>
              <div className="flex items-center gap-2 relative z-20">
                <button 
                  onClick={() => handleOpenEdit(tour)}
                  className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 rounded-lg transition-colors border border-slate-200 cursor-pointer"
                  title="Edit Tour & Itinerary"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                {tour.status !== 'Draft' && (
                  <button 
                    onClick={() => handleDelete(tour.id, tour.slug)}
                    className="p-2 text-rose-400 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-100 cursor-pointer"
                    title="Hide Tour"
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

      {/* --- EDIT / CREATE MODAL WITH DAY-BY-DAY ITINERARY BUILDER --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl my-8 border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-xl font-bold text-slate-900 mb-6">
              {editingTour ? 'Edit Expedition & Itinerary' : 'Create New Expedition'}
            </h2>

            <form onSubmit={handleSaveTour} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Tour Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-900"
                    placeholder="e.g., Simien Mountains Trek"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Price (USD)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Duration</label>
                    <input 
                      type="text" 
                      required
                      value={formData.duration}
                      onChange={e => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-900"
                      placeholder="7 Days / 6 Nights"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Location / Region</label>
                    <input 
                      type="text" 
                      required
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-900"
                      placeholder="Amhara & Oromia"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Status</label>
                    <select 
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-900 bg-white"
                    >
                      <option value="Published">Published (Live)</option>
                      <option value="Draft">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>

                {/* COVER IMAGE UPLOAD & PREVIEW */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Cover Image</label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-24 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                      {formData.coverImage ? (
                        <img src={formData.coverImage} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-slate-300" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <input 
                        type="url" 
                        value={formData.coverImage}
                        onChange={e => setFormData({...formData, coverImage: e.target.value})}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-slate-900"
                        placeholder="Paste image URL or upload file ->"
                      />
                      
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors">
                        {uploadingImage ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UploadCloud className="h-3.5 w-3.5 text-blue-600" />}
                        <span>{uploadingImage ? 'Uploading...' : 'Upload from Computer'}</span>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Overview Description</label>
                  <textarea 
                    rows={2}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-slate-900"
                    placeholder="Brief overview..."
                  />
                </div>
              </div>

              {/* --- DAY-BY-DAY ITINERARY BUILDER SECTION --- */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-slate-900" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Day-by-Day Itinerary</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={handleAddDay}
                    className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Day
                  </button>
                </div>

                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  {formData.itinerary.map((dayItem, index) => (
                    <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-widest bg-white px-2.5 py-1 rounded border border-slate-200">
                          Day {dayItem.day}
                        </span>
                        {formData.itinerary.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => handleRemoveDay(index)}
                            className="text-rose-500 hover:text-rose-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove
                          </button>
                        )}
                      </div>

                      <div>
                        <input 
                          type="text"
                          placeholder="Day Title (e.g., Journey to Lalibela Rock Churches)"
                          value={dayItem.title}
                          onChange={e => handleDayChange(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white font-medium focus:outline-none focus:border-slate-900"
                        />
                      </div>

                      <div>
                        <textarea 
                          rows={2}
                          placeholder="Day description activities..."
                          value={dayItem.description}
                          onChange={e => handleDayChange(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white font-normal focus:outline-none focus:border-slate-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
                >
                  Save & Sync Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};