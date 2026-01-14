import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ClientDashboard = () => {
    const { user, apiUrl } = useAuth();
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalGigs: 0,
        openGigs: 0,
        assignedGigs: 0,
        totalBids: 0
    });

    useEffect(() => {
        fetchClientGigs();
    }, []);

    const fetchClientGigs = async () => {
        try {
            const response = await axios.get(`${apiUrl}/gigs`, { withCredentials: true });
            // Filter to show only user's gigs
            const userGigs = response.data.filter(gig => gig.clientId._id === user._id);
            setGigs(userGigs);
            
            // Calculate stats
            setStats({
                totalGigs: userGigs.length,
                openGigs: userGigs.filter(g => g.status === 'open').length,
                assignedGigs: userGigs.filter(g => g.status === 'assigned').length,
                totalBids: 0 // Would need separate API call
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching gigs:', error);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-12">Loading dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Client Dashboard</h1>
                <p className="text-slate-600 dark:text-slate-400">Welcome back, {user.name}!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Total Gigs</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-1">{stats.totalGigs}</p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Open Gigs</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.openGigs}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Assigned</p>
                            <p className="text-3xl font-bold text-slate-600 dark:text-slate-300 mt-1">{stats.assignedGigs}</p>
                        </div>
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-md p-6">
                    <Link to="/create-gig" className="flex items-center justify-center h-full">
                        <div className="text-center text-white">
                            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <p className="font-semibold">Post New Gig</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Posted Gigs */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Your Posted Gigs</h2>
                
                {gigs.length === 0 ? (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">No gigs posted yet</p>
                        <Link to="/create-gig" className="btn-primary">Post Your First Gig</Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {gigs.map((gig) => (
                            <Link
                                key={gig._id}
                                to={`/gig/${gig._id}`}
                                className="block border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{gig.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        gig.status === 'open' 
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' 
                                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                                    }`}>
                                        {gig.status === 'open' ? 'Open' : 'Assigned'}
                                    </span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">{gig.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-emerald-600">${gig.budget}</span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        View bids →
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

export default ClientDashboard;
