import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useGallery() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchGallery = async () => {
            try {
                const { data: photos, error: fetchError } = await supabase
                    .from('gallery_photos')
                    .select('*')
                    .eq('status', 'published')
                    .order('sort_order');

                if (fetchError) throw fetchError;

                const mapped = (photos || []).map(item => ({
                    id: item.id,
                    caption: item.caption,
                    imageUrl: item.image_url,
                    link: item.link_url || null,
                    sort: item.sort_order
                }));

                if (isMounted) {
                    setData(mapped);
                    setError(null);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Failed to load gallery data');
                    setLoading(false);
                }
            }
        };

        fetchGallery();

        // Realtime subscription replaces 5s polling
        const channel = supabase
            .channel('gallery_photos_public')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_photos' }, () => {
                fetchGallery();
            })
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        };
    }, []);

    return { data, loading, error };
}
