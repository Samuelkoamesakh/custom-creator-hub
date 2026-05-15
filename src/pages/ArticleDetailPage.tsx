import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticleBySlug, type Article } from '@/lib/data';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchArticleBySlug(slug).then(a => { setArticle(a); setLoading(false); });
  }, [slug]);

  if (loading) return <div className="py-20 text-center text-muted-foreground">Memuat...</div>;

  if (!article) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Artikel tidak ditemukan.</p>
        <Link to="/blog" className="text-primary hover:underline mt-4 inline-block">Kembali ke Blog</Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1 text-primary text-sm hover:underline mb-6">
          <ArrowLeft size={14} /> Kembali ke Blog
        </Link>

        <article>
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar size={14} />
            {new Date(article.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">{article.title}</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map(tag => (
              <span key={tag} className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <div className="prose prose-lg max-w-none text-foreground leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </article>
      </div>
    </div>
  );
}
