import type { Contact } from '../types';

// --- DATA DICTIONARIES ---

export const numberMeanings: { [key: number]: { strengths: string[]; challenges: string[] } } = {
  1: { strengths: ['Leader', 'Independent'], challenges: ['Arrogant', 'Bossy'] },
  2: { strengths: ['Intuitive', 'Cooperative'], challenges: ['Passive', 'Emotional'] },
  3: { strengths: ['Creative', 'Expressive'], challenges: ['Scattered', 'Drama'] },
  4: { strengths: ['Reliable', 'Disciplined'], challenges: ['Rigid', 'Controlling'] },
  5: { strengths: ['Adventurous', 'Charismatic'], challenges: ['Impulsive', 'Addictive'] },
  6: { strengths: ['Nurturing', 'Responsible'], challenges: ['Overbearing', 'Self-sacrificing'] },
  7: { strengths: ['Spiritual', 'Analytical'], challenges: ['Withdrawn', 'Skeptical'] },
  8: { strengths: ['Ambitious', 'Strategic'], challenges: ['Ruthless', 'Workaholic'] },
  9: { strengths: ['Compassionate', 'Visionary'], challenges: ['Over-giving', 'Lost'] },
  11: { strengths: ['Intuition', 'Inspiration'], challenges: ['Anxiety', 'Overload'] },
  22: { strengths: ['Material Success with Purpose'], challenges: ['Control', 'Pressure'] },
  33: { strengths: ['Healing through Service'], challenges: ['Martyrdom', 'Burnout'] },
};

const lifePathAdjectives: { [key: number]: string } = {
  1: 'Pioneering', 2: 'Harmonizing', 3: 'Creative', 4: 'Systematic', 5: 'Adventurous', 6: 'Nurturing', 7: 'Analytical', 8: 'Authoritative', 9: 'Compassionate', 11: 'Visionary', 22: 'Architectural', 33: 'Altruistic'
};

const expressionNouns: { [key: number]: string } = {
  1: 'Leader', 2: 'Diplomat', 3: 'Communicator', 4: 'Builder', 5: 'Agent of Change', 6: 'Guardian', 7: 'Seeker', 8: 'Executive', 9: 'Humanitarian', 11: 'Messenger', 22: 'Master Builder', 33: 'Master Teacher'
};

const numberColors: { [key: number]: { hex: string, description: string } } = {
  1: { hex: '#B91C1C', description: 'Fiery Red, representing leadership, ambition, and the drive to initiate action.' },
  2: { hex: '#047857', description: 'Deep Green, symbolizing harmony, cooperation, and patient growth.' },
  3: { hex: '#F59E0B', description: 'Vibrant Yellow, reflecting creativity, communication, and joyful expression.' },
  4: { hex: '#1E3A8A', description: 'Solid Navy Blue, for structure, discipline, and dependable foundations.' },
  5: { hex: '#4F46E5', description: 'Electric Indigo, representing freedom, change, and dynamic energy.' },
  6: { hex: '#DB2777', description: 'Warm Magenta, for nurturing, responsibility, and community care.' },
  7: { hex: '#581C87', description: 'Royal Purple, representing spiritual wisdom, introspection, and analysis.' },
  8: { hex: '#171717', description: 'Jet Black, symbolizing power, authority, and material manifestation.' },
  9: { hex: '#FFFFFF', description: 'Luminous White, for compassion, universal love, and selfless service.' },
  11: { hex: '#D1D5DB', description: 'Silver, reflecting intuition, illumination, and spiritual insight.' },
  22: { hex: '#FDE047', description: 'Gold, for manifesting grand visions into tangible, lasting legacies.' },
  33: { hex: '#BE185D', description: 'Rose Gold, representing unconditional love, healing, and teaching through service.' }
};

