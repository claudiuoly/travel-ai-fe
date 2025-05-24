import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface HeroSectionProps {
    onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
    return (
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.2%22%3E%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Descoperă lumea cu
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                {" "}TravelQuest
              </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                            O aplicație de călătorii personalizată care se adaptează stilului tău de viață.
                            De la gameri la exploratori și seniori - fiecare are partea sa de aventură.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                onClick={onGetStarted}
                                size="lg"
                                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                🚀 Începe Aventura
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg transition-all duration-300 flex items-center gap-2"
                            >
                                <Play className="w-5 h-5" />
                                Vezi Demo
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-blue-400/30">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">10K+</div>
                                <div className="text-blue-200">Utilizatori Activi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">50+</div>
                                <div className="text-blue-200">Destinații</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">4.9⭐</div>
                                <div className="text-blue-200">Rating Mediu</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>

                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                                        <div>
                                            <div className="h-2 bg-white/20 rounded w-20 mb-1"></div>
                                            <div className="h-1.5 bg-white/10 rounded w-16"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-2 bg-white/20 rounded"></div>
                                        <div className="h-2 bg-white/15 rounded w-3/4"></div>
                                        <div className="h-2 bg-white/10 rounded w-1/2"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <div className="text-2xl mb-1">🎮</div>
                                        <div className="text-xs text-white/60">Gamer Path</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                                        <div className="text-2xl mb-1">🧭</div>
                                        <div className="text-xs text-white/60">Explorer Path</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
                    </div>
                </div>
            </div>

            {/* Wave at bottom */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 320" className="w-full h-20">
                    <path
                        fill="white"
                        d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </section>
    );
};
