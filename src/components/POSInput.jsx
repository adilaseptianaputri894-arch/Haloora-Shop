import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function POSInput() {

  const { user, logout } = useAuth(); // Ambil state login

  const products = [
    { id: 1, name: "Kopi Arabica", price: 20000 },
    { id: 2, name: "Teh Hijau", price: 15000 },
    { id: 3, name: "Roti Gandum", price: 12000 },
    { id: 4, name: "Kurma Premium", price: 30000 }
  ];

  const [cart, setCart] = useState([]);
  const [paymentType, setPaymentType] = useState("debit");

  const addProduct = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const zakat = total * 0.025;

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
           <h1 className="text-3xl font-bold text-gray-800">Dashboard Kasir</h1>
           {/* Menampilkan pesan kustom apabila user telah login */}
           <p className="text-gray-600 text-sm mt-1">
             Toko: {user ? user.store : "Utama"} | Mode Transaksi
           </p>
        </div>

        <div className="flex items-center space-x-4">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            Audit Syariah ✔
          </span>
          <button 
            onClick={logout} 
            className="text-red-600 hover:text-red-800 font-semibold px-2"
          >
            Logout
          </button>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-6">

        {/* Product Grid */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => addProduct(p)}
              className="bg-white shadow rounded-lg p-4 cursor-pointer hover:bg-green-50"
            >
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-gray-500">Rp {p.price}</p>
            </div>
          ))}
        </div>

        {/* Transaction Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Transaksi</h2>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>Rp {item.price}</span>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4">
            <p className="flex justify-between font-semibold">
              Total
              <span>Rp {total}</span>
            </p>
            <p className="flex justify-between text-green-700">
              Zakat (2.5%)
              <span>Rp {zakat.toFixed(0)}</span>
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="debit">Debit</option>
              <option value="credit">Kredit</option>
            </select>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
              Checkout
            </button>
          </div>

        </div>

      </div>

    </div>

  );
}
