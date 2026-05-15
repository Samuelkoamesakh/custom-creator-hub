import { useEffect, useState } from 'react';
import { fetchProducts, fetchArticles, fetchCategories, type Product, type Article, type Category } from '@/lib/data';
import { Package, FileText, FolderOpen, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchArticles().then(setArticles);
    fetchCategories().then(setCategories);
  }, []);

  const stats = [
    { label: 'Total Produk', value: products.length, icon: Package, color: 'bg-primary/10 text-primary' },
    { label: 'Total Artikel', value: articles.length, icon: FileText, color: 'bg-accent text-accent-foreground' },
    { label: 'Kategori', value: categories.length, icon: FolderOpen, color: 'bg-secondary/10 text-secondary' },
    { label: 'Undangan Online', value: products.filter(p => categories.find(c => c.slug === p.categorySlug)?.parentGroup === 'undangan-online').length, icon: TrendingUp, color: 'bg-primary/10 text-primary' },
  ];

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card rounded-xl p-6 shadow-card">
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Produk Terbaru</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                </div>
                <span className="text-sm font-semibold text-primary">{p.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Artikel Terbaru</h3>
          <div className="space-y-3">
            {articles.slice(0, 5).map(a => (
              <div key={a.id} className="flex items-center gap-3">
                <img src={a.image} alt={a.title} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(a.publishedAt).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
