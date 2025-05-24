export interface User {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    username: string;
    age: number;
    userPath?: UserPath;
    profileCompleted: boolean;
    createdAt: Date;
  }
  
  export interface UserPath {
    type: 'gamer' | 'explorer-advanced' | 'explorer-beginner' | 'senior-friendly';
    score: number;
    preferences: UserPreferences;
  }
  
  export interface UserPreferences {
    technology: number;
    travel: number;
    personality: number;
    gaming: number;
  }
  
  export interface QuizQuestion {
    id: string;
    category: 'technology' | 'travel' | 'personality' | 'gaming';
    question: string;
    answers: QuizAnswer[];
  }
  
  export interface QuizAnswer {
    id: string;
    text: string;
    scores: {
      gamer: number;
      explorerAdvanced: number;
      explorerBeginner: number;
      seniorFriendly: number;
    };
  }
  