const lifePathStories: { [key: number]: string } = {
  1: 'Their life is a journey of developing independence, courage, and leadership. They are here to be a pioneer, learning to trust their own unique vision and act on it with confidence.',
  2: 'Their life is a lesson in diplomacy, patience, and cooperation. They are here to be a peacemaker, learning to navigate relationships with intuition and bring harmony to group dynamics.',
  3: 'Their life is a path of creative self-expression, communication, and joy. They are here to inspire and uplift others, learning to channel their ideas and emotions into artistic or social forms.',
  4: 'Their life is a journey of building security through discipline, hard work, and process. They are here to create lasting foundations, learning the value of structure, reliability, and practicality.',
  5: 'Their life is a quest for freedom through adventure, change, and varied experiences. They are here to be an agent of change, learning to adapt quickly and use their freedom constructively.',
  6: 'Their life is a lesson in responsibility, nurturing, and community service. They are here to be a caretaker, learning to balance giving and receiving love in their family and community.',
  7: 'Their life is a spiritual and intellectual journey of seeking truth and wisdom. They are here to be an analyst and a sage, learning to trust their intuition and share their unique insights with the world.',
  8: 'Their life is a journey of mastering personal power and the flow of abundance. They are here to build lasting structures of impact, often overcoming significant challenges to step into their innate authority.',
  9: 'Their life is a path of compassion, humanitarianism, and letting go. They are here to give back to the world, learning to practice forgiveness and embrace a broad, inclusive perspective.',
  11: 'As a Master Number, their life is a spiritual journey of channeling intuition and inspiration. They are here to be a visionary messenger, learning to trust their insights and illuminate a new path for others, while navigating heightened sensitivity.',
  22: 'As a Master Number, their life is a journey of turning grand dreams into tangible reality. They are here to be a "Master Builder," learning to use their immense power to create systems and institutions that benefit humanity.',
  33: 'As a Master Number, their life is a path of healing and teaching through compassionate service. They are here to be a "Master Teacher," learning to uplift and guide others with unconditional love, often shouldering significant responsibilities.'
};

const emotionalStories: { [key: number]: string } = {
  1: 'Emotionally, they need independence. They process feelings internally and prefer to take charge of a situation rather than be passive. They value directness and can become impatient with indecisiveness.',
  2: 'Emotionally, they are highly sensitive and intuitive. They process feelings deeply and are attuned to the emotional climate around them, seeking harmony and avoiding conflict.',
  3: 'They have an emotional need for expression and social connection. They process feelings by talking them out, using humor, and engaging with others. They thrive on positive feedback.',
  4: 'They have a deep emotional need for security and stability. They process feelings practically and methodically, often by creating a plan or focusing on a task. They can be resistant to sudden changes.',
  5: 'Emotionally, they crave freedom and excitement. They process feelings through action and new experiences. They can feel trapped by routine and may avoid deep emotional exploration.',
  6: 'Their emotional core is centered on home, family, and responsibility. They process feelings by nurturing and caring for others, finding fulfillment in being needed and providing support.',
  7: 'They process emotions through intellectual analysis and private reflection. They have a deep inner world but may find it difficult to express their feelings openly, preferring solitude to understand them.',
  8: 'Emotionally, they are driven by a need for control and achievement. They process feelings by focusing on goals and results, sometimes suppressing vulnerability to maintain an image of strength.',
  9: 'They are deeply empathetic and feel things on a universal level. They process emotions through compassion and helping others, but can become overwhelmed by the suffering in the world.',
  11: 'With Master Number sensitivity, their emotional strategy is highly intuitive and often visionary. They process feelings on a psychic level, absorbing the energy around them, which requires them to manage nervous tension and seek inspirational outlets.',
  22: 'Their emotional strategy is tied to large-scale ambitions. They process feelings through the act of building and creating, finding emotional stability in progress and tangible results. The pressure to achieve can be a major emotional driver.',
  33: 'Their emotional strategy is one of deep empathy and sacrifice for a higher good. They process feelings through acts of service and healing, often putting the needs of others before their own, which can lead to emotional burnout if not managed.'
};

