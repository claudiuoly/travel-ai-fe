import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, MapPin, Plus, Edit, Trash2, User } from 'lucide-react';
import { CountrySelector } from './CountrySelector';
import { PhotoUpload } from './PhotoUpload';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';

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
    const { t } = useTranslation();
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
                    title: t('profile.pathTitles.gamer'),
                    subtitle: t('profile.pathSubtitles.gamer')
                };
            case 'explorer-advanced':
                return {
                    gradient: 'from-blue-50 to-cyan-50',
                    border: 'border-blue-200',
                    headerGradient: 'from-blue-400 to-cyan-500',
                    buttonColor: 'bg-blue-600 hover:bg-blue-700',
                    accent: 'text-blue-600',
                    emoji: '🧭',
                    title: t('profile.pathTitles.explorer-advanced'),
                    subtitle: t('profile.pathSubtitles.explorer-advanced')
                };
            case 'explorer-beginner':
                return {
                    gradient: 'from-green-50 to-emerald-50',
                    border: 'border-green-200',
                    headerGradient: 'from-green-400 to-emerald-500',
                    buttonColor: 'bg-green-600 hover:bg-green-700',
                    accent: 'text-green-600',
                    emoji: '🌱',
                    title: t('profile.pathTitles.explorer-beginner'),
                    subtitle: t('profile.pathSubtitles.explorer-beginner')
                };
            case 'senior-friendly':
                return {
                    gradient: 'from-green-50 to-blue-50',
                    border: 'border-green-200',
                    headerGradient: 'from-green-400 to-blue-500',
                    buttonColor: 'bg-green-600 hover:bg-green-700',
                    accent: 'text-green-600',
                    emoji: '👴',
                    title: t('profile.pathTitles.senior-friendly'),
                    subtitle: t('profile.pathSubtitles.senior-friendly')
                };
            default:
                return {
                    gradient: 'from-gray-50 to-slate-50',
                    border: 'border-gray-200',
                    headerGradient: 'from-gray-400 to-slate-500',
                    buttonColor: 'bg-gray-600 hover:bg-gray-700',
                    accent: 'text-gray-600',
                    emoji: '👤',
                    title: t('profile.title'),
                    subtitle: t('profile.pathSubtitles.senior-friendly')
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
                            {t('header.greeting', { name: user.fullName })}
                        </p>
                    )}
                </CardHeader>
            </Card>

            {/* Travel Memories */}
            <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className={`${isSenior ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-bold text-gray-800`}>
                        {t('profile.travelMemories')}
                    </h2>
                    <Button
                        onClick={() => setShowAddMemory(true)}
                        size={buttonSize}
                        className={`${theme.buttonColor} ${isSenior ? 'text-lg px-6 py-3' : ''} w-full sm:w-auto`}
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        {t('profile.addMemory')}
                    </Button>
                </div>

                {/* Add New Memory Form */}
                {showAddMemory && (
                    <Card className={`border-2 border-dashed ${theme.border.replace('border-', 'border-').replace('-200', '-300')}`}>
                        <CardHeader>
                            <CardTitle className={isSenior ? 'text-lg md:text-xl' : 'text-base md:text-lg'}>{t('profile.newMemoryTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={`block ${textSize} font-medium mb-2`}>{t('profile.country')}</label>
                                    <CountrySelector
                                        value={newMemory.country}
                                        onChange={(country) => setNewMemory({...newMemory, country})}
                                    />
                                </div>
                                <div>
                                    <label className={`block ${textSize} font-medium mb-2`}>{t('profile.city')}</label>
                                    <input
                                        type="text"
                                        value={newMemory.city}
                                        onChange={(e) => setNewMemory({...newMemory, city: e.target.value})}
                                        className={`w-full px-4 py-3 ${textSize} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation`}
                                        placeholder={t('profile.cityPlaceholder')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block ${textSize} font-medium mb-2`}>{t('profile.travelDate')}</label>
                                <input
                                    type="date"
                                    value={newMemory.date}
                                    onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
                                    className={`w-full px-4 py-3 ${textSize} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 touch-manipulation`}
                                />
                            </div>

                            <div>
                                <label className={`block ${textSize} font-medium mb-2`}>{t('profile.description')}</label>
                                <textarea
                                    value={newMemory.description}
                                    onChange={(e) => setNewMemory({...newMemory, description: e.target.value})}
                                    className={`w-full px-4 py-3 ${textSize} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 md:h-32 resize-none touch-manipulation`}
                                    placeholder={t('profile.descriptionPlaceholder')}
                                />
                            </div>

                            <div>
                                <label className={`block ${textSize} font-medium mb-2`}>{t('profile.photos')}</label>
                                <PhotoUpload
                                    photos={newMemory.photos}
                                    onChange={(photos) => setNewMemory({...newMemory, photos})}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Button
                                    onClick={addTravelMemory}
                                    size={buttonSize}
                                    className={`${theme.buttonColor} ${isSenior ? 'text-lg px-6 py-3' : ''} w-full sm:flex-1`}
                                >
                                    {t('profile.saveMemory')}
                                </Button>
                                <Button
                                    onClick={() => setShowAddMemory(false)}
                                    variant="outline"
                                    size={buttonSize}
                                    className={`${isSenior ? 'text-lg px-6 py-3' : ''} w-full sm:flex-1`}
                                >
                                    {t('common.cancel')}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Travel Memories List */}
                {travelMemories.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Camera className="w-16 h-16 md:w-20 md:h-20 text-gray-400 mx-auto mb-4" />
                            <h3 className={`${isSenior ? 'text-lg md:text-xl' : 'text-base md:text-lg'} font-medium text-gray-600 mb-2`}>
                                {t('profile.noMemories.title')}
                            </h3>
                            <p className={`${textSize} text-gray-500 mb-6`}>
                                {t('profile.noMemories.subtitle')}
                            </p>
                            <Button
                                onClick={() => setShowAddMemory(true)}
                                size={buttonSize}
                                className={`${theme.buttonColor} ${isSenior ? 'text-lg px-6 py-3' : ''}`}
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                {t('profile.addFirstMemory')}
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:gap-6">
                        {travelMemories.map((memory) => (
                            <Card key={memory.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-4 md:p-6">
                                    <div className="flex flex-col lg:flex-row gap-4">
                                        {/* Photos */}
                                        {memory.photos.length > 0 && (
                                            <div className="lg:w-1/3">
                                                <div className="relative">
                                                    <img
                                                        src={memory.photos[0]}
                                                        alt={`${memory.city}, ${memory.country}`}
                                                        className="w-full h-48 md:h-64 lg:h-48 object-cover rounded-lg"
                                                    />
                                                    {memory.photos.length > 1 && (
                                                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                                            {t('profile.morePhotos', { count: memory.photos.length - 1 })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                                                <div>
                                                    <h3 className={`${isSenior ? 'text-lg md:text-xl' : 'text-base md:text-lg'} font-bold text-gray-800 flex items-center gap-2`}>
                                                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                                                        {memory.city}, {memory.country}
                                                    </h3>
                                                    {memory.date && (
                                                        <p className={`${textSize} text-gray-500`}>
                                                            {new Date(memory.date).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className={isSenior ? 'px-3 py-2' : ''}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => deleteMemory(memory.id)}
                                                        className={`text-red-600 hover:text-red-700 ${isSenior ? 'px-3 py-2' : ''}`}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {memory.description && (
                                                <p className={`${textSize} text-gray-600 leading-relaxed`}>
                                                    {memory.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
