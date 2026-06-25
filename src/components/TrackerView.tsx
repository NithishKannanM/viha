import React, { useState } from 'react';
import { Check, Calendar, ArrowLeft, Truck, MapPin, Download, AlertCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { REGIONS } from '../data';

interface TrackerViewProps {
  order: Order;
  onNavigate: (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker') => void;
  onClearTracked: () => void;
  currentRegion: string;
}

export default function TrackerView({ order, onNavigate, onClearTracked, currentRegion }: TrackerViewProps) {
  const [currentOrder, setCurrentOrder] = useState<Order>(order);

  const activeRegionObj = REGIONS.find(r => r.id === currentRegion) || REGIONS[0];

  const formatPrice = (priceInINR: number) => {
    const converted = priceInINR * activeRegionObj.exchangeRate;
    if (activeRegionObj.id === 'IN') {
      return `₹${priceInINR.toLocaleString('en-IN')}`;
    }
    return `${activeRegionObj.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const statuses: { id: OrderStatus; label: string; date?: string; desc: string }[] = [
    { 
      id: 'placed', 
      label: 'ORDER PLACED', 
      date: currentOrder.placedAt,
      desc: 'Order receipt was verified and is undergoing final spiritual product selection at our Vedanta sanctuary.'
    },
    { 
      id: 'packed', 
      label: 'PACKED', 
      desc: 'Products safely packed in custom sacred containers wrapped in tissue and bubble protection layers.'
    },
    { 
      id: 'shipped', 
      label: 'SHIPPED', 
      desc: 'Handover complete of items with fragile logistics partner. Tracking number assigned.'
    },
    { 
      id: 'out-for-delivery', 
      label: 'OUT FOR DELIVERY', 
      desc: 'Courier vehicle assigned in city hub and is arriving at your physical threshold today.'
    },
    { 
      id: 'delivered', 
      label: 'DELIVERED', 
      desc: 'Sacred item successfully placed at your door. May its presence bring immense serenity.'
    },
  ];

  const currentIndex = statuses.findIndex(s => s.id === currentOrder.status);

  // Trigger downloading print view invoice
  const triggerDownloadInvoice = () => {
    const invoiceContent = `
=============================================
         VIHA SPIRITUAL CATALOG INVOICE
=============================================
Order ID: ${currentOrder.id}
Created At: ${currentOrder.placedAt}
Estimated Delivery: ${currentOrder.estimatedDelivery}
Contact: ${currentOrder.contactEmail}
Payment: CREDIT CARD (Verified Secured)

PRODUCTS ACQUIRED:
${currentOrder.items.map(item => `* ${item.product.name} (Qty: ${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}`).join('\n')}

Subtotal: ${formatPrice(currentOrder.subtotal)}
Shipping Surcharge: ${formatPrice(currentOrder.shippingCost)}
Grand Total: ${formatPrice(currentOrder.total)}
=============================================
`;
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${currentOrder.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const cycleStatus = () => {
    const allStatuses: OrderStatus[] = ['placed', 'packed', 'shipped', 'out-for-delivery', 'delivered'];
    const curIndex = allStatuses.indexOf(currentOrder.status);
    const nextIndex = (curIndex + 1) % allStatuses.length;
    setCurrentOrder({
      ...currentOrder,
      status: allStatuses[nextIndex]
    });
  };

  return (
    <div className="bg-brand-cream/60 py-12 px-4 md:px-12 min-h-screen text-brand-charcoal font-sans animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-brand-cream-dark pb-6">
          <button 
            onClick={onClearTracked}
            className="text-xs font-bold text-brand-maroon uppercase tracking-widest hover:underline flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Track Another Order
          </button>
          
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-paper border border-brand-gold/20 px-3 py-1 flex items-center gap-1.5">
            <Truck size={12} /> Live Logistics Sourcing
          </span>
        </div>

        {/* Header label and status simulation info */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 bg-brand-paper p-6 border border-brand-cream-dark rounded-xs shadow-xs">
          <div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold">ORDER INQUIRY STATUS</span>
            <h2 className="text-2xl font-serif text-brand-maroon font-black mt-1" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Order Code <strong className="text-brand-gold">#{currentOrder.id}</strong>
            </h2>
            <p className="text-xs text-brand-charcoal/60 mt-1">
              Registered under customer: <strong className="text-brand-maroon">{currentOrder.contactEmail}</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={cycleStatus}
              className="px-4 py-2 bg-brand-cream hover:bg-brand-cream-dark text-brand-gold text-[10px] font-bold uppercase tracking-widest rounded-xs border border-brand-gold/30 flex items-center justify-center gap-1.5"
            >
              Simulate Progress Steps
            </button>
            <button
              onClick={triggerDownloadInvoice}
              className="px-4 py-2 bg-brand-maroon hover:bg-brand-maroon-dark text-white text-[10px] font-bold uppercase tracking-widest rounded-xs flex items-center justify-center gap-1.5"
            >
              <Download size={12} /> Save Receipt
            </button>
          </div>
        </div>

        {/* Stepper Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Progress Timeline panel (Replicates screenshot 4 vertical stack) */}
          <div className="lg:col-span-8 bg-brand-paper border border-brand-cream-dark p-6 rounded-xs shadow-xs space-y-6">
            <div className="flex items-center gap-4 border-b border-brand-cream-dark pb-5">
              <div className="p-3 bg-brand-cream text-brand-gold rounded-full border border-brand-cream-dark">
                <Calendar size={22} />
              </div>
              <div>
                <span className="text-[10px] text-brand-charcoal/50 uppercase tracking-widest font-bold">ESTIMATED COMPLETION</span>
                <h4 className="text-lg font-serif text-brand-maroon font-bold" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                  {currentOrder.estimatedDelivery}
                </h4>
              </div>
            </div>

            {/* Stepper block list */}
            <div className="relative pl-6 border-l-2 border-brand-cream-dark/60 ml-3 space-y-8 py-2">
              {statuses.map((step, idx) => {
                const isActive = idx <= currentIndex;
                const isCurrent = idx === currentIndex;
                
                return (
                  <div key={idx} className="relative text-xs">
                    {/* Circle checkpoint */}
                    <div 
                      className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isCurrent 
                          ? 'bg-brand-maroon border-brand-maroon text-white ring-4 ring-brand-gold-light scale-110' 
                          : isActive 
                            ? 'bg-[#5c181a] border-[#5c181a] text-brand-cream' 
                            : 'bg-brand-cream border-brand-cream-dark text-brand-charcoal/20'
                      }`}
                    >
                      {isActive && <Check size={10} strokeWidth={3} />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-bold tracking-wider uppercase ${isActive ? 'text-brand-maroon' : 'text-brand-charcoal/40'}`}>
                          {step.label}
                        </h4>
                        {step.date && <span className="text-[10px] text-brand-charcoal/50">{step.date}</span>}
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isActive ? 'text-brand-charcoal/70' : 'text-brand-charcoal/30'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sourcing Item Details sidebar right */}
          <div className="lg:col-span-4 bg-brand-paper border border-brand-cream-dark p-6 rounded-xs shadow-xs space-y-6 text-xs">
            <h4 className="text-xs font-bold text-brand-maroon uppercase tracking-widest border-b border-brand-cream-dark pb-3">
              Sacred Package Content
            </h4>

            <div className="space-y-4">
              {currentOrder.items.map((item, index) => (
                <div key={index} className="flex gap-3 text-xs border-b border-brand-cream-dark/35 pb-3 last:border-0 last:pb-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-sm border border-brand-cream-dark"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-bold text-brand-maroon truncate" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-brand-charcoal/60 mt-1 capitalize font-sans">{item.product.category} Essential • Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

             {/* Price values total summary */}
            <div className="space-y-2 pt-2 border-t border-brand-cream-dark leading-relaxed">
              <div className="flex justify-between text-brand-charcoal/60 font-sans">
                <span>Subtotal</span>
                <span>{formatPrice(currentOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-charcoal/60 font-sans">
                <span>Shipping Surcharge</span>
                {currentOrder.shippingCost === 0 ? (
                  <span className="text-emerald-800 font-semibold uppercase">FREE</span>
                ) : (
                  <span>{formatPrice(currentOrder.shippingCost)}</span>
                )}
              </div>
              <div className="flex justify-between font-bold text-brand-maroon text-sm border-t border-dashed border-brand-cream-dark pt-3 mt-1 font-serif">
                <span>Total Cleared</span>
                <span>{formatPrice(currentOrder.total)}</span>
              </div>
            </div>

            {/* Pickup warning notification */}
            {currentOrder.shippingType === 'store' && (
              <div className="p-3 bg-amber-50 border border-brand-gold/30 text-[10px] text-brand-charcoal/80 rounded leading-relaxed flex items-start gap-1.5">
                <AlertCircle size={14} className="text-brand-gold shrink-0 mt-0.5" />
                <span>
                  This order is classified as <strong>Store Pickup</strong>. Please visit our Bishop Garden Chennai store location with your Order ID code ready.
                </span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
