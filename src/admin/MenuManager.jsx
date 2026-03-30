import { useState, useEffect } from 'react';
import { Plus, Edit2, Check, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ProductGroupCard = ({ group, onRefetch, showToast, updateItemLocally, categories }) => {
    // Add Size / Edit Size State
    const [addingSize, setAddingSize] = useState(false);
    const [editingSizeId, setEditingSizeId] = useState(null);
    const [editForm, setEditForm] = useState({ price: '', size_: '', description: '' });
    const [addForm, setAddForm] = useState({ price: '', size_: '' });

    // Edit Product Level State
    const [isUploading, setIsUploading] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [nameForm, setNameForm] = useState(group.name);

    const handleToggleAvailable = async (sizeObj) => {
        const newVal = !sizeObj.available;
        updateItemLocally(sizeObj.id, { available: newVal });

        try {
            const { error } = await supabase
                .from('menu_items')
                .update({ available: newVal })
                .eq('id', sizeObj.id);
            if (error) throw error;
            showToast('Saved ✓');
        } catch (err) {
            updateItemLocally(sizeObj.id, { available: !newVal });
            alert(err.message);
        }
    };

    const handleSaveEdit = async (sizeId) => {
        try {
            const { error } = await supabase
                .from('menu_items')
                .update({ price: parseFloat(editForm.price), size_label: editForm.size_, description: editForm.description })
                .eq('id', sizeId);
            if (error) throw error;
            showToast('Saved ✓');
            setEditingSizeId(null);
            onRefetch();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleAddSize = async () => {
        if (!addForm.price) return alert("Price is required");
        try {
            const { error } = await supabase
                .from('menu_items')
                .insert({
                    name: group.name,
                    category_id: group.category_id,
                    image_url: group.imageUrl,
                    price: parseFloat(addForm.price),
                    size_label: addForm.size_,
                    available: true
                });
            if (error) throw error;
            showToast('Saved ✓');
            setAddingSize(false);
            setAddForm({ price: '', size_: '' });
            onRefetch();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSaveName = async () => {
        if (!nameForm.trim() || nameForm === group.name) {
            setEditingName(false);
            setNameForm(group.name);
            return;
        }

        try {
            // Optimistic update
            group.sizes.forEach(size => {
                updateItemLocally(size.id, { name: nameForm });
            });

            const updates = group.sizes.map(size =>
                supabase.from('menu_items').update({ name: nameForm }).eq('id', size.id)
            );
            const results = await Promise.all(updates);
            const failed = results.find(r => r.error);
            if (failed) throw failed.error;

            showToast('Name Updated ✓');
            setEditingName(false);
            onRefetch();
        } catch (err) {
            alert(err.message);
            // Revert
            group.sizes.forEach(size => updateItemLocally(size.id, { name: group.name }));
            setNameForm(group.name);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const filePath = `${crypto.randomUUID()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('menu-images')
                .upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('menu-images')
                .getPublicUrl(filePath);

            const updates = group.sizes.map(size =>
                supabase.from('menu_items').update({ image_url: publicUrl }).eq('id', size.id)
            );
            const results = await Promise.all(updates);
            const failed = results.find(r => r.error);
            if (failed) throw failed.error;

            showToast('Image Updated ✓');
            onRefetch();
        } catch (err) {
            alert(err.message);
        } finally {
            setIsUploading(false);
            e.target.value = null;
        }
    };

    return (
        <div className="bg-[#141414] border border-white/5 hover:border-white/10 transition-colors rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
            {/* Card Header */}
            <div className="p-4 border-b border-white/5 flex flex-col gap-4 relative">
                <span className="absolute top-4 right-4 text-[10px] bg-gold/10 text-gold px-2 py-1 rounded font-body uppercase tracking-widest leading-none">
                    {group.category}
                </span>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border border-white/10 overflow-hidden bg-black flex-shrink-0 relative group">
                        {group.imageUrl ? (
                            <img src={group.imageUrl} alt={group.name} className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20 group-hover:opacity-50 transition-opacity"><ImageIcon size={20} /></div>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                            <span className="text-[10px] uppercase font-bold text-white drop-shadow-md">Edit</span>
                        </div>
                    </div>
                    <div className="flex-1 pr-16 group/name text-left relative">
                        {editingName ? (
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSaveName(); }}
                                className="flex items-center"
                            >
                                <input
                                    autoFocus
                                    type="text"
                                    className="font-display text-lg text-gold tracking-widest uppercase bg-transparent border-b border-gold focus:outline-none w-full"
                                    value={nameForm}
                                    onChange={e => setNameForm(e.target.value)}
                                    onBlur={handleSaveName}
                                    onKeyDown={e => e.key === 'Escape' && (setEditingName(false) || setNameForm(group.name))}
                                />
                            </form>
                        ) : (
                            <h3
                                onClick={() => setEditingName(true)}
                                className="font-display text-lg text-white group-hover/name:text-gold tracking-widest uppercase truncate cursor-text transition-colors"
                                title="Click to edit name"
                            >
                                {group.name}
                            </h3>
                        )}
                    </div>
                </div>
            </div>

            {/* Size Rows */}
            <div className="flex flex-col flex-1">
                {group.sizes.map(sizeObj => (
                    <div key={sizeObj.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors relative">
                        <div className={`p-4 flex items-center justify-between gap-4 transition-opacity ${!sizeObj.available ? 'opacity-50' : ''}`}>
                            <div className="flex items-center gap-4 flex-1">
                                <span className="text-white/70 font-display text-sm uppercase tracking-widest break-words w-20 line-clamp-2 leading-tight">
                                    {sizeObj.size || 'Regular'}
                                </span>
                                <span className="text-gold font-body font-medium w-16">
                                    ₱{isNaN(sizeObj.price) ? '0.00' : sizeObj.price.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer" title="Toggle Availability">
                                    <span className="text-[10px] font-medium text-white/50 uppercase tracking-widest hidden sm:block">
                                        {sizeObj.available ? 'Available' : 'Hidden'}
                                    </span>
                                    <div className="relative">
                                        <input type="checkbox" className="sr-only" checked={sizeObj.available} onChange={() => handleToggleAvailable(sizeObj)} />
                                        <div className={`block w-8 h-5 rounded-full transition-colors ${sizeObj.available ? 'bg-gold' : 'bg-white/10'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform ${sizeObj.available ? 'transform translate-x-3 bg-black' : ''}`}></div>
                                    </div>
                                </label>

                                <button
                                    onClick={() => {
                                        setEditingSizeId(editingSizeId === sizeObj.id ? null : sizeObj.id);
                                        setEditForm({ price: sizeObj.price.toString(), size_: sizeObj.size || '', description: sizeObj.description || '' });
                                        setAddingSize(false);
                                    }}
                                    className={`p-1 transition-colors ${editingSizeId === sizeObj.id ? 'text-gold' : 'text-white/40 hover:text-gold'}`}
                                >
                                    <Edit2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Inline Edit Form for this size */}
                        {editingSizeId === sizeObj.id && (
                            <div className="p-4 bg-black/40 border-t border-white/5 flex flex-col gap-3 animate-fade-in">
                                <div className="flex gap-3">
                                    <input placeholder="Size Label" className="bg-[#0A0A0A] border border-white/10 text-white p-2.5 rounded-lg text-sm w-1/2 focus:border-gold outline-none font-body" value={editForm.size_} onChange={e => setEditForm({ ...editForm, size_: e.target.value })} />
                                    <input type="text" placeholder="Price" className="bg-[#0A0A0A] border border-white/10 text-white p-2.5 rounded-lg text-sm w-1/2 focus:border-gold outline-none font-body" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
                                </div>
                                <input placeholder="Description (Optional)" className="bg-[#0A0A0A] border border-white/10 text-white p-2.5 rounded-lg text-sm w-full focus:border-gold outline-none font-body" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                                <div className="flex gap-2 justify-end mt-1">
                                    <button onClick={() => setEditingSizeId(null)} className="px-4 py-2 text-white/50 hover:bg-white/5 hover:text-white rounded-lg text-sm font-medium transition-colors">Cancel</button>
                                    <button onClick={() => handleSaveEdit(sizeObj.id)} className="px-5 py-2 bg-gold hover:bg-gold-light text-black rounded-lg text-sm font-medium transition-colors">Save Updates</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Size Form */}
            {addingSize && (
                <div className="p-4 bg-gold/5 border-t border-white/5 flex flex-col gap-3 animate-fade-in mt-auto">
                    <h4 className="text-[10px] text-gold uppercase tracking-widest font-display">Add a new size</h4>
                    <div className="flex gap-3">
                        <input placeholder="Size Label" className="bg-[#0A0A0A] border border-white/10 text-white p-2.5 rounded-lg text-sm w-1/2 focus:border-gold outline-none" value={addForm.size_} onChange={e => setAddForm({ ...addForm, size_: e.target.value })} />
                        <input type="text" placeholder="Price" className="bg-[#0A0A0A] border border-white/10 text-white p-2.5 rounded-lg text-sm w-1/2 focus:border-gold outline-none" value={addForm.price} onChange={e => setAddForm({ ...addForm, price: e.target.value })} />
                    </div>
                    <div className="flex gap-2 justify-end mt-1">
                        <button onClick={() => setAddingSize(false)} className="px-4 py-2 text-white/50 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">Cancel</button>
                        <button onClick={handleAddSize} disabled={!addForm.price} className="px-5 py-2 bg-gold hover:bg-gold-light text-black rounded-lg text-sm font-medium disabled:opacity-50 transition-colors">Create Size</button>
                    </div>
                </div>
            )}

            {/* Card Footer Actions */}
            {!addingSize && (
                <div className="p-4 bg-[#0A0A0A]/80 border-t border-white/5 flex justify-between items-center mt-auto">
                    <button onClick={() => { setAddingSize(true); setEditingSizeId(null); }} className="text-xs text-gold hover:text-gold-light flex items-center gap-1.5 uppercase tracking-wider font-display transition-colors">
                        <Plus size={14} /> Add Size
                    </button>
                    <div className="relative overflow-hidden cursor-pointer group">
                        <button disabled={isUploading} className="text-[10px] text-white/40 group-hover:text-white flex items-center gap-1.5 uppercase tracking-widest transition-colors font-medium">
                            {isUploading ? 'Uploading...' : '✏️ Edit Cover Image'}
                        </button>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-auto" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default function MenuManager() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Add New Product State
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ name: '', price: '', size_: '', category_id: '', description: '', imageFile: null });
    const [saving, setSaving] = useState(false);

    const [toastMsg, setToastMsg] = useState('');

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(''), 2500);
    };

    const fetchMenu = async () => {
        try {
            setLoading(true);
            const { data, error: fetchError } = await supabase
                .from('menu_items')
                .select('*, categories(name)')
                .order('name');
            if (fetchError) throw fetchError;
            setItems(data || []);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        const { data } = await supabase
            .from('categories')
            .select('id, name')
            .eq('status', 'published')
            .order('sort_order');
        setCategories(data || []);
    };

    useEffect(() => {
        fetchMenu();
        fetchCategories();
    }, []);

    const updateItemLocally = (id, updates) => {
        setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    };

    const uploadImage = async (file) => {
        const fileExt = file.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        const { error } = await supabase.storage
            .from('menu-images')
            .upload(filePath, file);
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage
            .from('menu-images')
            .getPublicUrl(filePath);
        return publicUrl;
    };

    const resetForm = () => {
        setIsAdding(false);
        setFormData({ name: '', price: '', size_: '', category_id: '', description: '', imageFile: null });
        setSaving(false);
    };

    const handleSaveNewProduct = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            let imageUrl = null;
            if (formData.imageFile) {
                imageUrl = await uploadImage(formData.imageFile);
            }

            const payload = {
                name: formData.name,
                price: parseFloat(formData.price),
                size_label: formData.size_,
                category_id: formData.category_id,
                description: formData.description,
                available: true
            };
            if (imageUrl) payload.image_url = imageUrl;

            const { error } = await supabase
                .from('menu_items')
                .insert(payload);
            if (error) throw error;

            showToast('New Product Created ✓');
            await fetchMenu();
            resetForm();
        } catch (err) {
            alert(err.message);
            setSaving(false);
        }
    };

    // Grouping Logic Process
    const grouped = {};
    items.forEach(item => {
        const categoryName = item.categories?.name || 'Uncategorized';
        const key = `${item.name}__${categoryName}`;
        if (!grouped[key]) {
            grouped[key] = {
                name: item.name,
                category: categoryName,
                category_id: item.category_id,
                imageUrl: item.image_url || null,
                sizes: []
            };
        }
        grouped[key].sizes.push({
            id: item.id,
            size: item.size_label,
            price: item.price || 0,
            available: item.available,
            description: item.description
        });
    });

    const groupedItems = Object.values(grouped);

    // Group by Category for Render Sections
    const categoryGroups = groupedItems.reduce((acc, group) => {
        if (!acc[group.category]) acc[group.category] = [];
        acc[group.category].push(group);
        return acc;
    }, {});

    const renderAddProductForm = () => (
        <div className="bg-[#141414] border border-gold/20 p-6 rounded-2xl mb-8 shadow-xl animate-fade-in">
            <h3 className="text-gold font-display mb-6 uppercase text-sm tracking-widest border-b border-white/5 pb-3">
                Create New Menu Product
            </h3>
            <form onSubmit={handleSaveNewProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest px-1">Product Name</label>
                    <input required placeholder="e.g. Halo Halo" className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white focus:border-gold outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest px-1">Category</label>
                    <select required className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white focus:border-gold outline-none" value={formData.category_id} onChange={e => setFormData({ ...formData, category_id: e.target.value })}>
                        <option value="">Select category...</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest px-1">Base Price</label>
                    <input required type="text" placeholder="e.g. 30.00" className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white focus:border-gold outline-none" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest px-1">Base Size (Optional)</label>
                    <input placeholder="e.g. Small" className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white focus:border-gold outline-none" value={formData.size_} onChange={e => setFormData({ ...formData, size_: e.target.value })} />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest px-1">Product Image</label>
                    <div className="flex items-center gap-3 bg-[#0A0A0A] border border-white/10 rounded-xl p-2 px-3 overflow-hidden text-sm h-[50px] focus-within:border-gold">
                        <ImageIcon size={18} className="text-white/50 flex-shrink-0" />
                        <input
                            required
                            type="file"
                            accept="image/*"
                            onChange={e => setFormData({ ...formData, imageFile: e.target.files[0] })}
                            className="text-white/70 w-full file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-gold/10 file:text-gold hover:file:bg-gold/20 leading-none cursor-pointer"
                        />
                    </div>
                </div>

                <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-1.5">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest px-1">Description (Optional)</label>
                    <input placeholder="Tasty treats..." className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white focus:border-gold outline-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                </div>

                <div className="flex gap-3 justify-end lg:col-span-3 pt-3 mt-2 border-t border-white/5">
                    <button type="button" onClick={resetForm} disabled={saving} className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white/70 flex items-center gap-2 transition-colors text-sm font-medium">
                        Cancel
                    </button>
                    <button type="submit" disabled={saving} className="px-8 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-black transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50 tracking-wide">
                        {saving ? 'Creating Product...' : <><Check size={18} /> Create Product</>}
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto relative">
            {/* Action Toast Notification */}
            <div className={`fixed bottom-8 right-8 bg-black border border-gold/30 shadow-[0_0_20px_rgba(255,193,7,0.15)] text-gold px-6 py-3 rounded-full font-body font-medium flex items-center gap-3 transition-all duration-300 z-50 ${toastMsg ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                {toastMsg}
            </div>

            <div className="flex justify-between items-center mb-10">
                <h1 className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase">
                    Menu Management
                </h1>
                {!isAdding && (
                    <button
                        onClick={() => { resetForm(); setIsAdding(true); }}
                        className="bg-gold hover:bg-gold-light text-black flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium tracking-wide transition-transform hover:-translate-y-0.5 shadow-lg"
                    >
                        <Plus size={18} /> Add New Product
                    </button>
                )}
            </div>

            {error && <div className="bg-error/10 border border-error/30 text-error p-4 rounded-xl mb-8">{error}</div>}

            {isAdding && renderAddProductForm()}

            {loading && items.length === 0 ? (
                <div className="animate-pulse space-y-12">
                    <div className="h-10 w-48 bg-[#141414] rounded-lg mb-6 border border-white/5"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-64 bg-[#141414] rounded-2xl border border-white/5"></div>)}
                    </div>
                </div>
            ) : (
                <div className="space-y-16">
                    {Object.entries(categoryGroups).map(([category, catGroups]) => (
                        <div key={category} className="space-y-6">
                            <h2 className="font-display text-2xl text-gold tracking-widest uppercase border-b border-white/10 pb-3 mb-2 opacity-90 drop-shadow-sm">{category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch auto-rows-min">
                                {catGroups.map(group => (
                                    <ProductGroupCard
                                        key={`${group.name}__${group.category}`}
                                        group={group}
                                        onRefetch={fetchMenu}
                                        showToast={showToast}
                                        updateItemLocally={updateItemLocally}
                                        categories={categories}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    {Object.keys(categoryGroups).length === 0 && !loading && !error && !isAdding && (
                        <div className="text-center py-20 text-white/40 font-body border border-white/5 rounded-2xl border-dashed">
                            No menu items found. Click 'Add New Product' to start building your menu!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
