// src/admin/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyDIflxzUxyylkYWXc_0zgieUntuG2CmJbA",
  authDomain: "dinq-ethiopia-tour.firebaseapp.com",
  projectId: "dinq-ethiopia-tour",
  storageBucket: "dinq-ethiopia-tour.firebasestorage.app",
  messagingSenderId: "952533108350",
  appId: "1:952533108350:web:db632e96081e2c8e237a2f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// --- TYPES & ROLES ---
export type AdminRole = 'super_admin' | 'administrator' | 'tour_manager' | 'shop_manager' | 'content_editor';

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: AdminRole;
  isActive: boolean;
}

// --- CLOUDINARY CONFIGURATION ---
// Replace these with your actual Cloudinary details from your dashboard
const CLOUDINARY_CLOUD_NAME = "dw1ohipim";
const CLOUDINARY_UPLOAD_PRESET = "car_images";

// --- CLOUDINARY UPLOAD UTILITY ---
export const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error("Cloudinary configuration missing");
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', `dinq_tours/uploads`); 

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url; 
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};