import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { auth, db } from '../lib/firebase';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const adminDoc = await getDoc(doc(db, 'users', user.uid)).catch(async (profileError) => {
        await signOut(auth);
        throw profileError;
      });

      if (!adminDoc.exists()) {
        await signOut(auth);
        setError(`Firebase accepted your credentials, but Firestore has no admin profile for UID ${user.uid}. Ask an existing administrator to create users/${user.uid} in Firestore with a valid role and isActive: true.`);
        return;
      }

      if (adminDoc.data().isActive !== true) {
        await signOut(auth);
        setError('Your admin profile is inactive. Ask an existing administrator to activate this account.');
        return;
      }

      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      const code = err instanceof FirebaseError ? err.code : '';

      if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        setError('Invalid email or password. Please try again.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else if (code === 'permission-denied') {
        setError('Firebase authenticated your account, but Firestore denied access to its admin profile. Check the Firestore rules for users/{uid}.');
      } else if (err instanceof FirebaseError) {
        setError(`Firebase sign-in failed (${err.code}). Check the account and Firebase configuration, then try again.`);
      } else {
        setError('An unexpected error occurred during sign in. Please contact support.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#120D0A] overflow-hidden selection:bg-[#DDAA42] selection:text-[#18110D]">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=80"
          alt="Dinq Highlands"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-[#120D0A]/80 to-[#120D0A]/40" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
        <div className="rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 sm:p-10 overflow-hidden relative">
          
          {/* Decorative Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#DDAA42] to-transparent opacity-60" />

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#1A130F] border border-[#DDAA42]/30 shadow-inner mb-6">
              <ShieldCheck className="h-8 w-8 text-[#DDAA42]" />
            </div>
            <h1 className="font-serif text-3xl font-medium text-white tracking-tight">
              Dinq<span className="italic text-[#DDAA42]">OS</span>
            </h1>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A6978A]">
              Expedition Command Center
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs leading-relaxed animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A6978A] pl-1">
                Authorized Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A6978A]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#DDAA42] focus:ring-1 focus:ring-[#DDAA42] transition-all disabled:opacity-50"
                  placeholder="admin@dinqtour.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A6978A] pl-1">
                Command Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A6978A]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#DDAA42] focus:ring-1 focus:ring-[#DDAA42] transition-all disabled:opacity-50"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email || !password}
              className="w-full mt-8 py-4 rounded-xl bg-[#DDAA42] text-[#1A130F] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#E7C175] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(221,170,66,0.2)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

        </div>
        
        <p className="text-center mt-8 text-[10px] font-semibold uppercase tracking-widest text-[#A6978A]">
          Protected by Enterprise Security · Addis Ababa HQ
        </p>
      </div>
    </div>
  );
};