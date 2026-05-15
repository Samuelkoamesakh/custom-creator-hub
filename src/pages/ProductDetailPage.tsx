import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, generateWhatsAppLink, type Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Eye } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!id) return;
    fetchProductById(id).then(p => { setProduct(p); setLoading(false); });
  }, [id]);

  if (loading) return <div className="py-20 text-center text-muted-foreground">Memuat...</div>;

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Produk tidak ditemukan.</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">Kembali ke Home</Link>
      </div>
    );
  }

  const allImages = [product.image, ...product.gallery.filter(g => g !== product.image)];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <Link to={`/katalog/${product.categorySlug}`} className="inline-flex items-center gap-1 text-primary text-sm hover:underline mb-6">
          <ArrowLeft size={14} /> Kembali ke {product.category}
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-4">
              <img src={allImages[selectedImage]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3">
                {allImages.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-primary' : 'border-border'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">{product.title}</h1>
            <p className="text-3xl font-bold text-primary mb-6">{product.price}</p>
            <p className="text-foreground leading-relaxed mb-8 whitespace-pre-line">{product.longDescription}</p>

            <div className="flex flex-wrap gap-3">
              {product.demoUrl && (
                <Button variant="outline" size="lg" asChild>
                  <a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Eye size={18} /> Lihat Demo
                  </a>
                </Button>
              )}
              <Button variant="whatsapp" size="lg" asChild>
                <a href={generateWhatsAppLink(product.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                  <ShoppingCart size={18} /> Pesan via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
