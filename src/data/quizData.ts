import { QuizQuestion } from '@/types/user';

export const quizQuestions: QuizQuestion[] = [
    // Technology & Digital Literacy
    {
        id: 'tech-1',
        category: 'technology',
        question: 'Cât de confortabil ești cu tehnologia?',
        answers: [
            {
                id: 'tech-1-1',
                text: 'Foarte confortabil - îmi place să explorez funcții noi',
                scores: { gamer: 3, explorerAdvanced: 2, explorerBeginner: 1, seniorFriendly: 0 }
            },
            {
                id: 'tech-1-2',
                text: 'Destul de confortabil - folosesc ce am nevoie',
                scores: { gamer: 2, explorerAdvanced: 3, explorerBeginner: 2, seniorFriendly: 1 }
            },
            {
                id: 'tech-1-3',
                text: 'Moderat - prefer interfețe simple',
                scores: { gamer: 1, explorerAdvanced: 1, explorerBeginner: 3, seniorFriendly: 2 }
            },
            {
                id: 'tech-1-4',
                text: 'Puțin confortabil - am nevoie de ajutor',
                scores: { gamer: 0, explorerAdvanced: 0, explorerBeginner: 2, seniorFriendly: 3 }
            }
        ]
    },
    {
        id: 'tech-2',
        category: 'technology',
        question: 'Cât timp petreci zilnic pe telefon/calculator?',
        answers: [
            {
                id: 'tech-2-1',
                text: 'Peste 6 ore',
                scores: { gamer: 3, explorerAdvanced: 2, explorerBeginner: 1, seniorFriendly: 0 }
            },
            {
                id: 'tech-2-2',
                text: '3-6 ore',
                scores: { gamer: 2, explorerAdvanced: 3, explorerBeginner: 2, seniorFriendly: 1 }
            },
            {
                id: 'tech-2-3',
                text: '1-3 ore',
                scores: { gamer: 1, explorerAdvanced: 2, explorerBeginner: 3, seniorFriendly: 2 }
            },
            {
                id: 'tech-2-4',
                text: 'Sub 1 oră',
                scores: { gamer: 0, explorerAdvanced: 0, explorerBeginner: 1, seniorFriendly: 3 }
            }
        ]
    },
    // Travel Experience
    {
        id: 'travel-1',
        category: 'travel',
        question: 'Cât de des călătorești?',
        answers: [
            {
                id: 'travel-1-1',
                text: 'Foarte frecvent - mai mult de 5 călătorii pe an',
                scores: { gamer: 2, explorerAdvanced: 3, explorerBeginner: 1, seniorFriendly: 1 }
            },
            {
                id: 'travel-1-2',
                text: 'Frecvent - 3-5 călătorii pe an',
                scores: { gamer: 2, explorerAdvanced: 3, explorerBeginner: 2, seniorFriendly: 1 }
            },
            {
                id: 'travel-1-3',
                text: 'Rar - 1-2 călătorii pe an',
                scores: { gamer: 1, explorerAdvanced: 2, explorerBeginner: 3, seniorFriendly: 2 }
            },
            {
                id: 'travel-1-4',
                text: 'Foarte rar sau niciodată',
                scores: { gamer: 0, explorerAdvanced: 0, explorerBeginner: 3, seniorFriendly: 3 }
            }
        ]
    },
    {
        id: 'travel-2',
        category: 'travel',
        question: 'Ce tip de călătorie preferi?',
        answers: [
            {
                id: 'travel-2-1',
                text: 'Aventură și explorare',
                scores: { gamer: 3, explorerAdvanced: 3, explorerBeginner: 2, seniorFriendly: 0 }
            },
            {
                id: 'travel-2-2',
                text: 'Mix între aventură și relaxare',
                scores: { gamer: 2, explorerAdvanced: 2, explorerBeginner: 3, seniorFriendly: 1 }
            },
            {
                id: 'travel-2-3',
                text: 'Relaxare și confort',
                scores: { gamer: 1, explorerAdvanced: 1, explorerBeginner: 2, seniorFriendly: 3 }
            },
            {
                id: 'travel-2-4',
                text: 'Călătorii organize complete',
                scores: { gamer: 0, explorerAdvanced: 0, explorerBeginner: 3, seniorFriendly: 3 }
            }
        ]
    },
    // Personality
    {
        id: 'personality-1',
        category: 'personality',
        question: 'Cum te-ai descrie?',
        answers: [
            {
                id: 'personality-1-1',
                text: 'Foarte extravertit - îmi place să cunosc oameni noi',
                scores: { gamer: 2, explorerAdvanced: 3, explorerBeginner: 2, seniorFriendly: 1 }
            },
            {
                id: 'personality-1-2',
                text: 'Moderat extravertit',
                scores: { gamer: 2, explorerAdvanced: 2, explorerBeginner: 3, seniorFriendly: 2 }
            },
            {
                id: 'personality-1-3',
                text: 'Moderat introvertit',
                scores: { gamer: 3, explorerAdvanced: 1, explorerBeginner: 2, seniorFriendly: 2 }
            },
            {
                id: 'personality-1-4',
                text: 'Foarte introvertit - prefer să călătoresc singur',
                scores: { gamer: 3, explorerAdvanced: 2, explorerBeginner: 1, seniorFriendly: 3 }
            }
        ]
    },
    // Gaming
    {
        id: 'gaming-1',
        category: 'gaming',
        question: 'Joci jocuri video?',
        answers: [
            {
                id: 'gaming-1-1',
                text: 'Da, sunt pasionat de gaming',
                scores: { gamer: 3, explorerAdvanced: 1, explorerBeginner: 0, seniorFriendly: 0 }
            },
            {
                id: 'gaming-1-2',
                text: 'Da, ocazional',
                scores: { gamer: 2, explorerAdvanced: 2, explorerBeginner: 1, seniorFriendly: 0 }
            },
            {
                id: 'gaming-1-3',
                text: 'Rar, jocuri simple',
                scores: { gamer: 1, explorerAdvanced: 1, explorerBeginner: 2, seniorFriendly: 1 }
            },
            {
                id: 'gaming-1-4',
                text: 'Nu joc jocuri video',
                scores: { gamer: 0, explorerAdvanced: 2, explorerBeginner: 3, seniorFriendly: 3 }
            }
        ]
    },
    {
        id: 'gaming-2',
        category: 'gaming',
        question: 'Îți plac provocările și competițiile?',
        answers: [
            {
                id: 'gaming-2-1',
                text: 'Foarte mult - îmi plac să câștig',
                scores: { gamer: 3, explorerAdvanced: 2, explorerBeginner: 1, seniorFriendly: 0 }
            },
            {
                id: 'gaming-2-2',
                text: 'Da, sunt motivante',
                scores: { gamer: 2, explorerAdvanced: 3, explorerBeginner: 2, seniorFriendly: 1 }
            },
            {
                id: 'gaming-2-3',
                text: 'Puțin, prefer colaborarea',
                scores: { gamer: 1, explorerAdvanced: 2, explorerBeginner: 3, seniorFriendly: 2 }
            },
            {
                id: 'gaming-2-4',
                text: 'Nu îmi plac - prefer pacea',
                scores: { gamer: 0, explorerAdvanced: 1, explorerBeginner: 2, seniorFriendly: 3 }
            }
        ]
    }
];
