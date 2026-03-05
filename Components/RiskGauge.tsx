import React from 'react';

interface RiskGaugeProps {
  score: number;
  change: number;
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ score, change }) => {
  const radius = 110;
  const stroke = 35;
  const cx = 160;
  const cy = 150;
  
  const valueToAngle = (val: number) => {
    const clamped = Math.min(Math.max(val, 0), 100);
    return -180 + (clamped / 100) * 180;
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const describeArc = (x: number, y: number, r: number, startAngle: number, endAngle: number) => {
      const start = polarToCartesian(x, y, r, endAngle);
      const end = polarToCartesian(x, y, r, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      return [
          "M", start.x, start.y,
          "A", r, r, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");
  };

  const renderTick = (value: number) => {
      const angle = valueToAngle(value);
      const rTickStart = radius + (stroke / 2) + 4;
      const rTickEnd = radius + (stroke / 2) + 10;
      const rText = radius + (stroke / 2) + 24;

      const start = polarToCartesian(cx, cy, rTickStart, angle);
      const end = polarToCartesian(cx, cy, rTickEnd, angle);
      const textPos = polarToCartesian(cx, cy, rText, angle);

      return (
          <g key={value}>
              <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#94a3b8" strokeWidth="1.5" />
              <text 
                x={textPos.x} 
                y={textPos.y} 
                fontSize="12" 
                fill="#64748b" 
                textAnchor="middle" 
                alignmentBaseline="middle"
                className="font-sans font-medium"
              >
                  {value}
              </text>
          </g>
      );
  };

  return (
    <div className="flex flex-col items-center justify-center relative pt-2">
       {/* Title positioned directly above the gauge arc */}
      <h3 className="text-blue-900 text-lg font-semibold mb-1">GLOF Risk Level</h3>
      
      <div className="relative h-[180px] w-[340px] flex justify-center">
        <svg width="340" height="190" viewBox="0 0 320 180" className="overflow-visible">
             {/* Background Segments */}
             {/* 0-40: Light Blue */}
             <path d={describeArc(cx, cy, radius, valueToAngle(0), valueToAngle(40))} fill="none" stroke="#ADD8E6" strokeWidth={stroke} />
             {/* 40-60: Light Green */}
             <path d={describeArc(cx, cy, radius, valueToAngle(40), valueToAngle(60))} fill="none" stroke="#90EE90" strokeWidth={stroke} />
             {/* 60-80: Yellow */}
             <path d={describeArc(cx, cy, radius, valueToAngle(60), valueToAngle(80))} fill="none" stroke="#FFFF00" strokeWidth={stroke} />
             {/* 80-100: Red */}
             <path d={describeArc(cx, cy, radius, valueToAngle(80), valueToAngle(100))} fill="none" stroke="#FF0000" strokeWidth={stroke} />

             {/* Dark Blue Overlay for Current Score */}
            <path
                d={describeArc(cx, cy, radius, -180, valueToAngle(score))}
                fill="none"
                stroke="#00008B"
                strokeWidth={stroke}
            />

            {/* Ticks */}
            {[0, 20, 40, 60, 80, 100].map(renderTick)}
        </svg>

        <div className="absolute bottom-2 left-0 right-0 text-center flex flex-col items-center justify-center">
          <span className="text-[64px] font-bold text-[#00008B] tracking-tighter leading-none">{score.toFixed(1)}</span>
          <div className="flex items-center text-emerald-600 font-bold text-2xl mt-1 leading-none">
            <span className="mr-1 text-xl">▲</span>
            {change.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;