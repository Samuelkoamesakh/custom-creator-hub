import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BUSINESS_INFO } from '@/lib/data';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Undangan Online', href: '/katalog/undangan-online' },
  { label: 'Custom Printing', href: '/katalog/custom-printing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-heading text-xl font-bold text-foreground tracking-tight">
          {BUSINESS_INFO.name}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link
              key={l.href}
              to={l.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === l.href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button variant="hero" size="sm" asChild>
            <a href={BUSINESS_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
              Hubungi Kami
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4">
          {navLinks.map(l => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                location.pathname === l.href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Button variant="hero" size="sm" className="w-full mt-2" asChild>
            <a href={BUSINESS_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
              Hubungi Kami
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
