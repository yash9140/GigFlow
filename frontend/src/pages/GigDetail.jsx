import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const GigDetail = () => {
    const { id } = useParams();
    const { user, apiUrl } = useAuth();
    const [gig, setGig] = useState(null);
    const [bids, setBids] = useState([]);
    const [amount, setAmount] = useState('');
    const [proposal, setProposal] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGig();
        if (user && user.role === 'client') {
            fetchBids();
        }
    }, [id, user]);

    const fetchGig = async () => {
        try {
            const response = await axios.get(`${apiUrl}/gigs/${id}`);
            setGig(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching gig:', error);
            setLoading(false);
        }
    };

    const fetchBids = async () => {
        try {
            const response = await axios.get(`${apiUrl}/bids/${id}`, { withCredentials: true });
            setBids(response.data);
        } catch (error) {
            console.error('Error fetching bids:', error);
        }
    };

    const handleSubmitBid = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/bids`, {
                gigId: id,
                amount: parseFloat(amount),
                proposal
            }, { withCredentials: true });

            toast.success('Bid submitted successfully!');
            setAmount('');
            setProposal('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit bid');
        }
    };

    const handleHire = async (bidId) => {
        try {
            await axios.post(`${apiUrl}/hire/${bidId}`, {}, { withCredentials: true });
            toast.success('Freelancer hired successfully!');
            fetchGig();
            fetchBids();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to hire freelancer');
        }
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (!gig) return <div className="text-center py-12">Gig not found</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="card mb-8">
                <h1 className="text-3xl font-bold text-primary-600 mb-4">{gig.title}</h1>
                <p className="text-neutral-700 mb-4 whitespace-pre-wrap">{gig.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-secondary-600">${gig.budget}</span>
                    <span className={`px-4 py-2 rounded-lg ${gig.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {gig.status === 'open' ? 'Open for Bids' : 'Assigned'}
                    </span>
                </div>
            </div>

            {user && user.role === 'freelancer' && gig.status === 'open' && (
                <div className="card mb-8">
                    <h2 className="text-2xl font-bold text-primary-600 mb-4">Submit Your Bid</h2>
                    <form onSubmit={handleSubmitBid} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Bid Amount ($)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="input-field"
                                placeholder="Your bid amount"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Proposal</label>
                            <textarea
                                value={proposal}
                                onChange={(e) => setProposal(e.target.value)}
                                className="input-field"
                                rows="4"
                                placeholder="Explain why you're the best fit..."
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full">Submit Bid</button>
                    </form>
                </div>
            )}

            {user && user.role === 'client' && gig.clientId._id === user._id && bids.length > 0 && (
                <div className="card">
                    <h2 className="text-2xl font-bold text-primary-600 mb-4">Bids Received ({bids.length})</h2>
                    <div className="space-y-4">
                        {bids.map((bid) => (
                            <div key={bid._id} className="border border-neutral-300 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg">{bid.freelancerId?.name}</h3>
                                        <p className="text-neutral-600 text-sm">{bid.freelancerId?.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-secondary-600">${bid.amount}</p>
                                        <p className={`text-sm ${bid.status === 'pending' ? 'text-yellow-600' : bid.status === 'hired' ? 'text-green-600' : 'text-red-600'}`}>
                                            {bid.status}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-neutral-700 mb-3">{bid.proposal}</p>
                                {bid.status === 'pending' && gig.status === 'open' && (
                                    <button
                                        onClick={() => handleHire(bid._id)}
                                        className="btn-primary"
                                    >
                                        Hire {bid.freelancerId?.name}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GigDetail;
