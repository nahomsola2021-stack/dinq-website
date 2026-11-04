// src/admin/pages/ShopManager.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, ShoppingBag, Edit3, Trash2, Loader2, Image as ImageIcon, X, UploadCloud, ChevronLeft, ChevronRight } from 'lucide-react';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, uploadToCloudinary } from '../lib/firebase';
import { SHOP_CATEGORIES } from '../../data/content/shop';

const ITEMS_PER_PAGE = 8;

export const ShopManager: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // --- MODAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState<any | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Footwear',
    price: 85,
    rentPrice: 10,
    image: '',
    status: 'In Stock'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const dbData = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));

      let staticProds: any[] = [];
      SHOP_CATEGORIES.forEach(cat => {
        cat.items.forEach((item, idx) => {
          staticProds.push({
            id: `${cat.id}-${idx}`,
            name: item,
            category: cat.name,
            price: 50 + (idx * 15) % 80,
            rentPrice: 8,
            stock: 25,
            status: 'In Stock'
          });
        });
      });

      dbData.forEach(dbItem => {
        const existingIdx = staticProds.findIndex(p => p.name === dbItem.name || p.id === dbItem.id);
        if (existingIdx > -1) {
          staticProds[existingIdx] = { ...staticProds[existingIdx], ...dbItem };
        } else {
          staticProds.push(dbItem);
        }
      });

      staticProds.sort((a, b) => {
        const aDate = Date.parse(a.createdAt || a.updatedAt || '') || 0;
        const bDate = Date.parse(b.createdAt || b.updatedAt || '') || 0;
        return bDate - aDate;
      });

      setProducts(staticProds);
    } catch (err) {
      console.error("Error syncing shop inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingProd(null);
    setFormData({
      name: '',
      category: 'Footwear',
      price: 85,
      rentPrice: 10,
      image: '',
      status: 'In Stock'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: any) => {
    setEditingProd(prod);
    setFormData({
      name: prod.name || '',
      category: prod.categoryName || prod.category || 'Footwear',
      price: Number(prod.buyPrice || prod.price) || 85,
      rentPrice: Number(prod.rentPrice) || 10,
      image: prod.image || '',
      status: prod.status || 'In Stock'
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

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const docId = editingProd ? (editingProd.slug || editingProd.id) : slug;
      const now = new Date().toISOString();

      const payload = {
        ...formData,
        price: Number(formData.price),
        rentPrice: Number(formData.rentPrice),
        slug: docId,
        ...(!editingProd && { createdAt: now }),
        updatedAt: now
      };

      await setDoc(doc(db, 'products', docId), payload, { merge: true });

      alert("✅ Product saved and synced to the live storefront!");
      setIsModalOpen(false);
      if (!editingProd) {
        setCurrentPage(1);
        setSearchTerm('');
      }
      fetchProducts();
    } catch (err) {
      console.error("Failed to save product:", err);
      alert("❌ Failed to save product.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to hide "${name}" from the shop?`)) return;
    try {
      await setDoc(doc(db, 'products', id), { status: 'Draft' }, { merge: true });
      setProducts(products.map(p => p.id === id ? { ...p, status: 'Draft' } : p));
      alert("✅ Product hidden from storefront.");
    } catch (err) {
      alert("❌ Failed to update product.");
    }
  };

  const filtered = products.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentProducts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900 mb-4" />
        <p className="text-sm font-medium">Syncing Storefront Inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-20 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Shop & Gear Management</h1>
          <p className="text-sm text-slate-500 mt-1">Directly edit, upload item photos, or manage outfitter provisions.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search store inventory..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-slate-900"
          />
        </div>
        <div className="text-xs font-medium text-slate-500"><strong className="text-slate-900">{filtered.length}</strong> total catalog items</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((prod) => (
          <div key={prod.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between relative">
            {prod.status === 'Draft' && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <span className="bg-slate-900 text-white px-3 py-1 rounded font-bold uppercase tracking-widest text-[10px]">Hidden / Draft</span>
              </div>
            )}
            <div>
              <div className="h-36 bg-slate-100 flex items-center justify-center border-b border-slate-100">
                {prod.image ? <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} /> : <ShoppingBag className="h-8 w-8 text-slate-300" />}
              </div>
              <div className="p-5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600 block mb-1">{prod.categoryName || prod.category || 'Gear'}</span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{prod.name}</h3>
              </div>
            </div>
            <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
              <span className="font-mono font-bold text-slate-900">${prod.price || prod.buyPrice || 50}</span>
              <div className="flex items-center gap-1.5 relative z-20">
                <button 
                  onClick={() => handleOpenEdit(prod)}
                  className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-50 rounded border border-slate-200 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                {prod.status !== 'Draft' && (
                  <button 
                    onClick={() => handleDelete(prod.id, prod.name)}
                    className="p-1.5 text-rose-400 hover:text-rose-600 bg-rose-50 rounded border border-rose-100 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
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

      {/* --- SHOP EDIT/CREATE MODAL WITH IMAGE UPLOAD & PREVIEW --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl my-8 border border-slate-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer">
              <X className="h-4 w-4" />
            </button>
            <h2 className="text-xl font-bold text-slate-900 mb-6">{editingProd ? 'Edit Gear Item' : 'Add New Gear Item'}</h2>
            
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Product Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" placeholder="e.g., Gore-Tex Alpine Jacket" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Purchase Price ($)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Rental Price ($/day)</label>
                  <input type="number" value={formData.rentPrice} onChange={e => setFormData({...formData, rentPrice: Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
                </div>
              </div>

              {/* IMAGE UPLOAD & LIVE PREVIEW */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Product Image</label>
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white">
                  <option value="In Stock">In Stock (Live)</option>
                  <option value="Draft">Draft (Hidden)</option>
                </select>
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