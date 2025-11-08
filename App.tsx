import React, { useState, useCallback, useEffect } from 'react';
import type { Contact } from './types';
import { View } from './types';
import { calcLifePath, calcExpression, calculateScore, calculateCoreReadings, calculateAdvancedReadings } from './services/numerologyService';

import Home from './components/Home';
import ContactsList from './components/ContactsList';
import AddForm from './components/AddForm';
import ContactDetail from './components/ContactDetail';
import Readings from './components/Readings';
import Report from './components/Report';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.Home);
  const [contacts, setContacts] = useState<Contact[]>(() => {
    try {
      const savedContacts = localStorage.getItem('fairway_dreams_contacts');
      return savedContacts ? JSON.parse(savedContacts) : [];
    } catch (error) {
      console.error("Could not load contacts from local storage", error);
      return [];
    }
  });
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('fairway_dreams_contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error("Could not save contacts to local storage", error);
    }
  }, [contacts]);

  const addContact = useCallback((data: Omit<Contact, 'id' | 'lifePath' | 'expression' | 'score' | 'readings' | 'advancedReadings' | 'aiSummary' | 'aiBios'>) => {
    const lifePath = calcLifePath(data.birthdate);
    const expression = calcExpression(data.fullName);
    
    const readings = calculateCoreReadings({
      fullName: data.fullName,
      birthdate: data.birthdate,
      lifePath,
      expression,
    });
    
    const advancedReadings = calculateAdvancedReadings(data.birthdate, data.birthTime, lifePath);
    
    const score = calculateScore({
      lifePath,
      expression,
      birthTime: data.birthTime,
    });
    
    const newContact: Contact = {
      id: Date.now(),
      ...data,
      lifePath,
      expression,
      score,
      readings,
      advancedReadings,
    };

    setContacts(prevContacts => [...prevContacts, newContact].sort((a, b) => b.score - a.score));
    setView(View.List);
  }, []);

  const bulkAddContacts = useCallback((newContactsData: Omit<Contact, 'id' | 'lifePath' | 'expression' | 'score' | 'readings' | 'advancedReadings' | 'aiSummary' | 'aiBios'>[]) => {
    const newlyCreatedContacts = newContactsData.map(data => {
      const lifePath = calcLifePath(data.birthdate);
      const expression = calcExpression(data.fullName);
      
      const readings = calculateCoreReadings({
        fullName: data.fullName,
        birthdate: data.birthdate,
        lifePath,
        expression,
      });
      
      const advancedReadings = calculateAdvancedReadings(data.birthdate, data.birthTime, lifePath);
      
      const score = calculateScore({
        lifePath,
        expression,
        birthTime: data.birthTime,
      });
      
      const newContact: Contact = {
        id: Date.now() + Math.random(), // Add random to avoid key collision in fast loops
        ...data,
        lifePath,
        expression,
        score,
        readings,
        advancedReadings,
      };
      return newContact;
    });

    setContacts(prevContacts => [...prevContacts, ...newlyCreatedContacts].sort((a, b) => b.score - a.score));
  }, []);

  const updateContact = useCallback((updatedContactData: Contact) => {
    const lifePath = calcLifePath(updatedContactData.birthdate);
    const expression = calcExpression(updatedContactData.fullName);
    
    const readings = calculateCoreReadings({
      fullName: updatedContactData.fullName,
      birthdate: updatedContactData.birthdate,
      lifePath,
      expression,
    });
    
    const advancedReadings = calculateAdvancedReadings(updatedContactData.birthdate, updatedContactData.birthTime, lifePath);
    
    const score = calculateScore({
      lifePath,
      expression,
      birthTime: updatedContactData.birthTime,
    });

    const fullyUpdatedContact: Contact = {
        ...updatedContactData,
        lifePath,
        expression,
        score,
        readings,
        advancedReadings,
    };

    setContacts(prevContacts => 
        prevContacts
            .map(c => c.id === fullyUpdatedContact.id ? fullyUpdatedContact : c)
            .sort((a, b) => b.score - a.score)
    );
    setSelectedContact(fullyUpdatedContact);
    setView(View.Detail);
  }, []);

  const saveAiContent = useCallback((contactId: number, content: { aiSummary?: string; aiBios?: string }) => {
    setContacts(prevContacts =>
        prevContacts.map(c =>
            c.id === contactId ? { ...c, ...content } : c
        )
    );
    setSelectedContact(prevSelected =>
        prevSelected?.id === contactId ? { ...prevSelected, ...content } : prevSelected
    );
  }, []);

  const deleteContact = useCallback((id: number) => {
    setContacts(prevContacts => prevContacts.filter(c => c.id !== id));
    setView(View.List);
    setSelectedContact(null);
  }, []);
  
  const renderView = () => {
    switch (view) {
      case View.Home:
        return <Home contacts={contacts} setView={setView} />;
      case View.List:
        return <ContactsList contacts={contacts} setView={setView} setSelectedContact={setSelectedContact} bulkAddContacts={bulkAddContacts} />;
      case View.Add:
        return <AddForm addContact={addContact} setView={setView} />;
      case View.Edit:
        if (selectedContact) {
            return <AddForm setView={setView} contactToEdit={selectedContact} updateContact={updateContact} />;
        }
        setView(View.List); 
        return null;
      case View.Detail:
        if (selectedContact) {
          return <ContactDetail contact={selectedContact} setView={setView} deleteContact={deleteContact} saveAiContent={saveAiContent} />;
        }
        setView(View.List); 
        return null;
      case View.Readings:
        return <Readings />;
      case View.Report:
        if (selectedContact) {
            return <Report contact={selectedContact} setView={setView} />;
        }
        setView(View.List);
        return null;
      default:
        return <Home contacts={contacts} setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setView(View.Home)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-xl">⛳️</span>
            </div>
            <span className="font-bold text-gray-800 hidden sm:inline text-lg">Fairway Dreams</span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
             <button 
               onClick={() => setView(View.Home)}
               className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${view === View.Home ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Dashboard
              </button>
              <button 
               onClick={() => setView(View.List)}
               className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${[View.List, View.Detail, View.Add, View.Edit, View.Report].includes(view) ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Contacts
              </button>
              <button 
               onClick={() => setView(View.Readings)}
               className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${view === View.Readings ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Readings
              </button>
          </nav>
        </header>
        <main>
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;