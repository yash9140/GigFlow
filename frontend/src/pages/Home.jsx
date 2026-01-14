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
        </div>
    );
};

export default Home;
