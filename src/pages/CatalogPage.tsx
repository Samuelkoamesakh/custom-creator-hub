import { useParams, Link } from 'react-router-dom';
import { getCategories, getProductsByCategory, getProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
};

export default function CatalogPage() {
  const { group, slug } = useParams();
  const categories = getCategories();

  let filteredCategories = categories;
  if (group === 'undangan-online') filteredCategories = categories.filter(c => c.parentGroup === 'undangan-online');
  else if (group === 'custom-printing') filteredCategories = categories.filter(c => c.parentGroup === 'custom-printing');

  // If a specific category slug is provided
  if (slug) {
    const products = getProductsByCategory(slug);
    const cat = categories.find(c => c.slug === slug);
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to={cat ? `/katalog/${cat.parentGroup}` : '/katalog'} className="text-primary text-sm hover:underline">← Kembali</Link>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">{cat?.name || 'Produk'}</h1>
            <p className="text-muted-foreground mt-2">{cat?.description}</p>
          </div>
          {products.length === 0 ? (
            <p className="text-muted-foreground text-center py-20">Belum ada produk di kategori ini.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show categories
  const title = group === 'undangan-online' ? 'Undangan Online' : group === 'custom-printing' ? 'Custom Printing' : 'Katalog Produk';

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          {title}
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-muted-foreground text-center mb-12">
          Pilih kategori untuk melihat koleksi produk kami
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {filteredCategories.map((cat, i) => (
            <motion.div key={cat.id} initial="hidden" animate="visible" variants={fadeUp} custom={i}>
              <Link to={`/katalog/${cat.slug}`} className="block bg-card rounded-2xl p-8 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
