import { useState } from 'react';
import { getArticles, saveArticles, type Article } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState(getArticles());
  const [editing, setEditing] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState(false);

  const empty: Article = { id: '', title: '', slug: '', excerpt: '', content: '', image: '', publishedAt: new Date().toISOString().split('T')[0], tags: [] };
  const [form, setForm] = useState<Article>(empty);
  const [tagsInput, setTagsInput] = useState('');

  const openNew = () => { setForm({ ...empty, id: Date.now().toString() }); setTagsInput(''); setEditing(null); setShowForm(true); };
  const openEdit = (a: Article) => { setForm({ ...a }); setTagsInput(a.tags.join(', ')); setEditing(a); setShowForm(true); };

  const handleSave = () => {
    if (!form.title || !form.slug) { toast.error('Judul dan slug wajib diisi'); return; }
    const updated = { ...form, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) };
    let newArticles: Article[];
    if (editing) {
      newArticles = articles.map(a => a.id === editing.id ? updated : a);
    } else {
      newArticles = [...articles, updated];
    }
    saveArticles(newArticles);
    setArticles(newArticles);
    setShowForm(false);
    toast.success(editing ? 'Artikel diupdate!' : 'Artikel ditambahkan!');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Hapus artikel ini?')) return;
    const newArticles = articles.filter(a => a.id !== id);
    saveArticles(newArticles);
    setArticles(newArticles);
    toast.success('Artikel dihapus!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Manajemen Artikel</h2>
        <Button variant="hero" size="sm" onClick={openNew}><Plus size={16} /> Tambah Artikel</Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl p-6 shadow-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-semibold text-foreground">{editing ? 'Edit' : 'Tambah'} Artikel</h3>
            <button onClick={() => setShowForm(false)}><X size={20} className="text-muted-foreground" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Judul *</label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} maxLength={200} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Slug *</label>
              <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} maxLength={200} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">URL Gambar</label>
              <Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} maxLength={500} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Tanggal Publish</label>
              <Input type="date" value={form.publishedAt} onChange={e => setForm({ ...form, publishedAt: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground mb-1 block">Excerpt</label>
              <Input value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} maxLength={300} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground mb-1 block">Konten</label>
              <Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={8} maxLength={5000} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground mb-1 block">Tags (pisahkan dengan koma)</label>
              <Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} maxLength={200} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="hero" onClick={handleSave}>Simpan</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Artikel</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Tanggal</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {articles.map(a => (
              <tr key={a.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={a.image} alt={a.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-xs">{a.excerpt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{new Date(a.publishedAt).toLocaleDateString('id-ID')}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(a)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)}><Trash2 size={14} className="text-destructive" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
