import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { quizQuestions } from '@/data/quizData';
import { QuizAnswer, UserPath, UserPreferences } from '@/types/user';

interface ProfileQuizProps {
    onComplete: (userPath: UserPath) => void;
}

export const ProfileQuiz = ({ onComplete }: ProfileQuizProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleAnswer = (answer: QuizAnswer) => {
        setIsTransitioning(true);

        setTimeout(() => {
            const newAnswers = [...answers, answer];
            setAnswers(newAnswers);

            if (currentQuestion < quizQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                // Calculate results
                const results = calculateResults(newAnswers);
                onComplete(results);
            }
            setIsTransitioning(false);
        }, 300);
    };

    const calculateResults = (userAnswers: QuizAnswer[]): UserPath => {
        const scores = {
            gamer: 0,
            explorerAdvanced: 0,
            explorerBeginner: 0,
            seniorFriendly: 0
        };

        const categoryScores = {
            technology: 0,
            travel: 0,
            personality: 0,
            gaming: 0
        };

        userAnswers.forEach((answer, index) => {
            const question = quizQuestions[index];

            // Add to total scores
            scores.gamer += answer.scores.gamer;
            scores.explorerAdvanced += answer.scores.explorerAdvanced;
            scores.explorerBeginner += answer.scores.explorerBeginner;
            scores.seniorFriendly += answer.scores.seniorFriendly;

            // Add to category scores (for preferences)
            const maxScore = Math.max(...Object.values(answer.scores));
            categoryScores[question.category] += maxScore;
        });

        // Find the path with highest score
        const maxScore = Math.max(...Object.values(scores));
        const pathType = Object.keys(scores).find(
            key => scores[key as keyof typeof scores] === maxScore
        ) as keyof typeof scores;

        // Convert pathType to match interface
        const normalizedPathType = pathType === 'explorerAdvanced' ? 'explorer-advanced' :
            pathType === 'explorerBeginner' ? 'explorer-beginner' :
                pathType === 'seniorFriendly' ? 'senior-friendly' : pathType;

        const preferences: UserPreferences = {
            technology: Math.round((categoryScores.technology / quizQuestions.filter(q => q.category === 'technology').length) * 10),
            travel: Math.round((categoryScores.travel / quizQuestions.filter(q => q.category === 'travel').length) * 10),
            personality: Math.round((categoryScores.personality / quizQuestions.filter(q => q.category === 'personality').length) * 10),
            gaming: Math.round((categoryScores.gaming / quizQuestions.filter(q => q.category === 'gaming').length) * 10)
        };

        return {
            type: normalizedPathType,
            score: Math.round((maxScore / (userAnswers.length * 3)) * 100),
            preferences
        };
    };

    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    const question = quizQuestions[currentQuestion];

    const categoryIcons = {
        technology: '💻',
        travel: '🌍',
        personality: '🧠',
        gaming: '🎮'
    };

    const categoryNames = {
        technology: 'Tehnologie & Digital',
        travel: 'Experiența de Călătorie',
        personality: 'Personalitate',
        gaming: 'Gaming & Entertainment'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Întrebarea {currentQuestion + 1} din {quizQuestions.length}
            </span>
                        <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}% completat
            </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Question Card */}
                <Card className={`transition-all duration-300 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                    <CardHeader className="text-center pb-4">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                                {categoryIcons[question.category]}
                            </div>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                            {categoryNames[question.category]}
                        </div>
                        <CardTitle className="text-xl md:text-2xl text-gray-800">
                            {question.question}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {question.answers.map((answer, index) => (
                            <Button
                                key={answer.id}
                                variant="outline"
                                className="w-full p-4 h-auto text-left justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
                                onClick={() => handleAnswer(answer)}
                                disabled={isTransitioning}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center font-semibold text-blue-600 group-hover:from-blue-200 group-hover:to-purple-200">
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className="text-gray-700 leading-relaxed">
                    {answer.text}
                  </span>
                                </div>
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                {/* Navigation hint */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Alege răspunsul care te descrie cel mai bine
                    </p>
                </div>
            </div>
        </div>
    );
};