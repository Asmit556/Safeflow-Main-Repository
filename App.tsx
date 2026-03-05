import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';
import RiskGauge from './components/RiskGauge';
import { Snowflake, BrainCircuit, Loader2, Link as LinkIcon, TrendingUp, Activity } from 'lucide-react';
import { analyzeGlacierRisk } from './services/geminiService';

interface Metric {
  id: string;
  label: string;
  value: string;
  trend?: string;
}

interface Risk {
  score: number;
  change: string;
}

interface Location {
  name: string;
  lastUpdated: string;
}

const App: React.FC = () => {

  const [activeTab, setActiveTab] = useState('Current Status');
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [risk, setRisk] = useState<Risk | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const tabs = [
    'Current Status',
    'Forecast & Trends',
    'Advanced Analysis',
    'About GLOFs'
  ];

  useEffect(() => {

    const fetchModelData = async () => {
      try {

        const response = await fetch("http://localhost:8000/api/glof-prediction");
        const data = await response.json();

        setMetrics(data.metrics);
        setRisk(data.risk);
        setLocation(data.location);

      } catch (error) {
        console.error("Failed to load ML prediction data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModelData();

  }, []);

  const handleAnalyze = async () => {

    if (aiAnalysis || !location || !risk) return;

    setIsAnalyzing(true);

    const result = await analyzeGlacierRisk(
      location,
      metrics,
      risk
    );

    setAiAnalysis(result);
    setIsAnalyzing(false);

  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600"/>
      </div>
    );
  }

  return (

    <div className="flex h-screen bg-white overflow-hidden font-sans">

      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-y-auto scroll-smooth">

        {/* Header */}

        <header className="px-8 pt-8 pb-4">

          <div className="flex items-center gap-3 mb-2">
            <Snowflake className="text-blue-400 h-8 w-8" />
            <h1 className="text-3xl font-bold text-blue-600">SafeFlow</h1>
          </div>

          <p className="text-slate-500 text-sm ml-11">
            Advanced Glacier Monitoring & GLOF Risk Assessment
          </p>

        </header>

        {/* Tabs */}

        <div className="px-8 mt-6 border-b border-slate-200">

          <div className="flex space-x-6">

            {tabs.map((tab) => (

              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >

                {tab}

                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"/>
                )}

              </button>

            ))}

          </div>

        </div>

        {/* Content */}

        <div className="p-8">

          {activeTab === 'Current Status' && (

            <div className="max-w-6xl">

              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Current Status
              </h2>

              {/* Status Banner */}

              <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-sm text-sm font-semibold mb-8">
                Monitoring {location?.name} as of {location?.lastUpdated}
              </div>

              {/* Metrics */}

              <div className="mb-10">

                <div className="flex items-center gap-2 mb-6">
                  <h3 className="text-xl font-bold text-slate-800">
                    Predicted Features (ML Model Outputs)
                  </h3>
                  <LinkIcon size={16} className="text-slate-400"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {metrics.map((metric) => (
                    <MetricCard key={metric.id} data={metric}/>
                  ))}

                </div>

              </div>

              {/* Risk */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                <div>

                  <h3 className="text-xl font-bold text-slate-800 mb-8">
                    GLOF Risk Score
                  </h3>

                  <div className="bg-white p-8 rounded-xl flex justify-center">

                    <RiskGauge
                      score={risk?.score || 0}
                      change={risk?.change || ""}
                    />

                  </div>

                </div>

                {/* AI Analysis */}

                <div className="flex flex-col">

                  <div className="flex items-center justify-between mb-6">

                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <BrainCircuit className="text-purple-600"/>
                      AI Risk Analysis
                    </h3>

                    {!aiAnalysis && (

                      <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2"
                      >

                        {isAnalyzing
                          ? <Loader2 className="animate-spin w-4 h-4"/>
                          : "Generate Report"}

                      </button>

                    )}

                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex-1">

                    {!aiAnalysis && !isAnalyzing && (

                      <div className="text-slate-400 text-sm">
                        Click "Generate Report" for AI insights.
                      </div>

                    )}

                    {isAnalyzing && (

                      <div className="flex flex-col items-center justify-center text-purple-600 gap-3">

                        <Loader2 className="animate-spin w-8 h-8"/>

                        <span className="text-sm font-medium">
                          Analyzing glacier conditions...
                        </span>

                      </div>

                    )}

                    {aiAnalysis && (

                      <div className="prose prose-sm max-w-none">

                        <h4 className="text-purple-900 font-semibold mb-2">
                          Executive Risk Assessment
                        </h4>

                        <p className="whitespace-pre-line text-slate-700">
                          {aiAnalysis}
                        </p>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>

  );

};

export default App;