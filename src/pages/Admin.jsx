import React, { useState, useEffect } from 'react';
import { uploadImagesToSupabase, getImagePublicUrl } from '../utils/supabaseStorage';

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
    imageFiles: [],
    imagePaths: [],
    stock: 0,
    material: '',
    featured: false,
  });

  const [uploading, setUploading] = useState(false);

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

  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setForm(prev => ({ ...prev, imageFiles: files }));
  };

  const removeImageFile = (index) => {
    setForm(prev => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== index),
      imagePaths: prev.imagePaths.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate image files
    if (form.imageFiles.length === 0) {
      setMessage('Please upload at least one image');
      return;
    }

    try {
      setUploading(true);
      setMessage('Uploading images...');

      // Upload images to Supabase storage
      const uploadedPaths = await uploadImagesToSupabase(form.imageFiles, ADMIN_USER, ADMIN_PASS);

      setMessage('Creating product...');

      // Create product with image paths
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
          image_path: uploadedPaths[0], // First image as main
          image_paths: uploadedPaths,   // All images as array
          stock: Number(form.stock) || 0,
          material: form.material,
          featured: !!form.featured,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      console.log('🆕 New product added:', data.product);
      setMessage(data.product && data.product.name ? `Product "${data.product.name}" created successfully` : 'Product created successfully');
      setForm({ name: '', description: '', price: '', category: '', imageFiles: [], imagePaths: [], stock: 0, material: '', featured: false });
    } catch (err) {
      setMessage(err.message || 'Error creating product');
    } finally {
      setUploading(false);
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
          
          {/* Multiple Images */}
          <div className="space-y-3">
            <label className="block font-semibold text-gray-700">Product Images (Upload Files)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageFileChange}
              className="w-full border px-3 py-2 rounded"
              disabled={uploading}
            />
            {form.imageFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{form.imageFiles.length} file(s) selected:</p>
                {form.imageFiles.map((file, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                    <span className="text-sm">{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
                    <button
                      type="button"
                      onClick={() => removeImageFile(index)}
                      disabled={uploading}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" className="w-full border px-3 py-2 rounded" />
          <input name="material" value={form.material} onChange={handleChange} placeholder="Material" className="w-full border px-3 py-2 rounded" />
          <label className="flex items-center gap-2"><input name="featured" checked={form.featured} onChange={handleChange} type="checkbox" /> Featured</label>

          <div className="flex gap-3">
            <button 
              disabled={uploading}
              className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Creating Product...' : 'Create Product'}
            </button>
            <a href="/" className="px-4 py-2 border rounded">View Store</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
