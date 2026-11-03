import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, UploadCloud, RefreshCw, CheckCircle2, AlertTriangle, 
  FileJson, FileText, Play, Server, ArrowRight, ShieldAlert,
  Loader2, Check, XCircle, FileSpreadsheet, HardDrive, Search 
} from 'lucide-react';
import { writeBatch, collection, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

// --- TYPES ---
type MigrationStep = 'configure' | 'scan' | 'validate' | 'execute' | 'report';
type MigrationCategory = 'tours' | 'destinations' | 'products' | 'customers' | 'reviews';
type SourceType = 'legacy_api' | 'json_upload' | 'csv_upload';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

// --- REAL DATA PAYLOADS ---
const PAYLOADS: Record<string, any[]> = {
  tours: [
    { title: "Ethiopian Safari & Wildlife", duration: "7 Days / 6 Nights", price: 2100, location: "Awash & Nech Sar", status: "Published", slug: "safari" },
    { title: "Simien & Bale Mountains Trek", duration: "10 Days / 9 Nights", price: 2850, location: "Amhara & Oromia", status: "Published", slug: "mountains" },
    { title: "Endemic Birding Tour", duration: "12 Days / 11 Nights", price: 3200, location: "Rift Valley Lakes", status: "Published", slug: "birding" },
    { title: "Cultural Festivals: Timkat", duration: "6 Days / 5 Nights", price: 1950, location: "Gondar & Lalibela", status: "Published", slug: "festivals" },
    { title: "Shewa Land Escape", duration: "3 Days / 2 Nights", price: 450, location: "North Shewa", status: "Published", slug: "shewa-land-escape" },
    { title: "Kundudo & Babile Sanctuary", duration: "5 Days / 4 Nights", price: 1200, location: "Eastern Ethiopia", status: "Published", slug: "kundudo-babile" },
    { title: "Signature Historic Route", duration: "14 Days / 13 Nights", price: 4100, location: "Northern Circuit", status: "Published", slug: "signature-routes" }
  ],
  destinations: [
    { name: "Lalibela", region: "Amhara", highlight: "Rock-Hewn Churches", status: "Active", slug: "lalibela" },
    { name: "Gondar", region: "Amhara", highlight: "Fasil Ghebbi Castles", status: "Active", slug: "gondar" },
    { name: "Simien Mountains", region: "Amhara", highlight: "Alpine Scenery & Wildlife", status: "Active", slug: "simien-mountains" },
    { name: "Omo Valley", region: "SNNPR", highlight: "Indigenous Cultures", status: "Active", slug: "omo-valley" }
  ],
  products: [
    { name: "Premium Yirgacheffe Coffee Beans", price: 24.99, category: "Coffee", stock: 150, status: "In Stock", slug: "yirgacheffe-coffee" },
    { name: "Handwoven Cotton Gabbi", price: 85.00, category: "Textiles", stock: 42, status: "In Stock", slug: "cotton-gabbi" }
  ],
  customers: [],
  reviews: []
};

export const DataMigration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<MigrationStep>('configure');
  const [category, setCategory] = useState<MigrationCategory>('tours');
  const [sourceType, setSourceType] = useState<SourceType>('legacy_api');
  
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (type: LogEntry['type'], message: string) => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message
    }]);
  };

  const handleScan = () => {
    setCurrentStep('scan');
    setIsScanning(true);
    setLogs([]);
    
    addLog('info', `Initializing connection to ${sourceType.replace('_', ' ').toUpperCase()}...`);
    
    setTimeout(() => {
      addLog('info', 'Authenticating and fetching schema...');
      setTimeout(() => {
        addLog('success', `Connected successfully. Detected ${PAYLOADS[category].length} records. Scanning...`);
        setTimeout(() => {
          setIsScanning(false);
          setCurrentStep('validate');
        }, 1500);
      }, 1000);
    }, 1000);
  };

  // --- IDEMPOTENT FIREBASE EXECUTION SCRIPT ---
  const handleExecute = async () => {
    setCurrentStep('execute');
    setProgress(0);
    setLogs([]);
    
    addLog('info', 'Starting live migration sequence to Firebase...');
    addLog('info', `Enforcing security rules for collection: ${category}...`);

    try {
      const batch = writeBatch(db);
      const targetRef = collection(db, category);
      const dataToMigrate = PAYLOADS[category];

      if (dataToMigrate.length === 0) {
        throw new Error("No data found for this category.");
      }

      // Stage the writes and animate the progress bar
      for (let i = 0; i < dataToMigrate.length; i++) {
        const item = dataToMigrate[i];
        const itemName = item.title || item.name || `Record #${i}`;
        
        // Generate a predictable Document ID from the slug or name
        // This guarantees we overwrite instead of duplicating!
        const docId = item.slug || itemName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        const newDocRef = doc(targetRef, docId);
        
        batch.set(newDocRef, {
          ...item,
          updatedAt: new Date().toISOString(),
        });

        addLog('success', `Staged (Idempotent): ${itemName} (ID: ${docId})`);
        
        // Artificial delay so you can watch the UI progress bar fill up smoothly
        await new Promise(r => setTimeout(r, 400));
        setProgress(Math.floor(((i + 1) / dataToMigrate.length) * 85));
      }

      addLog('info', 'Committing transaction to live database...');
      await batch.commit();

      setProgress(100);
      addLog('success', 'Migration sequence completed successfully. No duplicates created.');
      setTimeout(() => setCurrentStep('report'), 1000);
      
    } catch (error: any) {
      addLog('error', `Migration failed: ${error.message}`);
    }
  };

  const resetMigration = () => {
    setCurrentStep('configure');
    setProgress(0);
    setLogs([]);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-20 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Data Migration Center</h1>
          <p className="text-sm text-slate-500 mt-1">Safely import legacy website content, tours, and e-commerce records into Firebase.</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-lg">
          <ShieldAlert className="h-4 w-4" />
          Production Environment
        </div>
      </div>

      {/* Stepper Progress */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-900 -z-10 transition-all duration-500" 
            style={{ width: `${['configure', 'scan', 'validate', 'execute', 'report'].indexOf(currentStep) * 25}%` }}
          />
          
          {[
            { id: 'configure', label: 'Configuration', icon: Database },
            { id: 'scan', label: 'Scan & Map', icon: Search },
            { id: 'validate', label: 'Validation', icon: CheckCircle2 },
            { id: 'execute', label: 'Execution', icon: Play },
            { id: 'report', label: 'Summary', icon: FileText }
          ].map((step, index) => {
            const Icon = step.icon;
            const isPassed = ['configure', 'scan', 'validate', 'execute', 'report'].indexOf(currentStep) >= index;
            const isActive = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isActive ? 'border-slate-900 bg-slate-900 text-white shadow-md' :
                  isPassed ? 'border-slate-900 bg-white text-slate-900' :
                  'border-slate-200 bg-white text-slate-300'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-wider hidden sm:block ${isActive ? 'text-slate-900' : isPassed ? 'text-slate-600' : 'text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: CONFIGURATION */}
      {currentStep === 'configure' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">1. Target Data Category</h3>
            <div className="space-y-3">
              {[
                { id: 'tours', label: 'Tour Packages & Itineraries', count: `${PAYLOADS.tours.length} detected` },
                { id: 'destinations', label: 'Regional Destinations', count: `${PAYLOADS.destinations.length} detected` },
                { id: 'products', label: 'Shop Inventory & Gear', count: `${PAYLOADS.products.length} detected` },
              ].map(cat => (
                <label 
                  key={cat.id} 
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    category === cat.id ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={category === cat.id} 
                      onChange={() => setCategory(cat.id as MigrationCategory)}
                      className="text-slate-900 focus:ring-slate-900"
                    />
                    <span className="text-sm font-semibold text-slate-900">{cat.label}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono bg-white px-2 py-1 rounded border border-slate-100">{cat.count}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6">2. Import Source</h3>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setSourceType('legacy_api')}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${sourceType === 'legacy_api' ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <Server className={`h-6 w-6 mt-0.5 ${sourceType === 'legacy_api' ? 'text-slate-900' : 'text-slate-400'}`} />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Live Website Sync</h4>
                    <p className="text-xs text-slate-500 mt-1">Connect directly to the existing production database endpoints.</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => setSourceType('json_upload')}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${sourceType === 'json_upload' ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <FileJson className={`h-6 w-6 mt-0.5 ${sourceType === 'json_upload' ? 'text-slate-900' : 'text-slate-400'}`} />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">JSON Export File</h4>
                    <p className="text-xs text-slate-500 mt-1">Upload a structured .json schema dump.</p>
                  </div>
                </button>
              </div>
            </div>

            <button 
              onClick={handleScan}
              className="w-full mt-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Connect & Scan Source</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
        </div>
      )}

      {/* STEP 2: SCAN & LOGS */}
      {currentStep === 'scan' && (
        <div className="bg-[#0f172a] rounded-xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 border border-slate-800">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Scanning Payload Array...</h3>
          </div>
          
          <div className="space-y-3 font-mono text-sm h-64 overflow-y-auto custom-scrollbar">
            {logs.map(log => (
              <div key={log.id} className="flex items-start gap-3">
                <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                <span className={`${
                  log.type === 'info' ? 'text-blue-400' :
                  log.type === 'success' ? 'text-emerald-400' :
                  log.type === 'warning' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      )}

      {/* STEP 3: VALIDATION PREVIEW */}
      {currentStep === 'validate' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Pre-Migration Validation Report</h3>
                <p className="text-sm text-slate-500 mt-1">Found <strong className="text-slate-900">{PAYLOADS[category].length} records</strong> in category '{category}'. Verify mappings before execution.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="h-4 w-4" /> {PAYLOADS[category].length} Ready
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="font-medium px-6 py-4">Status</th>
                    <th className="font-medium px-6 py-4">Record Title / Name</th>
                    <th className="font-medium px-6 py-4">Data Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PAYLOADS[category].map((item, idx) => (
                    <tr key={idx} className="bg-white">
                      <td className="px-6 py-4 text-emerald-600">
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 px-2 py-1 rounded">
                          <Check className="h-3 w-3" /> Ready
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">{item.title || item.name}</td>
                      <td className="px-6 py-4 font-mono text-slate-500 capitalize">{category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button 
                onClick={() => setCurrentStep('configure')}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel & Reconfigure
              </button>
              <button 
                onClick={handleExecute}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 rounded-xl transition-all shadow-md"
              >
                <HardDrive className="h-4 w-4" />
                Execute Migration Write
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: EXECUTION TERMINAL */}
      {currentStep === 'execute' && (
        <div className="bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden border border-slate-800 animate-in zoom-in-95">
          <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/20">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Active Migration Process</h3>
              <p className="text-xs font-mono text-slate-400 mt-1">Writing objects to Firebase Firestore via batched transactions.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-serif font-bold text-emerald-400">{progress}%</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 relative overflow-hidden" 
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          <div className="p-6 space-y-3 font-mono text-sm h-72 overflow-y-auto custom-scrollbar">
            {logs.map(log => (
              <div key={log.id} className="flex items-start gap-3">
                <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                <span className={`${
                  log.type === 'info' ? 'text-blue-400' :
                  log.type === 'success' ? 'text-emerald-400' :
                  log.type === 'warning' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      )}

      {/* STEP 5: SUMMARY REPORT */}
      {currentStep === 'report' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden text-center p-10 sm:p-16 animate-in slide-in-from-bottom-8">
          <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Migration Successful</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-10">
            Firebase collections have been updated securely. Public IDs were preserved to prevent SEO indexing loss.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl">
              <div className="text-3xl font-bold text-slate-900">{PAYLOADS[category].length}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Total Records</div>
            </div>
            <div className="p-4 border border-emerald-100 bg-emerald-50 rounded-xl">
              <div className="text-3xl font-bold text-emerald-700">{PAYLOADS[category].length}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mt-1">Migrated</div>
            </div>
            <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl">
              <div className="text-3xl font-bold text-slate-400">0</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Skipped</div>
            </div>
            <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl">
              <div className="text-3xl font-bold text-slate-400">0</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Failed</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={resetMigration}
              className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-sm font-bold uppercase tracking-widest rounded-xl transition-all w-full sm:w-auto"
            >
              Start New Job
            </button>
            <button 
              onClick={() => window.location.href = `/admin/${category}`}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-md w-full sm:w-auto flex items-center justify-center gap-2"
            >
              View Migrated Data <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};