const expressionBehaviors: { [key: number]: string } = {
    1: 'They operate as a natural leader, driven to innovate and take charge. Their behavior is marked by independence, ambition, and a direct, action-oriented approach to achieving their goals.',
    2: 'They operate as a supportive diplomat, naturally inclined toward cooperation and partnership. Their behavior is patient, tactful, and they excel at mediating and bringing people together.',
    3: 'They operate as a charismatic communicator, driven by a need to express themselves creatively and socially. Their behavior is optimistic, charming, and they thrive in settings where they can inspire others.',
    4: 'They operate as a pragmatic organizer, with a natural ability to create order and structure. Their behavior is disciplined, reliable, and they approach tasks with a methodical, step-by-step process.',
    5: 'They operate as a dynamic agent of change, constantly seeking new experiences and challenges. Their behavior is adaptable, resourceful, and they are not afraid to take risks to avoid stagnation.',
    6: 'They operate as a responsible guardian, with a strong focus on community and family. Their behavior is nurturing, protective, and they are driven by a sense of duty to care for others.',
    7: 'They operate as a thoughtful analyst and seeker of truth. Their behavior is introspective, intellectual, and they prefer to observe and understand a situation fully before acting.',
    8: 'They operate as a powerful executive, with a natural talent for strategy and management. Their behavior is ambitious, efficient, and they are focused on achieving material success and authority.',
    9: 'They operate as a compassionate humanitarian, with a broad, idealistic vision for the world. Their behavior is selfless, charitable, and they are driven to contribute to a cause larger than themselves.',
    11: 'They operate as a "Spiritual Messenger," driven by powerful intuitive insights. This manifests as a highly creative, yet sometimes tense and nervous approach, as they work to ground their otherworldly ideas.',
    22: 'They operate as a "Master Builder," driven by a powerful and practical need to turn grand, inspired visions into tangible reality. This manifests as a disciplined, systematic, and often relentless approach to achieving their goals.',
    33: 'They operate as a "Master Teacher," driven to heal and uplift humanity through service. This manifests as deeply compassionate, responsible, and self-sacrificing behavior, focused on justice and teaching.'
};

// --- LOGIC FUNCTIONS ---

export const getTitle = (lifePath: number, expression: number): string => {
    const adjective = lifePathAdjectives[lifePath] || 'Dynamic';
    const noun = expressionNouns[expression] || 'Force';
    return `${adjective} ${noun}`;
}

export const getColor = (lifePath: number): { hex: string, description: string } => {
    return numberColors[lifePath] || { hex: '#4B5563', description: 'Neutral Gray, representing a balanced and adaptable nature.' };
}

export const getLifePathStory = (lifePath: number): string => lifePathStories[lifePath] || 'Their life is a unique journey of personal growth and discovery.';

export const getEmotionalStory = (soulUrge: number): string => emotionalStories[soulUrge] || 'They process emotions in a unique and personal way.';

export const getExpressionBehavior = (expression: number): string => expressionBehaviors[expression] || 'They express themselves through their unique talents and abilities.';

export const getAttachmentStyle = (lifePath: number, soulUrge: number, personality: number): string => {
  if ([2, 6].includes(soulUrge) && [1, 5, 7].includes(personality)) {
    return 'Fearful-Avoidant. They desire deep, soulful connection (Soul Urge) but their outward personality and life experiences push them toward independence, creating an internal conflict between intimacy and autonomy.';
  }
  if ([2, 6, 9].includes(lifePath) && [2, 6, 9].includes(soulUrge)) {
    return 'Secure. Their core life lesson and inner desires are aligned toward connection and harmony, making them naturally inclined to build stable, trusting relationships.';
  }
  if ([3, 5].includes(lifePath) || [3, 5].includes(soulUrge)) {
    return 'Anxious-Preoccupied. Their need for expression, freedom, and stimulation can sometimes manifest as a fear of being tied down or abandoned, leading them to seek high levels of validation and contact.';
  }
  if ([1, 4, 7, 8].includes(lifePath) && ![2, 6].includes(soulUrge)) {
    return 'Dismissive-Avoidant. Their strong drive for independence, structure, or analysis can lead them to prioritize self-reliance over emotional intimacy. They may see vulnerability as a weakness and prefer to handle challenges alone.';
  }
  return 'A complex style that blends a desire for connection with a need for personal space. Trust is built through consistency and respecting their unique balance of intimacy and independence.';
};

