import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '@/lib/data';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl font-bold mb-3">{BUSINESS_INFO.name}</h3>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              {BUSINESS_INFO.tagline}. Melayani dengan kualitas terbaik dan harga terjangkau.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/katalog/undangan-online" className="hover:text-primary transition-colors">Undangan Online</Link></li>
              <li><Link to="/katalog/custom-printing" className="hover:text-primary transition-colors">Custom Printing</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog & Info</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Informasi</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li><Link to="/kontak" className="hover:text-primary transition-colors">Kontak Kami</Link></li>
              <li><a href={BUSINESS_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href={BUSINESS_INFO.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/70">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-primary" />{BUSINESS_INFO.address}</li>
              <li className="flex items-center gap-2"><Phone size={16} className="shrink-0 text-primary" />{BUSINESS_INFO.phone}</li>
              <li className="flex items-center gap-2"><Mail size={16} className="shrink-0 text-primary" />{BUSINESS_INFO.email}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-6 text-center text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
