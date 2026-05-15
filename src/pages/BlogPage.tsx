import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles, type Article } from '@/lib/data';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
};

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => { fetchArticles().then(setArticles); }, []);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Blog & Informasi
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-muted-foreground text-center mb-12">
          Artikel, tips, dan informasi terbaru seputar layanan kami
        </motion.p>

        {articles.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">Belum ada artikel.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {articles.map((a, i) => (
              <motion.div key={a.id} initial="hidden" animate="visible" variants={fadeUp} custom={i}>
                <Link to={`/blog/${a.slug}`} className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar size={12} />
                      {new Date(a.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2 line-clamp-2">{a.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{a.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