export const getEnergeticWeather = (personalYear: number, personalMonth: number, challengeNumbers: Contact['readings']['challengeNumbers']) => {
  const yearThemes: { [key: number]: string } = {
    1: 'new beginnings and planting seeds', 2: 'patience and partnership', 3: 'creativity and socializing', 4: 'hard work and building foundations', 5: 'change and freedom', 6: 'responsibility and relationships', 7: 'introspection and analysis', 8: 'harvest and power', 9: 'completion and release'
  };
  const monthThemes: { [key: number]: string } = {
    1: 'taking initiative', 2: 'cooperation', 3: 'self-expression', 4: 'focusing on details', 5: 'embracing change', 6: 'handling duties', 7: 'reflection', 8: 'managing resources', 9: 'letting go'
  };
  const challengeThemes: { [key: number]: string } = {
    0: 'indecisiveness', 1: 'self-assertion', 2: 'over-sensitivity', 3: 'scattered focus', 4: 'rigidity', 5: 'impulsiveness', 6: 'unrealistic ideals', 7: 'skepticism', 8: 'misuse of power'
  }

  const personalCycle = `They are in a ${personalYear} Personal Year, a cycle demanding ${yearThemes[personalYear]}. In their current ${personalMonth} Personal Month, the focus is on ${monthThemes[personalMonth]}.`;
  const majorTransits = `Their Main Challenge number is ${challengeNumbers.main}, indicating a lifelong lesson in overcoming ${challengeThemes[challengeNumbers.main]}. This theme will surface repeatedly, offering opportunities for mastery.`;

  return { personalCycle, majorTransits };
};

export const getMessagingTone = (personality: number): string => {
  const tones: { [key: number]: string } = {
    1: 'Direct, confident, and respectful of their authority. Focus on action and results.',
    2: 'Gentle, diplomatic, and non-confrontational. Appeal to harmony and partnership.',
    3: 'Enthusiastic, optimistic, and inspiring. Use humor and focus on creative possibilities.',
    4: 'Practical, logical, and detailed. Provide clear data and a step-by-step plan.',
    5: 'Exciting, adaptable, and freedom-oriented. Focus on new opportunities and avoid rigid plans.',
    6: 'Caring, responsible, and reassuring. Appeal to their sense of duty and community benefit.',
    7: 'Intellectual, thoughtful, and analytical. Give them space to think and provide deep insights, not superficial claims.',
    8: 'Professional, strategic, and efficient. Focus on mutual benefit, power, and long-term gains.',
    9: 'Compassionate, idealistic, and inclusive. Appeal to a higher cause and the greater good.',
    11: 'Intuitive, authentic, and visionary. Speak with depth and avoid superficiality. Acknowledge their unique perspective.',
    22: 'Pragmatic, ambitious, and focused on legacy. Present grand but well-researched plans that have a tangible impact.',
    33: 'Heartfelt, supportive, and service-oriented. Appeal to their desire to heal and help others.'
  }
  return tones[personality] || 'A balanced tone that is both respectful and authentic.';
};

export const getShadowState = (lifePath: number): { shadow: string, activated: string } => {
  const states: { [key: number]: { shadow: string, activated: string } } = {
    1: { shadow: 'Arrogant or Insecure Dictator', activated: 'Confident Pioneer' },
    2: { shadow: 'Passive or Co-dependent Follower', activated: 'Intuitive Peacemaker' },
    3: { shadow: 'Scattered or Superficial Entertainer', activated: 'Joyful Communicator' },
    4: { shadow: 'Rigid or Overworked Laborer', activated: 'Disciplined Builder' },
    5: { shadow: 'Impulsive or Addictive Escapist', activated: 'Constructive Agent of Change' },
    6: { shadow: 'Martyr or Controlling Meddler', activated: 'Responsible Nurturer' },
    7: { shadow: 'Isolated or Skeptical Critic', activated: 'Wise Sage' },
    8: { shadow: 'Controlling or Micromanaging Tyrant', activated: 'Empowered Trustee' },
    9: { shadow: 'Resentful or Detached Giver', activated: 'Compassionate Humanitarian' },
    11: { shadow: 'Anxious or Overwhelmed Visionary', activated: 'Inspired Messenger' },
    22: { shadow: 'Controlling or Pressured Builder', activated: 'Legacy Architect' },
    33: { shadow: 'Burdened or Self-Sacrificing Martyr', activated: 'Master Teacher' }
  };
  return states[lifePath] || { shadow: 'Imbalanced', activated: 'Integrated' };
};

