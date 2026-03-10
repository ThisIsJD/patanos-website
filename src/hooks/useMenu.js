import { useState, useEffect } from 'react';
// import { menuFallback, categories as fallbackCategories } from '../data/menuFallback';

export function useMenu() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);

                const url = `${import.meta.env.VITE_DIRECTUS_URL}/items/menu?filter[available][_eq]=true&sort=category,name`;
                const res = await fetch(url);

                if (!res.ok) {
                    throw new Error(`Failed to fetch menu: ${res.statusText}`);
                }

                const response = await res.json();

                const grouped = {};
                const uniqueCategories = new Set();

                response.data.forEach(item => {
                    const key = `${item.name}__${item.category}`;
                    uniqueCategories.add(item.category);

                    if (!grouped[key]) {
                        grouped[key] = {
                            id: item.id,
                            name: item.name,
                            category: item.category,
                            description: item.description,
                            imageUrl: item.image ? `${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.image}` : null,
                            sizes: []
                        };
                    }
                    if (item.size_ || item.price) {
                        grouped[key].sizes.push({
                            size: item.size_ || 'Regular',
                            price: parseFloat(item.price || 0)
                        });
                    }
                });

                const mapped = Object.values(grouped);
                console.log('Directus connected ✅', mapped.length, 'menu cards loaded');

                setData(mapped);
                setCategories(Array.from(uniqueCategories));
                setError(null);
            } catch (err) {
                console.error("Directus Connection Error:", err);
                setError(err.message || 'Failed to load menu data');
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    return { data, categories, loading, error };
}
