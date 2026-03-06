import { useState, useEffect } from 'react';
import { galleryPhotos } from '../data/galleryData';

// TODO Day 5: Replace with Directus fetch 
// if gallery is moved to CMS

export function useGallery() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate network request to allow for clean UI loading states
        const fetchGallery = async () => {
            try {
                setLoading(true);
                // Fake delay
                await new Promise(resolve => setTimeout(resolve, 300));
                setData(galleryPhotos);
                setError(null);
            } catch (err) {
                setError(err.message || 'Failed to load gallery data');
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    return { data, loading, error };
}
