import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const ADMIN_USER = process.env.REACT_APP_ADMIN_USER || 'macrameartistry@gmail.com';
const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASS || '12345678';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    stock: 0,
    material: '',
    featured: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('isAdmin');
    if (saved === 'true') setIsAdmin(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const enteredEmail = (email || '').trim().toLowerCase();
    const enteredPass = (password || '').trim();
    const adminEmail = (ADMIN_USER || '').trim().toLowerCase();
    const adminPass = (ADMIN_PASS || '').trim();

    if (enteredEmail === adminEmail && enteredPass === adminPass) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setMessage('Admin signed in');
    } else {
      setMessage('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    setEmail('');
    setPassword('');
    setMessage('Logged out');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-user': ADMIN_USER,
          'x-admin-pass': ADMIN_PASS,
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price) || 0,
          category: form.category,
          image_url: form.image_url,
          stock: Number(form.stock) || 0,
          material: form.material,
          featured: !!form.featured,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      console.log('🆕 New product added:', data.product);
      setMessage(data.product && data.product.name ? `Product "${data.product.name}" created successfully` : 'Product created successfully');
      setForm({ name: '', description: '', price: '', category: '', image_url: '', stock: 0, material: '', featured: false });
    } catch (err) {
      setMessage(err.message || 'Error creating product');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Admin Sign In</h2>
          {message && <p className="mb-2 text-sm text-red-600">{message}</p>}
          <form onSubmit={handleLogin} className="space-y-3">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded" />
            <div className="flex justify-between items-center">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign in</button>
              <a href="/" className="text-sm text-gray-600">Back to store</a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 pb-8 px-4 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Admin - Add Product</h2>
          <div>
            <button onClick={handleLogout} className="px-3 py-2 bg-red-500 text-white rounded">Logout</button>
          </div>
        </div>

        {message && <p className="mb-3 text-sm text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border px-3 py-2 rounded" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" rows={4} required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" className="w-full border px-3 py-2 rounded" required />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border px-3 py-2 rounded" />
          <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" className="w-full border px-3 py-2 rounded" required />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" className="w-full border px-3 py-2 rounded" />
          <input name="material" value={form.material} onChange={handleChange} placeholder="Material" className="w-full border px-3 py-2 rounded" />
          <label className="flex items-center gap-2"><input name="featured" checked={form.featured} onChange={handleChange} type="checkbox" /> Featured</label>

          <div className="flex gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded">Create Product</button>
            <a href="/" className="px-4 py-2 border rounded">View Store</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
