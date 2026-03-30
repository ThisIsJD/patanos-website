import { useState } from 'react';
import patanosLogo from '../assets/Brand/Patanos_logo.png';


export default function AdminLogin({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await onLogin(email, password);

        if (!result.success) {
            setError(result.error || 'Invalid email or password');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 selection:bg-gold selection:text-black">
            <div className="w-full max-w-md bg-bg-surface border border-gold/10 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>

                <img src={patanosLogo} alt="Patanos Logo" className="h-16 w-auto mb-4 drop-shadow-md" />

                <h1 className="font-display text-gold tracking-widest uppercase text-sm mb-8 text-center opacity-80">
                    Admin Panel
                </h1>

                {error && (
                    <div className="w-full bg-error/10 border border-error/50 text-error text-center py-3 rounded-xl mb-6 font-body text-sm animate-pulse-once">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="font-display text-text-primary text-xs tracking-wider uppercase opacity-70">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors font-body"
                            placeholder="admin@patanos.com"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-display text-text-primary text-xs tracking-wider uppercase opacity-70">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors font-body"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-4 bg-gold hover:bg-gold-light text-black font-display tracking-widest uppercase py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
