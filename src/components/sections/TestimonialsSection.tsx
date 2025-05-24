import { Star, Users, MapPin, TrendingUp } from 'lucide-react';

interface TestimonialsSectionProps {
    onGetStarted?: () => void;
}

export const TestimonialsSection = ({ onGetStarted }: TestimonialsSectionProps) => {
    const testimonials = [
        {
            name: 'Alex Gaming',
            role: 'Gamer Path User',
            avatar: '🎮',
            comment: 'Perfect pentru mine! Interfața gaming și achievements-urile mă motivează să explorez mai multe destinații. Cel mai tare sistem de gamificare!',
            rating: 5,
            gradient: 'from-purple-500 to-blue-500',
            hoverGradient: 'hover:from-purple-600 hover:to-blue-600',
            location: 'București, România',
            trips: 12
        },
        {
            name: 'Maria Explorer',
            role: 'Explorer Advanced',
            avatar: '🧭',
            comment: 'Instrumentele avansate de planificare sunt incredibile. Am descoperit locuri pe care nu le-aș fi găsit niciodată. Aplicația perfectă pentru aventurieri!',
            rating: 5,
            gradient: 'from-green-500 to-teal-500',
            hoverGradient: 'hover:from-green-600 hover:to-teal-600',
            location: 'Cluj-Napoca, România',
            trips: 18
        },
        {
            name: 'Ana Începător',
            role: 'Explorer Beginner',
            avatar: '🌟',
            comment: 'Ca începător în călătorii, aplicația m-a ghidat perfect. Acum îmi planific singură toate vacanțele! Foarte ușor de folosit.',
            rating: 5,
            gradient: 'from-blue-500 to-indigo-500',
            hoverGradient: 'hover:from-blue-600 hover:to-indigo-600',
            location: 'Timișoara, România',
            trips: 6
        },
        {
            name: 'Gheorghe Senior',
            role: 'Senior-Friendly User',
            avatar: '👴',
            comment: 'În sfârșit o aplicație pe care o pot folosi fără stres. Butoanele mari și suportul telefonic sunt excelente. Recomand cu drag!',
            rating: 5,
            gradient: 'from-orange-500 to-red-500',
            hoverGradient: 'hover:from-orange-600 hover:to-red-600',
            location: 'Iași, România',
            trips: 8
        }
    ];

    const stats = [
        {
            icon: <Star className="w-8 h-8 text-yellow-500" />,
            value: '4.9/5',
            label: 'Rating Mediu',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-green-500" />,
            value: '98%',
            label: 'Satisfacție Client',
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            icon: <MapPin className="w-8 h-8 text-purple-500" />,
            value: '10K+',
            label: 'Călătorii Planificate',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            icon: <Users className="w-8 h-8 text-blue-500" />,
            value: '50+',
            label: 'Țări Disponibile',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-green-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-4000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                        ⭐ Testimoniale
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Ce spun
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600">
                            utilizatorii noștri
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Fiecare cale de utilizare are comunitatea sa de utilizatori mulțumiți care au descoperit 
                        experiențe de călătorie unice și personalizate.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="group h-full">
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-white/50 relative overflow-hidden h-full flex flex-col">
                                {/* Background gradient on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                                
                                {/* Avatar and gradient header */}
                                <div className={`bg-gradient-to-r ${testimonial.gradient} ${testimonial.hoverGradient} rounded-2xl p-6 mb-6 text-center relative overflow-hidden transform group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
                                    {/* Pattern overlay */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%221%22/%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{testimonial.avatar}</div>
                                        <div className="text-white font-bold text-lg">{testimonial.name}</div>
                                        <div className="text-white/90 text-sm font-medium">{testimonial.role}</div>
                                        <div className="text-white/80 text-xs mt-1">{testimonial.location}</div>
                                    </div>
                                </div>

                                {/* Rating and trips */}
                                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                                    <div className="flex">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-lg group-hover:animate-pulse" style={{animationDelay: `${i * 100}ms`}}>⭐</span>
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        {testimonial.trips} călătorii
                                    </div>
                                </div>

                                {/* Comment - flex-grow pentru a ocupa spațiul rămas */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <p className="text-gray-600 leading-relaxed text-sm mb-4 relative z-10">
                                        "{testimonial.comment}"
                                    </p>

                                    {/* Bottom decoration */}
                                    <div className="flex justify-center mt-auto">
                                        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:via-blue-400 transition-colors duration-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Stats */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/50 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Statistici Impresionante</h3>
                            <p className="text-gray-600 text-lg">Numerele care demonstrează calitatea serviciilor noastre</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="group text-center transform hover:scale-110 transition-transform duration-300">
                                    <div className={`${stat.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300`}>
                                        {stat.icon}
                                    </div>
                                    <div className={`text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to action */}
                <div className="text-center mt-16">
                    <p className="text-lg text-gray-600 mb-6">Vrei să fii următorul nostru utilizator mulțumit?</p>
                    <button 
                        onClick={onGetStarted}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                        💫 Începe Călătoria Ta
                    </button>
                </div>
            </div>
        </section>
    );
};