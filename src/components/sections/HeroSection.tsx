import { Button } from '@/components/ui/button';
import { Play, Star, Users, MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface HeroSectionProps {
    onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
    const { t } = useTranslation();

    return (
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden min-h-screen flex items-center">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/svg%3E')] bg-repeat animate-pulse"></div>
            </div>

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-15 animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce delay-500"></div>
                <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-15 animate-pulse delay-2000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content - Slide in from left */}
                    <div className="text-center lg:text-left space-y-8 animate-slideInLeft">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-slideInLeft delay-300">
                            <Star className="w-4 h-4 text-yellow-400 mr-2" />
                            <span className="text-sm font-medium">{t('hero.badge')}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slideInLeft delay-500">
                            {t('hero.title')}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse">
                                {t('hero.titleHighlight')}
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl animate-slideInLeft delay-700">
                            {t('hero.subtitle')}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-slideInLeft delay-900">
                            <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
                                <Users className="w-5 h-5 text-green-400" />
                                <span className="text-sm font-medium">{t('hero.stats.users', { count: 10000 })}</span>
                            </div>
                            <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
                                <MapPin className="w-5 h-5 text-yellow-400" />
                                <span className="text-sm font-medium">{t('hero.stats.destinations', { count: 500 })}</span>
                            </div>
                            <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform duration-300">
                                <Star className="w-5 h-5 text-orange-400" />
                                <span className="text-sm font-medium">{t('hero.stats.rating', { rating: 4.9 })}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slideInLeft delay-1100">
                            <Button
                                onClick={onGetStarted}
                                size="lg"
                                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                            >
                                {t('hero.cta')}
                            </Button>
                        </div>
                    </div>

                    {/* Enhanced Visual - Slide in from right */}
                    <div className="relative animate-slideInRight delay-600">
                        {/* Main card */}
                        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="space-y-6">
                                {/* Browser header */}
                                <div className="flex items-center space-x-3 animate-slideInRight delay-800">
                                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-400"></div>
                                    <div className="flex-1 h-2 bg-white/10 rounded-full ml-4"></div>
                                </div>

                                {/* User profile mockup */}
                                <div className="bg-white/10 rounded-xl p-6 border border-white/10 animate-slideInRight delay-1000">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                                        <div className="flex-1">
                                            <div className="h-3 bg-white/30 rounded-full w-24 mb-2 animate-pulse"></div>
                                            <div className="h-2 bg-white/20 rounded-full w-16 animate-pulse delay-200"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-3 bg-white/25 rounded-full animate-pulse animate-slideInRight delay-1200"></div>
                                        <div className="h-3 bg-white/20 rounded-full w-3/4 animate-pulse delay-300 animate-slideInRight delay-1400"></div>
                                        <div className="h-3 bg-white/15 rounded-full w-1/2 animate-pulse delay-500 animate-slideInRight delay-1600"></div>
                                    </div>
                                </div>

                                {/* Path selection mockup */}
                                <div className="grid grid-cols-2 gap-4 animate-slideInRight delay-1800">
                                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-white/10 hover:scale-105 transition-transform duration-300 animate-slideInUp delay-2000">
                                        <div className="text-3xl mb-2 animate-bounce">🎮</div>
                                        <div className="text-xs text-white/80 font-medium">Gamer Path</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg p-4 border border-white/10 hover:scale-105 transition-transform duration-300 animate-slideInUp delay-2200">
                                        <div className="text-3xl mb-2 animate-bounce delay-200">🧭</div>
                                        <div className="text-xs text-white/80 font-medium">Explorer Path</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg p-4 border border-white/10 hover:scale-105 transition-transform duration-300 animate-slideInUp delay-2400">
                                        <div className="text-3xl mb-2 animate-bounce delay-400">🌟</div>
                                        <div className="text-xs text-white/80 font-medium">Beginner Path</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 border border-white/10 hover:scale-105 transition-transform duration-300 animate-slideInUp delay-2600">
                                        <div className="text-3xl mb-2 animate-bounce delay-600">👴</div>
                                        <div className="text-xs text-white/80 font-medium">Senior Path</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced floating elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-pulse animate-slideInRight delay-1000"></div>
                        <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-25 animate-pulse delay-1000 animate-slideInLeft delay-1200"></div>
                        <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce animate-slideInRight delay-1400"></div>
                    </div>
                </div>
            </div>

            {/* Enhanced wave at bottom - Full width */}
            <div className="absolute bottom-0 left-0 right-0 w-full animate-slideInUp delay-2000">
                <svg viewBox="0 0 1440 320" className="w-full h-24" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{stopColor: 'rgba(255,255,255,0.1)', stopOpacity: 1}} />
                            <stop offset="50%" style={{stopColor: 'rgba(255,255,255,0.2)', stopOpacity: 1}} />
                            <stop offset="100%" style={{stopColor: 'white', stopOpacity: 1}} />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#waveGradient)"
                        d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </section>
    );
};
