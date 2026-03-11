import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { getBanner, getCategories, getProducts, getTestimonials, BUSINESS_INFO } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Star, Sparkles, Palette } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function HomePage() {
  const banner = getBanner();
  const categories = getCategories();
  const products = getProducts();
  const testimonials = getTestimonials();
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Hero background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-secondary/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} /> Layanan Terpercaya
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading text-4xl md:text-6xl font-bold text-secondary-foreground leading-tight mb-6">
              {banner.headline}
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-secondary-foreground/80 mb-8 leading-relaxed">
              {banner.subheadline}
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/katalog/undangan-online">{banner.ctaText} <ArrowRight size={18} /></Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href={BUSINESS_INFO.whatsapp} target="_blank" rel="noopener noreferrer">Konsultasi Gratis</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Layanan Kami</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto">Solusi lengkap untuk undangan digital dan kebutuhan custom printing Anda</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <Link to="/katalog/undangan-online" className="group block bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Sparkles size={28} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Undangan Online</h3>
                <p className="text-muted-foreground mb-4">Undangan digital elegan untuk pernikahan, ulang tahun, acara gereja, dan event spesial lainnya.</p>
                <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Koleksi <ArrowRight size={16} /></span>
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <Link to="/katalog/custom-printing" className="group block bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Palette size={28} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Custom Printing</h3>
                <p className="text-muted-foreground mb-4">Cetak mug, gantungan kunci, ID card, DTF baju, jam dinding MDF, dan masih banyak lagi.</p>
                <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Produk <ArrowRight size={16} /></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-14">
            Kategori Produk
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.05}>
                <Link to={`/katalog/${cat.slug}`} className="block bg-card rounded-xl p-5 text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h4 className="font-heading text-sm font-semibold text-foreground">{cat.name}</h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Produk Unggulan</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground">Pilihan produk terbaik untuk Anda</motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-14">
            Testimoni Pelanggan
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1} className="bg-card rounded-2xl p-6 shadow-card">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{t.content}"</p>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
              Siap Mewujudkan Ide Anda?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-secondary-foreground/80 max-w-lg mx-auto mb-8">
              Konsultasikan kebutuhan undangan online dan custom printing Anda bersama kami. Gratis!
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Button variant="hero" size="lg" asChild>
                <a href={BUSINESS_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                  Hubungi via WhatsApp <ArrowRight size={18} />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
