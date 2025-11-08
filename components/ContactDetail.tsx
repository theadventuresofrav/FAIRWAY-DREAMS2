import React from 'react';
import { Download, X, Crown, ArrowLeft, FileText, Edit } from 'lucide-react';
import type { Contact } from '../types';
import { View } from '../types';
import CoreReadingsDisplay from './CoreReadingsDisplay';
import AdvancedReadingsDisplay from './AdvancedReadingsDisplay';
import PersonalCyclesDisplay from './PersonalCyclesDisplay';

const MasterNumberInfo: React.FC<{ lifePath: number }> = ({ lifePath }) => {
  let title = '';
  let description = '';

  switch (lifePath) {
    case 11:
      title = 'The Visionary';
      description = 'Intuitive leadership and inspiration';
      break;
    case 22:
      title = 'The Master Builder';
      description = 'Large-scale manifestation power';
      break;
    case 33:
      title = 'The Master Teacher';
      description = 'Healing through service';
      break;
    default:
      return null;
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-6 sm:p-8 rounded-2xl shadow-2xl">
      <div className="flex items-center gap-4 mb-4">
        <Crown className="w-8 h-8 text-yellow-400 shrink-0" />
        <div>
          <h3 className="text-xl sm:text-2xl font-bold">Master Number {lifePath}: {title}</h3>
          <p className="text-purple-200">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface ContactDetailProps {
  contact: Contact;
  setView: (view: View) => void;
  deleteContact: (id: number) => void;
  saveAiContent: (contactId: number, content: { aiSummary?: string; aiBios?: string }) => void;
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contact, setView, deleteContact, saveAiContent }) => {
  const handleDownload = () => {
    const text = `FAIRWAY DREAMS PROFILE\n\nName: ${contact.fullName}\nEmail: ${contact.email}\nBirth Date: ${contact.birthdate}\nBirth Time: ${contact.birthTime || 'Not provided'}\n\nLife Path: ${contact.lifePath}\nExpression: ${contact.expression}\nGG33 Score: ${contact.score}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contact.fullName.replace(/\s/g,'_')}_profile.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${contact.fullName}?`)) {
        deleteContact(contact.id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
        <div>
          <button
            onClick={() => setView(View.List)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Contacts
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{contact.fullName}</h1>
          <p className="text-gray-600">{contact.email}</p>
          {contact.birthTime ? (
            <p className="text-sm text-gray-500 mt-1">Birth Time: {contact.birthTime}</p>
          ) : (
            <p className="text-sm text-gray-500 mt-1 italic">Birth time not provided</p>
          )}
        </div>
        <div className="flex gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setView(View.Edit)}
            title="Edit Contact"
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
          >
            <Edit className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleDownload}
            title="Download Profile"
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
          >
            <Download className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleDelete}
            title="Delete Contact"
            className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-black">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Visionary Architect Report</h3>
            <p className="text-gray-600 mt-1">Deep-dive analysis of numerological patterns.</p>
          </div>
          <button
            onClick={() => setView(View.Report)}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-all flex items-center gap-2 justify-center w-full sm:w-auto"
          >
            <FileText className="w-5 h-5" />
            Generate Full Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-sm font-bold text-gray-600 uppercase mb-2">Life Path</h3>
          <div className="text-5xl font-bold text-gray-900">{contact.lifePath}</div>
          <p className="text-sm text-gray-600 mt-2">Core number</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl shadow-xl border border-yellow-200">
          <h3 className="text-sm font-bold text-amber-700 uppercase mb-2">Expression</h3>
          <div className="text-5xl font-bold text-gray-900">{contact.expression}</div>
          <p className="text-sm text-gray-700 mt-2">Destiny number</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-black text-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-sm font-bold text-yellow-400 uppercase mb-2">GG33 Score</h3>
          <div className="text-5xl font-bold">{contact.score}</div>
          <p className="text-sm text-gray-300 mt-2">
            {contact.score >= 75 ? 'Elite Tier' : 'Premium'}
          </p>
        </div>
      </div>

      <CoreReadingsDisplay contact={contact} saveAiContent={saveAiContent} />
      
      {contact.advancedReadings && <AdvancedReadingsDisplay contact={contact} />}

      <PersonalCyclesDisplay contact={contact} />

      {[11, 22, 33].includes(contact.lifePath) && <MasterNumberInfo lifePath={contact.lifePath} />}

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Birth Information</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-semibold text-gray-600 w-24 inline-block">Birth Date:</span>
            <span className="ml-2 text-gray-900">{contact.birthdate}</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-600 w-24 inline-block">Birth Time:</span>
            <span className="ml-2 text-gray-900">
              {contact.birthTime || <span className="italic text-gray-500">Not provided</span>}
            </span>
          </div>
          {contact.email && (
            <div>
              <span className="text-sm font-semibold text-gray-600 w-24 inline-block">Email:</span>
              <span className="ml-2 text-gray-900">{contact.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;