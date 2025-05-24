import { Gamepad2, Compass, Star, Heart } from 'lucide-react';

export const FeaturesSection = () => {
    const features = [
        {
            icon: <Gamepad2 className="w-12 h-12 text-white" />,
            emoji: '🎮',
            title: 'Gamer Path',
            description: 'Interfață dark theme cu elemente gaming, provocări, achievements și leaderboards pentru o experiență gamificată.',
            gradient: 'from-purple-600 to-blue-600',
            hoverGradient: 'hover:from-purple-700 hover:to-blue-700',
            features: ['Dark Theme', 'Achievements', 'Leaderboards', 'Provocări Gaming']
        },
        {
            icon: <Compass className="w-12 h-12 text-white" />,
            emoji: '🧭',
            title: 'Explorer Advanced',
            description: 'Instrumente avansate de planificare, filtre multiple și destinații off-the-beaten-path pentru aventurieri experimentați.',
            gradient: 'from-green-600 to-teal-600',
            hoverGradient: 'hover:from-green-700 hover:to-teal-700',
            features: ['Filtre Avansate', 'Planificare Detaliată', 'Destinații Rare', 'Hărți Interactive']
        },
        {
            icon: <Star className="w-12 h-12 text-white" />,
            emoji: '🌟',
            title: 'Explorer Beginner',
            description: 'Interfață curată cu ghidare pas cu pas și destinații populare și sigure pentru începători în călătorii.',
            gradient: 'from-blue-600 to-indigo-600',
            hoverGradient: 'hover:from-blue-700 hover:to-indigo-700',
            features: ['Ghidare Pas cu Pas', 'Destinații Sigure', 'Suport 24/7', 'Recomandări Personalizate']
        },
        {
            icon: <Heart className="w-12 h-12 text-white" />,
            emoji: '👴',
            title: 'Senior-Friendly',
            description: 'Design simplificat cu fonturi mari, butoane mari și suport telefonic 24/7 pentru utilizatorii seniors.',
            gradient: 'from-orange-600 to-red-600',
            hoverGradient: 'hover:from-orange-700 hover:to-red-700',
            features: ['Fonturi Mari', 'Butoane Mari', 'Suport Telefonic', 'Design Simplificat']
        }
    ];

    return (
        <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-4000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-slideInUp">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4 animate-slideInDown delay-300">
                        ✨ Opțiuni Personalizate
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-slideInUp delay-500">
                        Căi Personalizate de
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Utilizare
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slideInUp delay-700">
                        Fiecare utilizator primește o experiență unică, adaptată perfect personalității și experienței sale.
                        Alege calea care ți se potrivește cel mai bine.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                        <div key={index} className={`group relative ${index % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'} delay-${900 + (index * 200)}`}>
                            <div className={`bg-gradient-to-br ${feature.gradient} ${feature.hoverGradient} rounded-3xl p-8 lg:p-10 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden`}>
                                {/* Background pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.2%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
                                </div>

                                {/* Floating decorative element */}
                                <div className="absolute top-4 right-4 opacity-20">
                                    <div className="text-6xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                        {feature.emoji}
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center mb-6">
                                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 mr-4 group-hover:scale-110 transition-transform duration-300">
                                            {feature.icon}
                                        </div>
                                        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                                            {feature.emoji}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-yellow-200 transition-colors duration-300">
                                        {feature.title}
                                    </h3>

                                    <p className="text-lg opacity-90 leading-relaxed mb-6">
                                        {feature.description}
                                    </p>

                                    {/* Feature highlights */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {feature.features.map((feat, featIndex) => (
                                            <div key={featIndex} className="flex items-center space-x-2 text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom decoration */}
                <div className="text-center mt-20 animate-slideInUp delay-1800">
                    <div className="inline-flex items-center space-x-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Și multe altele în curând...</span>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};