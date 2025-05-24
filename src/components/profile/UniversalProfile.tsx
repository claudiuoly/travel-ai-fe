import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, MapPin, Plus, Edit, Trash2, User } from 'lucide-react';
import { CountrySelector } from './CountrySelector';
import { PhotoUpload } from './PhotoUpload';
import { useAuth } from '@/contexts/AuthContext';

interface TravelMemory {
    id: string;
    country: string;
    city: string;
    photos: string[];
    description: string;
    date: string;
}

interface UniversalProfileProps {
    userType?: 'gamer' | 'explorer-advanced' | 'explorer-beginner' | 'senior-friendly';
}

export const UniversalProfile = ({ userType = 'explorer-beginner' }: UniversalProfileProps) => {
    const { user } = useAuth();
    const [travelMemories, setTravelMemories] = useState<TravelMemory[]>([]);
    const [showAddMemory, setShowAddMemory] = useState(false);
    const [newMemory, setNewMemory] = useState({
        country: '',
        city: '',
        photos: [] as string[],
        description: '',
        date: ''
    });

    // Theme configuration based on user type
    const getTheme = () => {
        switch (userType) {
            case 'gamer':
                return {
                    gradient: 'from-purple-50 to-pink-50',
                    border: 'border-purple-200',
                    headerGradient: 'from-purple-400 to-pink-500',
                    buttonColor: 'bg-purple-600 hover:bg-purple-700',
                    accent: 'text-purple-600',
                    emoji: '🎮',
                    title: 'Profilul Meu Gaming',
                    subtitle: 'Arată-ți călătoriile și aventurile'
                };
            case 'explorer-advanced':
                return {
                    gradient: 'from-blue-50 to-cyan-50',
                    border: 'border-blue-200',
                    headerGradient: 'from-blue-400 to-cyan-500',
                    buttonColor: 'bg-blue-600 hover:bg-blue-700',
                    accent: 'text-blue-600',
                    emoji: '🧭',
                    title: 'Profilul Exploratorului',
                    subtitle: 'Documentează-ți expedițiile și descoperirile'
                };
            case 'explorer-beginner':
                return {
                    gradient: 'from-green-50 to-emerald-50',
                    border: 'border-green-200',
                    headerGradient: 'from-green-400 to-emerald-500',
                    buttonColor: 'bg-green-600 hover:bg-green-700',
                    accent: 'text-green-600',
                    emoji: '🌱',
                    title: 'Profilul Începătorului',
                    subtitle: 'Începe să-ți construiești colecția de amintiri'
                };
            case 'senior-friendly':
                return {
                    gradient: 'from-green-50 to-blue-50',
                    border: 'border-green-200',
                    headerGradient: 'from-green-400 to-blue-500',
                    buttonColor: 'bg-green-600 hover:bg-green-700',
                    accent: 'text-green-600',
                    emoji: '👴',
                    title: 'Profilul Meu',
                    subtitle: 'Păstrați amintirile frumoase din călătorii'
                };
            default:
                return {
                    gradient: 'from-gray-50 to-slate-50',
                    border: 'border-gray-200',
                    headerGradient: 'from-gray-400 to-slate-500',
                    buttonColor: 'bg-gray-600 hover:bg-gray-700',
                    accent: 'text-gray-600',
                    emoji: '👤',
                    title: 'Profilul Meu',
                    subtitle: 'Păstrează-ți amintirile de călătorie'
                };
        }
    };

    const theme = getTheme();
    const isSenior = userType === 'senior-friendly';
    const textSize = isSenior ? 'text-lg md:text-xl' : 'text-base md:text-lg';
    const buttonSize = isSenior ? 'lg' : 'default';

    const addTravelMemory = () => {
        if (newMemory.country && newMemory.city) {
            const memory: TravelMemory = {
                id: Date.now().toString(),
                ...newMemory
            };
            setTravelMemories([...travelMemories, memory]);
            setNewMemory({ country: '', city: '', photos: [], description: '', date: '' });
            setShowAddMemory(false);
        }
    };

    const deleteMemory = (id: string) => {
        setTravelMemories(travelMemories.filter(memory => memory.id !== id));
    };

    return (
        <div className="space-y-6 md:space-y-8 p-4 md:p-0">
            {/* Profile Header */}
            <Card className={`bg-gradient-to-r ${theme.gradient} border-2 ${theme.border}`}>
                <CardHeader className="text-center pb-4 md:pb-6">
                    <div className={`w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r ${theme.headerGradient} rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center text-2xl md:text-3xl text-white font-bold`}>
                        {theme.emoji}
                    </div>
                    <CardTitle className={`text-2xl md:text-3xl text-gray-800 ${isSenior ? 'text-3xl md:text-4xl' : ''}`}>
                        {theme.title}
                    </CardTitle>
                    <p className={`${textSize} text-gray-600 px-2`}>{theme.subtitle}</p>
                    {user && (
                        <p className={`${textSize} ${theme.accent} font-medium px-2`}>
                            Bună ziua, {user.fullName}! 👋
                        </p>
                    )}
                </CardHeader>
            </Card>

            {/* Travel Memories */}
            <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className={`${isSenior ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-bold text-gray-800`}>
                        Amintirile Mele de Călătorie 🌍
                    </h2>
                    <Button
                        onClick={() => setShowAddMemory(true)}
                        size={buttonSize}
                        className={`${theme.buttonColor} ${isSenior ? 'text-lg px-6 py-3' : ''} w-full sm:w-auto`}
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Adaugă Amintire
                    </Button>
                </div>

                {/* Add New Memory Form */}
                {showAddMemory && (
                    <Card className={`border-2 border-dashed ${theme.border.replace('border-', 'border-').replace('-200', '-300')}`}>
                        <CardHeader>
                            <CardTitle className={isSenior ? 'text-lg md:text-xl' : 'text-base md:text-lg'}>Adaugă o Amintire Nouă</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={`block ${textSize} font-medium mb-2`}>Țara</label>
                                    <CountrySelector
                                        value={newMemory.country}
                                        onChange={(country) => setNewMemory({...newMemory, country})}
                                    />
                                </div>
                                <div>
                                    <label className={`block ${textSize} font-medium mb-2`}>Orașul</label>
                                    <input
                                        type="text"
                                        value={newMemory.city}
                                        onChange={(e) => setNewMemory({...newMemory, city: e.target.value})}
                                        className={`w-full px-4 py-3 ${textSize} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation`}
                                        placeholder="Introduceți numele orașului"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block ${textSize} font-medium mb-2`}>Data Călătoriei</label>
                                <input
                                    type="date"
                                    value={newMemory.date}
                                    onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
                                    className={`w-full px-4 py-3 ${textSize} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation`}
                                />
                            </div>

                            <div>
                                <label className={`block ${textSize} font-medium mb-2`}>Descriere</label>
                                <textarea
                                    value={newMemory.description}
                                    onChange={(e) => setNewMemory({...newMemory, description: e.target.value})}
                                    className={`w-full px-4 py-3 ${textSize} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 md:h-32 resize-none touch-manipulation`}
                                    placeholder="Descrieți experiența dumneavoastră..."
                                />
                            </div>

                            <div>
                                <label className={`block ${textSize} font-medium mb-2`}>Fotografii</label>
                                <PhotoUpload
                                    photos={newMemory.photos}
                                    onChange={(photos) => setNewMemory({...newMemory, photos})}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                <Button
                                    onClick={addTravelMemory}
                                    size={buttonSize}
                                    className={`${theme.buttonColor} ${isSenior ? 'text-lg px-6' : ''} w-full sm:w-auto`}
                                >
                                    Salvează Amintirea
                                </Button>
                                <Button
                                    onClick={() => setShowAddMemory(false)}
                                    variant="outline"
                                    size={buttonSize}
                                    className={`${isSenior ? 'text-lg px-6' : ''} w-full sm:w-auto`}
                                >
                                    Anulează
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Memory Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {travelMemories.map((memory) => (
                        <Card key={memory.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className={`${isSenior ? 'text-lg md:text-xl' : 'text-base md:text-lg'} flex items-center`}>
                                            <MapPin className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${theme.accent} flex-shrink-0`} />
                                            <span className="truncate">{memory.city}</span>
                                        </CardTitle>
                                        <p className="text-gray-600 truncate">{memory.country}</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => deleteMemory(memory.id)}
                                        className="text-red-600 hover:text-red-700 ml-2 flex-shrink-0 p-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {memory.photos.length > 0 && (
                                    <div className="mb-4">
                                        <img
                                            src={memory.photos[0]}
                                            alt={`${memory.city}, ${memory.country}`}
                                            className="w-full h-40 md:h-48 object-cover rounded-lg"
                                        />
                                        {memory.photos.length > 1 && (
                                            <p className="text-sm text-gray-500 mt-2">
                                                +{memory.photos.length - 1} mai multe fotografii
                                            </p>
                                        )}
                                    </div>
                                )}

                                {memory.description && (
                                    <p className={`text-gray-700 mb-3 ${isSenior ? 'text-base' : 'text-sm'} line-clamp-3`}>
                                        {memory.description}
                                    </p>
                                )}

                                {memory.date && (
                                    <p className="text-sm text-gray-500">
                                        📅 {new Date(memory.date).toLocaleDateString('ro-RO')}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {travelMemories.length === 0 && !showAddMemory && (
                    <Card className="text-center py-8 md:py-12 border-2 border-dashed border-gray-300">
                        <CardContent>
                            <Camera className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-400 mb-4" />
                            <h3 className={`${isSenior ? 'text-lg md:text-xl' : 'text-base md:text-lg'} font-semibold text-gray-600 mb-2`}>
                                Încă nu aveți amintiri adăugate
                            </h3>
                            <p className={`text-gray-500 mb-6 ${textSize} px-4`}>
                                Adăugați prima dumneavoastră amintire de călătorie!
                            </p>
                            <Button
                                onClick={() => setShowAddMemory(true)}
                                size={buttonSize}
                                className={`${theme.buttonColor} w-full sm:w-auto`}
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Adaugă Prima Amintire
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};
