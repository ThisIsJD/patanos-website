import { useState, useEffect } from 'react';
import { menuFallback, categories } from '../data/menuFallback';

// TODO Day 5: Replace with Directus REST API fetch
// API endpoint: ${VITE_DIRECTUS_URL}/items/menu

export function useMenu() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate network request to allow for clean UI loading states
        // In Day 5, this will be replaced with an actual axios/fetch call
        const fetchMenu = async () => {
            try {
                setLoading(true);
                // Fake delay
                await new Promise(resolve => setTimeout(resolve, 300));
                setData(menuFallback);
                setError(null);
            } catch (err) {
                setError(err.message || 'Failed to load menu data');
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    return { data, categories, loading, error };
}
