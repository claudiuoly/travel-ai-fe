import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPath } from '@/types/user';

interface PathRecommendationProps {
    userPath: UserPath;
    onAccept: () => void;
    onTryAll: () => void;
    onChooseManually: () => void;
}

export const PathRecommendation = ({
                                       userPath,
                                       onAccept,
                                       onTryAll,
                                       onChooseManually
                                   }: PathRecommendationProps) => {
    const pathInfo = {
        'gamer': {
            title: 'Gamer Path 🎮',
            description: 'Perfect pentru utilizatori tech-savvy care iubesc provocările și elementele de gaming.',
            features: [
                'Interfață dark theme cu elemente neon',
                'Sistem de XP, achievements și leaderboards',
                'Travel quests și photo competitions',
                'Badges și unlockable content'
            ],
            gradient: 'from-purple-600 via-blue-600 to-indigo-700',
            icon: '🎮'
        },
        'explorer-advanced': {
            title: 'Explorer Path - Advanced 🧭',
            description: 'Pentru călători experimentați care caută aventuri și destinații off-the-beaten-path.',
            features: [
                'Instrumente avansate de planificare',
                'Filtre multiple și căutare complexă',
                'Hidden gems și destinații exotice',
                'Community forums pentru sharing'
            ],
            gradient: 'from-green-600 via-teal-600 to-blue-600',
            icon: '🧭'
        },
        'explorer-beginner': {
            title: 'Explorer Path - Beginner 🌟',
            description: 'Ideal pentru începători în călătorii care vor ghidare și destinații populare.',
            features: [
                'Interfață clean și intuitivă',
                'Tutorial pas cu pas',
                'Destinații populare și sigure',
                'Suport 24/7 și ghiduri detaliate'
            ],
            gradient: 'from-blue-600 via-indigo-600 to-purple-600',
            icon: '🌟'
        },
        'senior-friendly': {
            title: 'Senior-Friendly Path 👴👵',
            description: 'Pentru utilizatori care preferă simplitatea și accesibilitatea.',
            features: [
                'Fonturi mari și contrast înalt',
                'Navigare simplă cu butoane mari',
                'Voice commands și suport telefonic',
                'Călătorii liniștite și accessible'
            ],
            gradient: 'from-orange-600 via-red-600 to-pink-600',
            icon: '👴'
        }
    };

    const info = pathInfo[userPath.type];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        🎉 Perfect Match!
                    </h1>
                    <p className="text-xl text-gray-600">
                        Pe baza răspunsurilor tale, am găsit calea perfectă pentru tine
                    </p>
                </div>

                {/* Main Recommendation Card */}
                <Card className="mb-8 overflow-hidden">
                    <div className={`bg-gradient-to-r ${info.gradient} p-8 text-white`}>
                        <div className="flex items-center justify-center mb-6">
                            <div className="text-6xl">{info.icon}</div>
                        </div>
                        <h2 className="text-3xl font-bold text-center mb-4">
                            {info.title}
                        </h2>
                        <p className="text-xl text-center opacity-90 leading-relaxed">
                            {info.description}
                        </p>

                        {/* Score */}
                        <div className="text-center mt-6">
                            <div className="inline-block bg-white/20 rounded-full px-6 py-2">
                <span className="text-lg font-semibold">
                  Match Score: {userPath.score}%
                </span>
                            </div>
                        </div>
                    </div>

                    <CardContent className="p-8">
                        <h3 className="text-xl font-semibold mb-4 text-center">
                            Ce vei găsi în această cale:
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {info.features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-green-600 text-sm">✓</span>
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Preferences Breakdown */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-center">Analiza Preferințelor Tale</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-2xl mb-2">💻</div>
                                <div className="text-sm text-gray-600 mb-1">Tehnologie</div>
                                <div className="text-lg font-semibold">{userPath.preferences.technology}/10</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">🌍</div>
                                <div className="text-sm text-gray-600 mb-1">Călătorii</div>
                                <div className="text-lg font-semibold">{userPath.preferences.travel}/10</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">🧠</div>
                                <div className="text-sm text-gray-600 mb-1">Personalitate</div>
                                <div className="text-lg font-semibold">{userPath.preferences.personality}/10</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">🎮</div>
                                <div className="text-sm text-gray-600 mb-1">Gaming</div>
                                <div className="text-lg font-semibold">{userPath.preferences.gaming}/10</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Button
                        onClick={onAccept}
                        size="lg"
                        className={`bg-gradient-to-r ${info.gradient} hover:opacity-90 text-white font-semibold py-4`}
                    >
                        ✨ Acceptă Recomandarea
                    </Button>

                    <Button
                        onClick={onTryAll}
                        variant="outline"
                        size="lg"
                        className="font-semibold py-4"
                    >
                        🔄 Încearcă Toate Căile
                    </Button>

                    <Button
                        onClick={onChooseManually}
                        variant="outline"
                        size="lg"
                        className="font-semibold py-4"
                    >
                        ⚙️ Alege Manual
                    </Button>
                </div>

                {/* Info note */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Nu îți place alegerea? Poți schimba calea oricând din setări!
                    </p>
                </div>
            </div>
        </div>
    );
};