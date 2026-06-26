import React, { useState } from 'react';
import { ArrowLeft, Check, AlertCircle, ShoppingBag, ShieldCheck, MapPin, CreditCard, Download, Truck, Calendar } from 'lucide-react';
import { CartItem, Order, OrderStatus } from '../types';
import { BRAND_COLORS, REGIONS } from '../data';

interface CheckoutFlowProps {
  cart: CartItem[];
  currentStepView: 'info' | 'delivery' | 'payment' | 'review' | 'success';
  onSetStepView: (step: 'info' | 'delivery' | 'payment' | 'review' | 'success') => void;
  onNavigate: (view: 'home' | 'shop' | 'cart' | 'checkout-info' | 'tracker') => void;
  onClearCart: () => void;
  onRegisterMockOrder: (order: Order) => void;
  trackedOrder: Order | null;
  onSetTrackedOrder: (order: Order | null) => void;
  currentRegion: string;
  onRegionChange?: (regionId: string) => void;
}

const REGION_PHONE_PREFIXES: Record<string, string> = {
  IN: '+91', US: '+1', CN: '+86', GB: '+44', CA: '+1', AE: '+971',
};
const REGION_COUNTRIES: Record<string, string> = {
  IN: 'India', US: 'United States', CN: 'China', GB: 'United Kingdom', CA: 'Canada', AE: 'United Arab Emirates',
};
const REGION_STATE_LABEL: Record<string, string> = {
  IN: 'State', US: 'State', CN: 'Province', GB: 'County', CA: 'Province', AE: 'Emirate',
};

