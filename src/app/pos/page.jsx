"use client";

import { useState } from "react";
import Head from "next/head";

export default function POSInput() {
  const products = [
    { id: 1, name: "Premium Dates (Kurma Ajwa)", price: 150000, category: "Produce", icon: "🌴" },
    { id: 2, name: "Organic Honey", price: 85000, category: "Pantry", icon: "🍯" },
    { id: 3, name: "Himalayan Pink Salt", price: 35000, category: "Pantry", icon: "🧂" },
    { id: 4, name: "Olive Oil Extra Virgin", price: 120000, category: "Pantry", icon: "🫒" },
    { id: 5, name: "Arabica Coffee Beans", price: 95000, category: "Beverages", icon: "☕" },
    { id: 6, name: "Saffron Threads", price: 250000, category: "Spices", icon: "🌸" }
  ];

  const [cart, setCart] = useState([]);
  const [paymentType, setPaymentType] = useState("cash");

  const addProduct = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeProduct = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  // Zakat/Sadaqah recommendation (2.5% applied dynamically at checkout based on user preference or rules)
  const automatedSadaqah = total * 0.025;

  return (
    <>
      <Head>
        <title>Cashier Dashboard | Sharia POS</title>
      </Head>
      <div className="min-h-screen text-slate-800 bg-slate-100 p-4 md:p-8 font-sans selection:bg-indigo-100">

        {/* Header Bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              Barakah Supermarket
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                Sharia Compliant
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">Cashier: Ahmed | Terminal: 01</p>
          </div>
          <div className="mt-4 md:mt-0 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 font-mono font-semibold text-slate-600">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Product Grid (Left/Middle) */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-700 mb-4 px-1">Frequent Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  onClick={() => addProduct(p)}
                  className="bg-white border text-center border-slate-200 shadow-sm rounded-xl p-5 cursor-pointer hover:border-indigo-400 hover:shadow-lg transition-all active:scale-95 group"
                >
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl group-hover:bg-indigo-50 transition-colors">
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 leading-tight mb-1">{p.name}</h3>
                  <div className="text-xs text-slate-400 mb-2">{p.category}</div>
                  <p className="text-indigo-600 font-black">Rp {p.price.toLocaleString('id-ID')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout & Summary Sidebar (Right) */}
          <div className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200 flex flex-col h-[600px] overflow-hidden">
            
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-black text-slate-800 text-center">Current Transaction</h2>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <span className="text-4xl mb-3">🛒</span>
                  <p className="font-medium text-sm">Cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center group bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex-1">
                      <div className="flex justify-between w-full">
                         <span className="font-bold text-sm text-slate-800">{item.name}</span>
                         <button onClick={() => removeProduct(item.id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                         </button>
                      </div>
                      <div className="flex justify-between text-slate-500 text-xs mt-1 font-medium">
                        <span>{item.qty} x Rp {item.price.toLocaleString('id-ID')}</span>
                        <span className="text-indigo-700 font-bold">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* calculation and checkout block */}
            <div className="bg-slate-50 p-5 border-t border-slate-200">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600 text-sm font-semibold">
                  <span>Subtotal</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                
                {/* Islamic Element - Automated Zakat/Sadaqah calculation note */}
                <div className="flex justify-between text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 text-sm font-bold">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"></path></svg>
                    Auto-Sadaqah (2.5%)
                  </span>
                  <span>+ Rp {Math.floor(automatedSadaqah).toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between text-xl font-black text-slate-900 pt-3 border-t border-slate-200">
                  <span>Total Payable</span>
                  <span>Rp {(total + Math.floor(automatedSadaqah)).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-700 shadow-sm appearance-none"
                >
                  <option value="cash">Cash Payment</option>
                  <option value="qris">QRIS / E-Wallet</option>
                  <option value="debit">Debit Card</option>
                </select>

                <button 
                  disabled={cart.length === 0}
                  className={`w-full py-4 rounded-xl font-black text-lg tracking-wide transition-all duration-200 ${
                    cart.length === 0 
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-lg shadow-indigo-600/30 transform hover:-translate-y-1'
                  }`}
                >
                  Complete Payment
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
