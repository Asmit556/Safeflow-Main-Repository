export interface MetricData {
  id: string;
  label: string;
  value: number;
  unit: string;
  threshold: number;
  isDangerous: boolean;
  warningMessage: string;
}

export interface RiskScore {
  score: number;
  change: number;
  level: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
  lastUpdated: string;
}