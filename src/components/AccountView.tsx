import React, { useState } from 'react';
import { Package, User, MapPin, LogOut, ChevronRight, ExternalLink } from 'lucide-react';
import { Order } from '../types';
import { REGIONS } from '../data';

interface AccountViewProps {
  orders: Order[];
  onNavigate: (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker') => void;
  onTrackOrder: (orderId: string) => void;
  currentRegion: string;
}

export default function AccountView({ orders, onNavigate, onTrackOrder, currentRegion }: AccountViewProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  const activeRegionObj = REGIONS.find(r => r.id === currentRegion) || REGIONS[0];

  const formatPrice = (priceInINR: number) => {
    const converted = priceInINR * activeRegionObj.exchangeRate;
    if (activeRegionObj.id === 'IN') {
      return `₹${priceInINR.toLocaleString('en-IN')}`;
    }
    return `${activeRegionObj.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border border-emerald-200">Delivered</span>;
      case 'shipped':
      case 'out-for-delivery':
        return <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border border-blue-200">In Transit</span>;
      case 'placed':
      case 'packed':
      default:
        return <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider border border-amber-200">Processing</span>;
    }
  };

  return (
    <div className="bg-[#fdf9f1] min-h-screen py-12 px-6 md:px-12 font-sans text-brand-charcoal">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-black text-brand-maroon mb-10" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
          My Account
        </h1>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0 space-y-1">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors rounded-xs ${activeTab === 'orders' ? 'bg-[#f1ede6] border-l-2 border-brand-gold text-brand-maroon' : 'hover:bg-[#f1ede6]/50 text-brand-charcoal/80'}`}
            >
              <div className="flex items-center gap-3">
                <Package size={18} className={activeTab === 'orders' ? 'text-brand-gold' : 'text-brand-charcoal/50'} />
                Order History
              </div>
              <ChevronRight size={16} className="opacity-50" />
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors rounded-xs ${activeTab === 'profile' ? 'bg-[#f1ede6] border-l-2 border-brand-gold text-brand-maroon' : 'hover:bg-[#f1ede6]/50 text-brand-charcoal/80'}`}
            >
              <div className="flex items-center gap-3">
                <User size={18} className={activeTab === 'profile' ? 'text-brand-gold' : 'text-brand-charcoal/50'} />
                Profile Details
              </div>
              <ChevronRight size={16} className="opacity-50" />
            </button>
            <button 
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors rounded-xs ${activeTab === 'addresses' ? 'bg-[#f1ede6] border-l-2 border-brand-gold text-brand-maroon' : 'hover:bg-[#f1ede6]/50 text-brand-charcoal/80'}`}
            >
              <div className="flex items-center gap-3">
                <MapPin size={18} className={activeTab === 'addresses' ? 'text-brand-gold' : 'text-brand-charcoal/50'} />
                Saved Addresses
              </div>
              <ChevronRight size={16} className="opacity-50" />
            </button>
            <button 
              onClick={() => onNavigate('home')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-700/80 hover:bg-red-50 hover:text-red-800 transition-colors rounded-xs mt-4"
            >
              <LogOut size={18} />
              Log out
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 w-full min-h-[400px]">
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl font-serif font-bold text-brand-maroon mb-6" style={{ fontFamily: 'Libre Caslon Text, serif' }}>Order History</h2>
                {orders.length === 0 ? (
                  <div className="bg-white p-12 text-center border border-[#f1ede6] rounded-xs shadow-sm">
                    <Package size={48} className="mx-auto text-brand-charcoal/20 mb-4" strokeWidth={1} />
                    <p className="text-brand-charcoal/70 mb-6 text-sm">You haven't placed any orders yet.</p>
                    <button onClick={() => onNavigate('shop')} className="px-8 py-3 bg-brand-maroon text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-maroon-dark transition-colors rounded-xs">
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="border border-[#f1ede6] rounded-xs bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                        {/* Order Header */}
                        <div className="bg-[#fcf9f2] p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#f1ede6]">
                          <div className="flex gap-8">
                            <div>
                              <p className="text-[10px] uppercase font-bold text-brand-charcoal/60 tracking-wider">Order Placed</p>
                              <p className="text-sm font-medium mt-0.5">{order.placedAt}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-brand-charcoal/60 tracking-wider">Total Amount</p>
                              <p className="text-sm font-semibold text-brand-maroon mt-0.5">{formatPrice(order.total)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="font-medium text-brand-charcoal/80">Order #{order.id}</span>
                            {/* Navigate to the tracker view directly using onTrackOrder which sets active order */}
                            <button 
                              onClick={() => onTrackOrder(order.id)}
                              className="text-brand-maroon hover:text-brand-gold font-semibold flex items-center gap-1 text-xs uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              Track <ExternalLink size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4 sm:p-6 space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-brand-charcoal">Delivery Status</h3>
                            {getStatusBadge(order.status)}
                          </div>
                          
                          <div className="space-y-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex gap-4 items-center group">
                                <div className="w-16 h-16 bg-[#f1ede6] rounded-xs border border-[#f1ede6] overflow-hidden shrink-0">
                                  <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-serif font-bold text-brand-maroon leading-tight" style={{ fontFamily: 'Libre Caslon Text, serif' }}>{item.product.name}</h4>
                                  <p className="text-xs text-brand-charcoal/60 mt-1">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-sm font-semibold text-brand-charcoal">
                                  {formatPrice(item.product.price * item.quantity)}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="pt-4 border-t border-[#f1ede6] text-right">
                            <button onClick={() => onNavigate('shop')} className="text-xs font-bold uppercase tracking-widest text-brand-maroon border border-brand-maroon px-6 py-2.5 hover:bg-brand-maroon hover:text-white transition-colors rounded-xs cursor-pointer">
                              Buy Again
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in max-w-xl">
                <h2 className="text-xl font-serif font-bold text-brand-maroon mb-6" style={{ fontFamily: 'Libre Caslon Text, serif' }}>Profile Details</h2>
                <div className="border border-[#f1ede6] rounded-xs bg-white p-6 md:p-8 space-y-6 shadow-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-brand-charcoal/60 tracking-wider">First Name</label>
                      <p className="text-base font-medium mt-1">Guest</p>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-brand-charcoal/60 tracking-wider">Last Name</label>
                      <p className="text-base font-medium mt-1">User</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-brand-charcoal/60 tracking-wider">Email Address</label>
                      <p className="text-base font-medium mt-1">guest.user@example.com</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-brand-charcoal/60 tracking-wider">Phone Number</label>
                      <p className="text-base font-medium mt-1">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="pt-6 mt-4 border-t border-[#f1ede6]">
                    <button className="text-xs font-bold uppercase tracking-widest text-brand-maroon border border-brand-maroon px-6 py-2.5 hover:bg-brand-maroon hover:text-white transition-colors rounded-xs cursor-pointer">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h2 className="text-xl font-serif font-bold text-brand-maroon" style={{ fontFamily: 'Libre Caslon Text, serif' }}>Saved Addresses</h2>
                  <button className="text-xs font-bold uppercase tracking-widest text-white bg-brand-maroon px-6 py-2.5 hover:bg-brand-maroon-dark transition-colors rounded-xs shadow-md cursor-pointer">
                    Add New Address
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Default Address */}
                  <div className="border-2 border-brand-gold rounded-xs bg-[#fdfaf5] p-6 relative shadow-sm">
                    <span className="absolute -top-2.5 left-4 bg-brand-gold text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-sm shadow-sm">Default</span>
                    <h4 className="font-bold text-sm mb-3">Guest User</h4>
                    <address className="not-italic text-sm text-brand-charcoal/80 space-y-1.5 leading-relaxed">
                      10 Bhagirathy Street, Bishop Garden<br />
                      Raja Annamalaipuram<br />
                      Chennai, Tamil Nadu 600028<br />
                      India
                    </address>
                    <div className="flex gap-6 mt-6 pt-4 border-t border-brand-gold/20 text-xs font-bold uppercase tracking-widest">
                      <button className="text-brand-maroon hover:text-brand-gold cursor-pointer">Edit</button>
                      <button className="text-brand-charcoal/50 hover:text-red-700 cursor-pointer">Remove</button>
                    </div>
                  </div>
                  
                  {/* Secondary Address */}
                  <div className="border border-[#f1ede6] rounded-xs bg-white p-6 shadow-sm">
                    <h4 className="font-bold text-sm mb-3">Office</h4>
                    <address className="not-italic text-sm text-brand-charcoal/80 space-y-1.5 leading-relaxed">
                      H BLOCK, Anna Nagar<br />
                      Chennai, Tamil Nadu 600040<br />
                      India
                    </address>
                    <div className="flex gap-6 mt-6 pt-4 border-t border-[#f1ede6] text-xs font-bold uppercase tracking-widest">
                      <button className="text-brand-maroon hover:text-brand-gold cursor-pointer">Edit</button>
                      <button className="text-brand-charcoal/50 hover:text-red-700 cursor-pointer">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
