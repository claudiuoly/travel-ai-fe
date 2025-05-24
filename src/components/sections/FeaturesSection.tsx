export const FeaturesSection = () => {
    const features = [
        {
            icon: '🎮',
            title: 'Gamer Path',
            description: 'Interfață dark theme cu elemente gaming, provocări, achievements și leaderboards.',
            gradient: 'from-purple-600 to-blue-600'
        },
        {
            icon: '🧭',
            title: 'Explorer Advanced',
            description: 'Instrumente avansate de planificare, filtre multiple și destinații off-the-beaten-path.',
            gradient: 'from-green-600 to-teal-600'
        },
        {
            icon: '🌟',
            title: 'Explorer Beginner',
            description: 'Interfață curată cu ghidare pas cu pas și destinații populare și sigure.',
            gradient: 'from-blue-600 to-indigo-600'
        },
        {
            icon: '👴',
            title: 'Senior-Friendly',
            description: 'Design simplificat cu fonturi mari, butoane mari și suport telefonic 24/7.',
            gradient: 'from-orange-600 to-red-600'
        }
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Căi Personalizate de Utilizare
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Fiecare utilizator primește o experiență unică, adaptată perfect personalității și experienței sale.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group">
                            <div className={`bg-gradient-to-r ${feature.gradient} rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                                <div className="text-6xl mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-lg opacity-90 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Demo preview */}
                                <div className="mt-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                            <div className="h-2 bg-white/40 rounded flex-1"></div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                            <div className="h-2 bg-white/40 rounded w-3/4"></div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                                            <div className="h-2 bg-white/40 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feature highlights */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h4 className="font-semibold mb-2">Setup Rapid</h4>
                        <p className="text-gray-600">Chestionar de 2 minute pentru personalizare completă</p>
                    </div>

                    <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🔄</span>
                        </div>
                        <h4 className="font-semibold mb-2">Flexibilitate</h4>
                        <p className="text-gray-600">Poți schimba calea de utilizare oricând</p>
                    </div>

                    <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📱</span>
                        </div>
                        <h4 className="font-semibold mb-2">Responsive</h4>
                        <p className="text-gray-600">Perfect optimizat pentru telefon, tabletă și desktop</p>
                    </div>
                </div>
            </div>
        </section>
    );
};