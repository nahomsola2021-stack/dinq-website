import React, { useEffect, useState } from 'react';
import { 
  Search, Filter, ShoppingBag, Truck, DollarSign, 
  MapPin, Mail, Phone, Calendar, CheckCircle2, AlertCircle, 
  ChevronLeft, FileText, Download, Save, Package, RefreshCcw, Trash2, Loader2
} from 'lucide-react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

// --- TYPES ---
type OrderStatus = 'New' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
type PaymentStatus = 'Pending Payment' | 'Paid' | 'Refunded';

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  type: 'Purchase' | 'Rental';
  rentalDays?: number;
  size?: string;
}

interface Order {
  id: string;
  reference: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  internalNotes: string;
  createdAt: string;
}

export const OrdersManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // State for the currently selected order
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'orders'));
        const fetchedOrders = snapshot.docs.map(orderDoc => {
          const data = orderDoc.data();
          const items = Array.isArray(data.items) ? data.items : [];
          const createdAt = data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : typeof data.createdAt === 'string'
              ? data.createdAt
              : new Date(0).toISOString();

          return {
            id: orderDoc.id,
            reference: data.reference || data.orderNumber || `DQ-SHP-${orderDoc.id.slice(0, 6).toUpperCase()}`,
            customerName: data.customerName || data.fullName || 'Unknown Customer',
            email: data.email || 'No email provided',
            phone: data.phone || 'No phone provided',
            shippingAddress: data.shippingAddress || data.address || 'No delivery address provided',
            items: items.map((item: Partial<OrderItem>, index: number) => ({
              id: item.id || `${orderDoc.id}-item-${index}`,
              productId: item.productId || '',
              name: item.name || 'Shop item',
              sku: item.sku || '',
              quantity: Number(item.quantity) || 1,
              unitPrice: Number(item.unitPrice) || 0,
              type: item.type === 'Rental' ? 'Rental' : 'Purchase',
              rentalDays: item.rentalDays,
              size: item.size,
            })),
            subtotal: Number(data.subtotal) || 0,
            shippingCost: Number(data.shippingCost) || 0,
            totalPrice: Number(data.totalPrice ?? data.total) || 0,
            status: (data.status as OrderStatus) || 'New',
            paymentStatus: (data.paymentStatus as PaymentStatus) || 'Pending Payment',
            internalNotes: data.internalNotes || '',
            createdAt,
          } satisfies Order;
        });

        fetchedOrders.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('❌ Failed to load shop orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (order: Order) => {
    setActiveOrder({ ...order });
    setView('detail');
  };

  const handleDeleteOrder = async (order: Order) => {
    if (!window.confirm(`Permanently delete order ${order.reference} for ${order.customerName}? This cannot be undone.`)) return;

    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'orders', order.id));
      setOrders(current => current.filter(item => item.id !== order.id));
      setActiveOrder(null);
      setView('list');
      alert('✅ Order permanently deleted.');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('❌ Failed to delete order.');
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, status: newStatus });
    }
  };

  const handlePaymentChange = (newPaymentStatus: PaymentStatus) => {
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, paymentStatus: newPaymentStatus });
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
      case 'Refunded':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'New':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Payment Badge Helper
  const getPaymentBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-100 text-emerald-800';
      case 'Refunded': return 'bg-slate-100 text-slate-800';
      case 'Pending Payment':
      default: return 'bg-amber-100 text-amber-800';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900 mb-4" />
        <p className="text-sm font-medium">Fetching Shop Orders...</p>
      </div>
    );
  }

  // --- LIST VIEW ---
  if (view === 'list') {
    const filteredOrders = orders.filter(o => {
      const matchesSearch = o.reference.toLowerCase().includes(search.toLowerCase()) || 
                            o.customerName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="space-y-6 max-w-[1600px] mx-auto pb-10 animate-in fade-in">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Shop Orders</h1>
            <p className="text-sm text-slate-500 mt-1">Process merchandise purchases and expedition gear rentals.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="h-4 w-4" />
            <span>Export Orders CSV</span>
          </button>
        </div>

        {/* Toolbar & Table Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by order reference or customer..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {['All', 'New', 'Processing', 'Shipped', 'Delivered'].map((stat) => (
                <button
                  key={stat}
                  onClick={() => setStatusFilter(stat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    statusFilter === stat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {stat}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="font-medium px-6 py-4">Order Ref</th>
                  <th className="font-medium px-6 py-4">Customer</th>
                  <th className="font-medium px-6 py-4">Items Summary</th>
                  <th className="font-medium px-6 py-4">Fulfillment</th>
                  <th className="font-medium px-6 py-4 text-right">Total</th>
                  <th className="font-medium px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-medium text-slate-900">{order.reference}</span>
                      <div className="text-[11px] text-slate-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{order.customerName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{order.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 font-medium truncate max-w-[200px]">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[200px]">
                        {order.items.map(i => i.name).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-1.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getPaymentBadge(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-medium text-slate-900">${order.totalPrice.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="inline-flex items-center justify-center px-3 py-1.5 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors text-xs font-medium"
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order)}
                          className="inline-flex items-center justify-center p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Permanently delete order"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      No orders found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // --- DETAIL VIEW ---
  if (!activeOrder) return null;

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 animate-in fade-in">
      
      {/* Sticky Top Action Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-sm sticky top-4 z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('list')}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                Order {activeOrder.reference}
              </h2>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getPaymentBadge(activeOrder.paymentStatus)}`}>
                {activeOrder.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Placed by {activeOrder.customerName} on {new Date(activeOrder.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleDeleteOrder(activeOrder)}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-3 py-2 border border-rose-200 bg-rose-50 text-rose-700 text-sm font-medium rounded-lg hover:bg-rose-100 transition-colors disabled:opacity-60"
          >
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            <span className="hidden sm:inline">{deleting ? 'Deleting...' : 'Delete'}</span>
          </button>
          <select
            value={activeOrder.status}
            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
            className={`px-3 py-2 border rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer ${getStatusBadge(activeOrder.status)}`}
          >
            <option value="New">Status: New</option>
            <option value="Processing">Status: Processing</option>
            <option value="Shipped">Status: Shipped / Out for Delivery</option>
            <option value="Delivered">Status: Delivered</option>
            <option value="Cancelled">Status: Cancelled</option>
            <option value="Refunded">Status: Refunded</option>
          </select>

          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Update Order</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Order Items & Shipping */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items Card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Package className="h-5 w-5 text-slate-400" /> Ordered Items
              </h3>
              <span className="text-xs font-medium text-slate-500">{activeOrder.items.length} total items</span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {activeOrder.items.map(item => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        item.type === 'Rental' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="font-mono">SKU: {item.sku}</span>
                      {item.size && <span>Size: {item.size}</span>}
                      {item.rentalDays && <span>Duration: {item.rentalDays} Days</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-48 shrink-0">
                    <div className="text-sm text-slate-600">
                      ${item.unitPrice} × {item.quantity}
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      ${item.unitPrice * item.quantity * (item.rentalDays || 1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Subtotal Footer */}
            <div className="p-5 border-t border-slate-200 bg-slate-50 flex flex-col items-end gap-2">
              <div className="flex justify-between w-full sm:w-64 text-sm text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-medium text-slate-900">${activeOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between w-full sm:w-64 text-sm text-slate-600">
                <span>Shipping / Delivery</span>
                <span className="font-medium text-slate-900">${activeOrder.shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between w-full sm:w-64 text-base font-bold text-slate-900 pt-2 border-t border-slate-200 mt-1">
                <span>Order Total</span>
                <span>${activeOrder.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Contact Details */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5 text-slate-400" /> Logistics & Delivery
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Delivery Address / Location</label>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 leading-relaxed">
                  {activeOrder.shippingAddress}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contact Details</label>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-slate-900">{activeOrder.customerName}</div>
                  <a href={`mailto:${activeOrder.email}`} className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    <Mail className="h-4 w-4 text-slate-400" /> {activeOrder.email}
                  </a>
                  <a href={`tel:${activeOrder.phone}`} className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900">
                    <Phone className="h-4 w-4 text-slate-400" /> {activeOrder.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Financials & Admin Notes */}
        <div className="space-y-6">
          
          {/* Payment Actions */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-slate-400" /> Payment & Refunds
              </h3>
            </div>
            <div className="p-5 space-y-5">
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Update Payment Status</label>
                <select
                  value={activeOrder.paymentStatus}
                  onChange={(e) => handlePaymentChange(e.target.value as PaymentStatus)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 bg-white"
                >
                  <option value="Pending Payment">Pending Payment</option>
                  <option value="Paid">Fully Paid</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              {/* Danger Zone */}
              <div className="pt-4 border-t border-slate-200">
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-red-200 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors">
                  <RefreshCcw className="h-4 w-4" />
                  Process Refund
                </button>
                <p className="text-[10px] text-slate-500 text-center mt-2">Processing a refund will automatically restock inventory.</p>
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-400" /> Internal Notes
            </h3>
            <textarea
              rows={6}
              value={activeOrder.internalNotes}
              onChange={(e) => setActiveOrder({...activeOrder, internalNotes: e.target.value})}
              placeholder="Add shipping tracking numbers or delivery instructions for the outfitter team..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 resize-y"
            />
            <p className="text-[10px] text-slate-500 mt-2">These notes remain private to the fulfillment team.</p>
          </div>

        </div>
      </div>
    </div>
  );
};