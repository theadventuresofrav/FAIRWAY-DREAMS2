import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { ArrowLeft, BrainCircuit, Heart, CloudLightning, MessageSquare, ShieldAlert, BarChart, Settings, Check, X, Compass, Play, Square, Loader2 } from 'lucide-react';
import type { Contact } from '../types';
import { View } from '../types';
import * as ReportContent from '../services/reportContentService';

interface ReportProps {
  contact: Contact;
  setView: (view: View) => void;
}

// --- Audio Helper Functions ---

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


const ReportSection: React.FC<{ 
  title: string, 
  icon: React.ReactNode, 
  children: React.ReactNode,
  sectionId: string,
  textToNarrate: string,
  onPlay: (sectionId: string, text: string) => void,
  isLoading: boolean,
  isPlaying: boolean,
}> = ({ title, icon, children, sectionId, textToNarrate, onPlay, isLoading, isPlaying }) => (
  <div id={sectionId} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 scroll-mt-24">
    <div className="flex items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <button
        onClick={() => onPlay(sectionId, textToNarrate)}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500 disabled:opacity-50"
        aria-label={isPlaying ? `Stop narration for ${title}` : `Play narration for ${title}`}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 size={20} className="animate-spin" /> : isPlaying ? <Square size={20} className="text-red-600" /> : <Play size={20} />}
      </button>
    </div>
    <div className="space-y-4 text-gray-600 text-base">
      {children}
    </div>
  </div>
);

