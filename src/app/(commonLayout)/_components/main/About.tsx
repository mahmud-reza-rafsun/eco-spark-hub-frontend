import { Target, Users, ShieldCheck, Rocket } from 'lucide-react';

const About = () => {
    const stats = [
        { label: 'Ideas Shared', value: '12K+' },
        { label: 'Active Users', value: '5K+' },
        { label: 'Collaborations', value: '800+' },
        { label: 'Cities Reached', value: '50+' },
    ];

    const values = [
        {
            title: "Our Mission",
            description: "To empower creative minds by providing a seamless platform for sharing and executing innovative ideas.",
            icon: <Target className="text-indigo-500" size={32} />
        },
        {
            title: "Community First",
            description: "We believe in the power of collective intelligence. Our platform thrives on collaboration and mutual growth.",
            icon: <Users className="text-indigo-500" size={32} />
        },
        {
            title: "Trust & Security",
            description: "Your data and intellectual property are our top priority. We ensure top-notch security for every user.",
            icon: <ShieldCheck className="text-indigo-500" size={32} />
        }
    ];

    return (
        <div className="bg-white dark:bg-[#09090b] text-gray-900 dark:text-gray-100 min-h-screen">
            {/* Hero Section */}
            <section className="relative py-16 -mt-11 overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Bridging the gap between <br />
                        <span className="text-indigo-500">Innovation & Reality</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        EcoSpark Hub is a dedicated ecosystem designed to foster creativity,
                        manage groundbreaking ideas, and connect visionaries with the resources they need.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-lg">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <h3 className="text-3xl font-bold text-indigo-500 mb-2">{stat.value}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
                        <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {values.map((value, index) => (
                            <div key={index} className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-500/50 transition-all duration-300 bg-gray-50/30 dark:bg-[#111113]">
                                <div className="mb-6">{value.icon}</div>
                                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Section with Image Placeholder */}
            <section className="py-20 bg-gray-50 dark:bg-[#0c0c0e]">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <div className="bg-indigo-500/20 aspect-video flex items-center justify-center">
                                <Rocket size={64} className="text-indigo-500 animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-6">Our Journey Started with a Simple Question.</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                            How do we ensure that great ideas dont get lost in the noise? We realized that the world doesnt lack ideas—it lacks the proper structure to nurture them.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                            Today, EcoSpark Hub stands as a testament to what happens when technology meets passion. We are constantly evolving to provide better tools for our community.
                        </p>
                        <button className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25">
                            Join Our Journey
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-indigo-500/20 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to spark your next big idea?</h2>
                            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
                                Sign up today and become part of a global community dedicated to making a difference through innovation.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors">
                                    Get Started
                                </button>
                                <button className="px-6 py-3 border border-indigo-300 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        &copy; 2026 EcoSpark Hub. Built with passion for the innovators of tomorrow.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default About;