import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Users, Plus, Crown, Heart, Loader2, X } from 'lucide-react';
import type { Contact } from '../types';
import { View } from '../types';
import { numberMeanings } from '../services/reportContentService';

interface HomeProps {
  contacts: Contact[];
  setView: (view: View) => void;
}

const challengeThemes: { [key: number]: string } = {
  0: 'indecisiveness and choice', 1: 'self-assertion and confidence', 2: 'sensitivity and cooperation', 3: 'self-expression and focus', 4: 'discipline and structure', 5: 'freedom and responsibility', 6: 'perfectionism and acceptance', 7: 'trust and openness', 8: 'power and abundance'
};

const Home: React.FC<HomeProps> = ({ contacts, setView }) => {
  const eliteTierCount = contacts.filter(c => c.score >= 75).length;
  const masterNumberCount = contacts.filter(c => [11, 22, 33].includes(c.lifePath)).length;

  const [friendshipTips, setFriendshipTips] = useState<{ contact: Contact; tips: string; } | null>(null);
  const [isLoadingTips, setIsLoadingTips] = useState<Contact | null>(null);

  const findSupportOpportunities = (allContacts: Contact[]): Contact[] => {
    return allContacts.filter(c => 
      c.readings && 
      c.readings.challengeNumbers && 
      c.readings.personalDay === c.readings.challengeNumbers.main
    );
  };
  
  const supportOpportunities = findSupportOpportunities(contacts);

  const handleGetFriendshipTips = async (contact: Contact) => {
    setIsLoadingTips(contact);
    setFriendshipTips(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const challengeTheme = challengeThemes[contact.readings.challengeNumbers.main] || 'a core lesson';

      const prompt = `
        You are an empathetic numerologist and friendship coach. You provide concise, actionable advice on how to support a friend on a day that is numerologically significant for them.

        Today is a key day for my friend, ${contact.fullName}. Their Personal Day number is ${contact.readings.personalDay}, which matches their Main Challenge number. This means they are facing a core life lesson about ${challengeTheme}.

        Based on their personality profile below, provide 3 concrete, supportive, and non-intrusive suggestions for how I can be a good friend to them today. Tailor the advice to their communication style. Avoid suggesting generic things like "be there for them." Be specific.

        - Life Path: ${contact.lifePath} (${numberMeanings[contact.lifePath]?.strengths.join(', ')}) - This is their core journey.
        - Expression: ${contact.expression} (${numberMeanings[contact.expression]?.strengths.join(', ')}) - These are their natural talents.
        - Personality Number: ${contact.readings.personality} - This is how they appear to others and their likely communication preference.

        For example, if their Personality is 7 (analytical, private), suggest sending a thoughtful article instead of calling. If their Personality is 3 (social, expressive), suggest a lighthearted meme or a quick, fun call.

        Format the response as a simple bulleted list, with each suggestion on a new line starting with '-'.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
      });

      setFriendshipTips({ contact, tips: response.text });
    } catch (error) {
      console.error("Error generating friendship tips:", error);
      alert("There was an error generating tips. Please try again.");
    } finally {
      setIsLoadingTips(null);
    }
  };


  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white p-8 sm:p-12 rounded-3xl shadow-2xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-2xl sm:text-3xl">⛳️</span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold mb-2">Fairway Dreams</h1>
              <p className="text-yellow-200 text-base sm:text-xl">Beyond the Clubhouse</p>
            </div>
          </div>
          <p className="text-gray-300 text-md sm:text-lg">
            Highly personalized, predictive, tactical guidance based on your unique energy imprint.
            Birth time required for complete blueprint generation.
          </p>
        </div>
      </div>
      
      {/* Support Opportunities */}
      {supportOpportunities.length > 0 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-rose-500">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-rose-500" />
            <h2 className="text-2xl font-bold text-gray-900">Support Opportunities Today</h2>
          </div>
          <p className="text-gray-600 mb-6">These friends may be facing a core challenge today. It's a great opportunity to offer thoughtful support.</p>
          <div className="space-y-4">
            {supportOpportunities.map(contact => (
              <div key={contact.id} className="bg-rose-50 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-800">{contact.fullName}</h3>
                  <p className="text-sm text-rose-700">Their Personal Day ({contact.readings.personalDay}) aligns with their Main Challenge ({contact.readings.challengeNumbers.main}), focusing on {challengeThemes[contact.readings.challengeNumbers.main] || 'growth'}.</p>
                </div>
                <button
                  onClick={() => handleGetFriendshipTips(contact)}
                  disabled={!!isLoadingTips}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg font-semibold shadow-md hover:bg-rose-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {isLoadingTips?.id === contact.id ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Getting Tips...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      Get Friendship Tips
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{contacts.length}</h3>
          <p className="text-gray-600">Total Profiles</p>
        </div>
        
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {eliteTierCount}
          </h3>
          <p className="text-gray-600">Elite Tier</p>
        </div>
        
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✴️</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {masterNumberCount}
          </h3>
          <p className="text-gray-600">Master Numbers</p>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => setView(contacts.length > 0 ? View.List : View.Add)}
          className="bg-gradient-to-r from-gray-800 to-black text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-md sm:text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3 transform hover:scale-105"
        >
          {contacts.length > 0 ? (
            <>
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              View All Contacts
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
              Add First Contact
            </>
          )}
        </button>
      </div>

      {/* Friendship Tips Modal */}
      {friendshipTips && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button 
              onClick={() => setFriendshipTips(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
               <Heart className="w-6 h-6 text-rose-500" />
               <h2 className="text-xl font-bold text-gray-900">Friendship Tips for {friendshipTips.contact.fullName}</h2>
            </div>
            <div className="text-gray-700 space-y-3 whitespace-pre-wrap">
              {friendshipTips.tips.split('- ').filter(tip => tip.trim() !== '').map((tip, index) => (
                <p key={index} className="flex items-start gap-2">
                  <span className="text-rose-500 mt-1">◆</span>
                  <span>{tip.trim()}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;