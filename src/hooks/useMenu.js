import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useMenu() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const processItems = (items) => {
        const grouped = {};
        const uniqueCategories = new Set();

        items.forEach(item => {
            const categoryName = item.categories?.name || 'Uncategorized';
            const key = `${item.name}__${categoryName}`;
            uniqueCategories.add(categoryName);

            if (!grouped[key]) {
                grouped[key] = {
                    id: item.id,
                    name: item.name,
                    category: categoryName,
                    description: item.description,
                    imageUrl: item.image_url || null,
                    sizes: []
                };
            }
            if (item.size_label || item.price) {
                grouped[key].sizes.push({
                    size: item.size_label || 'Regular',
                    price: item.price || 0
                });
            }
        });

        return { mapped: Object.values(grouped), categories: Array.from(uniqueCategories) };
    };

    useEffect(() => {
        let isMounted = true;

        const fetchMenu = async () => {
            try {
                const { data: items, error: fetchError } = await supabase
                    .from('menu_items')
                    .select('*, categories(name)')
                    .eq('status', 'published')
                    .eq('available', true)
                    .order('name');

                if (fetchError) throw fetchError;

                const result = processItems(items || []);
                if (isMounted) {
                    setData(result.mapped);
                    setCategories(result.categories);
                    setError(null);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Failed to load menu data');
                    setLoading(false);
                }
            }
        };

        fetchMenu();

        // Realtime subscription replaces 5s polling
        const channel = supabase
            .channel('menu_items_public')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items' }, () => {
                fetchMenu();
            })
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, []);

    return { data, categories, loading, error };
}