export const getCRMSuggestions = (contact: Contact) => {
  const { lifePath, expression, score, readings } = contact;
  const { personalYear } = readings;

  const opportunityLevel = score >= 75 ? 'High (Elite Tier)' : (score >= 60 ? 'Medium (Premium)' : 'Neutral');

  const influenceMap: { [key: number]: string } = {
    1: 'their independence', 4: 'logic and stability', 7: 'their intellect', 8: 'their ambition and legacy',
    2: 'partnership', 6: 'their sense of duty', 9: 'a higher cause',
    3: 'creative ideas', 5: 'adventure and freedom',
    11: 'their vision', 22: 'a grand, practical plan', 33: 'helping others'
  };
  const influence = `Appeal to ${influenceMap[lifePath] || 'their unique perspective'}. Present well-researched, logical strategies that solve a complex problem or offer a clear path to greater mastery. Show them precisely how your proposal aligns with their deepest principles and practical ambitions.`;
  
  const growthPath = 'Focus on building trust through intellectual respect and unwavering consistency. Engage in deep conversations about strategy, philosophy, and spirituality. Provide stability and demonstrate competence, proving you are a reliable pillar for their long-term vision.';
  
  const dosMap: { [key: number]: string[] } = {
    1: ['Be direct', 'Respect their autonomy', 'Focus on the goal'],
    4: ['Be prepared with data', 'Provide a clear plan', 'Be reliable'],
    7: ['Give them space for reflection', 'Acknowledge their strategic mind', 'Speak with depth and authenticity'],
    8: ['Talk about long-term value', 'Be efficient and professional', 'Show confidence'],
    2: ['Be patient and diplomatic', 'Listen more than you talk', 'Seek win-win outcomes'],
    3: ['Be optimistic and positive', 'Brainstorm creative ideas', 'Keep it engaging'],
    5: ['Be flexible', 'Offer new experiences', 'Focus on freedom of choice'],
    6: ['Show you care', 'Discuss responsibilities', 'Acknowledge their contributions'],
    9: ['Focus on the greater good', 'Show compassion', 'Be idealistic']
  };
  const dos = dosMap[lifePath] || ['Be authentic', 'Listen carefully', 'Build trust over time'];
  if (lifePath === 11) dos.push(...dosMap[2], 'Acknowledge their intuition');
  if (lifePath === 22) dos.push(...dosMap[4], 'Think big picture');
  if (lifePath === 33) dos.push(...dosMap[6], 'Focus on service');

  const dontsMap: { [key: number]: string[] } = {
    1: ["Challenge their authority directly", "Be indecisive", "Waste their time"],
    4: ["Be disorganized", "Rely on vague promises", "Rush the process"],
    7: ["Rely on emotional appeals", "Be superficial", "Pressure them for a quick answer"],
    8: ["Show weakness", "Be inefficient", "Ignore the bottom line"],
    2: ["Be aggressive or demanding", "Create conflict", "Ignore their feelings"],
    3: ["Be overly critical or negative", "Bog them down with details", "Be boring"],
    5: ["Try to control or restrict them", "Insist on a rigid routine", "Be dogmatic"],
    6: ["Be selfish", "Dismiss their concerns", "Take them for granted"],
    9: ["Be cynical or petty", "Focus only on personal gain", "Be intolerant"]
  };
  const donts = dontsMap[lifePath] || ['Be insincere', 'Make assumptions', 'Break promises'];
  if (lifePath === 11) donts.push(...dontsMap[2], 'Dismiss their feelings');
  if (lifePath === 22) donts.push(...dontsMap[4], 'Present small, uninspiring ideas');
  if (lifePath === 33) donts.push(...dontsMap[6], 'Act unethically');

  const timingMap: { [key: number]: string } = {
    1: 'This is a year for action. Present new ideas and proposals now.',
    4: 'This is a year for work. Present practical, well-structured plans.',
    7: 'This is a year for reflection. Plant conceptual seeds now for action later. Allow for a long decision-making process.',
    8: 'This is a year for power moves. Present opportunities for financial growth and expansion.',
    9: 'This is a year of completion. Focus on wrapping up old projects rather than starting major new ones.',
    5: 'This is a year of change. Be prepared for sudden shifts. Present flexible opportunities.',
  };
  const timing = timingMap[personalYear] || 'Follow their lead on timing, focusing on building a solid relationship first.';

  return { opportunityLevel, influence, growthPath, dos, donts, timing };
};

