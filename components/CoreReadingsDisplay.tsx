import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { HelpCircle, Sparkles, Loader2, BrainCircuit, PenSquare, Copy, Check } from 'lucide-react';
import type { Contact } from '../types';
import { glossary, numberMeanings } from '../services/reportContentService';

interface CoreReadingsDisplayProps {
  contact: Contact;
  saveAiContent: (contactId: number, content: { aiSummary?: string; aiBios?: string }) => void;
}

const ReadingItem: React.FC<{ label: string; value: string | number | number[]; description: string; }> = ({ label, value, description }) => {
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
      <dd className="text-md font-bold text-gray-900 text-right">{Array.isArray(value) ? value.join(', ') : value}</dd>
    </div>
  );
};

const NumberMeaning: React.FC<{ label: string; number: number; meanings: { strengths: string[]; challenges: string[] } | undefined }> = ({ label, number, meanings }) => {
  if (!meanings) return null;
  return (
    <div>
      <h4 className="font-semibold text-gray-800">{label} ({number})</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-1 text-sm">
        <div>
          <p className="font-medium text-emerald-700">Strengths:</p>
          <ul className="list-disc list-inside text-gray-600 pl-2">
            {meanings.strengths.map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div>
          <p className="font-medium text-rose-700">Challenges:</p>
          <ul className="list-disc list-inside text-gray-600 pl-2">
            {meanings.challenges.map(c => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};


const CoreReadingsDisplay: React.FC<CoreReadingsDisplayProps> = ({ contact, saveAiContent }) => {
  const { readings, lifePath, expression } = contact;
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);
  const [isLoadingBios, setIsLoadingBios] = useState<boolean>(false);
  const [copiedBio, setCopiedBio] = useState<number | null>(null);
  
  if (!readings) return null;

  const { challengeNumbers: c } = readings;
  const challengeString = `${c.first} | ${c.second} | ${c.main} (Main) | ${c.fourth}`;
  
  const generateSummary = async () => {
    setIsLoadingSummary(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are an expert numerologist providing a deep, synthesized analysis. 
        Based on the following core numerology readings for ${contact.fullName}, write a 2-paragraph summary of their core identity. 
        Focus on how the numbers interact and create a holistic picture of their personality, motivations, and primary life lessons.
        Be insightful and avoid just listing traits. Your tone should be empowering and clear.

        - Life Path: ${contact.lifePath} (${numberMeanings[contact.lifePath]?.strengths.join(', ')})
        - Expression (Destiny): ${contact.expression} (${numberMeanings[contact.expression]?.strengths.join(', ')})
        - Soul Urge (Heart's Desire): ${contact.readings.soulUrge} (${numberMeanings[contact.readings.soulUrge]?.strengths.join(', ')})
        - Personality (Outer Self): ${contact.readings.personality} (${numberMeanings[contact.readings.personality]?.strengths.join(', ')})
        - Main Challenge: ${contact.readings.challengeNumbers.main} (This represents a key life lesson they must master).

        For example, explain how their Soul Urge might secretly drive their external Personality, or how their Expression number's talents are meant to serve their Life Path's purpose.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
      });
      
      saveAiContent(contact.id, { aiSummary: response.text });

    } catch (error) {
      console.error("Error generating summary:", error);
      alert("There was an error generating the summary. Please try again.");
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const generateBios = async () => {
    setIsLoadingBios(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are an expert numerologist and social media strategist.

        Based on the following core numerology readings for ${contact.fullName}, write 3 distinct, engaging, and concise social media bio options (e.g., for Twitter, Instagram, LinkedIn).

        Each bio should:
        - Be under 160 characters.
        - Capture the essence of their core numbers.
        - Use emojis to add personality.
        - Highlight their key strengths in a compelling way.
        - Include a call to action or a statement of purpose.

        Core Numbers:
        - Name: ${contact.fullName}
        - Life Path: ${contact.lifePath} (Their main life lesson)
        - Expression: ${contact.expression} (Their talents and destiny)
        - Soul Urge: ${contact.readings.soulUrge} (Their inner motivation)

        Example Output Format:

        **Option 1 (Professional & Purpose-Driven):**
        [Bio Text]

        **Option 2 (Creative & Expressive):**
        [Bio Text]

        **Option 3 (Inspirational & Visionary):**
        [Bio Text]
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
      });
      
      saveAiContent(contact.id, { aiBios: response.text });

    } catch (error) {
      console.error("Error generating bios:", error);
      alert("There was an error generating the bios. Please try again.");
    } finally {
      setIsLoadingBios(false);
    }
  };
  
  const handleCopyBio = (textToCopy: string, index: number) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedBio(index);
    setTimeout(() => setCopiedBio(null), 2000);
  };

  const parseBios = (biosText?: string): { title: string; content: string }[] => {
    if (!biosText) return [];

    const biosArray: { title: string; content: string }[] = [];
    // Split by the bolded "Option X" pattern and filter out any empty strings
    const biosRaw = biosText.split(/\*\*Option \d+/).filter(b => b.trim());

    biosRaw.forEach((bioBlock, index) => {
      // Find the title within parentheses and the rest is content
      const titleMatch = bioBlock.match(/\(([^)]+)\):\*\*/);
      const title = titleMatch ? titleMatch[1] : `Bio ${index + 1}`;
      
      // Clean up the start of the content from the title pattern
      const content = bioBlock.replace(/\([^)]+\):\*\*/, '').trim();

      if (content) {
        biosArray.push({ title, content });
      }
    });
    
    return biosArray;
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <span className="text-3xl">🟩</span>
        SECTION 1 – Core Numbers
      </h2>
      <dl className="space-y-1">
        <ReadingItem label="Life Path Number" value={lifePath} description={glossary.lifePath.description} />
        <ReadingItem label="Expression (Destiny) Number" value={expression} description={glossary.expression.description} />
        <ReadingItem label="Soul Urge Number" value={readings.soulUrge} description={glossary.soulUrge.description} />
        <ReadingItem label="Personality Number" value={readings.personality} description={glossary.personality.description} />
        <ReadingItem label="Birthday Number" value={readings.birthday} description={glossary.birthday.description} />
        <ReadingItem label="Maturity Number" value={readings.maturity} description={glossary.maturity.description} />
        <ReadingItem label="Hidden Passion Number(s)" value={readings.hiddenPassion} description={glossary.hiddenPassion.description} />
        <ReadingItem 
          label="Challenge Numbers" 
          value={challengeString}
          description={glossary.challengeNumbers.description}
        />
        <ReadingItem 
          label="Karmic Debt Numbers" 
          value={readings.karmicDebt.length > 0 ? readings.karmicDebt.join(', ') : 'None'} 
          description={glossary.karmicDebt.description}
        />
      </dl>

      {/* AI Summary Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-6 h-6 text-gray-700" />
            <h3 className="text-xl font-bold text-gray-800">AI-Powered Core Analysis</h3>
          </div>
          <button
            onClick={generateSummary}
            disabled={isLoadingSummary}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingSummary ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {contact.aiSummary ? 'Regenerate Analysis' : 'Generate Analysis'}
              </>
            )}
          </button>
        </div>
        {contact.aiSummary && (
          <div className="mt-4 p-6 bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-xl shadow-inner border border-purple-100 animate-fade-in">
            <h4 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
              <BrainCircuit size={20} />
              Core Identity Analysis
            </h4>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{contact.aiSummary}</p>
          </div>
        )}
      </div>
      
      {/* AI Social Bios Section */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <PenSquare className="w-6 h-6 text-gray-700" />
            <h3 className="text-xl font-bold text-gray-800">AI-Powered Social Bios</h3>
          </div>
          <button
            onClick={generateBios}
            disabled={isLoadingBios}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingBios ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {contact.aiBios ? 'Regenerate Bios' : 'Generate Bios'}
              </>
            )}
          </button>
        </div>
        {contact.aiBios && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {parseBios(contact.aiBios).map((bio, index) => (
              <div key={index} className="p-4 bg-teal-50 rounded-lg border border-teal-200 relative group">
                <button 
                  onClick={() => handleCopyBio(bio.content, index)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-teal-100 text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Copy bio"
                >
                  {copiedBio === index ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <h5 className="font-bold text-teal-800 mb-2 pr-10">{bio.title}</h5>
                <p className="text-gray-700">{bio.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Core Number Meanings</h3>
        <div className="space-y-4">
          <NumberMeaning label="Life Path" number={lifePath} meanings={numberMeanings[lifePath]} />
          <NumberMeaning label="Expression" number={expression} meanings={numberMeanings[expression]} />
          <NumberMeaning label="Soul Urge" number={readings.soulUrge} meanings={numberMeanings[readings.soulUrge]} />
          <NumberMeaning label="Personality" number={readings.personality} meanings={numberMeanings[readings.personality]} />
          <NumberMeaning label="Birthday" number={readings.birthday} meanings={numberMeanings[readings.birthday]} />
          <NumberMeaning label="Maturity" number={readings.maturity} meanings={numberMeanings[readings.maturity]} />
        </div>
      </div>
    </div>
  );
};

export default CoreReadingsDisplay;