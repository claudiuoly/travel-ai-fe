export const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'Alex Gaming',
            role: 'Gamer Path User',
            avatar: '🎮',
            comment: 'Perfect pentru mine! Interfața gaming și achievements-urile mă motivează să explorez mai multe destinații.',
            rating: 5,
            gradient: 'from-purple-500 to-blue-500'
        },
        {
            name: 'Maria Explorer',
            role: 'Explorer Advanced',
            avatar: '🧭',
            comment: 'Instrumentele avansate de planificare sunt incredibile. Am descoperit locuri pe care nu le-aș fi găsit niciodată.',
            rating: 5,
            gradient: 'from-green-500 to-teal-500'
        },
        {
            name: 'Ana Începător',
            role: 'Explorer Beginner',
            avatar: '🌟',
            comment: 'Ca începător în călătorii, aplicația m-a ghidat perfect. Acum îmi planific singură toate vacanțele!',
            rating: 5,
            gradient: 'from-blue-500 to-indigo-500'
        },
        {
            name: 'Gheorghe Senior',
            role: 'Senior-Friendly User',
            avatar: '👴',
            comment: 'În sfârșit o aplicație pe care o pot folosi fără stres. Butoanele mari și suportul telefonic sunt excelente.',
            rating: 5,
            gradient: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ce spun utilizatorii noștri
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Fiecare cale de utilizare are comunitatea sa de utilizatori mulțumiți.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="group">
                            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                {/* Avatar and gradient header */}
                                <div className={`bg-gradient-to-r ${testimonial.gradient} rounded-xl p-4 mb-4 text-center`}>
                                    <div className="text-4xl mb-2">{testimonial.avatar}</div>
                                    <div className="text-white font-semibold">{testimonial.name}</div>
                                    <div className="text-white/80 text-sm">{testimonial.role}</div>
                                </div>

                                {/* Rating */}
                                <div className="flex justify-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-lg">⭐</span>
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-gray-600 text-center leading-relaxed">
                                    "{testimonial.comment}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
                            <div className="text-gray-600">Rating Mediu</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                            <div className="text-gray-600">Satisfacție Client</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                            <div className="text-gray-600">Călătorii Planificate</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                            <div className="text-gray-600">Țări Disponibile</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};