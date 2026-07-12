'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Package, MapPin, LogOut, Camera, 
  ChevronRight, ShieldCheck, Bell, CreditCard, Phone 
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logoutRequest, loginSuccess } from '@/modules/user/state/userSlice';

// Simulation of a Service Layer (SOLID: Separation of Concerns)
const ProfileService = {
  async getProfile() {
    // API Call: GET /api/user/profile
    return {
      name: "Akash Tiwari",
      email: "akash@example.com",
      phone: "+91 9876543210",
      avatar: null,
      joinedAt: "Jan 2024"
    };
  }
};

const API_URL = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:5000';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user: reduxUser, token, isAuthChecking } = useSelector((state) => state.user);

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleStartEdit = () => {
    setEditName(user?.name || '');
    setEditPhone(user?.phone || '');
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      toast.error("Full Name is required");
      return;
    }
    if (!editPhone.trim()) {
      toast.error("Phone Number is required");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editName,
          phone: editPhone
        })
      });

      if (res.ok) {
        const updatedUser = await res.json();
        // Update user state locally
        setUser({
          ...user,
          name: updatedUser.name,
          phone: updatedUser.phone
        });
        
        // Update Redux state
        dispatch(loginSuccess({ user: updatedUser, token }));
        
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        const errData = await res.json();
        toast.error(errData.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab && ['profile', 'orders', 'addresses', 'payment'].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  useEffect(() => {
    if (activeTab !== 'profile' && token) {
      const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
          const res = await fetch(`${API_URL}/api/orders`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            setOrders(data?.orders || []);
          }
        } catch (err) {
          console.error("Failed to load orders:", err);
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [activeTab, token]);

  const getUniqueAddresses = (ordersList) => {
    const unique = [];
    const seen = new Set();
    
    (ordersList || []).forEach(order => {
      if (order.address && order.address.address_1) {
        const key = `${order.address.address_1}-${order.address.city}-${order.address.pin}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push({
            name: order.customer?.name || user?.name,
            phone: order.customer?.phone || user?.phone,
            email: order.customer?.email || user?.email,
            address_1: order.address.address_1,
            city: order.address.city,
            state: order.address.state,
            pin: order.address.pin,
            landmark: order.address.landmark,
          });
        }
      }
    });
    
    return unique;
  };

  useEffect(() => {
    if (!isAuthChecking) {
      if (reduxUser) {
        setUser({
          name: reduxUser.name || "User",
          email: reduxUser.email || "",
          phone: reduxUser.phone || "",
          avatar: reduxUser.avatar || null,
          joinedAt: reduxUser.createdAt 
            ? new Date(reduxUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : "Jan 2024"
        });
        setLoading(false);
      } else {
        toast.error("Please login to view your profile");
        router.push('/user/login');
      }
    }
  }, [reduxUser, isAuthChecking, router]);

  const handleLogout = () => {
    dispatch(logoutRequest());
    toast.success("Logged out successfully");
    router.push('/');
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-brand-primary font-bold">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <Toaster position="top-right" />
      
      {/* Header / Banner */}
      <div className="h-48 bg-brand-primary relative">
        <div className="absolute -bottom-16 left-6 md:left-12 flex items-end gap-4">
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-4 border-white bg-slate-200 overflow-hidden shadow-xl">
              {user?.avatar ? (
                <Image src={user.avatar} alt="Profile" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-secondary text-brand-primary">
                  <User size={48} />
                </div>
              )}
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-white rounded-xl shadow-lg text-brand-primary hover:scale-110 transition-transform">
              <Camera size={16} />
            </button>
          </div>
          <div className="mb-2 block">
            <h1 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-tighter">{user?.name}</h1>
            <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Member since {user?.joinedAt}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-16 md:mt-20 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-4 space-y-2">
            <NavButton 
              icon={<User size={18}/>} 
              label="Personal Info" 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')} 
            />
            <NavButton 
              icon={<Package size={18}/>} 
              label="My Orders" 
              active={activeTab === 'orders'} 
              onClick={() => setActiveTab('orders')} 
            />
            <NavButton 
              icon={<MapPin size={18}/>} 
              label="Addresses" 
              active={activeTab === 'address'} 
              onClick={() => setActiveTab('address')} 
            />
            <NavButton 
              icon={<CreditCard size={18}/>} 
              label="Saved Payments" 
              active={activeTab === 'payment'} 
              onClick={() => setActiveTab('payment')} 
            />
            <hr className="my-4 border-slate-200" />
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all">
              <LogOut size={18} />
              <span className="uppercase text-sm tracking-tighter">Logout Account</span>
            </button>
          </aside>

          {/* Tab Content Area */}
          <section className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 min-h-[500px]">
            {activeTab === 'profile' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black text-brand-primary uppercase tracking-tighter">Account Settings</h2>
                  {isEditing ? (
                    <div className="flex gap-3">
                      <button 
                        onClick={handleSaveProfile} 
                        disabled={isSaving}
                        className="text-xs font-bold text-emerald-600 border-b-2 border-emerald-600 pb-0.5 disabled:opacity-50"
                      >
                        {isSaving ? "SAVING..." : "SAVE CHANGES"}
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)} 
                        disabled={isSaving}
                        className="text-xs font-bold text-slate-400 border-b-2 border-slate-400 pb-0.5 disabled:opacity-50"
                      >
                        CANCEL
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={handleStartEdit}
                      className="text-xs font-bold text-brand-secondary border-b-2 border-brand-secondary pb-0.5"
                    >
                      EDIT PROFILE
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {isEditing ? (
                    <>
                      <div className="space-y-2 flex flex-col">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                        <input 
                          type="text" 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-primary font-bold text-slate-800 text-sm"
                        />
                      </div>
                      
                      <div className="space-y-2 flex flex-col">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address (Read Only)</label>
                        <input 
                          type="text" 
                          value={user?.email}
                          readOnly
                          className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 font-bold text-sm cursor-not-allowed"
                        />
                      </div>

                      <div className="space-y-2 flex flex-col">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                        <input 
                          type="text" 
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-primary font-bold text-slate-800 text-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <InfoField label="Full Name" value={user?.name} />
                      <InfoField label="Email Address" value={user?.email} />
                      <InfoField label="Phone Number" value={user?.phone} />
                    </>
                  )}
                  
                  <div className="mt-10 p-4 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center gap-4">
                    <ShieldCheck className="text-brand-accent" />
                    <div>
                      <p className="text-xs font-black text-brand-primary uppercase">Identity Verified</p>
                      <p className="text-[10px] text-brand-primary/60">Your account is secured with two-factor authentication.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="animate-in fade-in duration-500 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black text-brand-primary uppercase tracking-tighter">My Orders</h2>
                  <span className="bg-brand-primary text-brand-secondary text-xs px-3 py-1 rounded-full font-bold uppercase">
                    Total: {orders.length}
                  </span>
                </div>

                {ordersLoading ? (
                  <div className="py-20 text-center text-slate-400 font-medium">Loading your orders...</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-20">
                    <Package size={48} className="mx-auto text-slate-200 mb-4" />
                    <h3 className="font-bold text-brand-primary">No Recent Orders</h3>
                    <p className="text-sm text-slate-400">Items you purchase will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => {
                      const orderTotal = order.total_amount || order.products?.reduce((sum, p) => sum + (p.sale_price * p.quantity), 0) + (order.delivery_charges || 0);
                      const orderDate = new Date(order.createdAt || order.order_date).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      });

                      return (
                        <div key={order._id} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          {/* Order Header */}
                          <div className="bg-slate-50/80 px-6 py-4 flex flex-wrap justify-between items-center gap-3 border-b border-slate-100">
                            <div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order ID</p>
                              <p className="font-black text-sm text-brand-primary">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date Placed</p>
                              <p className="text-xs font-bold text-slate-700">{orderDate}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status</p>
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                order.status === 'PROCESSING' ? 'bg-amber-100 text-amber-700' :
                                order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Amount Paid</p>
                              <p className="font-black text-sm text-brand-secondary">₹{orderTotal}</p>
                            </div>
                          </div>

                          {/* Order Products */}
                          <div className="p-6 space-y-4">
                            {order.products?.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-slate-200">
                                  {item.image ? (
                                    <Image src={item.image} alt={item.name} width={48} height={48} className="object-cover w-full h-full" />
                                  ) : (
                                    <Package size={20} className="text-slate-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-bold text-slate-800 truncate">{item.name}</h4>
                                  <p className="text-[10px] text-slate-400 font-medium">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-xs font-bold text-brand-primary">₹{item.sale_price || item.regular_price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'address' && (
              <div className="animate-in fade-in duration-500 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black text-brand-primary uppercase tracking-tighter">My Addresses</h2>
                </div>

                {ordersLoading ? (
                  <div className="py-20 text-center text-slate-400 font-medium">Loading your addresses...</div>
                ) : getUniqueAddresses(orders).length === 0 ? (
                  <div className="text-center py-20">
                    <MapPin size={48} className="mx-auto text-slate-200 mb-4" />
                    <h3 className="font-bold text-brand-primary">No Saved Addresses</h3>
                    <p className="text-sm text-slate-400">Addresses will be saved here automatically when you place your first order.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getUniqueAddresses(orders).map((addr, idx) => (
                      <div key={idx} className="border border-slate-100 rounded-2xl p-6 shadow-sm bg-slate-50/30 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-brand-secondary" />
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <span className="bg-brand-primary text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Address {idx + 1}
                            </span>
                          </div>
                          
                          <p className="font-bold text-slate-800 text-sm mb-1">{addr.name}</p>
                          <p className="text-xs text-slate-500 leading-relaxed mb-3">
                            {addr.address_1}
                            {addr.landmark && `, ${addr.landmark}`}
                            <br />
                            {addr.city}, {addr.state} - {addr.pin}
                          </p>
                        </div>
                        
                        <div className="border-t border-slate-100/80 pt-3 flex flex-col gap-1 text-[11px] text-slate-400 font-bold">
                          <p className="flex items-center gap-1.5">
                            <Phone size={12} className="text-slate-300" />
                            <span>{addr.phone}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="animate-in fade-in duration-500 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black text-brand-primary uppercase tracking-tighter">Saved Payments</h2>
                </div>
                <div className="text-center py-20">
                  <CreditCard size={48} className="mx-auto text-slate-200 mb-4" />
                  <h3 className="font-bold text-brand-primary">No Saved Cards</h3>
                  <p className="text-sm text-slate-400">Your saved payment methods will appear here.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

/** * Modular Components (SOLID: Single Responsibility)
 */

function NavButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${
        active 
          ? 'bg-brand-primary text-brand-secondary shadow-lg shadow-brand-primary/20 scale-[1.02]' 
          : 'bg-white text-slate-500 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-black uppercase tracking-tighter">{label}</span>
      </div>
      <ChevronRight size={16} className={active ? 'opacity-100' : 'opacity-30'} />
    </button>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="group border-b border-slate-50 pb-4">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-brand-primary">{value || 'Not provided'}</p>
    </div>
  );
}