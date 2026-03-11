import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Product, generateWhatsAppLink } from '@/lib/data';
import { Eye, ShoppingCart } from 'lucide-react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <p className="text-primary font-bold text-lg mb-4">{product.price}</p>
        <div className="flex gap-2">
          {product.demoUrl && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link to={`/produk/${product.id}`}>
                <Eye size={14} /> Lihat Demo
              </Link>
            </Button>
          )}
          <Button variant="whatsapp" size="sm" asChild className="flex-1">
            <a href={generateWhatsAppLink(product.whatsappMessage)} target="_blank" rel="noopener noreferrer">
              <ShoppingCart size={14} /> Pesan
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