export default function CheckoutFlow({
  cart,
  currentStepView,
  onSetStepView,
  onNavigate,
  onClearCart,
  onRegisterMockOrder,
  trackedOrder,
  onSetTrackedOrder,
  currentRegion,
  onRegionChange
}: CheckoutFlowProps) {
  // Contact fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('seeker@example.com');
  const [phone, setPhone] = useState('');

  // Address fields
  const [streetLine1, setStreetLine1] = useState('');
  const [streetLine2, setStreetLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState(REGION_COUNTRIES[currentRegion] || 'India');

  // Payment fields (maps to Shopify payment gateway inputs)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'paypal'>('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'store'>('store');
  const [addressCheckbox, setAddressCheckbox] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Local Success Order Tracking
  const [placedOrder, setPlacedOrder] = useState<Order | null>(trackedOrder);

  const activeRegionObj = REGIONS.find(r => r.id === currentRegion) || REGIONS[0];

  const formatPrice = (priceInINR: number) => {
    const converted = priceInINR * activeRegionObj.exchangeRate;
    if (activeRegionObj.id === 'IN') {
      return `₹${priceInINR.toLocaleString('en-IN')}`;
    }
    return `${activeRegionObj.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = currentRegion === 'IN' ? (deliveryMethod === 'home' ? 150 : 0) : 0;
  const totalCost = subtotal + shippingCost;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email || !phone.trim()) return;
    onSetStepView('delivery');
  };

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
  const phonePrefix = REGION_PHONE_PREFIXES[currentRegion] || '+91';
  const stateLabel = REGION_STATE_LABEL[currentRegion] || 'State';

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + ' / ' + d.slice(2) : d;
  };
  const maskedCard = cardNumber.replace(/\s/g, '').slice(-4)
    ? '**** **** **** ' + cardNumber.replace(/\s/g, '').slice(-4)
    : '**** **** **** ****';

  const handlePlaceOrder = () => {
    const orderId = `VH-${Math.floor(10000 + Math.random() * 90000)}`;
    const deliveryAddress = deliveryMethod === 'home'
      ? {
          street: [streetLine1, streetLine2].filter(Boolean).join(', '),
          city: `${city}${stateProvince ? ', ' + stateProvince : ''}`,
          postalCode: `${postalCode}, ${country}`,
        }
      : {
          street: '10 Bhagirathy Street, Bishop Garden',
          city: 'Raja Annamalaipuram, Chennai',
          postalCode: '600028',
        };

    const newOrder: Order = {
      id: orderId,
      status: 'placed',
      placedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal,
      shippingCost,
      shippingType: deliveryMethod,
      total: totalCost,
      contactEmail: email,
      billingAddress: deliveryAddress,
    };

    onRegisterMockOrder(newOrder);
    setPlacedOrder(newOrder);
    onSetTrackedOrder(newOrder);
    onClearCart();
    onSetStepView('success');
  };

  const handleDownloadInvoice = () => {
    if (!placedOrder) return;
    
    const invoiceText = `
--------------------------------------------------
   VEDANTA VIHA SPIRITUAL HERITAGE INVOICE
--------------------------------------------------
Order ID: ${placedOrder.id}
Date: ${placedOrder.placedAt}
Customer: ${fullName || 'Customer'}
Email: ${placedOrder.contactEmail}
Phone: ${phonePrefix} ${phone}
Estimated Delivery / Pickup: ${placedOrder.estimatedDelivery}
Delivery Method: ${placedOrder.shippingType === 'store' ? 'Store Pickup (VEDANTA Chennai)' : 'Home Delivery'}

ITEMS:
${placedOrder.items.map(item => `- ${item.product.name} (Qty: ${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}`).join('\n')}

--------------------------------------------------
Subtotal: ${formatPrice(placedOrder.subtotal)}
Shipping: ${formatPrice(placedOrder.shippingCost)}
Taxes: Calculated at checkout (${formatPrice(0)})
TOTAL: ${formatPrice(placedOrder.total)}
--------------------------------------------------
Thank you for your order. May your spiritual journey be blessed.
    `;

    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${placedOrder.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Stepper utility for visual confirmation
  const cycleOrderStatus = () => {
    if (!placedOrder) return;
    const statuses: OrderStatus[] = ['placed', 'packed', 'shipped', 'out-for-delivery', 'delivered'];
    const curIndex = statuses.indexOf(placedOrder.status);
    const nextIndex = (curIndex + 1) % statuses.length;
    const updated = { ...placedOrder, status: statuses[nextIndex] };
    setPlacedOrder(updated);
    onSetTrackedOrder(updated);
  };

  // Core Render Views
  if (currentStepView === 'success' && placedOrder) {
    const statuses: { id: OrderStatus; label: string; date?: string }[] = [
      { id: 'placed', label: 'ORDER PLACED', date: placedOrder.placedAt },
      { id: 'packed', label: 'PACKED' },
      { id: 'shipped', label: 'SHIPPED' },
      { id: 'out-for-delivery', label: 'OUT FOR DELIVERY' },
      { id: 'delivered', label: 'DELIVERED' },
    ];
    const currentIndex = statuses.findIndex(s => s.id === placedOrder.status);

    return (
      <div className="bg-brand-cream py-16 px-4 md:px-12 min-h-screen text-brand-charcoal font-sans animate-fade-in relative">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Vedanta Header */}
          <div className="text-center font-serif tracking-widest text-[#5c181a] font-bold text-xl uppercase border-b border-brand-cream-dark pb-6">
            VEDANTA
          </div>

          {/* Intro Checkmark block */}
          <div className="text-center flex flex-col items-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-maroon/10 border border-brand-gold/45 flex items-center justify-center p-4 shadow-sm animate-fade-in">
              <Check className="text-brand-maroon" size={32} />
            </div>
            
            <h2 className="text-3xl font-serif font-black text-brand-maroon leading-tight" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Thank You for Your Order.
            </h2>
            <p className="text-xs text-brand-charcoal/70 leading-relaxed">
              Your spiritual journey continues. We have received your order and are preparing it with utmost reverence.
            </p>
            
            <span className="inline-block bg-brand-paper border border-brand-gold/30 text-brand-maroon text-xs font-mono font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm">
              ORDER NUMBER <strong className="text-brand-gold">#{placedOrder.id}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Steps & Courier Tracker column left */}
            <div className="md:col-span-8 space-y-8 bg-brand-paper border border-brand-cream-dark p-6 rounded-xs shadow-xs">
              
              {/* Delivery Estimate */}
              <div className="flex items-center gap-4 border-b border-brand-cream-dark pb-5">
                <div className="p-3 bg-brand-cream text-brand-gold rounded-full border border-brand-cream-dark">
                  <Calendar size={24} />
                </div>
                <div>
                  <span className="text-[10px] text-brand-charcoal/60 uppercase tracking-widest font-bold">ESTIMATED DELIVERY / PICKUP</span>
                  <h4 className="text-lg font-serif text-brand-maroon font-bold" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    {placedOrder.estimatedDelivery}
                  </h4>
                </div>
              </div>

              {/* Progress Log Stepper */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xs font-bold text-brand-maroon uppercase tracking-widest">Courier Status</h5>
                  <button
                    onClick={cycleOrderStatus}
                    className="text-[10px] text-brand-gold hover:underline font-bold uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                    title="Simulate shipping progress"
                  >
                    Simulate Next Stage <Truck size={12} />
                  </button>
                </div>
                
                {/* Horizontal / Vertical Stepper lines */}
                <div className="space-y-6 pt-2 pl-4 border-l-2 border-brand-cream-dark relative">
                  {statuses.map((step, idx) => {
                    const isActive = idx <= currentIndex;
                    return (
                      <div key={idx} className="relative flex items-start gap-4">
                        {/* Stepper Dot */}
                        <div 
                          className={`absolute -left-[23px] top-1 w-3 h-3 rounded-full border border-brand-cream-dark transition-all duration-300 ${
                            isActive 
                              ? 'bg-brand-maroon scale-125 shadow-xs' 
                              : 'bg-brand-cream'
                          }`} 
                        />
                        <div className="space-y-0.5">
                          <p className={`text-xs font-bold tracking-wider ${isActive ? 'text-brand-maroon' : 'text-brand-charcoal/40'}`}>
                            {step.label}
                          </p>
                          {step.date && <p className="text-[10px] text-brand-charcoal/50">{step.date}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* In-view invoice box list right */}
            <div className="md:col-span-4 bg-brand-paper border border-brand-cream-dark p-6 rounded-xs space-y-6 h-fit shadow-xs">
              <h4 className="text-xs font-bold text-brand-maroon uppercase tracking-widest border-b border-brand-cream-dark pb-3">
                Order Summary
              </h4>

              <div className="space-y-3 pb-4 border-b border-brand-cream-dark max-h-48 overflow-y-auto">
                {placedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-10 h-10 object-cover rounded-sm border border-brand-cream-dark animate-fade-in" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-semibold text-brand-maroon truncate" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-brand-charcoal/50">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-brand-maroon">
                      {formatPrice(item.product.price)}
                    </span>
                  </div>
                ))}
              </div>

               <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between text-brand-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(placedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-charcoal/70">
                  <span>Shipping ({placedOrder.shippingType === 'store' ? 'Store Pickup' : 'Home Delivery'})</span>
                  {placedOrder.shippingCost === 0 ? (
                    <span className="text-emerald-700 font-semibold uppercase">FREE</span>
                  ) : (
                    <span>{formatPrice(placedOrder.shippingCost)}</span>
                  )}
                </div>
                <div className="flex justify-between font-bold text-sm text-brand-maroon border-t border-dashed border-brand-cream-dark pt-3">
                  <span>Total</span>
                  <span>{formatPrice(placedOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice action triggers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-brand-cream-dark">
            <button
              onClick={() => onNavigate('home')}
              className="w-full sm:w-auto px-8 py-3 bg-brand-maroon text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-brand-maroon-dark transition-colors cursor-pointer"
            >
              ← Continue Shopping
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="w-full sm:w-auto px-8 py-3 bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-cream-dark font-sans text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download size={14} /> Download Invoice
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Active steps headings metadata
  const renderCheckoutHeader = (totalSteps: number, activeStep: number, stepLabels: string[]) => {
    return (
      <div className="max-w-4xl mx-auto mb-10 font-sans">
        {/* Step Progression Indicators Bar */}
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-brand-cream-dark -translate-y-1/2 z-0" />
          {stepLabels.map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < activeStep;
            const isActive = stepNum === activeStep;
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-[#5c181a] border-[#5c181a] text-white' 
                      : isActive 
                        ? 'bg-brand-paper border-brand-maroon text-brand-maroon ring-2 ring-brand-gold-light' 
                        : 'bg-brand-paper border-brand-cream-dark text-brand-charcoal/40'
                  }`}
                >
                  {isCompleted ? <Check size={14} strokeWidth={2.5} /> : stepNum}
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-widest mt-2 ${isActive ? 'text-brand-maroon' : 'text-brand-charcoal/40'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // If basket empty during entry phase
  if (cart.length === 0 && currentStepView !== 'success') {
    return (
      <div className="bg-brand-cream py-20 px-6 text-center text-brand-charcoal font-sans flex flex-col justify-center items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-cream-dark flex items-center justify-center text-brand-maroon/40">
          <ShoppingBag size={32} />
        </div>
        <h3 className="text-lg font-serif font-bold text-brand-maroon" style={{ fontFamily: 'Libre Caslon Text, serif' }}>Your Checkout Basket is Empty</h3>
        <p className="text-xs text-brand-charcoal/60">Let's continue adding items to checkout.</p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-2.5 bg-brand-maroon text-white font-semibold text-xs uppercase tracking-widest hover:bg-brand-maroon-dark transition-colors cursor-pointer"
        >
          View sacred catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream py-12 px-4 md:px-12 text-brand-charcoal font-sans animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* sub-brand indicator matching screenshot 2 */}
        <div className="flex items-center justify-between border-b border-brand-cream-dark pb-6">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => onNavigate('home')}>
            <h1 className="text-base font-serif font-bold text-brand-maroon uppercase tracking-wider" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Heritage Spiritual Collective
            </h1>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-[10px] font-bold text-brand-gold uppercase tracking-widest hover:underline flex items-center gap-1 cursor-pointer"
          >
            ← Return to Cart
          </button>
        </div>

        {/* Dynamic header steppers based on current page */}
        {currentStepView === 'info' && renderCheckoutHeader(4, 1, ['Information', 'Delivery', 'Payment', 'Review'])}
        {currentStepView === 'delivery' && renderCheckoutHeader(4, 2, ['Information', 'Delivery', 'Payment', 'Review'])}
        {currentStepView === 'payment' && renderCheckoutHeader(4, 3, ['Information', 'Delivery', 'Payment', 'Review'])}
        {currentStepView === 'review' && renderCheckoutHeader(4, 4, ['Information', 'Delivery', 'Payment', 'Review'])}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Left Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* STEP 1: CONTACT INFORMATION ENTRY */}
            {currentStepView === 'info' && (
              <form onSubmit={handleInfoSubmit} className="bg-brand-paper border border-brand-cream-dark p-6 rounded-xs space-y-6 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold text-brand-maroon uppercase tracking-widest border-b border-brand-cream-dark pb-3 mb-5">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">First Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Anitha"
                          className="w-full text-xs px-4 py-3 bg-brand-cream/35 border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30 text-brand-charcoal"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">Last Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Kuppusamy"
                          className="w-full text-xs px-4 py-3 bg-brand-cream/35 border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30 text-brand-charcoal"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seeker@example.com"
                        className="w-full text-xs px-4 py-3 bg-brand-cream/35 border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30 text-brand-charcoal"
                      />
                      <p className="text-xs text-brand-muted mt-1">Order confirmation and tracking updates will be sent here.</p>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">Phone Number <span className="text-red-500">*</span></label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 py-3 bg-brand-cream-dark border border-brand-cream-dark rounded-xs text-xs font-bold text-brand-charcoal/70 whitespace-nowrap select-none min-w-[64px] justify-center">
                          {phonePrefix}
                        </div>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/[^0-9\s\-]/g, ''))}
                          placeholder="98765 43210"
                          className="flex-1 text-xs px-4 py-3 bg-brand-cream/35 border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30 text-brand-charcoal"
                        />
                      </div>
                      <p className="text-xs text-brand-muted mt-1">For delivery coordination and customs clearance queries.</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-maroon hover:bg-brand-maroon-dark text-white font-sans text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Continue to Delivery Method →
                </button>
              </form>
            )}

            {/* STEP 2: DELIVERY METHOD SELECTION (REPLICATES SCREENSHOT 2) */}
            {currentStepView === 'delivery' && (
              <div className="space-y-6">
                
                {/* Contact summary header */}
                <div className="flex items-center justify-between p-4 bg-brand-paper border border-brand-cream-dark rounded-xs text-xs shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold">CONTACT INFO</span>
                    {fullName && <p className="font-semibold text-brand-charcoal">{fullName}</p>}
                    <p className="text-brand-charcoal/70">{email}</p>
                    {phone && <p className="text-brand-charcoal/70">{phonePrefix} {phone}</p>}
                  </div>
                  <button
                    onClick={() => onSetStepView('info')}
                    className="text-[10px] font-bold text-brand-maroon uppercase hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                {/* Delivery tabs section */}
                <div className="bg-brand-paper border border-brand-cream-dark p-6 rounded-xs space-y-6 shadow-xs">
                  <div>
                    <h3 className="text-base font-serif text-brand-maroon font-bold mb-4" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                      Delivery Method
                    </h3>
                    
                    {/* Sliding Toggles Tab */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          setDeliveryMethod('home');
                          setAddressCheckbox(true); // Don't block
                        }}
                        className={`py-4 text-xs font-bold uppercase tracking-widest rounded-xs border text-center transition-all ${
                          deliveryMethod === 'home'
                            ? 'bg-brand-maroon text-white border-brand-maroon shadow-xs'
                            : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-charcoal/80 border-brand-cream-dark'
                        }`}
                      >
                        Home Delivery
                      </button>
                      <button
                        onClick={() => {
                          setDeliveryMethod('store');
                          setAddressCheckbox(false); // require checking pickup acknowledgment
                        }}
                        className={`py-4 text-xs font-bold uppercase tracking-widest rounded-xs border text-center transition-all ${
                          deliveryMethod === 'store'
                            ? 'bg-brand-paper text-brand-maroon border-brand-maroon ring-1 ring-brand-maroon/20 font-bold'
                            : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-charcoal/80 border-brand-cream-dark'
                        }`}
                      >
                        Store Pickup
                      </button>
                    </div>
                  </div>

                  {/* Store Pickup Address Details */}
                  {deliveryMethod === 'store' ? (
                    <div className="space-y-4 pt-2">
                      <div className="border border-brand-gold/30 bg-brand-paper p-5 rounded-xs space-y-4">
                        <h4 className="text-xs font-bold text-brand-maroon uppercase tracking-widest flex items-center gap-1.5">
                          <MapPin size={14} className="text-brand-gold" /> Store Pickup Selected
                        </h4>
                        <p className="text-xs text-brand-charcoal/80 leading-relaxed">
                          You have chosen to collect your order from our Chennai store.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] bg-brand-cream/30 p-4 border border-brand-cream-dark">
                          <div className="space-y-1">
                            <span className="font-bold text-brand-gold uppercase tracking-wider block">STORE ADDRESS</span>
                            <p className="text-brand-charcoal leading-relaxed font-sans">
                              10 Bhagirathy Street, Bishop Garden,<br />
                              Raja Annamalaipuram, Chennai
                            </p>
                          </div>
                          <div className="space-y-1">
                            <span className="font-bold text-brand-gold uppercase tracking-wider block">COLLECTION TIME</span>
                            <p className="text-brand-charcoal font-sans leading-relaxed">
                              Within 24 hours after confirmation.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Important red alert notice */}
                      <div className="flex gap-3 p-4 bg-red-50 border border-[#ffdad6] text-brand-maroon rounded-xs text-xs scale-98">
                        <AlertCircle size={16} className="text-brand-maroon shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold block uppercase tracking-wide mb-0.5 text-[#ba1a1a]">Important</strong>
                          <span className="text-brand-charcoal/80">No home delivery will be provided for this selection.</span>
                        </div>
                      </div>

                      {/* Checkbox confirmation and background pattern */}
                      <div className="flex items-center gap-2.5 pt-2">
                        <input
                          type="checkbox"
                          id="pickup-checkbox"
                          checked={addressCheckbox}
                          onChange={(e) => setAddressCheckbox(e.target.checked)}
                          className="w-4.5 h-4.5 text-brand-maroon accent-brand-maroon border-brand-cream-dark"
                        />
                        <label htmlFor="pickup-checkbox" className="text-xs text-brand-charcoal/80 select-none cursor-pointer">
                          I understand this is a pickup order.
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-2">
                      <div className="border border-brand-cream-dark p-5 rounded-xs space-y-4">
                        <h4 className="text-xs font-bold text-brand-maroon uppercase tracking-widest flex items-center gap-1.5">
                          <MapPin size={13} className="text-brand-gold" /> Delivery Address
                        </h4>
                        <p className="text-xs text-brand-charcoal/60">
                          Enter your full shipping address. All fields marked <span className="text-red-500 font-bold">*</span> are required.
                        </p>

                        <div className="space-y-3">
                          {/* Street line 1 */}
                          <div className="space-y-1">
                            <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">Street Address <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              required={deliveryMethod === 'home'}
                              value={streetLine1}
                              onChange={(e) => setStreetLine1(e.target.value)}
                              placeholder="House / Flat no., Street name"
                              className="w-full text-xs px-3 py-2.5 bg-brand-cream border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30"
                            />
                          </div>

                          {/* Street line 2 */}
                          <div className="space-y-1">
                            <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">Apartment, Suite, Unit <span className="text-brand-charcoal/30">(Optional)</span></label>
                            <input
                              type="text"
                              value={streetLine2}
                              onChange={(e) => setStreetLine2(e.target.value)}
                              placeholder="Apt 4B, Floor 2, Building name…"
                              className="w-full text-xs px-3 py-2.5 bg-brand-cream border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30"
                            />
                          </div>

                          {/* City + State */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">City <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                required={deliveryMethod === 'home'}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                                className="w-full text-xs px-3 py-2.5 bg-brand-cream border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">{stateLabel}</label>
                              <input
                                type="text"
                                value={stateProvince}
                                onChange={(e) => setStateProvince(e.target.value)}
                                placeholder={stateLabel}
                                className="w-full text-xs px-3 py-2.5 bg-brand-cream border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30"
                              />
                            </div>
                          </div>

                          {/* Postal code + Country */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">
                                {currentRegion === 'US' || currentRegion === 'CA' ? 'ZIP Code' : 'Postal Code'} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                required={deliveryMethod === 'home'}
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                placeholder={currentRegion === 'IN' ? '600001' : currentRegion === 'US' || currentRegion === 'CA' ? '10001' : currentRegion === 'GB' ? 'SW1A 1AA' : ''}
                                className="w-full text-xs px-3 py-2.5 bg-brand-cream border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">Country <span className="text-red-500">*</span></label>
                              <input
                                type="text"
                                required={deliveryMethod === 'home'}
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Country"
                                className="w-full text-xs px-3 py-2.5 bg-brand-cream border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-brand-cream/30 text-[10px] text-brand-charcoal/60 rounded-xs border border-brand-cream-dark">
                          {currentRegion === 'IN'
                            ? <span>📦 Home delivery dispatches within 48 hours. Fixed shipping charge of <strong>{formatPrice(150)}</strong> applies.</span>
                            : <span>✈️ International air cargo with customs clearance insurance — <strong>FREE SHIPPING</strong> on all orders above {formatPrice(1000)}.</span>
                          }
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Method → Payment */}
                  <button
                    onClick={() => onSetStepView('payment')}
                    disabled={!addressCheckbox}
                    className="w-full py-3 bg-brand-maroon hover:bg-brand-maroon-dark text-white font-sans text-xs font-bold uppercase tracking-widest transition-colors disabled:bg-brand-charcoal/20 disabled:text-brand-charcoal/40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                  >
                    Continue to Payment →
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {currentStepView === 'payment' && (
              <div className="space-y-6">
                {/* Contact + Delivery summary bar */}
                <div className="flex items-center justify-between p-4 bg-brand-paper border border-brand-cream-dark rounded-xs text-xs shadow-xs">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold">DELIVERY</span>
                    <p className="font-semibold text-brand-charcoal">{fullName}</p>
                    <p className="text-brand-charcoal/60">
                      {deliveryMethod === 'store'
                        ? '10 Bhagirathy Street, Chennai 600028 (Store Pickup)'
                        : [streetLine1, city, country].filter(Boolean).join(', ')}
                    </p>
                  </div>
                  <button onClick={() => onSetStepView('delivery')} className="text-[10px] font-bold text-brand-maroon uppercase hover:underline">Edit</button>
                </div>

                <div className="bg-brand-paper border border-brand-cream-dark p-6 rounded-xs space-y-6 shadow-xs">
                  <h3 className="text-sm font-bold text-brand-maroon uppercase tracking-widest border-b border-brand-cream-dark pb-3">
                    Payment
                  </h3>

                  {/* Payment method tabs */}
                  {(() => {
                    const methods: Array<'card' | 'upi' | 'paypal'> = currentRegion === 'IN'
                      ? ['card', 'upi', 'paypal']
                      : ['card', 'paypal'];
                    const labels: Record<string, string> = { card: '💳 Card', upi: '📱 UPI', paypal: '🅿 PayPal' };
                    return (
                      <div className={`grid gap-3 ${methods.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {methods.map((method) => (
                          <button
                            key={method}
                            onClick={() => setPaymentMethod(method)}
                            className={`py-3 text-xs font-bold uppercase tracking-widest rounded-xs border text-center transition-all ${
                              paymentMethod === method
                                ? 'bg-brand-maroon text-white border-brand-maroon'
                                : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-charcoal/80 border-brand-cream-dark'
                            }`}
                          >
                            {labels[method]}
                          </button>
                        ))}
                      </div>
                    );
                  })()}

                  {/* Card form — maps to Shopify credit card gateway inputs */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] text-brand-charcoal/50 uppercase tracking-widest font-bold">Accepted:</span>
                        {['VISA', 'MC', 'AMEX', 'RuPay'].map(c => (
                          <span key={c} className="text-[9px] font-bold px-2 py-0.5 border border-brand-cream-dark rounded-sm bg-white text-brand-charcoal/60 uppercase tracking-wider">{c}</span>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">Name on Card <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={e => setCardName(e.target.value)}
                          placeholder="As it appears on your card"
                          className="w-full text-xs px-4 py-3 bg-brand-cream/35 border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">Card Number <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={cardNumber}
                            onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="w-full text-xs px-4 py-3 bg-brand-cream/35 border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30 font-mono tracking-wider"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/30">
                            <CreditCard size={16} />
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">Expiry <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={cardExpiry}
                            onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                            placeholder="MM / YY"
                            maxLength={7}
                            className="w-full text-xs px-4 py-3 bg-brand-cream/35 border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30 font-mono tracking-wider"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">CVV <span className="text-red-500">*</span></label>
                          <input
                            type="password"
                            inputMode="numeric"
                            value={cardCvv}
                            onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            placeholder="•••"
                            maxLength={4}
                            className="w-full text-xs px-4 py-3 bg-brand-cream/35 border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30 font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[10px] text-brand-charcoal/50">
                        <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
                        <span>256-bit SSL encryption. Your card details are never stored on our servers.</span>
                      </div>
                    </div>
                  )}

                  {/* UPI (India only) */}
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                        Pay instantly using any UPI-enabled app — PhonePe, GPay, Paytm, or your bank app.
                      </p>
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-bold tracking-widest text-brand-gold">UPI ID <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="w-full text-xs px-4 py-3 bg-brand-cream/35 border border-brand-cream-dark focus:outline-none focus:border-brand-maroon rounded-xs placeholder:text-brand-charcoal/30 font-mono"
                        />
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                          <span key={app} className="text-[9px] font-bold px-2 py-1 border border-brand-cream-dark rounded-sm bg-white text-brand-charcoal/60 uppercase tracking-wider">{app}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PayPal */}
                  {paymentMethod === 'paypal' && (
                    <div className="space-y-4">
                      <p className="text-xs text-brand-charcoal/70 leading-relaxed">
                        You'll be redirected to PayPal to complete your payment securely. Supports all PayPal wallets and linked bank accounts.
                      </p>
                      <div className="p-4 bg-[#003087]/5 border border-[#003087]/20 rounded-xs text-center">
                        <span className="text-[#003087] font-black text-xl tracking-tight">Pay<span className="text-[#009cde]">Pal</span></span>
                        <p className="text-[10px] text-brand-charcoal/50 mt-1">Click Review Order to continue to PayPal</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => onSetStepView('review')}
                    disabled={paymentMethod === 'card' && (!cardName || !cardNumber || !cardExpiry || !cardCvv)}
                    className="w-full py-3 bg-brand-maroon hover:bg-brand-maroon-dark text-white font-sans text-xs font-bold uppercase tracking-widest transition-colors disabled:bg-brand-charcoal/20 disabled:text-brand-charcoal/40 disabled:cursor-not-allowed"
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW DETAILS ORDER SUBMIT */}
            {currentStepView === 'review' && (
              <div className="space-y-6">
                
                {/* Delivery and payment summaries boxes */}
                <div className="bg-brand-paper border border-brand-cream-dark p-6 rounded-xs space-y-6 shadow-xs">
                  <h3 className="text-base font-serif text-brand-maroon font-bold border-b border-brand-cream-dark pb-3" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    Review Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
                    
                    {/* Delivery summary column */}
                    <div className="border border-brand-cream-dark p-4 rounded-xs relative">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold">DELIVERY DETAILS</span>
                      <p className="font-serif font-semibold text-brand-maroon text-xs mt-1.5" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                        {deliveryMethod === 'store' ? 'STORE PICKUP' : 'HOME DELIVERY'}
                      </p>

                      {deliveryMethod === 'store' ? (
                        <>
                          <p className="text-[11px] text-brand-charcoal/80 mt-1">VEDANTA Heritage Collective</p>
                          <p className="text-[10px] text-brand-charcoal/60 mt-0.5">10 Bhagirathy Street, Bishop Garden, Raja Annamalaipuram, Chennai 600028</p>
                          <p className="text-[10px] text-emerald-800 font-bold mt-2">Estimated Pickup: Tomorrow, 10 AM – 6 PM</p>
                        </>
                      ) : (
                        <>
                          {fullName && <p className="text-[11px] font-semibold text-brand-charcoal/90 mt-1">{fullName}</p>}
                          <p className="text-[10px] text-brand-charcoal/70 mt-0.5 leading-relaxed">
                            {[streetLine1, streetLine2].filter(Boolean).join(', ')}<br />
                            {[city, stateProvince].filter(Boolean).join(', ')}{postalCode ? ' – ' + postalCode : ''}<br />
                            {country}
                          </p>
                          {phone && <p className="text-[10px] text-brand-charcoal/60 mt-1">{phonePrefix} {phone}</p>}
                          <p className="text-[10px] text-emerald-800 font-bold mt-2">
                            {currentRegion === 'IN' ? 'Estimated Delivery: Within 2–3 business days' : 'Estimated Delivery: 5–10 international business days'}
                          </p>
                        </>
                      )}

                      <button
                        onClick={() => onSetStepView('delivery')}
                        className="absolute top-4 right-4 text-[9px] font-bold text-brand-maroon uppercase tracking-widest hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Payment review column */}
                    <div className="border border-brand-cream-dark p-4 rounded-xs relative">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold">PAYMENT METHOD</span>
                      {paymentMethod === 'card' && (
                        <>
                          <p className="font-serif font-semibold text-brand-maroon text-xs mt-1.5 flex items-center gap-1.5" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                            <CreditCard size={14} className="text-brand-gold" /> CREDIT / DEBIT CARD
                          </p>
                          <p className="text-[11px] text-brand-charcoal/80 mt-1">
                            {cardName && <span className="block">{cardName}</span>}
                            {maskedCard ? `•••• •••• •••• ${maskedCard}` : '•••• •••• •••• ••••'}
                          </p>
                        </>
                      )}
                      {paymentMethod === 'upi' && (
                        <>
                          <p className="font-serif font-semibold text-brand-maroon text-xs mt-1.5 flex items-center gap-1.5" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                            📱 UPI
                          </p>
                          <p className="text-[11px] text-brand-charcoal/80 mt-1">{upiId || 'UPI ID'}</p>
                        </>
                      )}
                      {paymentMethod === 'paypal' && (
                        <>
                          <p className="font-serif font-semibold text-brand-maroon text-xs mt-1.5 flex items-center gap-1.5" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                            <span className="text-[#003087] font-black">Pay<span className="text-[#009cde]">Pal</span></span>
                          </p>
                          <p className="text-[11px] text-brand-charcoal/80 mt-1">Redirect at order placement</p>
                        </>
                      )}
                      <span className="text-[9px] uppercase font-bold tracking-widest text-brand-gold mt-3 block">BILLING ADDRESS</span>
                      <p className="text-[10px] text-brand-charcoal/60 mt-0.5">Same as delivery address</p>

                      <button
                        onClick={() => onSetStepView('payment')}
                        className="absolute top-4 right-4 text-[9px] font-bold text-brand-maroon uppercase tracking-widest hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                  </div>
                </div>

                {/* Items box */}
                <div className="bg-brand-paper border border-brand-cream-dark p-6 rounded-xs space-y-4 shadow-xs">
                  <h4 className="text-xs font-bold text-brand-maroon uppercase tracking-widest border-b border-brand-cream-dark pb-2">
                    Items in Order ({cart.length} item)
                  </h4>

                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 items-center bg-brand-cream/15 p-3 rounded border border-brand-cream-dark">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-16 h-16 object-cover rounded border border-brand-cream-dark" 
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif font-bold text-brand-maroon text-sm leading-tight" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                            {item.product.name}
                          </h5>
                          <p className="text-[11px] text-brand-charcoal/60 leading-normal line-clamp-1 mt-1 font-sans">
                            {item.product.description}
                          </p>
                          <span className="text-[10px] text-brand-gold uppercase tracking-wider font-semibold mt-1 block">Qty: {item.quantity}</span>
                        </div>
                        <span className="font-serif font-semibold text-brand-maroon" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Right Summary column (Matches screenshot 2 and 3 style) */}
          <div className="lg:col-span-4 bg-brand-paper border border-brand-cream-dark p-6 rounded-xs space-y-6 shadow-xs sticky top-32">
            <h3 className="text-lg font-serif text-brand-maroon font-bold border-b border-brand-cream-dark pb-3" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
              Order Summary
            </h3>

            {/* Quick product preview for delivery step */}
            {currentStepView === 'delivery' && cart.length > 0 && (
              <div className="flex gap-3 text-xs border-b border-brand-cream-dark pb-4">
                <img 
                  src={cart[0].product.imageUrl} 
                  alt={cart[0].product.name} 
                  className="w-12 h-12 object-cover rounded-sm border border-brand-cream-dark"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-bold cursor-pointer text-brand-maroon text-[11px] font-serif leading-none truncate block" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    {cart[0].product.name}
                  </span>
                  <span className="text-[10px] text-brand-charcoal/50 block mt-1 capitalize">{cart[0].product.category} Essential</span>
                </div>
                <div className="text-right flex flex-col justify-between">
                  <span className="font-serif font-semibold text-brand-maroon text-[11px] block" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
                    {formatPrice(cart[0].product.price)}
                  </span>
                  {cart.length > 1 && <span className="text-[10px] italic text-brand-gold">+ {cart.length - 1} other items</span>}
                </div>
              </div>
            )}

            {/* Price values summary list */}
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between text-brand-charcoal/70">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-charcoal/70">
                {deliveryMethod === 'store' || currentRegion !== 'IN' ? (
                  <>
                    <span>Shipping ({currentRegion !== 'IN' ? 'International Air' : 'Store Pickup'})</span>
                    <span className="text-emerald-700 font-semibold uppercase font-sans tracking-wide">FREE</span>
                  </>
                ) : (
                  <>
                    <span>Shipping (Home Delivery)</span>
                    <span>{formatPrice(150)}</span>
                  </>
                )}
              </div>
              <div className="flex justify-between text-brand-charcoal/50">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="flex justify-between font-bold text-base text-brand-maroon border-t border-dashed border-brand-cream-dark pt-4">
                <span>Total</span>
                <span>{formatPrice(totalCost)}</span>
              </div>
            </div>

            {/* Disclaimer text */}
            {currentStepView === 'review' && (
              <div className="space-y-4 pt-1 border-t border-brand-cream-dark">
                <p className="text-[10px] text-brand-charcoal/50 text-center leading-relaxed">
                  By placing your order, you agree to our terms of service and privacy policy. 100% SECURE SSL CHECKOUT
                </p>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 bg-brand-maroon hover:bg-brand-maroon-dark text-white font-sans text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShieldCheck size={16} /> Place Your Order
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
