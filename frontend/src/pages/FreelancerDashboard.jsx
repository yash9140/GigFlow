import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const FreelancerDashboard = () => {
    const { user, apiUrl } = useAuth();
    const [bids, setBids] = useState([]);
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch all gigs to show available opportunities
            const gigsResponse = await axios.get(`${apiUrl}/gigs`);
            setGigs(gigsResponse.data.filter(g => g.status === 'open').slice(0, 5));

            // Note: Would need a dedicated endpoint to fetch user's bids
            // For now showing empty state
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const stats = {
        totalBids: bids.length,
        pendingBids: bids.filter(b => b.status === 'pending').length,
        hiredJobs: bids.filter(b => b.status === 'hired').length,
        rejectedBids: bids.filter(b => b.status === 'rejected').length
    };

    if (loading) return <div className="text-center py-12">Loading dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Freelancer Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400">Welcome back, {user.name}!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Total Bids</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{stats.totalBids}</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Pending</p>
                            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-1">{stats.pendingBids}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Hired</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.hiredJobs}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-md p-6">
                    <Link to="/" className="flex items-center justify-center h-full">
                        <div className="text-center text-white">
                            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <p className="font-semibold">Browse Gigs</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* My Bids Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">My Bids</h2>

                {bids.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">No bids submitted yet</p>
                        <Link to="/" className="btn-primary">Browse Available Gigs</Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bids.map((bid) => (
                            <div key={bid._id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{bid.gigId?.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${bid.status === 'pending'
                                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200'
                                            : bid.status === 'hired'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                                    </span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">{bid.proposal}</p>
                                <p className="text-xl font-bold text-emerald-600">Your Bid: ${bid.amount}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Available Gigs */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Latest Opportunities</h2>
                <div className="space-y-4">
                    {gigs.map((gig) => (
                        <Link
                            key={gig._id}
                            to={`/gig/${gig._id}`}
                            className="block border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                        >
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{gig.title}</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">{gig.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-emerald-600">${gig.budget}</span>
                                <span className="text-sm text-emerald-600">Submit Bid →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FreelancerDashboard;
