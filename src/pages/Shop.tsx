// src/pages/Shop.tsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShoppingBag, Search, Footprints, Shirt, Shield, Tent, HeartPulse,
  Camera, Flame, Award, Gift, X, Plus, Minus, Check, Star, Heart, Eye, Sparkles,
  Truck, ShieldCheck, ChevronLeft, ChevronRight, SlidersHorizontal, PackageCheck, ArrowUpRight,
  CreditCard, Lock
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../admin/lib/firebase';
import { PageHero } from '../components/premium/PageHero';
import { CTABand } from '../components/premium/CTABand';
import { ImageWithFallback } from '../components/premium/ImageWithFallback';
import { SHOP_CATEGORIES } from '../data/content/shop';
import { updatePageMeta } from '../lib/seo';
import { waLink } from '../lib/whatsapp';

const CATEGORY_VISUALS: Record<string, any> = {
  footwear: { heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85', itemImages: ['https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80'], baseBuyPrice: 165, baseRentPrice: 12, rentable: true, sizes: ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'] },
  'outdoor-clothing': { heroImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=85', itemImages: ['https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80'], baseBuyPrice: 120, baseRentPrice: 10, rentable: true, sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  'backpacks-bags': { heroImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85', itemImages: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=900&q=80'], baseBuyPrice: 140, baseRentPrice: 9, rentable: true, sizes: ['35L Daypack', '55L Trek', '75L Expedition'] },
  'trekking-equipment': { heroImage: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1000&q=85', itemImages: ['https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=900&q=80'], baseBuyPrice: 75, baseRentPrice: 6, rentable: true, sizes: ['Standard Adjustable', 'Pro Carbon'] },
  'camping-equipment': { heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=85', itemImages: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=900&q=80'], baseBuyPrice: 240, baseRentPrice: 18, rentable: true, sizes: ['1-Person Alpine', '2-Person 4-Season', '4-Person Basecamp'] },
  'travel-essentials': { heroImage: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1000&q=85', itemImages: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=900&q=80'], baseBuyPrice: 45, baseRentPrice: null, rentable: false, sizes: ['One Size'] },
  'photo-gear': { heroImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85', itemImages: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=900&q=80'], baseBuyPrice: 95, baseRentPrice: 14, rentable: true, sizes: ['Universal Fit'] },
  'urban-camping-collection': { heroImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85', itemImages: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80'], baseBuyPrice: 55, baseRentPrice: null, rentable: false, sizes: ['S', 'M', 'L', 'XL'] },
  'ethiopia-travel-heritage': { heroImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85', itemImages: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80'], baseBuyPrice: 68, baseRentPrice: null, rentable: false, sizes: ['Artisanal Standard'] },
  'gifts-souvenirs': { heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85', itemImages: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80'], baseBuyPrice: 38, baseRentPrice: null, rentable: false, sizes: ['Gift Boxed'] },
};

const GEAR_CATEGORY_IDS = [
  'footwear', 'outdoor-clothing', 'backpacks-bags', 'trekking-equipment',
  'camping-equipment', 'travel-essentials', 'photo-gear',
];
const COLLECTION_CATEGORY_IDS = ['urban-camping-collection', 'ethiopia-travel-heritage'];
const GIFT_CATEGORY_IDS = ['gifts-souvenirs'];

const normalizeCategoryId = (rawCategory?: string): string => {
  if (!rawCategory) return 'footwear';
  const cleaned = rawCategory.trim().toLowerCase();
  const matchedCat = SHOP_CATEGORIES.find(
    (c) =>
      c.id.toLowerCase() === cleaned ||
      c.name.trim().toLowerCase() === cleaned ||
      cleaned.replace(/[^a-z0-9]+/g, '-') === c.id.toLowerCase()
  );
  if (matchedCat) return matchedCat.id;

  if (cleaned.includes('shoe') || cleaned.includes('boot') || cleaned.includes('foot')) return 'footwear';
  if (cleaned.includes('cloth') || cleaned.includes('jacket') || cleaned.includes('apparel')) return 'outdoor-clothing';
  if (cleaned.includes('bag') || cleaned.includes('pack') || cleaned.includes('duffel')) return 'backpacks-bags';
  if (cleaned.includes('trek') || cleaned.includes('pole') || cleaned.includes('climb')) return 'trekking-equipment';
  if (cleaned.includes('camp') && !cleaned.includes('urban')) return 'camping-equipment';
  if (cleaned.includes('essential') || cleaned.includes('health') || cleaned.includes('safety')) return 'travel-essentials';
  if (cleaned.includes('photo') || cleaned.includes('camera') || cleaned.includes('optic')) return 'photo-gear';
  if (cleaned.includes('urban')) return 'urban-camping-collection';
  if (cleaned.includes('heritage') || cleaned.includes('coffee') || cleaned.includes('artisan')) return 'ethiopia-travel-heritage';
  if (cleaned.includes('gift') || cleaned.includes('souvenir')) return 'gifts-souvenirs';

  return cleaned.replace(/[^a-z0-9]+/g, '-');
};

interface ProductItem {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  kicker: string;
  image: string;
  buyPrice: number;
  rentPrice: number | null;
  rentable: boolean;
  badge?: string;
  rating: string;
  reviews: number;
  description: string;
  sizes: string[];
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

interface CartItem {
  product: ProductItem;
  mode: 'buy' | 'rent';
  size: string;
  quantity: number;
}

export const Shop: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Gear' | 'Collections' | 'Gifts'>('All');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [acquisitionMode, setAcquisitionMode] = useState<'all' | 'rent' | 'buy'>('all');
  const [viewType, setViewType] = useState<'products' | 'lookbook'>('products');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [search, setSearch] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Generate hardcoded static items
  const staticProducts: ProductItem[] = useMemo(() => {
    const list: ProductItem[] = [];
    SHOP_CATEGORIES.forEach((cat) => {
      const visual = CATEGORY_VISUALS[cat.id] || CATEGORY_VISUALS['outdoor-clothing'];
      cat.items.forEach((itemName, idx) => {
        list.push({
          id: `${cat.id}-${idx}`,
          name: itemName,
          categoryId: cat.id,
          categoryName: cat.name,
          kicker: cat.kicker,
          image: visual.itemImages[idx % visual.itemImages.length] || visual.heroImage,
          buyPrice: visual.baseBuyPrice + ((idx * 18) % 65),
          rentPrice: visual.baseRentPrice ? visual.baseRentPrice + (idx % 3) * 2 : null,
          rentable: visual.rentable,
          badge: idx === 0 ? (cat.badge || 'Bestseller') : visual.rentable && idx === 1 ? 'Guide Favorite' : undefined,
          rating: (4.8 + ((idx % 3) * 0.1)).toFixed(1),
          reviews: 14 + ((idx * 11) % 45),
          description: `${cat.summary} Inspected and fitted by Dinq expedition quartermasters in Addis Ababa.`,
          sizes: visual.sizes || ['Standard'],
          stockStatus: idx === 3 ? 'Low Stock' : 'In Stock',
        });
      });
    });
    return list;
  }, []);

