import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [gigs, setGigs] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGigs();
    }, [search]);

    const fetchGigs = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/gigs?search=${search}`);
            setGigs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching gigs:', error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                            Hire the right freelancer. <br />
                            <span className="text-emerald-600">Without the chaos.</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                            Post gigs, compare bids, and hire with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/create-gig" className="btn-primary text-center">
                                Post a Gig
                            </Link>
                            <button
                                onClick={() => document.getElementById('gigs')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-secondary text-center"
                            >
                                Browse Gigs
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gigs Section */}
            <div id="gigs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Available Gigs</h2>
                    <input
                        type="text"
                        placeholder="Search gigs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-field max-w-md"
                    />
                </div>

                {loading ? (
                    <p className="text-center text-slate-500 dark:text-slate-400">Loading gigs...</p>
                ) : gigs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-slate-400 text-lg">No gigs found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gigs.map((gig) => (
                            <Link key={gig._id} to={`/gig/${gig._id}`} className="card hover:shadow-xl transition-all duration-200">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">{gig.title}</h3>
                                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{gig.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-emerald-600">${gig.budget}</span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${gig.status === 'open'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                                        }`}>
                                        {gig.status === 'open' ? 'Open' : 'Assigned'}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Features Section */}
            <section className="bg-white dark:bg-slate-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-12">Why Choose GigFlow?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Real-Time Notifications</h3>
                            <p className="text-slate-600 dark:text-slate-300">Get instant updates when you're hired or when bids are placed on your gigs.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Atomic Hiring</h3>
                            <p className="text-slate-600 dark:text-slate-300">Race-condition safe hiring ensures only one freelancer is selected per gig.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 0 002-2v-6a2 0 00-2-2H6a2 0 00-2 2v6a2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Secure & Transparent</h3>
                            <p className="text-slate-600 dark:text-slate-300">Compare bids side-by-side and hire with confidence knowing your data is safe.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-slate-50 dark:bg-slate-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-12">How It Works</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* For Clients */}
                        <div>
                            <h3 className="text-2xl font-semibold text-emerald-600 mb-6 flex items-center">
                                <span className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3">1</span>
                                For Clients
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Post Your Gig</h4>
                                        <p className="text-slate-600 dark:text-slate-300">Describe your project, set a budget, and publish.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Review Bids</h4>
                                        <p className="text-slate-600 dark:text-slate-300">Freelancers submit proposals. Compare and choose.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Hire & Collaborate</h4>
                                        <p className="text-slate-600 dark:text-slate-300">Click "Hire" and start working together.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* For Freelancers */}
                        <div>
                            <h3 className="text-2xl font-semibold text-emerald-600 mb-6 flex items-center">
                                <span className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3">2</span>
                                For Freelancers
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Browse Gigs</h4>
                                        <p className="text-slate-600 dark:text-slate-300">Find projects that match your skills.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Submit Proposals</h4>
                                        <p className="text-slate-600 dark:text-slate-300">Pitch your services and set your rate.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">Get Hired</h4>
                                        <p className="text-slate-600 dark:text-slate-300">Receive instant notification when selected.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold text-emerald-500 mb-4">GigFlow</h3>
                            <p className="text-slate-400 mb-4">
                                The modern freelance marketplace. Hire the right talent or find your next gig—without the chaos.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Platform</h4>
                            <ul className="space-y-2">
                                <li><Link to="/" className="hover:text-emerald-500 transition-colors">Browse Gigs</Link></li>
                                <li><Link to="/create-gig" className="hover:text-emerald-500 transition-colors">Post a Gig</Link></li>
                                <li><Link to="/register" className="hover:text-emerald-500 transition-colors">Sign Up</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-emerald-500 transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-emerald-500 transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
                        <p>&copy; 2026 GigFlow. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
