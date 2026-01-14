import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateGig = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const { apiUrl } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/gigs`, {
                title,
                description,
                budget: parseFloat(budget)
            }, { withCredentials: true });

            toast.success('Gig posted successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create gig');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="card">
                <h2 className="text-3xl font-bold text-primary-600 mb-6">Post a New Gig</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Gig Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input-field"
                            placeholder="e.g. Build a responsive website"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input-field"
                            rows="5"
                            placeholder="Describe your project requirements..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Budget ($)</label>
                        <input
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="input-field"
                            placeholder="500"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="btn-primary flex-1">Post Gig</button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="btn-secondary flex-1"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGig;