  const [liveProducts, setLiveProducts] = useState<ProductItem[]>(staticProducts);

  useEffect(() => {
    updatePageMeta('Expedition Outfitter & Gear Shop', 'Shop or rent field-tested gear.', '/shop');
  }, []);

  useEffect(() => {
    const fetchDashboardEdits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const dbData = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));

        setLiveProducts(() => {
          let merged = [...staticProducts];
          dbData.forEach(dbItem => {
            const existingIdx = merged.findIndex(
              p => p.name.trim().toLowerCase() === (dbItem.name || '').trim().toLowerCase() || p.id === dbItem.id
            );
            const resolvedCatId = normalizeCategoryId(dbItem.categoryId || dbItem.category);
            const matchedCatObj = SHOP_CATEGORIES.find(c => c.id === resolvedCatId);

            if (existingIdx > -1) {
              const nextRentPrice = dbItem.rentPrice !== undefined ? Number(dbItem.rentPrice) || null : merged[existingIdx].rentPrice;
              merged[existingIdx] = {
                ...merged[existingIdx],
                categoryId: dbItem.category || dbItem.categoryId ? resolvedCatId : merged[existingIdx].categoryId,
                categoryName: matchedCatObj?.name || dbItem.categoryName || dbItem.category || merged[existingIdx].categoryName,
                buyPrice: Number(dbItem.price ?? dbItem.buyPrice) || merged[existingIdx].buyPrice,
                rentPrice: nextRentPrice,
                rentable: dbItem.rentable !== undefined ? Boolean(dbItem.rentable) : Boolean(nextRentPrice),
                image: dbItem.image || dbItem.coverImage || merged[existingIdx].image,
                description: dbItem.description || merged[existingIdx].description,
                createdAt: dbItem.createdAt || merged[existingIdx].createdAt,
                updatedAt: dbItem.updatedAt || merged[existingIdx].updatedAt,
                status: dbItem.status || merged[existingIdx].status,
              };
            } else {
              const nextRentPrice = dbItem.rentPrice ? Number(dbItem.rentPrice) : null;
              merged.push({
                id: dbItem.id,
                name: dbItem.name || 'New Gear',
                categoryId: resolvedCatId,
                categoryName: matchedCatObj?.name || dbItem.category || 'Expedition Gear',
                kicker: matchedCatObj?.kicker || dbItem.kicker || 'Gear',
                image: dbItem.image || dbItem.coverImage || CATEGORY_VISUALS[resolvedCatId]?.heroImage || '',
                buyPrice: Number(dbItem.price ?? dbItem.buyPrice) || 0,
                rentPrice: nextRentPrice,
                rentable: dbItem.rentable !== undefined ? Boolean(dbItem.rentable) : Boolean(nextRentPrice),
                rating: '5.0',
                reviews: 1,
                description: dbItem.description || '',
                sizes: Array.isArray(dbItem.sizes) && dbItem.sizes.length ? dbItem.sizes : ['Standard'],
                stockStatus: 'In Stock',
                createdAt: dbItem.createdAt,
                updatedAt: dbItem.updatedAt,
                status: dbItem.status,
              } as ProductItem);
            }
          });
          return merged.filter(p => p.status !== 'Draft' && p.status !== 'Deleted');
        });
      } catch (error) {
        console.error("Firebase Sync Error:", error);
      }
    };
    fetchDashboardEdits();
  }, [staticProducts]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<'buy' | 'rent'>('buy');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const toggleWishlist = (id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const storeTopRef = useRef<HTMLDivElement>(null);
  const departmentCarouselRef = useRef<HTMLDivElement>(null);
  const touchResumeTimerRef = useRef<number | null>(null);
  const [departmentScroll, setDepartmentScroll] = useState({ canScrollPrev: false, canScrollNext: true });
  const [isDepartmentCarouselPaused, setIsDepartmentCarouselPaused] = useState(false);

  useEffect(() => {
    const carousel = departmentCarouselRef.current;
    if (!carousel) return;

    const updateScrollState = () => {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      setDepartmentScroll({
        canScrollPrev: carousel.scrollLeft > 2,
        canScrollNext: carousel.scrollLeft < maxScrollLeft - 2,
      });
    };

    updateScrollState();
    carousel.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      carousel.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  useEffect(() => {
    const carousel = departmentCarouselRef.current;
    if (!carousel || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const intervalId = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;

      const firstCard = carousel.querySelector<HTMLElement>('[data-department-card]');
      if (!firstCard) return;

      const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0;
      const step = firstCard.getBoundingClientRect().width + gap;
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

      carousel.scrollTo({
        left: carousel.scrollLeft >= maxScrollLeft - 2 ? 0 : carousel.scrollLeft + step,
        behavior: 'smooth',
      });
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [isDepartmentCarouselPaused]);

  useEffect(() => () => {
    if (touchResumeTimerRef.current !== null) {
      window.clearTimeout(touchResumeTimerRef.current);
    }
  }, []);

  const scrollDepartments = (direction: -1 | 1) => {
    const carousel = departmentCarouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector<HTMLElement>('[data-department-card]');
    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0;
    const step = (firstCard?.getBoundingClientRect().width || carousel.clientWidth * 0.8) + gap;
    carousel.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const pauseDepartmentCarouselAfterTouch = () => {
    setIsDepartmentCarouselPaused(true);
    if (touchResumeTimerRef.current !== null) {
      window.clearTimeout(touchResumeTimerRef.current);
    }
    touchResumeTimerRef.current = window.setTimeout(() => {
      setIsDepartmentCarouselPaused(false);
      touchResumeTimerRef.current = null;
    }, 6000);
  };

  const handleSelectTab = (tab: 'All' | 'Gear' | 'Collections' | 'Gifts') => {
    setActiveFilter(tab);
    if (tab === 'All') {
      setActiveCategoryId('all');
    } else if (tab === 'Gear' && activeCategoryId !== 'all' && !GEAR_CATEGORY_IDS.includes(activeCategoryId)) {
      setActiveCategoryId('all');
    } else if (tab === 'Collections' && activeCategoryId !== 'all' && !COLLECTION_CATEGORY_IDS.includes(activeCategoryId)) {
      setActiveCategoryId('all');
    } else if (tab === 'Gifts' && activeCategoryId !== 'all' && !GIFT_CATEGORY_IDS.includes(activeCategoryId)) {
      setActiveCategoryId('all');
    }
  };

  const handleSelectDepartment = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    if (categoryId === 'all') {
      setActiveFilter('All');
    } else {
      if (activeFilter === 'Gear' && !GEAR_CATEGORY_IDS.includes(categoryId)) setActiveFilter('All');
      if (activeFilter === 'Collections' && !COLLECTION_CATEGORY_IDS.includes(categoryId)) setActiveFilter('All');
      if (activeFilter === 'Gifts' && !GIFT_CATEGORY_IDS.includes(categoryId)) setActiveFilter('All');
      const visual = CATEGORY_VISUALS[categoryId];
      if (acquisitionMode === 'rent' && visual && !visual.rentable) {
        setAcquisitionMode('all');
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, activeCategoryId, acquisitionMode, viewType, search, sortBy, inStockOnly]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return Footprints;
      case 'Shirt': return Shirt;
      case 'Backpack': return ShoppingBag;
      case 'Shield': return Shield;
      case 'Tent': return Tent;
      case 'HeartPulse': return HeartPulse;
      case 'Camera': return Camera;
      case 'Flame': return Flame;
      case 'Award': return Award;
      default: return Gift;
    }
  };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = liveProducts.filter((prod) => {
      const prodCatId = normalizeCategoryId(prod.categoryId);

      if (activeCategoryId !== 'all' && prodCatId !== activeCategoryId) return false;

      if (activeFilter === 'Gear' && !GEAR_CATEGORY_IDS.includes(prodCatId)) return false;
      if (activeFilter === 'Collections' && !COLLECTION_CATEGORY_IDS.includes(prodCatId)) return false;
      if (activeFilter === 'Gifts' && !GIFT_CATEGORY_IDS.includes(prodCatId)) return false;

      if (acquisitionMode === 'rent' && !prod.rentable) return false;
      if (acquisitionMode === 'buy' && !(prod.buyPrice > 0)) return false;

      if (inStockOnly && prod.stockStatus === 'Out of Stock') return false;

      if (query) {
        return (
          prod.name?.toLowerCase().includes(query) ||
          prod.categoryName?.toLowerCase().includes(query) ||
          prod.description?.toLowerCase().includes(query) ||
          prod.kicker?.toLowerCase().includes(query)
        );
      }
      return true;
    });

    const sorted = [...filtered];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => Number(a.buyPrice) - Number(b.buyPrice));
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => Number(b.buyPrice) - Number(a.buyPrice));
    } else {
      sorted.sort((a, b) => {
        const aDate = Date.parse(a.createdAt || a.updatedAt || '') || 0;
        const bDate = Date.parse(b.createdAt || b.updatedAt || '') || 0;
        return bDate - aDate;
      });
    }
    return sorted;
  }, [liveProducts, activeFilter, activeCategoryId, acquisitionMode, search, sortBy, inStockOnly]);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return SHOP_CATEGORIES.filter((cat) => {
      if (activeCategoryId !== 'all' && cat.id !== activeCategoryId) return false;
      if (activeFilter === 'Gear' && !GEAR_CATEGORY_IDS.includes(cat.id)) return false;
      if (activeFilter === 'Collections' && !COLLECTION_CATEGORY_IDS.includes(cat.id)) return false;
      if (activeFilter === 'Gifts' && !GIFT_CATEGORY_IDS.includes(cat.id)) return false;
      if (acquisitionMode === 'rent' && !CATEGORY_VISUALS[cat.id]?.rentable) return false;

      if (query) {
        return (
          cat.name.toLowerCase().includes(query) ||
          cat.summary.toLowerCase().includes(query) ||
          cat.items.some((i) => i.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [activeFilter, activeCategoryId, acquisitionMode, search]);

  const itemsPerPage = viewType === 'products' ? 8 : 4;
  const totalItems = viewType === 'products' ? filteredProducts.length : filteredCategories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const currentCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (storeTopRef.current) {
      window.scrollTo({ top: storeTopRef.current.getBoundingClientRect().top + window.pageYOffset - 110, behavior: 'smooth' });
    }
  };

  const addToCart = (product: ProductItem, mode: 'buy' | 'rent' = 'buy', size?: string) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const finalMode = mode === 'rent' && !product.rentable ? 'buy' : mode;
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id && item.mode === finalMode && item.size === chosenSize);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { product, mode: finalMode, size: chosenSize, quantity: 1 }];
    });
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1400);
  };

  const updateQuantity = (idx: number, delta: number) => {
    setCart((prev) => prev.map((item, i) => (i === idx ? { ...item, quantity: item.quantity + delta } : item)).filter((item) => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + ((item.mode === 'rent' && item.product.rentPrice ? item.product.rentPrice : item.product.buyPrice) * item.quantity), 0);

  const generateCartWhatsAppLink = () => {
    if (cart.length === 0) return waLink('Hello Dinq Outfitter! I would like to inquire about expedition gear.');
    const lines = cart.map((item, i) => `${i + 1}. *${item.product.name}* (${item.mode.toUpperCase()} · Size: ${item.size}) x${item.quantity} — $${(item.mode === 'rent' && item.product.rentPrice ? item.product.rentPrice : item.product.buyPrice) * item.quantity}${item.mode === 'rent' ? '/day' : ''}`);
    return waLink(`Hello Dinq Expedition Outfitters! I would like to reserve/order the following gear:\n\n${lines.join('\n')}\n\n*Estimated Total:* $${cartTotal} USD\nPlease confirm availability.`);
  };

  return (
    <div className="w-full bg-[#FAF4EB] text-[#302019] min-h-screen selection:bg-[#DDAA42] selection:text-[#18110D]">
      <PageHero
        image="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=2400&q=85"
        imageAlt="A tent set up at an outdoor campsite"
        eyebrow="Addis Ababa Flagship Outfitter"
        Icon={ShoppingBag}
        title="Field-Tested"
        titleItalic="Provisions"
        subtitle="Technical alpine hardware, 4-season basecamp rentals, and signature Urban Camping apparel—inspected by Dinq mountain guides."
        crumbs={[{ label: 'Gear Shop' }]}
        tall={false}
      />

      <div className="bg-[#1A130F] text-[#FAF4EB] border-b border-[#DDAA42]/20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3"><Truck className="h-4 w-4 text-[#DDAA42] shrink-0" /><span><strong>Hotel & Bole Delivery</strong> · Free in Addis</span></div>
          <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-[#DDAA42] shrink-0" /><span><strong>4,000m Rated</strong> · Simien & Bale Tested</span></div>
          <div className="flex items-center gap-3"><PackageCheck className="h-4 w-4 text-[#DDAA42] shrink-0" /><span><strong>Buy or Rent</strong> · Flexible Expedition Kits</span></div>
          <div className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-[#DDAA42] shrink-0" /><span><strong>Boot Fitting Concierge</strong> · Pre-Trek Sizing</span></div>
        </div>
      </div>

      {/* SHOPPING CART FLOATING BUTTON */}
      <button type="button" onClick={() => setIsCartOpen(true)} aria-label={`Open shopping bag${cart.length ? `, ${cart.reduce((sum, item) => sum + item.quantity, 0)} items` : ', empty'}`} className="fixed bottom-24 right-3 sm:right-6 z-40 h-12 w-12 sm:h-auto sm:w-auto flex items-center justify-center sm:justify-start gap-2 sm:gap-3 p-0 sm:px-5 sm:py-3.5 rounded-full bg-[#1A130F] text-[#FFF9F2] border border-[#DDAA42]/50 shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:scale-105 transition-all group cursor-pointer">
        <div className="relative">
          <ShoppingBag className="h-5 w-5 text-[#DDAA42]" />
          {cart.length > 0 && <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#D95F49] text-white text-[10px] font-bold flex items-center justify-center">{cart.reduce((s, i) => s + i.quantity, 0)}</span>}
        </div>
        <div className="hidden sm:block text-left">
          <span className="block text-[9px] uppercase tracking-widest text-[#DDAA42] font-bold">Shopping Bag</span>
          <span className="block text-xs font-semibold">{cart.length === 0 ? 'Empty Bag' : `${cart.reduce((s, i) => s + i.quantity, 0)} Items · $${cartTotal}`}</span>
        </div>
      </button>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-12 sm:mb-16">
          <div className="lg:col-span-8 relative rounded-[28px] overflow-hidden min-h-[400px] sm:min-h-[420px] flex flex-col justify-end p-5 sm:p-12 bg-[#1A130F] group">
            <ImageWithFallback src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1600&q=85" alt="Simien Alpine Basecamp Kit" className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-[#120D0A]/50 to-transparent" />
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDAA42]/20 backdrop-blur-md border border-[#DDAA42]/40 text-[#DDAA42] text-[10px] font-bold uppercase tracking-[0.2em] mb-4"><Sparkles className="h-3 w-3" /><span>Complete Expedition Rental Bundle</span></div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white leading-tight">The Simien & Bale <span className="italic text-[#DDAA42]">4,000m Alpine Kit</span></h2>
              <p className="mt-3 text-xs sm:text-sm text-[#E7D0B8] font-light leading-relaxed">Arrive in Addis Ababa light. Reserve our complete 4-season sub-zero sleeping system, Gore-Tex shell, carbon poles, and waterproof duffel—delivered directly to your hotel or basecamp.</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="button" onClick={() => { setAcquisitionMode('rent'); setActiveFilter('Gear'); setActiveCategoryId('all'); storeTopRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="px-5 sm:px-6 py-3 rounded-full bg-[#DDAA42] text-[#1A130F] font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-[#E7C175] transition-all cursor-pointer">Browse Rental Gear · From $6/day</button>
                <a href={waLink('Hello Dinq! I would like to reserve the complete Simien & Bale 4,000m Alpine Rental Kit.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#DDAA42] transition-colors"><span>Reserve Full Bundle ($38/day)</span><ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 relative rounded-[28px] overflow-hidden min-h-[360px] flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-[#2A1D18] to-[#140D09] border border-[#DDAA42]/30 group">
            <ImageWithFallback src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80" alt="Urban Camping Merch" className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140D09] via-[#140D09]/60 to-transparent" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D95F49] bg-[#D95F49]/15 border border-[#D95F49]/30 px-3 py-1 rounded-full">Signature Capsule</span>
              <span className="font-serif italic text-sm text-[#DDAA42]">2026 Drop</span>
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="font-serif text-3xl font-medium text-[#FFF9F2] leading-snug">Urban Camping™ Apparel & Keepsakes</h3>
              <p className="mt-2 text-xs text-[#D0C2B6] font-light leading-relaxed">Heavyweight highland hoodies, embroidered field caps, and matte enamel camp mugs crafted in Addis.</p>
              <button type="button" onClick={() => { handleSelectDepartment('urban-camping-collection'); storeTopRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-5 w-full py-3 rounded-full bg-white/10 hover:bg-[#D95F49] text-white border border-white/20 hover:border-[#D95F49] text-xs font-bold uppercase tracking-widest transition-all cursor-pointer">Shop The Capsule</button>
            </div>
          </div>
        </div>

        {/* DEPARTMENT SCROLLER */}
        <div className="mb-10 sm:mb-14" ref={storeTopRef}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 sm:mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D95F49] block mb-1.5">10 Outfitter Departments</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#302019]">Shop by Department</h3>
            </div>
            <div className="flex items-center justify-between gap-3">
              {activeCategoryId !== 'all' ? (
                <button type="button" onClick={() => handleSelectDepartment('all')} className="text-[10px] sm:text-xs font-bold text-[#D95F49] hover:underline cursor-pointer tracking-wider">SHOW ALL 10 DEPARTMENTS ✕</button>
              ) : (
                <span className="text-[11px] text-[#78685E] sm:hidden">Swipe to explore departments</span>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button type="button" onClick={() => scrollDepartments(-1)} disabled={!departmentScroll.canScrollPrev} aria-label="Scroll departments left" className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[#E7D0B8] bg-white text-[#302019] hover:bg-[#302019] hover:text-white disabled:opacity-35 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => scrollDepartments(1)} disabled={!departmentScroll.canScrollNext} aria-label="Scroll departments right" className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-[#E7D0B8] bg-white text-[#302019] hover:bg-[#302019] hover:text-white disabled:opacity-35 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={departmentCarouselRef}
            aria-label="Shop departments"
            onMouseEnter={() => setIsDepartmentCarouselPaused(true)}
            onMouseLeave={() => setIsDepartmentCarouselPaused(false)}
            onFocusCapture={() => setIsDepartmentCarouselPaused(true)}
            onBlurCapture={(event) => {
              const nextFocusedElement = event.relatedTarget;
              if (!(nextFocusedElement instanceof Node) || !event.currentTarget.contains(nextFocusedElement)) {
                setIsDepartmentCarouselPaused(false);
              }
            }}
            onTouchStart={pauseDepartmentCarouselAfterTouch}
            onTouchEnd={pauseDepartmentCarouselAfterTouch}
            className="flex items-center gap-4 sm:gap-5 overflow-x-auto overscroll-x-contain touch-pan-x no-scrollbar pb-6 px-1 snap-x snap-mandatory scroll-smooth"
          >
            <button 
              type="button" 
              onClick={() => handleSelectDepartment('all')} 
              data-department-card
              className={`group shrink-0 snap-start relative w-[82vw] max-w-[320px] h-[320px] sm:h-[360px] rounded-[2rem] overflow-hidden border transition-all duration-500 cursor-pointer ${
                activeCategoryId === 'all' 
                  ? 'border-[#D95F49] shadow-2xl scale-[1.02] bg-[#1A130F]' 
                  : 'border-[#E7D0B8] bg-[#1A130F] opacity-90 hover:opacity-100 hover:border-[#DDAA42]/50'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0E0A08] to-[#2A1D18] opacity-80" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-[#DDAA42]/10 flex items-center justify-center border border-[#DDAA42]/30 mb-6 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="h-7 w-7 text-[#DDAA42]" />
                </div>
                <span className="font-serif text-3xl font-medium text-white mb-2">All Provisions</span>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#DDAA42] bg-[#DDAA42]/10 px-3 py-1 rounded-full">{liveProducts.length} Items</span>
              </div>
            </button>

            {SHOP_CATEGORIES.map((cat) => {
              const visual = CATEGORY_VISUALS[cat.id];
              const isSelected = activeCategoryId === cat.id;
              
              return (
                <button 
                  key={cat.id} 
                  type="button" 
                  onClick={() => handleSelectDepartment(isSelected ? 'all' : cat.id)} 
                  data-department-card
                  className={`group shrink-0 snap-start relative w-[82vw] max-w-[320px] h-[320px] sm:h-[360px] rounded-[2rem] overflow-hidden border transition-all duration-500 text-left cursor-pointer ${
                    isSelected 
                      ? 'border-[#D95F49] shadow-2xl scale-[1.02]' 
                      : 'border-transparent shadow-lg hover:shadow-xl'
                  }`}
                >
                  <ImageWithFallback 
                    src={visual?.heroImage || ''} 
                    alt={cat.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A08] via-[#0E0A08]/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />
                  
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                        {cat.numeral}
                      </span>
                    </div>

                    <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#DDAA42] block mb-2 drop-shadow-md">
                        {cat.items.length} Items Available
                      </span>
                      <span className="font-serif text-3xl font-medium text-white leading-[1.1] drop-shadow-xl line-clamp-2">
                        {cat.name}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RETAIL FILTER BAR */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-[#E7D0B8] mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(['All', 'Gear', 'Collections', 'Gifts'] as const).map((tab) => (
                <button key={tab} type="button" onClick={() => handleSelectTab(tab)} className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${activeFilter === tab ? 'bg-[#302019] text-[#FFF9F2] shadow-sm' : 'bg-[#FAF4EB] text-[#78685E] hover:text-[#302019] hover:bg-[#E7D0B8]/40'}`}>
                  {tab === 'All' ? 'All Departments' : tab}
                </button>
              ))}
              <div className="h-6 w-px bg-[#E7D0B8] mx-2 hidden sm:block" />
              <div className="inline-flex rounded-full bg-[#FAF4EB] p-1 border border-[#E7D0B8]">
                {[ { id: 'all', label: 'Buy & Rent' }, { id: 'rent', label: 'Rentable Only' }, ].map((m) => (
                  <button key={m.id} type="button" onClick={() => setAcquisitionMode(m.id as 'all' | 'rent')} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${acquisitionMode === m.id ? 'bg-[#D95F49] text-white shadow-sm' : 'text-[#78685E] hover:text-[#302019]'}`}>{m.label}</button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* In Stock Toggle */}
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E7D0B8] bg-[#FAF4EB] text-xs font-semibold text-[#302019] cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#D95F49] focus:ring-[#D95F49] cursor-pointer"
                />
                <span>In Stock Only</span>
              </label>

              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#78685E]" />
                <input type="text" placeholder="Search boots, tents, jackets..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-8 py-2.5 rounded-full border border-[#E7D0B8] bg-[#FAF4EB] text-[13px] text-[#302019] font-medium focus:outline-none focus:border-[#D95F49] focus:bg-white transition-colors" />
                {search && <button type="button" onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78685E] hover:text-[#302019]"><X className="h-4 w-4" /></button>}
              </div>

              {viewType === 'products' && (
                <div className="relative">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="appearance-none pl-4 pr-10 py-2.5 rounded-full border border-[#E7D0B8] bg-[#FAF4EB] text-[13px] font-semibold text-[#302019] focus:outline-none focus:border-[#D95F49] cursor-pointer hover:bg-white transition-colors">
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <SlidersHorizontal className="h-4 w-4 text-[#78685E] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              )}

              <div className="inline-flex rounded-full bg-[#FAF4EB] p-1 border border-[#E7D0B8]">
                <button type="button" onClick={() => setViewType('products')} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${viewType === 'products' ? 'bg-[#302019] text-[#FFF9F2] shadow-sm' : 'text-[#78685E] hover:text-[#302019]'}`}>Products</button>
                <button type="button" onClick={() => setViewType('lookbook')} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${viewType === 'lookbook' ? 'bg-[#302019] text-[#FFF9F2] shadow-sm' : 'text-[#78685E] hover:text-[#302019]'}`}>Lookbooks</button>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {viewType === 'products' ? (
          currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {currentProducts.map((product) => {
                const isJustAdded = justAddedId === product.id;
                const isOutOfStock = product.stockStatus === 'Out of Stock';

                return (
                  <div key={product.id} className="group bg-white rounded-[24px] overflow-hidden border border-[#E7D0B8]/80 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#1A130F]">
                      <ImageWithFallback src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 opacity-60 group-hover:opacity-80 transition-opacity" />

                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-1.5">
                          {product.badge && <span className="bg-[#1A130F]/90 backdrop-blur-md text-[#DDAA42] border border-[#DDAA42]/40 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">{product.badge}</span>}
                          {product.stockStatus === 'Low Stock' && <span className="bg-[#D95F49] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm animate-pulse">Low Stock</span>}
                          {isOutOfStock && <span className="bg-black/80 text-[#E7D0B8] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">Sold Out</span>}
                        </div>
                        <button type="button" onClick={() => toggleWishlist(product.id)} className={`h-9 w-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-sm ${wishlist.includes(product.id) ? 'bg-[#D95F49] text-white' : 'bg-white/85 text-[#302019] hover:bg-white'}`}>
                          <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 translate-y-4 opacity-95 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button 
                          type="button" 
                          disabled={isOutOfStock}
                          onClick={() => addToCart(product, 'buy')} 
                          className={`flex-1 py-3 px-4 rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                            isOutOfStock 
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                              : isJustAdded 
                                ? 'bg-[#078930] text-white' 
                                : 'bg-[#FFF9F2] hover:bg-[#DDAA42] text-[#1A130F]'
                          }`}
                        >
                          {isOutOfStock ? 'Sold Out' : isJustAdded ? <><Check className="h-4 w-4" /><span>Added to Bag</span></> : <><Plus className="h-4 w-4" /><span>Add to Bag</span></>}
                        </button>
                        <button type="button" onClick={() => { setQuickViewProduct(product); setSelectedSize(product.sizes[0]); setSelectedMode('buy'); }} className="h-10 w-10 rounded-full bg-[#1A130F]/90 backdrop-blur-md text-white hover:bg-[#D95F49] flex items-center justify-center shadow-lg transition-colors cursor-pointer shrink-0">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-[#78685E] mb-2">
                          <span className="font-bold uppercase tracking-wider text-[#D95F49]">{product.categoryName}</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-[#302019]"><Star className="h-3.5 w-3.5 fill-[#DDAA42] text-[#DDAA42]" />{product.rating} <span className="text-[#78685E] font-normal">({product.reviews})</span></span>
                        </div>
                        <h3 onClick={() => { setQuickViewProduct(product); setSelectedSize(product.sizes[0]); setSelectedMode('buy'); }} className="font-serif text-lg font-semibold text-[#302019] group-hover:text-[#D95F49] transition-colors leading-snug cursor-pointer line-clamp-2">{product.name}</h3>
                      </div>

                      <div className="mt-5 pt-4 border-t border-[#E7D0B8]/60 flex items-end justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#78685E] block mb-0.5">Purchase</span>
                          <span className="font-serif text-[22px] font-bold text-[#302019] leading-none">${product.buyPrice}</span>
                        </div>
                        {product.rentable && product.rentPrice && !isOutOfStock ? (
                          <button type="button" onClick={() => addToCart(product, 'rent')} className="text-right group/rent cursor-pointer">
                            <span className="text-[9px] uppercase tracking-widest text-[#D95F49] font-bold block mb-0.5 group-hover/rent:underline">Or Rent +</span>
                            <span className="font-serif text-base font-semibold text-[#302019] leading-none">${product.rentPrice}<span className="text-[10px] font-sans font-normal text-[#78685E]">/day</span></span>
                          </button>
                        ) : (
                          <span className="text-[10px] font-medium text-[#78685E] bg-[#FAF4EB] px-3 py-1.5 rounded-full border border-[#E7D0B8]">Souvenir / Keep</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[2rem] bg-white border border-[#E7D0B8] p-16 text-center max-w-2xl mx-auto my-12 shadow-sm">
              <ShoppingBag className="h-12 w-12 text-[#D95F49] mx-auto mb-4 opacity-50" />
              <h4 className="font-serif text-3xl font-semibold text-[#302019] mb-3">No Matching Gear Found</h4>
              <p className="text-sm text-[#78685E] leading-relaxed">Try clearing your search filter or switching back to the "All Departments" view to see our full outfitter inventory.</p>
              <button type="button" onClick={() => { setActiveFilter('All'); setActiveCategoryId('all'); setAcquisitionMode('all'); setSearch(''); setSortBy('featured'); setInStockOnly(false); }} className="mt-8 px-8 py-4 rounded-full bg-[#302019] hover:bg-[#D95F49] text-[#FFF9F2] text-[10px] font-bold uppercase tracking-widest transition-colors shadow-md cursor-pointer">Reset Store Filters</button>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 my-8">
            {currentCategories.map((cat) => {
              const IconComponent = getIcon(cat.icon);
              const visual = CATEGORY_VISUALS[cat.id];
              const isDark = cat.isFeaturedDark;

              return (
                <div key={cat.id} className={`rounded-[2.5rem] overflow-hidden border flex flex-col justify-between transition-all duration-500 hover:shadow-2xl ${isDark ? 'bg-[#1A130F] border-[#DDAA42]/30 text-[#FAF4EB]' : 'bg-white border-[#E7D0B8] text-[#302019]'}`}>
                  <div className="relative h-64 overflow-hidden bg-[#120D0A]">
                    <ImageWithFallback src={visual?.heroImage || ''} alt={cat.name} className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-5 left-6 right-6 flex items-center justify-between">
                      <span className="bg-black/50 backdrop-blur-md text-[#DDAA42] border border-[#DDAA42]/30 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">{cat.kicker}</span>
                      <span className="font-serif text-4xl text-white/40 font-light">{cat.numeral}</span>
                    </div>
                    <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                      <div><h3 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">{cat.name}</h3></div>
                      <div className="h-12 w-12 rounded-full bg-[#DDAA42] text-[#1A130F] flex items-center justify-center shrink-0 shadow-lg"><IconComponent className="h-5 w-5" /></div>
                    </div>
                  </div>
                  <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <p className={`text-sm sm:text-[15px] font-light leading-[1.8] ${isDark ? 'text-[#D0C2B6]' : 'text-[#78685E]'}`}>{cat.summary}</p>
                      <div className="mt-6 pt-5 border-t border-[#E7D0B8]/30">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D95F49] block mb-4">Click Any Item to Add to Bag:</span>
                        <div className="flex flex-wrap gap-2.5">
                          {cat.items.map((itemName, i) => {
                            const matchingProd = liveProducts.find((p) => normalizeCategoryId(p.categoryId) === cat.id && p.name === itemName);
                            return (
                              <button key={i} type="button" onClick={() => matchingProd && addToCart(matchingProd, 'buy')} className={`inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full border transition-all cursor-pointer shadow-sm ${isDark ? 'bg-white/5 border-white/15 text-[#FAF4EB] hover:bg-[#DDAA42] hover:text-[#1A130F]' : 'bg-[#FAF4EB] border-[#E7D0B8] text-[#302019] hover:bg-[#302019] hover:text-white'}`}>
                                <Plus className="h-3.5 w-3.5 text-[#D95F49]" /><span>{itemName}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 pt-5 border-t border-[#E7D0B8]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button type="button" onClick={() => { handleSelectDepartment(cat.id); setViewType('products'); }} className="text-[11px] font-bold uppercase tracking-widest text-[#D95F49] hover:underline cursor-pointer">View All {cat.items.length} Products →</button>
                      <a href={waLink(`Hello Dinq Shop! I want to inquire about "${cat.name}".`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#302019] text-[#FFF9F2] text-[10px] font-bold uppercase tracking-widest hover:bg-[#D95F49] transition-colors shadow-md">
                        <WhatsAppIcon className="h-4 w-4" />
                        <span>Ask Sizing</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16 pt-8 border-t border-[#E7D0B8] flex items-center justify-center gap-2 sm:gap-3">
            <button type="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="h-12 px-4 sm:px-5 rounded-full border border-[#E7D0B8] bg-white text-xs font-semibold text-[#302019] disabled:opacity-35 hover:bg-[#302019] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"><ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline">Previous</span></button>
            <div className="hidden sm:flex items-center gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button key={idx + 1} type="button" onClick={() => handlePageChange(idx + 1)} className={`h-12 w-12 rounded-full font-serif text-base font-bold transition-all cursor-pointer shadow-sm ${currentPage === idx + 1 ? 'bg-[#302019] text-[#DDAA42] scale-105' : 'bg-white border border-[#E7D0B8] text-[#78685E] hover:text-[#302019] hover:border-[#302019]'}`}>{idx + 1}</button>
              ))}
            </div>
            <span className="sm:hidden text-xs font-semibold text-[#78685E]">Page {currentPage} of {totalPages}</span>
            <button type="button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="h-12 px-4 sm:px-5 rounded-full border border-[#E7D0B8] bg-white text-xs font-semibold text-[#302019] disabled:opacity-35 hover:bg-[#302019] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"><span className="hidden sm:inline">Next</span><ChevronRight className="h-4 w-4" /></button>
          </div>
        )}

        <div className="mt-24"><CTABand title="Need a Custom Group Equipment Manifest?" subtitle="We outfit film crews, university expeditions, and private alpine treks across Ethiopia. Send us your packing list for bulk rental rates." /></div>
      </div>

      {/* QUICK VIEW / PRODUCT DETAILS MODAL */}
      {quickViewProduct && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-[2.5rem] bg-[#FFF9F2] border border-[#E7D0B8] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 my-8">
            <button type="button" onClick={() => setQuickViewProduct(null)} className="absolute top-5 right-5 z-20 h-10 w-10 rounded-full bg-white/90 border border-[#E7D0B8] flex items-center justify-center text-[#302019] hover:bg-[#302019] hover:text-white transition-colors cursor-pointer shadow-md"><X className="h-5 w-5" /></button>
            <div className="relative min-h-[350px] md:min-h-[500px] bg-[#1A130F]">
              <ImageWithFallback src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md border border-white/20 text-[#DDAA42] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">{quickViewProduct.kicker}</div>
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-[10px] text-[#D95F49] font-bold uppercase tracking-[0.2em] mb-2"><span>{quickViewProduct.categoryName}</span><span className="text-[#E7D0B8]">|</span><span className="inline-flex items-center gap-1 text-[#302019]"><Star className="h-3.5 w-3.5 fill-[#DDAA42] text-[#DDAA42]" />{quickViewProduct.rating}</span></div>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#302019] mt-1 leading-[1.1]">{quickViewProduct.name}</h3>
                <p className="mt-4 text-sm text-[#78685E] font-light leading-relaxed">{quickViewProduct.description}</p>
                <div className="mt-8">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#78685E] mb-3">Select Action</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setSelectedMode('buy')} className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${selectedMode === 'buy' ? 'border-[#302019] bg-[#302019] text-white shadow-lg' : 'border-[#E7D0B8] bg-white text-[#302019] hover:border-[#302019]'}`}><span className="text-[10px] uppercase tracking-widest block opacity-75 mb-1">Buy New</span><span className="font-serif text-2xl font-bold leading-none">${quickViewProduct.buyPrice}</span></button>
                    {quickViewProduct.rentable && quickViewProduct.rentPrice && <button type="button" onClick={() => setSelectedMode('rent')} className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${selectedMode === 'rent' ? 'border-[#D95F49] bg-[#D95F49] text-white shadow-lg' : 'border-[#E7D0B8] bg-white text-[#302019] hover:border-[#D95F49]'}`}><span className="text-[10px] uppercase tracking-widest block opacity-85 mb-1">Expedition Rent</span><span className="font-serif text-2xl font-bold leading-none">${quickViewProduct.rentPrice}<span className="text-xs font-sans font-medium">/day</span></span></button>}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-[#78685E] mb-3">Sizing Profile</label>
                  <div className="flex flex-wrap gap-2.5">
                    {quickViewProduct.sizes.map((sz) => (<button key={sz} type="button" onClick={() => setSelectedSize(sz)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${selectedSize === sz ? 'border-[#302019] bg-[#302019] text-[#DDAA42] shadow-md' : 'border-[#E7D0B8] bg-white text-[#302019] hover:border-[#302019]'}`}>{sz}</button>))}
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-5 border-t border-[#E7D0B8]/60">
                <button type="button" onClick={() => { addToCart(quickViewProduct, selectedMode, selectedSize); setQuickViewProduct(null); setIsCartOpen(true); }} className="w-full py-4.5 rounded-full bg-[#302019] hover:bg-[#D95F49] text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-xl"><ShoppingBag className="h-4.5 w-4.5" /><span>Add to Shopping Bag</span></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHOPPING CART / CHECKOUT SIDE DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#FFF9F2] h-full shadow-2xl border-l border-[#E7D0B8] flex flex-col justify-between p-6 sm:p-8 overflow-hidden animate-slide-in-right">
            <div className="flex items-center justify-between pb-6 border-b border-[#E7D0B8]">
              <div className="flex items-center gap-3"><ShoppingBag className="h-6 w-6 text-[#D95F49]" /><h3 className="font-serif text-3xl font-semibold text-[#302019]">Shopping Bag</h3></div>
              <button type="button" onClick={() => setIsCartOpen(false)} className="h-10 w-10 rounded-full bg-[#FAF4EB] border border-[#E7D0B8] flex items-center justify-center text-[#78685E] hover:text-[#302019] hover:bg-[#E7D0B8] transition-colors cursor-pointer shadow-sm"><X className="h-5 w-5" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center py-20"><ShoppingBag className="h-16 w-16 text-[#E7D0B8] mx-auto mb-4" /><p className="font-serif text-2xl text-[#302019] mb-2">Your Bag is Empty</p><p className="text-xs text-[#78685E]">Explore our 10 departments and select your gear.</p></div>
              ) : (
                cart.map((item, idx) => {
                  const unitPrice = item.mode === 'rent' && item.product.rentPrice ? item.product.rentPrice : item.product.buyPrice;
                  return (
                    <div key={`${item.product.id}-${item.mode}-${item.size}`} className="flex gap-4 p-4 rounded-2xl bg-white border border-[#E7D0B8] shadow-sm relative group">
                      <ImageWithFallback src={item.product.image} alt={item.product.name} className="h-24 w-20 rounded-xl object-cover shrink-0 bg-[#1A130F]" />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2"><h4 className="font-serif text-sm font-semibold text-[#302019] leading-snug line-clamp-2 pr-2">{item.product.name}</h4><span className="font-serif text-base font-bold text-[#302019] shrink-0">${unitPrice * item.quantity}{item.mode === 'rent' ? '/d' : ''}</span></div>
                        <div className="mt-1 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em]"><span className={`px-2.5 py-1 rounded-md ${item.mode === 'rent' ? 'bg-[#D95F49]/15 text-[#D95F49] border border-[#D95F49]/30' : 'bg-[#302019]/10 text-[#302019] border border-[#302019]/20'}`}>{item.mode}</span><span className="text-[#78685E] bg-[#FAF4EB] px-2.5 py-1 rounded-md border border-[#E7D0B8]">SZ: {item.size}</span></div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#E7D0B8] p-1 bg-[#FAF4EB]"><button type="button" onClick={() => updateQuantity(idx, -1)} className="p-1 text-[#78685E] hover:text-[#302019] cursor-pointer bg-white rounded-full shadow-sm"><Minus className="h-3 w-3" /></button><span className="text-[11px] font-bold px-2 w-4 text-center">{item.quantity}</span><button type="button" onClick={() => updateQuantity(idx, 1)} className="p-1 text-[#78685E] hover:text-[#302019] cursor-pointer bg-white rounded-full shadow-sm"><Plus className="h-3 w-3" /></button></div>
                          <button type="button" onClick={() => updateQuantity(idx, -item.quantity)} className="text-[10px] font-bold uppercase tracking-widest text-[#78685E] hover:text-[#D95F49] cursor-pointer transition-colors">Remove</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-[#E7D0B8] space-y-4 bg-[#FFF9F2]">
                <div className="space-y-1.5 text-xs text-[#78685E]">
                  <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-[#302019]">${cartTotal} USD</span></div>
                  <div className="flex justify-between"><span>Addis Ababa Delivery</span><span className="font-bold text-[#078930]">FREE</span></div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E7D0B8]/50"><span className="text-[10px] uppercase tracking-[0.2em] text-[#302019] font-bold">Total Due</span><span className="font-serif text-4xl font-bold text-[#302019]">${cartTotal}</span></div>
                
                <div className="space-y-2">
                  <a href={generateCartWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#1fb855] text-white font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                    <WhatsAppIcon className="h-5 w-5" /><span>Proceed to Checkout (WhatsApp)</span>
                  </a>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#78685E] pt-1">
                    <Lock className="h-3 w-3 text-[#D95F49]" /><span>Secure Order Confirmation · Pay on Delivery</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;