// --- START NEW CHART COMPONENTS ---
const CoreNumbersChart: React.FC<{ contact: Contact }> = ({ contact }) => {
  const coreNumbers = [
    { label: 'Life Path', value: contact.lifePath },
    { label: 'Expression', value: contact.expression },
    { label: 'Soul Urge', value: contact.readings.soulUrge },
    { label: 'Personality', value: contact.readings.personality },
    { label: 'Birthday', value: contact.readings.birthday },
    { label: 'Maturity', value: contact.readings.maturity },
  ];
  const maxValue = 33;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Core Numbers Profile</h3>
      <div className="flex justify-around items-end h-48 bg-gray-50 p-4 rounded-lg border">
        {coreNumbers.map(({ label, value }) => {
          const isMaster = [11, 22, 33].includes(value);
          const barHeight = (value / maxValue) * 100;
          const barColor = label === 'Life Path' ? ReportContent.getColor(contact.lifePath).hex : '#6B7280';

          return (
            <div key={label} className="flex flex-col items-center w-12 text-center">
              <div className="relative text-sm font-bold text-gray-700">
                {value}
                {isMaster && (
                  <span className="absolute -top-4 -right-3 text-yellow-500" title="Master Number">
                    ✴️
                  </span>
                )}
              </div>
              <div
                className="w-8 mt-1 rounded-t-md transition-all duration-700 ease-out"
                style={{ height: `${barHeight}%`, backgroundColor: barColor, minHeight: '2px' }}
                title={`${label}: ${value}`}
              ></div>
              <span className="text-xs font-medium text-gray-500 mt-2 truncate w-full">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PersonalCycleGauges: React.FC<{ contact: Contact }> = ({ contact }) => {
  const { personalYear, personalMonth, personalDay } = contact.readings;
  const cycles = [
      { label: 'Personal Year', value: personalYear, color: 'text-blue-500' },
      { label: 'Personal Month', value: personalMonth, color: 'text-green-500' },
      { label: 'Personal Day', value: personalDay, color: 'text-yellow-500' },
  ];

  const Gauge: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => {
      const percentage = (value / 9) * 100;
      const radius = 15.9155; // makes circumference ~100
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (percentage / 100) * circumference;

      return (
          <div className="flex flex-col items-center text-center">
              <div className="relative w-28 h-28">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                      <circle
                          className="text-gray-200"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="transparent"
                          r={radius} cx="18" cy="18"
                      />
                      <circle
                          className={color}
                          strokeWidth="4"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r={radius} cx="18" cy="18"
                          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                      />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-800">{value}</span>
                  </div>
              </div>
              <span className="text-sm font-semibold text-gray-600 mt-3">{label}</span>
          </div>
      );
  };

  return (
       <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">Current Personal Cycles</h3>
          <div className="flex flex-col sm:flex-row justify-around items-center gap-6 bg-gray-50 p-6 rounded-lg border">
              {cycles.map(cycle => <Gauge key={cycle.label} {...cycle} />)}
          </div>
      </div>
  );
};
// --- END NEW CHART COMPONENTS ---

const Report: React.FC<ReportProps> = ({ contact, setView }) => {
  const [narratingSection, setNarratingSection] = useState<string | null>(null);
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('visuals');
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const sections = [
    { id: 'visuals', title: 'Visual Snapshot', icon: <BarChart size={16} /> },
    { id: 'why', title: 'Core Blueprint', icon: <BrainCircuit size={16} /> },
    { id: 'weather', title: 'Energetic Weather', icon: <CloudLightning size={16} /> },
    { id: 'messaging', title: 'Messaging Tone', icon: <MessageSquare size={16} /> },
    { id: 'shadow', title: 'Shadow/Activated', icon: <ShieldAlert size={16} /> },
    { id: 'crm', title: 'CRM Strategy', icon: <Settings size={16} /> },
  ];

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
        const sectionIds = sections.map(s => s.id);
        let currentSectionId = activeSection;

        for (const id of sectionIds) {
            const element = document.getElementById(id);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 120 && rect.bottom >= 120) { // 120px offset for sticky nav
                    currentSectionId = id;
                    break;
                }
            }
        }
        
        if (activeSection !== currentSectionId) {
          setActiveSection(currentSectionId);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, sections]);

  const handlePlayNarration = async (sectionId: string, text: string) => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }

    if (narratingSection === sectionId) {
      setNarratingSection(null);
      return;
    }

    setLoadingSection(sectionId);
    setNarratingSection(null);

    try {
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        // Fix: Cast window to 'any' to allow access to vendor-prefixed webkitAudioContext for Safari compatibility.
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Narrate in a warm, professional, and reassuring female voice: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio && audioContextRef.current) {
        const audioBuffer = await decodeAudioData(decode(base64Audio), audioContextRef.current, 24000, 1);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.start();
        
        audioSourceRef.current = source;
        setNarratingSection(sectionId);

        source.onended = () => {
          if (audioSourceRef.current === source) {
            setNarratingSection(null);
            audioSourceRef.current = null;
          }
        };
      }
    } catch (error) {
      console.error("Narration generation failed:", error);
      alert("Sorry, the narration could not be generated at this time.");
    } finally {
      setLoadingSection(null);
    }
  };

  const title = ReportContent.getTitle(contact.lifePath, contact.expression);
  const color = ReportContent.getColor(contact.lifePath);
  const lifePathStory = ReportContent.getLifePathStory(contact.lifePath);
  const emotionalStory = ReportContent.getEmotionalStory(contact.readings.soulUrge);
  const expressionBehavior = ReportContent.getExpressionBehavior(contact.expression);
  const attachmentStyle = ReportContent.getAttachmentStyle(contact.lifePath, contact.readings.soulUrge, contact.readings.personality);
  const energeticWeather = ReportContent.getEnergeticWeather(contact.readings.personalYear, contact.readings.personalMonth, contact.readings.challengeNumbers);
  const messagingTone = ReportContent.getMessagingTone(contact.readings.personality);
  const shadowState = ReportContent.getShadowState(contact.lifePath);
  const crm = ReportContent.getCRMSuggestions(contact);

  // --- Narration Text Content ---
  const headerNarration = `Profile report for ${contact.fullName}. Their archetypal title is: ${title}. Their primary color represents: ${color.description}`;
  const visualsNarration = `Section: Numerological Visual Snapshot. This section provides a visual summary of the core numbers and current personal cycles.`;
  const whyNarration = `Section: Why They Are Like This. Their Life Path Story: ${lifePathStory}. Their Emotional Strategy, from their Soul Urge number, is: ${emotionalStory}. Their Typical Behavior, from their Expression number, is: ${expressionBehavior}. Finally, their Attachment and Trust Style is: ${attachmentStyle}`;
  const weatherNarration = `Section: Their Energetic Weather. Personal Cycle: ${energeticWeather.personalCycle}. Pressure and Opportunity Zone, from their Main Challenge number: ${energeticWeather.majorTransits}`;
  const messagingNarration = `Section: Suggested Messaging Tone. ${messagingTone}`;
  const shadowNarration = `Section: Shadow to Activated State. In shadow, they can be: ${shadowState.shadow}. When activated, they become: ${shadowState.activated}`;
  const crmNarration = `Section: What To Do With Them, CRM suggestions. Opportunity Level: ${crm.opportunityLevel}. The best way to influence or motivate them is to: ${crm.influence}. The relationship growth path is: ${crm.growthPath}. Recommended 'Do' approaches are: ${crm.dos.join(', ')}. 'Do Not' approaches to avoid are: ${crm.donts.join(', ')}. Finally, timing recommendations: ${crm.timing}.`;

  return (
    <div className="space-y-6 animate-fade-in">
      <button
        onClick={() => setView(View.Detail)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2 transition-colors font-semibold"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Profile
      </button>

      {/* Sticky Navigation */}
      <div className="sticky top-20 z-10">
        <div className="bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-200 flex justify-center gap-1 sm:gap-2 flex-wrap">
          {sections.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeSection === section.id ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {section.icon}
              <span className="hidden sm:inline">{section.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className={`p-8 rounded-3xl shadow-2xl text-white relative`} style={{ backgroundColor: color.hex }}>
         <button
            onClick={() => handlePlayNarration('header', headerNarration)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white disabled:opacity-50"
            aria-label={narratingSection === 'header' ? `Stop narration for header` : `Play narration for header`}
            disabled={loadingSection === 'header'}
          >
            {loadingSection === 'header' ? <Loader2 size={20} className="animate-spin" /> : narratingSection === 'header' ? <Square size={20} /> : <Play size={20} />}
          </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
            {contact.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold">{contact.fullName}</h1>
            <p className="text-xl opacity-90">{title}</p>
          </div>
        </div>
        <p className="text-base opacity-80">{color.description}</p>
      </div>

      {/* Visual Snapshot */}
      <ReportSection
        title="Numerological Visual Snapshot"
        icon={<BarChart size={20} />}
        sectionId="visuals"
        textToNarrate={visualsNarration}
        onPlay={handlePlayNarration}
        isLoading={loadingSection === 'visuals'}
        isPlaying={narratingSection === 'visuals'}
      >
        <div className="space-y-8">
          <CoreNumbersChart contact={contact} />
          <PersonalCycleGauges contact={contact} />
        </div>
      </ReportSection>

      {/* Why They Are Like This */}
      <ReportSection 
        title="Why They Are Like This" 
        icon={<BrainCircuit size={20}/>}
        sectionId="why"
        textToNarrate={whyNarration}
        onPlay={handlePlayNarration}
        isLoading={loadingSection === 'why'}
        isPlaying={narratingSection === 'why'}
      >
          <p><strong>Life Path Story:</strong> {lifePathStory}</p>
          <p><strong>Emotional Strategy (from Soul Urge):</strong> {emotionalStory}</p>
          <p><strong>Typical Behavior (from Expression):</strong> {expressionBehavior}</p>
          <p><strong>Attachment & Trust Style:</strong> {attachmentStyle}</p>
      </ReportSection>

      {/* Energetic Weather */}
      <ReportSection 
        title="Their Energetic Weather" 
        icon={<CloudLightning size={20}/>}
        sectionId="weather"
        textToNarrate={weatherNarration}
        onPlay={handlePlayNarration}
        isLoading={loadingSection === 'weather'}
        isPlaying={narratingSection === 'weather'}
      >
          <p><strong>Personal Cycle:</strong> {energeticWeather.personalCycle}</p>
          <p><strong>Pressure / Opportunity Zone (from Main Challenge):</strong> {energeticWeather.majorTransits}</p>
      </ReportSection>
      
      {/* Messaging & State */}
      <div className="grid md:grid-cols-2 gap-6">
          <ReportSection 
            title="Suggested Messaging Tone" 
            icon={<MessageSquare size={20}/>}
            sectionId="messaging"
            textToNarrate={messagingNarration}
            onPlay={handlePlayNarration}
            isLoading={loadingSection === 'messaging'}
            isPlaying={narratingSection === 'messaging'}
          >
              <p>{messagingTone}</p>
          </ReportSection>
          <ReportSection 
            title="Shadow → Activated State" 
            icon={<ShieldAlert size={20}/>}
            sectionId="shadow"
            textToNarrate={shadowNarration}
            onPlay={handlePlayNarration}
            isLoading={loadingSection === 'shadow'}
            isPlaying={narratingSection === 'shadow'}
          >
              <p>
                  <strong>Shadow:</strong> {shadowState.shadow}
                  <br/>
                  <strong>Activated:</strong> {shadowState.activated}
              </p>
          </ReportSection>
      </div>
      
      {/* What To Do With Them (CRM) */}
      <div id="crm" className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg relative scroll-mt-24">
          <button
            onClick={() => handlePlayNarration('crm', crmNarration)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white disabled:opacity-50"
            aria-label={narratingSection === 'crm' ? `Stop narration for CRM section` : `Play narration for CRM section`}
            disabled={loadingSection === 'crm'}
          >
            {loadingSection === 'crm' ? <Loader2 size={20} className="animate-spin" /> : narratingSection === 'crm' ? <Square size={20} /> : <Play size={20} />}
          </button>
          <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center text-yellow-400"><Settings size={20}/></div>
              <h2 className="text-xl font-bold text-white">What To Do With Them (CRM)</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                  <h3 className="font-semibold text-yellow-400 mb-1 flex items-center gap-2"><BarChart size={16}/> Opportunity Level</h3>
                  <p className="text-gray-300">{crm.opportunityLevel}</p>
              </div>
              <div>
                  <h3 className="font-semibold text-yellow-400 mb-1 flex items-center gap-2"><Compass size={16}/> Best Way to Influence / Motivate</h3>
                  <p className="text-gray-300">{crm.influence}</p>
              </div>
              <div className="md:col-span-2">
                  <h3 className="font-semibold text-yellow-400 mb-1 flex items-center gap-2"><Heart size={16}/> Relationship Growth Path</h3>
                  <p className="text-gray-300">{crm.growthPath}</p>
              </div>
              <div>
                  <h3 className="font-semibold text-yellow-400 mb-1 flex items-center gap-2"><Check size={16}/> 'Do' Approaches</h3>
                  <ul className="list-disc list-inside text-gray-300">
                      {crm.dos.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
              </div>
              <div>
                  <h3 className="font-semibold text-yellow-400 mb-1 flex items-center gap-2"><X size={16}/> 'Do Not' Approaches</h3>
                  <ul className="list-disc list-inside text-gray-300">
                      {crm.donts.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
              </div>
              <div className="md:col-span-2">
                  <h3 className="font-semibold text-yellow-400 mb-1">Timing Recommendations</h3>
                  <p className="text-gray-300">{crm.timing}</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Report;