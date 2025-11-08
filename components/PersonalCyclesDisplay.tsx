import React from 'react';
import { HelpCircle } from 'lucide-react';
import type { Contact } from '../types';
import { glossary } from '../services/reportContentService';

interface PersonalCyclesDisplayProps {
  contact: Contact;
}

const ReadingItem: React.FC<{ label: string; value: string | number; description: string; }> = ({ label, value, description }) => {
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`${label}\n\n${description}`);
  };

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-2">
        <dt className="text-sm font-medium text-gray-600">{label}</dt>
        <button onClick={handleInfoClick} className="text-gray-400 hover:text-gray-600 transition-colors" title={`Learn about ${label}`}>
          <HelpCircle size={14} />
        </button>
      </div>
      <dd className="text-md font-bold text-gray-900 text-right">{value}</dd>
    </div>
  );
};

const PersonalCyclesDisplay: React.FC<PersonalCyclesDisplayProps> = ({ contact }) => {
  const { readings } = contact;
  if (!readings) {
    return null;
  }
  
  const { personalYear, personalMonth, personalDay } = readings;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <span className="text-3xl">🕰️</span>
        SECTION 5 – Personal Cycles & Timing
      </h2>
      <p className="text-sm text-gray-500 mb-4 -mt-2">
        Current energetic timing based on today's date.
      </p>
      <dl className="space-y-1">
        <ReadingItem label="Personal Year" value={personalYear} description={glossary.personalYear.description} />
        <ReadingItem label="Personal Month" value={personalMonth} description={glossary.personalMonth.description} />
        <ReadingItem label="Personal Day" value={personalDay} description={glossary.personalDay.description} />
      </dl>
    </div>
  );
};

export default PersonalCyclesDisplay;