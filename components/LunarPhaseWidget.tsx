import React, { useState, useEffect } from 'react';

interface LunarPhase {
  date: Date;
  phase: string;
  icon: string;
}

const LunarPhaseWidget: React.FC = () => {
  const [lunarPhases, setLunarPhases] = useState<LunarPhase[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>('');

  const calculateLunarPhases = (year: number, month: number) => {
    const phases: LunarPhase[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const age = getLunarAge(date);
      const phase = getLunarPhase(age);
      phases.push({ date, phase, icon: getLunarIcon(phase) });
    }

    return phases;
  };

  const getLunarAge = (date: Date) => {
    const knownNewMoon = new Date('2000-01-06T18:14:00Z');
    const diff = date.getTime() - knownNewMoon.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return (days % 29.53) / 29.53;
  };

  const getLunarPhase = (age: number) => {
    if (age < 0.03 || age >= 0.97) return 'New Moon';
    if (age < 0.22) return 'Waxing Crescent';
    if (age < 0.28) return 'First Quarter';
    if (age < 0.47) return 'Waxing Gibbous';
    if (age < 0.53) return 'Full Moon';
    if (age < 0.72) return 'Waning Gibbous';
    if (age < 0.78) return 'Last Quarter';
    return 'Waning Crescent';
  };

  const getLunarIcon = (phase: string) => {
    switch (phase) {
      case 'New Moon': return '🌑';
      case 'Waxing Crescent': return '🌒';
      case 'First Quarter': return '🌓';
      case 'Waxing Gibbous': return '🌔';
      case 'Full Moon': return '🌕';
      case 'Waning Gibbous': return '🌖';
      case 'Last Quarter': return '🌗';
      case 'Waning Crescent': return '🌘';
      default: return '🌑';
    }
  };

  useEffect(() => {
    const updateLunarPhases = () => {
      const now = new Date();
      const phases = calculateLunarPhases(now.getFullYear(), now.getMonth());
      setLunarPhases(phases);
      setCurrentMonth(now.toLocaleString('default', { month: 'long', year: 'numeric' }));
    };

    updateLunarPhases();
    const interval = setInterval(updateLunarPhases, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-transparent p-4 rounded-lg shadow-lg w-64">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{currentMonth}</h2>
      <div className="grid grid-cols-7 gap-1">
        {lunarPhases.map((phase, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl">{phase.icon}</div>
            <div className="text-xs text-gray-600">{phase.date.getDate()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LunarPhaseWidget;