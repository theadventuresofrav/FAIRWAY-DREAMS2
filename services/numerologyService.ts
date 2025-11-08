import type { CoreReadings, AdvancedReadings } from '../types';

// Simple numerology calculator
const reduce = (num: number): number => {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num).split('').reduce((a, b) => Number(a) + Number(b), 0);
  }
  return num;
};

// Reduce to a single digit, ignoring master numbers. Used for challenges.
const reduceToSingleDigit = (num: number): number => {
  while (num > 9) {
    num = String(num).split('').reduce((a, b) => Number(a) + Number(b), 0);
  }
  return num;
}

const LETTER_VALUES: { [key: string]: number } = {
    A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
    J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
    S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
};
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

export const calcLifePath = (dateString: string): number => {
  if (!dateString) return 0;
  // dateString is in "YYYY-MM-DD" format, which avoids timezone issues with new Date()
  const [year, month, day] = dateString.split('-').map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return 0;
  const reducedDay = reduce(day);
  const reducedMonth = reduce(month);
  const reducedYear = reduce(year);
  return reduce(reducedDay + reducedMonth + reducedYear);
};

export const calcExpression = (name: string): number => {
  let sum = 0;
  for (const c of name.toUpperCase().replace(/[^A-Z]/g, '')) {
    sum += LETTER_VALUES[c] || 0;
  }
  return reduce(sum);
};

interface ReadingInputs {
  fullName: string;
  birthdate: string;
  lifePath: number;
  expression: number;
}

export const calculateCoreReadings = ({ fullName, birthdate, lifePath, expression }: ReadingInputs): CoreReadings => {
    const karmicDebt = new Set<number>();
    const nameChars = fullName.toUpperCase().replace(/[^A-Z]/g, '').split('');

    const checkKarmic = (sum: number) => {
        if ([13, 14, 16, 19].includes(sum)) {
            karmicDebt.add(sum);
        }
    };

    // Soul Urge
    const soulUrgeSum = nameChars.filter(c => VOWELS.has(c)).reduce((sum, char) => sum + LETTER_VALUES[char], 0);
    checkKarmic(soulUrgeSum);
    const soulUrge = reduce(soulUrgeSum);

    // Personality
    const personalitySum = nameChars.filter(c => !VOWELS.has(c)).reduce((sum, char) => sum + LETTER_VALUES[char], 0);
    checkKarmic(personalitySum);
    const personality = reduce(personalitySum);
    
    // Birthday
    const day = parseInt(birthdate.split('-')[2], 10);
    checkKarmic(day);
    const birthday = reduce(day);

    // Maturity
    const maturitySum = lifePath + expression;
    checkKarmic(maturitySum);
    const maturity = reduce(maturitySum);
    
    // Hidden Passion
    const numberCounts: { [key: number]: number } = {};
    nameChars.forEach(c => {
        const num = LETTER_VALUES[c];
        numberCounts[num] = (numberCounts[num] || 0) + 1;
    });
    let maxCount = 0;
    Object.values(numberCounts).forEach(count => {
        if (count > maxCount) maxCount = count;
    });
    const hiddenPassion = Object.keys(numberCounts)
        .filter(num => numberCounts[Number(num)] === maxCount)
        .map(Number)
        .sort((a, b) => a - b);
    
    // Challenge Numbers
    const [yearNum, monthNum, dayNum] = birthdate.split('-').map(Number);
    const rMonth = reduceToSingleDigit(monthNum);
    const rDay = reduceToSingleDigit(dayNum);
    const rYear = reduceToSingleDigit(yearNum);
    const c1 = reduceToSingleDigit(Math.abs(rMonth - rDay));
    const c2 = reduceToSingleDigit(Math.abs(rDay - rYear));
    const mainChallenge = reduceToSingleDigit(Math.abs(c1 - c2));
    const c4 = reduceToSingleDigit(Math.abs(rMonth - rYear));
    const challengeNumbers = { first: c1, second: c2, main: mainChallenge, fourth: c4 };

    // Check pre-calculated numbers for karmic debt sources
    const lifePathSum = reduce(dayNum) + reduce(monthNum) + reduce(yearNum);
    checkKarmic(lifePathSum);
    const expressionSum = nameChars.reduce((sum, char) => sum + LETTER_VALUES[char], 0);
    checkKarmic(expressionSum);
    
    // Personal Cycles
    const now = new Date();
    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth() + 1; // 1-indexed
    const currentDay = now.getUTCDate();
    const personalYear = reduce(dayNum + monthNum + currentYear);
    const personalMonth = reduce(personalYear + currentMonth);
    const personalDay = reduce(personalMonth + currentDay);

    return {
        soulUrge,
        personality,
        birthday,
        maturity,
        hiddenPassion,
        challengeNumbers,
        karmicDebt: Array.from(karmicDebt).sort((a,b) => a-b),
        personalYear,
        personalMonth,
        personalDay,
    };
};


interface ScoreFactors {
  lifePath: number;
  expression: number;
  birthTime?: string;
}

export const calculateScore = ({ lifePath, expression, birthTime }: ScoreFactors): number => {
    let score = 50; // Base score

    // --- Life Path Bonuses ---
    if (lifePath === 8) {
      score += 15; // Power & Wealth
    }
    if ([11, 22, 33].includes(lifePath)) {
      score += 20; // Master Number potential
    }
    if ([5, 7].includes(lifePath)) {
      score += 5; // Freedom & Intellect
    }

    // --- Expression Number Bonuses ---
    if ([1, 9].includes(expression)) {
      score += 10; // Leadership & Completion
    }
    if (expression === 22) {
      score += 15; // Master Builder talent
    }

    // --- Birth Time Bonus (Power Hours) ---
    if (birthTime) {
      const hour = parseInt(birthTime.split(':')[0], 10);
      if (!isNaN(hour) && hour % 3 === 0) {
        score += 5; // Born on a "power hour" (multiples of 3)
      }
    }

    // --- Synergy Bonus ---
    if (lifePath === expression) {
      score += 10; // Focused energy
    }
    
    // Cap the score at 100 to keep it consistent.
    return Math.min(score, 100);
};

export const calculateAdvancedReadings = (birthdate: string, birthTime: string | undefined, lifePath: number): AdvancedReadings | undefined => {
  if (!birthdate || !birthTime) {
    return undefined;
  }

  const hour = parseInt(birthTime.split(':')[0], 10);
  // Treat the provided date and time as UTC to remain timezone-agnostic
  const date = new Date(`${birthdate}T${birthTime}:00Z`);

  // 1. Ascendant-Based Numerology (Simplified)
  const ascendantBasedNumber = reduceToSingleDigit((hour % 12) + 1);

  // 2. Planetary Numerology Assignments
  const dayOfWeek = date.getUTCDay(); // Sunday - 0, Monday - 1, ...
  const planetaryAssignments: { [key: number]: { planet: string, number: number } } = {
    0: { planet: 'Sun', number: 1 },       // Sunday
    1: { planet: 'Moon', number: 2 },      // Monday
    2: { planet: 'Mars', number: 9 },      // Tuesday
    3: { planet: 'Mercury', number: 5 },   // Wednesday
    4: { planet: 'Jupiter', number: 3 },   // Thursday
    5: { planet: 'Venus', number: 6 },     // Friday
    6: { planet: 'Saturn', number: 8 },    // Saturday
  };
  const planetaryRuling = planetaryAssignments[dayOfWeek];

  // 3. Ruling Number (Advanced)
  const rulingNumber = reduce(lifePath + ascendantBasedNumber);

  return {
    ascendantBasedNumber,
    planetaryRuling,
    rulingNumber,
  };
};