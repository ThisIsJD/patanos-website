import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Save, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function GalleryManager() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Add State
    const [isAdding, setIsAdding] = useState(false);
    const [newPhotoData, setNewPhotoData] = useState({ imageFile: null, caption: '', link: '', sort: 1 });
    const [adding, setAdding] = useState(false);

    const fetchGallery = async () => {
        try {
            setLoading(true);
            const { data, error: fetchError } = await supabase
                .from('gallery_photos')
                .select('*')
                .order('sort_order');
            if (fetchError) throw fetchError;
            setPhotos(data || []);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleInlineSave = async (id, field, value) => {
        // Map field names from Directus to Supabase schema
        const fieldMap = { caption: 'caption', link: 'link_url', sort: 'sort_order' };
        const supabaseField = fieldMap[field] || field;

        try {
            const oldPhotos = [...photos];
            setPhotos(photos.map(p => p.id === id ? { ...p, [supabaseField]: value } : p));

            const { error } = await supabase
                .from('gallery_photos')
                .update({ [supabaseField]: value })
                .eq('id', id);

            if (error) {
                setPhotos(oldPhotos);
                throw error;
            }
        } catch (err) {
            alert('Failed to update: ' + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this photo?')) return;
        try {
            const { error } = await supabase
                .from('gallery_photos')
                .delete()
                .eq('id', id);
            if (error) throw error;
            setPhotos(photos.filter(p => p.id !== id));
        } catch (err) {
            alert('Failed to delete: ' + err.message);
        }
    };

    const uploadImage = async (file) => {
        const fileExt = file.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        const { error } = await supabase.storage
            .from('gallery-images')
            .upload(filePath, file);
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage
            .from('gallery-images')
            .getPublicUrl(filePath);
        return publicUrl;
    };

    const handleAddPhoto = async (e) => {
        e.preventDefault();
        setAdding(true);
        try {
            if (!newPhotoData.imageFile) throw new Error("Please select an image first");

            const imageUrl = await uploadImage(newPhotoData.imageFile);

            const { error } = await supabase
                .from('gallery_photos')
                .insert({
                    image_url: imageUrl,
                    caption: newPhotoData.caption,
                    link_url: newPhotoData.link,
                    sort_order: newPhotoData.sort
                });
            if (error) throw error;

            await fetchGallery();
            setIsAdding(false);
            setNewPhotoData({ imageFile: null, caption: '', link: '', sort: photos.length + 1 });
        } catch (err) {
            alert(err.message);
        } finally {
            setAdding(false);
        }
    };

    // Card Component for Grid
    const PhotoCard = ({ photo }) => {
        const [caption, setCaption] = useState(photo.caption || '');
        const [link, setLink] = useState(photo.link_url || '');
        const [sort, setSort] = useState(photo.sort_order || 0);

        return (
            <div className="bg-[#141414] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden group shadow-lg flex flex-col">
                <div className="relative aspect-[4/3] bg-black">
                    {photo.image_url ? (
                        <img
                            src={photo.image_url}
                            alt={caption}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20"><ImageIcon size={32} /></div>
                    )}

                    <button
                        onClick={() => handleDelete(photo.id)}
                        className="absolute top-3 right-3 p-2.5 bg-black/60 hover:bg-error backdrop-blur-md text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Photo"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-3 flex-1">
                    <input
                        type="text"
                        placeholder="Caption..."
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        onBlur={() => caption !== photo.caption && handleInlineSave(photo.id, 'caption', caption)}
                        onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                        className="font-display tracking-wide uppercase text-white bg-transparent border-b border-transparent hover:border-white/20 focus:border-gold focus:outline-none py-1 transition-colors w-full"
                    />
                    <input
                        type="url"
                        placeholder="https://link... (optional)"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onBlur={() => link !== (photo.link_url || '') && handleInlineSave(photo.id, 'link', link)}
                        onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                        className="font-body text-xs text-gold/80 bg-gold/5 border border-transparent hover:border-gold/20 focus:border-gold/50 focus:outline-none rounded-md px-2 py-1.5 transition-colors w-full"
                    />

                    <div className="mt-auto pt-3 flex items-center gap-2 border-t border-white/5">
                        <span className="text-xs text-white/40 uppercase tracking-widest">Sort:</span>
                        <input
                            type="number"
                            value={sort}
                            onChange={e => setSort(parseInt(e.target.value) || 0)}
                            onBlur={() => sort !== photo.sort_order && handleInlineSave(photo.id, 'sort', sort)}
                            onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                            className="w-16 bg-[#0A0A0A] border border-white/10 rounded px-2 py-1 text-xs text-center text-white focus:border-gold focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase flex items-center gap-3 mb-1">
                        Gallery Management
                    </h1>
                    <p className="font-body text-sm text-white/50 flex items-center gap-2">
                        <AlertCircle size={14} className="text-gold/50" />
                        Edit the Sort number to reorder photos. Click any text to edit inline.
                    </p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => {
                            setNewPhotoData(prev => ({ ...prev, sort: photos.length > 0 ? photos[photos.length - 1].sort + 1 : 1 }));
                            setIsAdding(true);
                        }}
                        className="bg-gold hover:bg-gold-light text-black flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium tracking-wide transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                    >
                        <Plus size={18} /> Add New Photo
                    </button>
                )}
            </div>

            {error && <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl mb-6">{error}</div>}

            {isAdding && (
                <div className="bg-[#141414] border border-gold/20 p-5 rounded-2xl mb-8 shadow-xl animate-fade-in relative">
                    <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 text-white/40 hover:text-white pb-6 px-2">✕</button>
                    <h3 className="text-gold font-display mb-5 uppercase text-sm tracking-wider">
                        Upload New Photo
                    </h3>
                    <form onSubmit={handleAddPhoto} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="w-full md:w-1/3 flex flex-col gap-2">
                            <label className="text-xs text-white/50 uppercase tracking-widest">Image File</label>
                            <div className="flex items-center gap-3 bg-[#0A0A0A] border border-white/10 rounded-lg p-2 px-3 overflow-hidden">
                                <ImageIcon size={18} className="text-white/50 flex-shrink-0" />
                                <input
                                    required
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setNewPhotoData({ ...newPhotoData, imageFile: e.target.files[0] })}
                                    className="text-white/70 w-full file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 flex flex-col gap-2">
                            <label className="text-xs text-white/50 uppercase tracking-widest">Caption</label>
                            <input required placeholder="Enter caption..." className="bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none" value={newPhotoData.caption} onChange={e => setNewPhotoData({ ...newPhotoData, caption: e.target.value })} />
                        </div>
                        <div className="w-full md:w-1/4 flex flex-col gap-2">
                            <label className="text-xs text-white/50 uppercase tracking-widest">Sort Index</label>
                            <input required type="number" className="bg-[#0A0A0A] border border-white/10 rounded-lg p-3 text-white focus:border-gold focus:outline-none text-center" value={newPhotoData.sort} onChange={e => setNewPhotoData({ ...newPhotoData, sort: parseInt(e.target.value) || 0 })} />
                        </div>
                        <button type="submit" disabled={adding} className="w-full md:w-auto h-[46px] px-8 rounded-lg bg-gold hover:bg-gold-light text-black font-medium transition-colors flex items-center justify-center gap-2">
                            {adding ? 'Uploading...' : <><Save size={18} /> Upload</>}
                        </button>
                    </form>
                </div>
            )}

            {loading && photos.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-[4/3] bg-[#141414] rounded-2xl border border-white/5"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {photos.map(photo => (
                        <PhotoCard key={photo.id} photo={photo} />
                    ))}
                </div>
            )}
        </div>
    );
}
