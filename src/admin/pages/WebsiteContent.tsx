import React, { useState } from 'react';
import { 
  LayoutTemplate, Save, Image as ImageIcon, AlignLeft, 
  MessageSquare, Globe, Phone, Mail, MapPin, Undo
} from 'lucide-react';

export const WebsiteContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hero' | 'philosophy' | 'contact'>('hero');
  const [isSaving, setIsSaving] = useState(false);

  // Mock State for the live website content
  const [content, setContent] = useState({
    hero: {
      slide1Title: 'Discover Ancient',
      slide1TitleItalic: 'Lalibela',
      slide1Subtitle: 'Stand inside monolithic rock-hewn sanctuaries carved directly into red volcanic bedrock.',
    },
    philosophy: {
      quote: "Travel in Ethiopia should never be reduced to passive sightseeing. It is an invitation to cross ancient thresholds, sit with village elders around the hearth, walk mist-swathed afro-alpine trails, and travel with profound respect for the living story.",
      tagline: "Discover the Places · Meet the People · Live the Story",
    },
    contact: {
      email: 'hello@dinqtour.com',
      phone: '+251 911 123 456',
      whatsapp: '+251 911 123 456',
      address: 'Bole, Addis Ababa, Ethiopia'
    }
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate Firebase save
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 animate-in fade-in">
      
      {/* Sticky Top Action Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-sm sticky top-4 z-40">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">Website Content CMS</h2>
          <p className="text-xs text-slate-500 mt-0.5">Changes made here will instantly update the public website.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
            <Undo className="h-4 w-4" />
            <span className="hidden sm:inline">Discard Changes</span>
          </button>
          <button 
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm w-32 justify-center"
          >
            {isSaving ? (
              <span className="animate-pulse">Saving...</span>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Publish</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left: Tab Navigation */}
        <div className="w-full lg:w-64 shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm p-2 sticky top-28">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'hero', label: 'Homepage Hero', icon: LayoutTemplate },
              { id: 'philosophy', label: 'Brand Philosophy', icon: MessageSquare },
              { id: 'contact', label: 'Global Contact Info', icon: Globe },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                    isActive 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Active Tab Content */}
        <div className="flex-1 w-full bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8">
          
          {/* TAB 1: HERO */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-bold text-slate-900">Cinematic Hero Settings</h3>
              <hr className="border-slate-100" />
              
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-900">
                  Slide 1 Configuration
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Top Title (Small)</label>
                    <input 
                      type="text" 
                      value={content.hero.slide1Title}
                      onChange={(e) => setContent({...content, hero: {...content.hero, slide1Title: e.target.value}})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Main Title (Large Italic)</label>
                    <input 
                      type="text" 
                      value={content.hero.slide1TitleItalic}
                      onChange={(e) => setContent({...content, hero: {...content.hero, slide1TitleItalic: e.target.value}})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Subtitle Description</label>
                  <textarea 
                    rows={2}
                    value={content.hero.slide1Subtitle}
                    onChange={(e) => setContent({...content, hero: {...content.hero, slide1Subtitle: e.target.value}})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PHILOSOPHY */}
          {activeTab === 'philosophy' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-bold text-slate-900">Brand Philosophy Section</h3>
              <hr className="border-slate-100" />
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Main Blockquote</label>
                <textarea 
                  rows={4}
                  value={content.philosophy.quote}
                  onChange={(e) => setContent({...content, philosophy: {...content.philosophy, quote: e.target.value}})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Bottom Tagline</label>
                <input 
                  type="text" 
                  value={content.philosophy.tagline}
                  onChange={(e) => setContent({...content, philosophy: {...content.philosophy, tagline: e.target.value}})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-bold text-slate-900">Global Contact Details</h3>
              <p className="text-sm text-slate-500 mt-1">These update the footer and contact pages automatically.</p>
              <hr className="border-slate-100" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 flex items-center gap-1.5"><Mail className="h-3 w-3" /> Email Address</label>
                  <input 
                    type="email" 
                    value={content.contact.email}
                    onChange={(e) => setContent({...content, contact: {...content.contact, email: e.target.value}})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 flex items-center gap-1.5"><Phone className="h-3 w-3" /> Phone Number</label>
                  <input 
                    type="text" 
                    value={content.contact.phone}
                    onChange={(e) => setContent({...content, contact: {...content.contact, phone: e.target.value}})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 flex items-center gap-1.5"><MessageSquare className="h-3 w-3" /> WhatsApp Number</label>
                  <input 
                    type="text" 
                    value={content.contact.whatsapp}
                    onChange={(e) => setContent({...content, contact: {...content.contact, whatsapp: e.target.value}})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Office Address</label>
                  <input 
                    type="text" 
                    value={content.contact.address}
                    onChange={(e) => setContent({...content, contact: {...content.contact, address: e.target.value}})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};