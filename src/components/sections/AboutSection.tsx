export const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        De ce TravelQuest?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Prima aplicație de călătorii care se adaptează personalității și experienței tale.
                        Nu mai căuta prin sute de opțiuni - primești exact ce ai nevoie.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🧠</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Inteligență Artificială</h3>
                        <p className="text-gray-600">
                            Algoritmul nostru analizează preferințele tale și recomandă cea mai potrivită experiență de utilizare.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Personalizare Completă</h3>
                        <p className="text-gray-600">
                            4 căi distincte de utilizare: Gamer, Explorer Advanced, Explorer Beginner și Senior-Friendly.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🌍</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Destinații Unice</h3>
                        <p className="text-gray-600">
                            De la hidden gems pentru exploratori la destinații populare pentru începători.
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">👥</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Comunitate Activă</h3>
                        <p className="text-gray-600">
                            Conectează-te cu călători care au aceleași interese și experiențe ca tine.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};