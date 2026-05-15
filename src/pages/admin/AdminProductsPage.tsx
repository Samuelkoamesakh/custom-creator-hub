import { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories, saveProduct, deleteProduct, type Product, type Category } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyProduct: Product = {
    id: '', title: '', description: '', longDescription: '', price: '',
    category: '', categorySlug: '', image: '', gallery: [],
    demoUrl: '', whatsappMessage: '',
  };
  const [form, setForm] = useState<Product>(emptyProduct);

  const reload = () => fetchProducts().then(setProducts);
  useEffect(() => { reload(); fetchCategories().then(setCategories); }, []);

  const openNew = () => { setForm({ ...emptyProduct }); setEditing(null); setShowForm(true); };
  const openEdit = (p: Product) => { setForm({ ...p }); setEditing(p); setShowForm(true); };

  const handleSave = async () => {
    if (!form.title || !form.categorySlug || !form.image) {
      toast.error('Judul, kategori, dan gambar wajib diisi');
      return;
    }
    const cat = categories.find(c => c.slug === form.categorySlug);
    const updated = { ...form, category: cat?.name || form.categorySlug };
    try {
      await saveProduct(updated);
      await reload();
      setShowForm(false);
      toast.success(editing ? 'Produk diupdate!' : 'Produk ditambahkan!');
    } catch (e: any) { toast.error(e.message || 'Gagal menyimpan'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus produk ini?')) return;
    try {
      await deleteProduct(id);
      await reload();
      toast.success('Produk dihapus!');
    } catch (e: any) { toast.error(e.message || 'Gagal menghapus'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl font-bold text-foreground">Manajemen Produk</h2>
        <Button variant="hero" size="sm" onClick={openNew}><Plus size={16} /> Tambah Produk</Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-xl p-6 shadow-card mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg font-semibold text-foreground">{editing ? 'Edit Produk' : 'Tambah Produk'}</h3>
            <button onClick={() => setShowForm(false)}><X size={20} className="text-muted-foreground" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Judul *</label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} maxLength={200} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Kategori *</label>
              <select value={form.categorySlug} onChange={e => setForm({ ...form, categorySlug: e.target.value })} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Pilih Kategori</option>
                {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Harga</label>
              <Input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Rp 100.000" maxLength={50} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">URL Gambar *</label>
              <Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." maxLength={500} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground mb-1 block">Deskripsi Singkat</label>
              <Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} maxLength={300} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-foreground mb-1 block">Deskripsi Lengkap</label>
              <Textarea value={form.longDescription} onChange={e => setForm({ ...form, longDescription: e.target.value })} rows={4} maxLength={2000} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Demo URL</label>
              <Input value={form.demoUrl || ''} onChange={e => setForm({ ...form, demoUrl: e.target.value })} maxLength={500} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Pesan WhatsApp</label>
              <Input value={form.whatsappMessage} onChange={e => setForm({ ...form, whatsappMessage: e.target.value })} maxLength={500} />
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
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Produk</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Kategori</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Harga</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="text-sm font-medium text-foreground">{p.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{p.category}</td>
                <td className="px-4 py-3 text-sm font-semibold text-primary hidden md:table-cell">{p.price}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 size={14} className="text-destructive" /></Button>
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
