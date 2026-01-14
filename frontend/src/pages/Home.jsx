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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-primary-600 mb-4">Available Gigs</h1>
                <input
                    type="text"
                    placeholder="Search gigs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field max-w-md"
                />
            </div>

            {loading ? (
                <p className="text-center text-neutral-600">Loading gigs...</p>
            ) : gigs.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-neutral-600 text-lg">No gigs found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gigs.map((gig) => (
                        <Link key={gig._id} to={`/gig/${gig._id}`} className="card hover:scale-105 transition-transform duration-200">
                            <h3 className="text-xl font-bold text-primary-600 mb-2">{gig.title}</h3>
                            <p className="text-neutral-700 mb-4 line-clamp-3">{gig.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-secondary-600">${gig.budget}</span>
                                <span className="text-sm text-neutral-500">
                                    {gig.status === 'open' ? '🟢 Open' : '🔴 Assigned'}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
