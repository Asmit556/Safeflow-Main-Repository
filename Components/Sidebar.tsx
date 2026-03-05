import React from 'react';
import { Snowflake, MapPin, Plus, Minus } from 'lucide-react';
import { CURRENT_LOCATION } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-80 bg-slate-50 h-screen flex flex-col border-r border-slate-200 shrink-0 overflow-y-auto">
      {/* Header */}
      <div className="p-6 flex flex-col items-center text-center">
        <Snowflake size={48} className="text-blue-400 mb-4" />
        <h1 className="text-2xl font-bold text-blue-600 mb-1">Safeflow</h1>
        <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
          Advanced Glacier Monitoring & GLOF Risk Assessment
        </p>
      </div>

      {/* Location Section */}
      <div className="px-4 py-4">
        <div className="flex items-center text-pink-600 font-bold mb-2">
          <MapPin size={16} className="mr-1" />
          <span>Location</span>
        </div>
        
        <div className="bg-blue-100/50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-800 text-sm mb-2">
            Monitoring {CURRENT_LOCATION.name}
          </h3>
          <div className="text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Latitude:</span>
              <span className="font-mono">{CURRENT_LOCATION.latitude}</span>
            </div>
            <div className="flex justify-between">
              <span>Longitude:</span>
              <span className="font-mono">{CURRENT_LOCATION.longitude}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Preview */}
      <div className="px-4 pb-6 flex-1 flex flex-col">
        <div className="flex items-center text-slate-700 font-bold mb-2">
          <span className="mr-2">🗺️</span>
          <span>Location Preview</span>
        </div>
        
        <div className="relative w-full aspect-square bg-slate-200 rounded-lg overflow-hidden border border-slate-300 shadow-inner">
           {/* Simulated Leaflet UI controls */}
           <div className="absolute top-2 left-2 z-10 flex flex-col bg-white rounded shadow border border-slate-300">
             <button className="p-1 hover:bg-slate-100 border-b border-slate-200"><Plus size={14} /></button>
             <button className="p-1 hover:bg-slate-100"><Minus size={14} /></button>
           </div>
           
           {/* Embedded OSM Map */}
           <iframe 
             width="100%" 
             height="100%" 
             frameBorder="0" 
             scrolling="no" 
             marginHeight={0} 
             marginWidth={0} 
             src={`https://www.openstreetmap.org/export/embed.html?bbox=${CURRENT_LOCATION.longitude - 0.05},${CURRENT_LOCATION.latitude - 0.05},${CURRENT_LOCATION.longitude + 0.05},${CURRENT_LOCATION.latitude + 0.05}&layer=mapnik&marker=${CURRENT_LOCATION.latitude},${CURRENT_LOCATION.longitude}`}
             className="opacity-90 grayscale-[20%]"
           ></iframe>
           
           <div className="absolute bottom-0 right-0 bg-white/80 text-[10px] px-1 text-slate-500">
             © OpenStreetMap contributors
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;