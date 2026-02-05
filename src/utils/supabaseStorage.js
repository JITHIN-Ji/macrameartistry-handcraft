// Utility to get public URLs for images stored in Supabase
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const BUCKET_NAME = 'products-images';

export const getImagePublicUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a local path, return as-is
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // Otherwise construct the Supabase storage URL
  if (!SUPABASE_URL) return '';
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${imagePath}`;
};

export const uploadImagesToSupabase = async (files, adminUser, adminPass) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    
    const response = await fetch(`${API_BASE}/products/upload-images`, {
      method: 'POST',
      headers: {
        'x-admin-user': adminUser,
        'x-admin-pass': adminPass,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload images');
    }

    const data = await response.json();
    return data.imagePaths; // Returns array of image paths
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};
