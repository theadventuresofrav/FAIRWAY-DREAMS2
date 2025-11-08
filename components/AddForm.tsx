import React, { useState } from 'react';
import type { Contact } from '../types';
import { View } from '../types';

interface AddFormProps {
  setView: (view: View) => void;
  addContact?: (data: Omit<Contact, 'id' | 'lifePath' | 'expression' | 'score' | 'readings' | 'advancedReadings'>) => void;
  contactToEdit?: Contact;
  updateContact?: (contact: Contact) => void;
}

const AddForm: React.FC<AddFormProps> = ({ addContact, setView, contactToEdit, updateContact }) => {
  const isEditMode = !!contactToEdit;

  const [form, setForm] = useState({
    fullName: contactToEdit?.fullName || '',
    birthdate: contactToEdit?.birthdate || '',
    birthTime: contactToEdit?.birthTime || '',
    email: contactToEdit?.email || ''
  });
  const [emailError, setEmailError] = useState('');

  const isEmailValid = (email: string): boolean => {
    // Email is optional, so it's valid if empty
    if (!email) return true;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.birthdate) {
      alert('Please fill all required fields: Full Name and Birth Date.');
      return;
    }

    if (!isEmailValid(form.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (isEditMode && updateContact && contactToEdit) {
      updateContact({
        ...contactToEdit, // keep id and other unchanged properties
        ...form,
      });
    } else if (addContact) {
      addContact(form);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, email: e.target.value });
    if (emailError) {
      setEmailError('');
    }
  };
  
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value && !isEmailValid(e.target.value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      setView(View.Detail);
    } else {
      setView(View.List);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">{isEditMode ? 'Edit Contact Profile' : 'Add Contact Profile'}</h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({...form, fullName: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
            placeholder="John Smith"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="birthdate">Birth Date *</label>
          <input
            id="birthdate"
            type="date"
            value={form.birthdate}
            onChange={(e) => setForm({...form, birthdate: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="birthTime">
            Birth Time <span className="font-normal text-gray-500">(for advanced readings)</span>
          </label>
          <input
            id="birthTime"
            type="time"
            value={form.birthTime || ''}
            onChange={(e) => setForm({...form, birthTime: e.target.value})}
            className="w-full px-4 py-3 border border-yellow-400 rounded-xl bg-yellow-50 focus:ring-2 focus:ring-yellow-500 transition"
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className={`w-full px-4 py-3 border rounded-xl transition focus:ring-2 ${
              emailError
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="email@example.com"
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-gray-800 to-black text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            {isEditMode ? 'Update Profile' : 'Create Profile'}
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 sm:flex-none px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;