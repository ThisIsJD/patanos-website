import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useAdminAuth() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = useCallback(async (email, password) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }, []);

    const logout = useCallback(async () => {
        await supabase.auth.signOut();
    }, []);

    return {
        session,
        isAuthenticated: !!session,
        loading,
        login,
        logout
    };
}
