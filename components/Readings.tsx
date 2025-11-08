import React from 'react';

const Readings: React.FC = () => {
  const tableHeadersClass = "py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left";
  const tableCellClass = "py-3 px-4 border-b border-gray-200";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Numerology Readings Guide</h1>
        <p className="text-lg text-gray-600">A comprehensive guide to understanding your numbers.</p>
      </div>

      {/* Section 1 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">🟩</span>
          SECTION 1 – Core Numbers (No Birth Time Needed)
        </h2>
        <div className="space-y-3 text-gray-700">
          <p className="font-semibold text-gray-800">Includes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Life Path Number</li>
            <li>Expression (Destiny) Number</li>
            <li>Soul Urge Number</li>
            <li>Personality Number</li>
            <li>Birthday Number</li>
            <li>Maturity Number</li>
            <li>Hidden Passion Number</li>
            <li>Challenge Numbers</li>
            <li>Karmic Debt Numbers (13, 14, 16, 19)</li>
            <li>Personal Year / Month / Day Numbers</li>
          </ul>
          <p className="text-sm text-gray-500 italic mt-4">All calculated using full birth name + birth date (MM/DD/YYYY)</p>
        </div>
      </div>
      
      {/* Section 2 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">🟦</span>
          SECTION 2 – Numbers That Require Birth Time
        </h2>
        <div className="space-y-3 text-gray-700">
          <p className="font-semibold text-gray-800">Includes:</p>
          <ul className="list-disc list-inside space-y-1">
              <li>Ascendant-Based Numerology</li>
              <li>Planetary Numerology Assignments</li>
              <li>Ruling Number (Advanced systems)</li>
              <li>Pinnacle & Essence Cycle fine-tuning</li>
              <li>Numerology House Overlays</li>
              <li>Soul Contract Activation Ages</li>
              <li>Karmic Rebirth Gates</li>
              <li>The Arrows of Pythagoras</li>
              <li>The Planes of Expression</li>
          </ul>
          <p className="text-sm text-gray-500 italic mt-4">Requires exact time and location of birth</p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">✴️</span>
          SECTION 3 – Master Numbers
        </h2>
        <div className="space-y-3 text-gray-700">
          <p className="font-semibold text-gray-800">Master Numbers:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>11 – The Visionary</li>
            <li>22 – The Master Builder</li>
            <li>33 – The Master Teacher</li>
          </ul>
          <p className="font-semibold text-gray-800 mt-4">Topics Covered:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Shadow vs. Gift energy</li>
            <li>Activation signs</li>
            <li>How to handle Master Number pressure</li>
            <li>Misconceptions about Master Numbers</li>
          </ul>
        </div>
      </div>

      {/* Christ Consciousness Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-yellow-400">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">🕊️</span>
          The Christ Consciousness
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>Christ Consciousness represents the highest state of human spiritual evolution—a state of awareness defined by unconditional love, profound compassion, and a complete realization of oneness with all of creation. It is not tied to a specific religion but is a universal principle of divine love in human form.</p>
          <p className="font-semibold text-gray-800">Numerological Connection: Master Number 33</p>
          <p>The energy of Christ Consciousness is most purely embodied in <span className="font-bold">Master Number 33</span>, the "Master Teacher." This number carries the ultimate vibration of love, healing, and selfless service. Individuals with a 33 in their chart are on a path to learn and express this unconditional love, often taking on significant burdens to heal and uplift others.</p>
           <p className="font-semibold text-gray-800 mt-2">Key Attributes:</p>
            <ul className="list-disc list-inside space-y-1">
                <li><span className="font-semibold">Unconditional Love:</span> Love extended to all beings without judgment or expectation.</li>
                <li><span className="font-semibold">Radical Forgiveness:</span> The ability to release all grievances and see the divine in everyone.</li>
                <li><span className="font-semibold">Selfless Service:</span> Actions motivated purely by the desire to alleviate suffering and support others.</li>
                <li><span className="font-semibold">Oneness:</span> The profound understanding that all life is interconnected.</li>
            </ul>
             <p className="text-sm text-gray-500 italic mt-4">While Master Number 33 is the clearest channel for this energy, the path to Christ Consciousness is available to every soul, regardless of their numerology chart. It is a state of being that is cultivated through conscious spiritual practice.</p>
        </div>
      </div>

      {/* Section 4 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">⚠️</span>
          SECTION 4 – Karmic Debt & Lessons
        </h2>
        <div className="space-y-3 text-gray-700">
          <p className="font-semibold text-gray-800">The 4 Karmic Debt Numbers:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>13/4: Laziness → Discipline</li>
            <li>14/5: Abuse of Freedom → Responsibility</li>
            <li>16/7: Ego Collapse → Spiritual Awakening</li>
            <li>19/1: Selfishness → Humble Leadership</li>
          </ul>
          <p className="font-semibold text-gray-800 mt-4">Karmic Lessons:</p>
          <ul className="list-disc list-inside space-y-1">
              <li>Based on missing numbers in the name grid</li>
              <li>Reveal unfamiliar or underdeveloped energies</li>
          </ul>
        </div>
      </div>
      
      {/* Section 5 */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">🕰️</span>
          SECTION 5 – Personal Cycles & Timing
        </h2>
        <div className="space-y-3 text-gray-700">
          <p className="font-semibold text-gray-800">Includes:</p>
          <ul className="list-disc list-inside space-y-1">
              <li>Personal Year Number (9-Year Cycle)</li>
              <li>Personal Month & Day Numbers</li>
              <li>Pinnacle Cycles (Life Phases)</li>
              <li>Essence Numbers (Emotional Climate)</li>
              <li>Transit Letters (Name-based Timing)</li>
              <li>Universal Year Energies</li>
              <li>Master Years (11, 22, 33)</li>
          </ul>
          <p className="text-sm text-gray-500 italic mt-4">Use for forecasting key dates, energy shifts, business timing, and spiritual growth.</p>
        </div>
      </div>
      
      {/* Bonus Pages */}
      <div className="bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-inner space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3"><span className="text-3xl">📘</span> BONUS PAGES</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">🔢 Core Number Meanings (1–9)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className={tableHeadersClass}>Number</th>
                  <th className={tableHeadersClass}>Strengths</th>
                  <th className={tableHeadersClass}>Challenges</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>1</td><td className={tableCellClass}>Leader, Independent</td><td className={tableCellClass}>Arrogant, Bossy</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>2</td><td className={tableCellClass}>Intuitive, Cooperative</td><td className={tableCellClass}>Passive, Emotional</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>3</td><td className={tableCellClass}>Creative, Expressive</td><td className={tableCellClass}>Scattered, Drama</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>4</td><td className={tableCellClass}>Reliable, Disciplined</td><td className={tableCellClass}>Rigid, Controlling</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>5</td><td className={tableCellClass}>Adventurous, Charismatic</td><td className={tableCellClass}>Impulsive, Addictive</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>6</td><td className={tableCellClass}>Nurturing, Responsible</td><td className={tableCellClass}>Overbearing, Self-sacrificing</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>7</td><td className={tableCellClass}>Spiritual, Analytical</td><td className={tableCellClass}>Withdrawn, Skeptical</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>8</td><td className={tableCellClass}>Ambitious, Strategic</td><td className={tableCellClass}>Ruthless, Workaholic</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>9</td><td className={tableCellClass}>Compassionate, Visionary</td><td className={tableCellClass}>Over-giving, Lost</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">✴️ Master Numbers Cheat Sheet</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr><th className={tableHeadersClass}>Master</th><th className={tableHeadersClass}>Role</th><th className={tableHeadersClass}>Challenge</th><th className={tableHeadersClass}>Gift</th></tr></thead>
              <tbody>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>11</td><td className={tableCellClass}>Spiritual Messenger</td><td className={tableCellClass}>Anxiety, Overload</td><td className={tableCellClass}>Intuition, Inspiration</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>22</td><td className={tableCellClass}>Legacy Builder</td><td className={tableCellClass}>Control, Pressure</td><td className={tableCellClass}>Material Success with Purpose</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>33</td><td className={tableCellClass}>Master Teacher</td><td className={tableCellClass}>Martyrdom, Burnout</td><td className={tableCellClass}>Healing through Service</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">📅 Personal Year Meanings</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr><th className={tableHeadersClass}>Year</th><th className={tableHeadersClass}>Theme</th><th className={tableHeadersClass}>Focus</th></tr></thead>
              <tbody>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>1</td><td className={tableCellClass}>New Beginnings</td><td className={tableCellClass}>Start Fresh</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>2</td><td className={tableCellClass}>Patience</td><td className={tableCellClass}>Partnership, Inner Work</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>3</td><td className={tableCellClass}>Creativity</td><td className={tableCellClass}>Express, Socialize</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>4</td><td className={tableCellClass}>Structure</td><td className={tableCellClass}>Work, Build</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>5</td><td className={tableCellClass}>Change</td><td className={tableCellClass}>Freedom, Travel</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>6</td><td className={tableCellClass}>Responsibility</td><td className={tableCellClass}>Family, Love</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>7</td><td className={tableCellClass}>Reflection</td><td className={tableCellClass}>Spiritual Growth</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>8</td><td className={tableCellClass}>Power</td><td className={tableCellClass}>Money, Business</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>9</td><td className={tableCellClass}>Completion</td><td className={tableCellClass}>Let Go, Forgive</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">🔡 Pythagorean Letter Chart</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr><th className={tableHeadersClass}>Letters</th><th className={tableHeadersClass}>Number</th></tr></thead>
              <tbody>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>A, J, S</td><td className={tableCellClass}>1</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>B, K, T</td><td className={tableCellClass}>2</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>C, L, U</td><td className={tableCellClass}>3</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>D, M, V</td><td className={tableCellClass}>4</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>E, N, W</td><td className={tableCellClass}>5</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>F, O, X</td><td className={tableCellClass}>6</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>G, P, Y</td><td className={tableCellClass}>7</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>H, Q, Z</td><td className={tableCellClass}>8</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>I, R</td><td className={tableCellClass}>9</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">⚖️ Karmic Debt Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr><th className={tableHeadersClass}>Number</th><th className={tableHeadersClass}>Theme</th><th className={tableHeadersClass}>Lesson</th></tr></thead>
              <tbody>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>13</td><td className={tableCellClass}>Laziness</td><td className={tableCellClass}>Consistent Effort</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>14</td><td className={tableCellClass}>Addiction / Control</td><td className={tableCellClass}>Responsible Freedom</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>16</td><td className={tableCellClass}>Ego Collapse</td><td className={tableCellClass}>Humility + Truth</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>19</td><td className={tableCellClass}>Power Misuse</td><td className={tableCellClass}>Leadership with Service</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">❤️ Life Path Compatibility Grid</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr><th className={tableHeadersClass}>You Are...</th><th className={tableHeadersClass}>Good Matches</th><th className={tableHeadersClass}>Watch Out</th></tr></thead>
              <tbody>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>1</td><td className={tableCellClass}>3, 5, 6</td><td className={tableCellClass}>1, 8</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>2</td><td className={tableCellClass}>4, 6, 8</td><td className={tableCellClass}>5, 7</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>3</td><td className={tableCellClass}>1, 5, 7</td><td className={tableCellClass}>4, 8</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>4</td><td className={tableCellClass}>2, 6, 8</td><td className={tableCellClass}>3, 5</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>5</td><td className={tableCellClass}>1, 3, 7</td><td className={tableCellClass}>2, 4</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>6</td><td className={tableCellClass}>2, 4, 9</td><td className={tableCellClass}>1, 5</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>7</td><td className={tableCellClass}>3, 5, 9</td><td className={tableCellClass}>2, 6</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>8</td><td className={tableCellClass}>2, 4, 6</td><td className={tableCellClass}>1, 9</td></tr>
                <tr className="hover:bg-gray-50"><td className={tableCellClass}>9</td><td className={tableCellClass}>6, 7, 2</td><td className={tableCellClass}>1, 8</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Your Next Steps */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">📦</span>
          YOUR NEXT STEPS
        </h2>
        <div className="space-y-3 text-gray-700">
            <p>Use this guide to explore your own numerology chart or to analyze the profiles of your contacts. Understanding these patterns can provide deep insights into personality, motivations, and life events.</p>
            <p className="font-semibold mt-2">Ready to apply this knowledge? Go to your contacts list and see the patterns for yourself!</p>
        </div>
      </div>
    </div>
  );
};

export default Readings;