export const glossary: { [key: string]: { title: string; description: string } } = {
  lifePath: {
    title: 'Life Path Number',
    description: 'Represents your life\'s purpose and the main lesson you are here to learn. It reveals the path you will walk and the opportunities and challenges you will encounter.'
  },
  expression: {
    title: 'Expression (Destiny) Number',
    description: 'Derived from your full birth name, this number reveals your natural talents, abilities, and potential in this lifetime. It is the foundation of your capabilities.'
  },
  soulUrge: {
    title: 'Soul Urge Number',
    description: 'Calculated from the vowels in your name, this number represents your inner desires, motivations, and what your soul truly craves. It\'s the "why" behind your actions.'
  },
  personality: {
    title: 'Personality Number',
    description: 'Calculated from the consonants in your name, this number shows how others see you. It is the outer shell you present to the world and the first impression you make.'
  },
  birthday: {
    title: 'Birthday Number',
    description: 'The number of the day you were born. It represents a specific talent or gift that you possess and will use throughout your life to help you on your path.'
  },
  maturity: {
    title: 'Maturity Number',
    description: 'This number represents a hidden potential or underlying wish that begins to emerge in the second half of your life (around age 35-40). It\'s a goal you will grow into.'
  },
  hiddenPassion: {
    title: 'Hidden Passion Number(s)',
    description: 'Based on the most frequent number in your name, this reveals a specific area of strength or a particular talent that you are passionate about.'
  },
  challengeNumbers: {
    title: 'Challenge Numbers',
    description: 'These numbers indicate personal challenges and weaknesses that you must overcome in this lifetime. Mastering them leads to significant personal growth.'
  },
  karmicDebt: {
    title: 'Karmic Debt Numbers',
    description: 'The numbers 13, 14, 16, and 19 indicate a debt from a past life that needs to be paid back in this one. They point to specific areas of struggle that require conscious effort to resolve.'
  },
  ascendantBasedNumber: {
    title: 'Ascendant-Based Number',
    description: 'A number derived from the birth hour, influencing your initial impression, personality, and how you instinctively react to new situations.'
  },
  planetaryRuling: {
    title: 'Planetary Ruling',
    description: 'The planet and number associated with the day of your birth. It indicates the underlying energetic influences that shape your character and daily life.'
  },
  rulingNumber: {
    title: 'Ruling Number',
    description: 'An advanced number that synthesizes the Life Path and Ascendant for a deeper understanding of your core self and how you project it into the world.'
  },
  personalYear: {
    title: 'Personal Year',
    description: 'Indicates the overarching theme and energy of the current calendar year for you. It\'s part of a 9-year cycle of development and growth.'
  },
  personalMonth: {
    title: 'Personal Month',
    description: 'Represents the specific energetic focus within your current Personal Year. It provides a more detailed look at the monthly themes you will experience.'
  },
  personalDay: {
    title: 'Personal Day',
    description: 'The daily energetic vibration. It helps guide your actions and decisions for the specific day, aligning them with the current flow of energy.'
  }
};