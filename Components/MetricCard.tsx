import React from 'react';
import { MetricData } from '../types';
import { AlertTriangle } from 'lucide-react';

interface MetricCardProps {
  data: MetricData;
}

const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 flex flex-col h-full transition-transform hover:scale-[1.02]">
      <h4 className="text-slate-500 text-sm mb-4">{data.label}</h4>
      
      <div className="flex items-baseline mb-4">
        <span className="text-4xl font-bold text-blue-600 mr-1">{data.value}</span>
        <span className="text-xl text-slate-600 font-medium">{data.unit}</span>
      </div>

      <div className="mt-auto flex items-center text-red-500 text-xs font-bold">
        <AlertTriangle size={14} className="mr-1 shrink-0" />
        <span>{data.warningMessage}</span>
      </div>
    </div>
  );
};

export default MetricCard;