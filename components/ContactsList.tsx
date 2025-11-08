import React, { useRef, useState } from 'react';
import { Users, Plus, Upload, X } from 'lucide-react';
import type { Contact } from '../types';
import { View } from '../types';
import ContactCard from './ContactCard';

interface ContactsListProps {
  contacts: Contact[];
  setView: (view: View) => void;
  setSelectedContact: (contact: Contact) => void;
  bulkAddContacts: (contacts: Omit<Contact, 'id' | 'lifePath' | 'expression' | 'score' | 'readings' | 'advancedReadings'>[]) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({ contacts, setView, setSelectedContact, bulkAddContacts }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importSummary, setImportSummary] = useState<{ success: number; errors: number } | null>(null);

  const handleBulkImportClick = () => {
    // Clear previous summary when opening file dialog
    setImportSummary(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text !== 'string') {
        alert('Could not read file.');
        return;
      }

      const rows = text.split('\n');
      const contactsToCreate: Omit<Contact, 'id' | 'lifePath' | 'expression' | 'score' | 'readings' | 'advancedReadings'>[] = [];
      let errorCount = 0;
      
      for (const row of rows) {
        if (row.trim() === '') continue; // Skip empty rows

        const [fullName, birthdate, birthTime, email] = row.split(',').map(cell => cell.trim());
        
        if (fullName && birthdate && /^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
          contactsToCreate.push({
            fullName,
            birthdate,
            birthTime: birthTime || undefined,
            email: email || ''
          });
        } else {
          errorCount++;
        }
      }

      if (contactsToCreate.length > 0) {
        bulkAddContacts(contactsToCreate);
      }

      setImportSummary({ success: contactsToCreate.length, errors: errorCount });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.onerror = () => {
      alert('Error reading the file.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.readAsText(file);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <h1 className="text-3xl font-bold text-gray-900">Elite Contacts</h1>
      <div className="flex gap-2">
        <button
          onClick={handleBulkImportClick}
          className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all flex items-center gap-2 justify-center transform hover:scale-105"
        >
          <Upload className="w-5 h-5" />
          Bulk Import
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv,text/csv"
          className="hidden"
        />
        <button
          onClick={() => setView(View.Add)}
          className="bg-gradient-to-r from-gray-800 to-black text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 justify-center transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add Contact
        </button>
      </div>
    </div>

    {importSummary && (
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-lg shadow-md mb-6 animate-fade-in" role="alert">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold mb-1">Bulk Import Complete</p>
                    <p>
                        <span className="font-semibold text-green-700">{importSummary.success}</span> contacts imported successfully.
                    </p>
                    {importSummary.errors > 0 && (
                        <p className="mt-1">
                            <span className="font-semibold text-red-700">{importSummary.errors}</span> rows failed due to invalid formatting.
                        </p>
                    )}
                </div>
                <button 
                    onClick={() => setImportSummary(null)} 
                    className="p-1 rounded-full hover:bg-blue-100 transition-colors"
                    aria-label="Dismiss"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    )}
    
    {contacts.length === 0 ? (
      <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
        <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-2xl font-bold text-gray-700 mb-3">No contacts yet</h3>
        <p className="text-gray-500 mb-6">Start building your network</p>
        <button
          onClick={() => setView(View.Add)}
          className="bg-gradient-to-r from-gray-800 to-black text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add First Contact
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map(c => <ContactCard key={c.id} contact={c} setView={setView} setSelectedContact={setSelectedContact} />)}
      </div>
    )}
  </div>
  )
};

export default ContactsList;