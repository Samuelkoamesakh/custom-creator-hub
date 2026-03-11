import { useState } from 'react';
import { getCategories, saveCategories, type Category } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Plus, Pencil, X } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(getCategories());
  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);

  const empty: Category = { id: '', name: '', slug: '', description: '', icon: '', parentGroup: 'undangan-online' };
  const [form, setForm] = useState<Category>(empty);

  const openNew = () => { setForm({ ...empty, id: Date.now().toString() }); setEditing(null); setShowForm(true); };
  const openEdit = (c: Category) => { setForm({ ...c }); setEditing(c); setShowForm(true); };

  const handleSave = () => {
    if (!form.name || !form.slug) { toast.error('Nama dan slug wajib diisi'); return; }
    let updated: Category[];
    if (editing) {
      updated = categories.map(c => c.id === editing.id ? form : c);
    } else {
      updated = [...categories, form];
    }
    saveCategories(updated);
    setCategories(updated);
    setShowForm(false);
    toast.success(editing ? 'Kategori diupdate!' : 'Kategori ditambahkan!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Manajemen Kategori</h2>
        <Button variant="hero" size="sm" onClick={openNew}><Plus size={16} /> Tambah Kategori</Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl p-6 shadow-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-semibold text-foreground">{editing ? 'Edit' : 'Tambah'} Kategori</h3>
            <button onClick={() => setShowForm(false)}><X size={20} className="text-muted-foreground" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Nama *</label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} maxLength={100} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Slug *</label>
              <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} maxLength={100} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Icon (emoji)</label>
              <Input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} maxLength={10} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Grup</label>
              <select value={form.parentGroup} onChange={e => setForm({ ...form, parentGroup: e.target.value as 'undangan-online' | 'custom-printing' })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="undangan-online">Undangan Online</option>
                <option value="custom-printing">Custom Printing</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground mb-1 block">Deskripsi</label>
              <Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} maxLength={300} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="hero" onClick={handleSave}>Simpan</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(c => (
          <div key={c.id} className="bg-card rounded-xl p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.parentGroup}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil size={14} /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
