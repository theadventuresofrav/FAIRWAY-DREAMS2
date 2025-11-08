import React from 'react';
import { BadgeCheck } from 'lucide-react';
import type { Contact } from '../types';
import { View } from '../types';

interface ContactCardProps {
  contact: Contact;
  setView: (view: View) => void;
  setSelectedContact: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, setView, setSelectedContact }) => (
  <div 
    className="relative group bg-white p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
    onClick={() => {
      setSelectedContact(contact);
      setView(View.Detail);
    }}
  >
    {/* Tooltip */}
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 whitespace-nowrap z-10">
      <div className="flex gap-4">
        <div>
          <span className="text-xs text-gray-400">Life Path</span>
          <p className="font-bold text-center">{contact.lifePath}</p>
        </div>
        <div>
          <span className="text-xs text-gray-400">Expression</span>
          <p className="font-bold text-center">{contact.expression}</p>
        </div>
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
    </div>

    <div className="flex justify-between items-start gap-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-900 truncate">{contact.fullName}</h3>
          {contact.score >= 75 && (
            <BadgeCheck className="w-5 h-5 text-blue-500 shrink-0" title="Elite Tier" />
          )}
        </div>
        <p className="text-sm text-gray-600 truncate">{contact.email || 'No email'}</p>
      </div>
      <div 
        className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full font-bold shadow-lg shrink-0"
        title="GG33 Score: A score indicating numerological significance."
      >
        {contact.score}
      </div>
    </div>
  </div>
);

export default ContactCard;