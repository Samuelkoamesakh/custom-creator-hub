// CMS Data Store backed by Lovable Cloud (Supabase)
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  category: string;
  categorySlug: string;
  image: string;
  gallery: string[];
  demoUrl?: string;
  whatsappMessage: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  parentGroup: 'undangan-online' | 'custom-printing';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  tags: string[];
}

export interface Banner {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

// ---- Mappers ----
const mapProduct = (r: any): Product => ({
  id: r.id,
  title: r.title,
  description: r.description ?? '',
  longDescription: r.long_description ?? '',
  price: r.price ?? '',
  category: r.category ?? '',
  categorySlug: r.category_slug ?? '',
  image: r.image ?? '',
  gallery: r.gallery ?? [],
  demoUrl: r.demo_url ?? undefined,
  whatsappMessage: r.whatsapp_message ?? '',
});

const productToRow = (p: Product) => ({
  id: p.id || undefined,
  title: p.title,
  description: p.description,
  long_description: p.longDescription,
  price: p.price,
  category: p.category,
  category_slug: p.categorySlug,
  image: p.image,
  gallery: p.gallery,
  demo_url: p.demoUrl || null,
  whatsapp_message: p.whatsappMessage,
});

const mapCategory = (r: any): Category => ({
  id: r.id,
  name: r.name,
  slug: r.slug,
  description: r.description ?? '',
  icon: r.icon ?? '',
  parentGroup: r.parent_group as Category['parentGroup'],
});

const categoryToRow = (c: Category) => ({
  id: c.id || undefined,
  name: c.name,
  slug: c.slug,
  description: c.description,
  icon: c.icon,
  parent_group: c.parentGroup,
});

const mapArticle = (r: any): Article => ({
  id: r.id,
  title: r.title,
  slug: r.slug,
  excerpt: r.excerpt ?? '',
  content: r.content ?? '',
  image: r.image ?? '',
  publishedAt: r.published_at,
  tags: r.tags ?? [],
});

const articleToRow = (a: Article) => ({
  id: a.id || undefined,
  title: a.title,
  slug: a.slug,
  excerpt: a.excerpt,
  content: a.content,
  image: a.image,
  published_at: a.publishedAt,
  tags: a.tags,
});

// ---- Products ----
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return (data ?? []).map(mapProduct);
}
export async function fetchProductById(id: string): Promise<Product | null> {
  const { data } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
  return data ? mapProduct(data) : null;
}
export async function fetchProductsByCategory(slug: string): Promise<Product[]> {
  const { data } = await supabase.from('products').select('*').eq('category_slug', slug);
  return (data ?? []).map(mapProduct);
}
export async function saveProduct(p: Product): Promise<void> {
  const row = productToRow(p);
  const { error } = await supabase.from('products').upsert(row);
  if (error) throw error;
}
export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

// ---- Categories ----
export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*').order('name');
  if (error) { console.error(error); return []; }
  return (data ?? []).map(mapCategory);
}
export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const { data } = await supabase.from('categories').select('*').eq('slug', slug).maybeSingle();
  return data ? mapCategory(data) : null;
}
export async function saveCategory(c: Category): Promise<void> {
  const { error } = await supabase.from('categories').upsert(categoryToRow(c));
  if (error) throw error;
}
export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
}

// ---- Articles ----
export async function fetchArticles(): Promise<Article[]> {
  const { data, error } = await supabase.from('articles').select('*').order('published_at', { ascending: false });
  if (error) { console.error(error); return []; }
  return (data ?? []).map(mapArticle);
}
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const { data } = await supabase.from('articles').select('*').eq('slug', slug).maybeSingle();
  return data ? mapArticle(data) : null;
}
export async function saveArticle(a: Article): Promise<void> {
  const { error } = await supabase.from('articles').upsert(articleToRow(a));
  if (error) throw error;
}
export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;
}

// ---- Banner (singleton row id=1) ----
const defaultBanner: Banner = {
  headline: 'Undangan Online & Custom Printing Berkualitas',
  subheadline: 'Wujudkan momen spesial Anda dengan undangan digital elegan dan produk custom printing berkualitas tinggi',
  ctaText: 'Lihat Katalog',
  ctaLink: '/katalog',
  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
};
export async function fetchBanner(): Promise<Banner> {
  const { data } = await supabase.from('banner').select('*').eq('id', 1).maybeSingle();
  if (!data) return defaultBanner;
  return {
    headline: data.headline,
    subheadline: data.subheadline,
    ctaText: data.cta_text,
    ctaLink: data.cta_link,
    image: data.image,
  };
}
export async function saveBanner(b: Banner): Promise<void> {
  const { error } = await supabase.from('banner').upsert({
    id: 1,
    headline: b.headline,
    subheadline: b.subheadline,
    cta_text: b.ctaText,
    cta_link: b.ctaLink,
    image: b.image,
  });
  if (error) throw error;
}

// ---- Testimonials (static for now) ----
const defaultTestimonials: Testimonial[] = [
  { id: '1', name: 'Sarah & Budi', role: 'Pasangan Pengantin', content: 'Undangan online-nya sangat elegan dan mudah dibagikan. Tamu undangan sangat terkesan!', avatar: '', rating: 5 },
  { id: '2', name: 'PT Maju Bersama', role: 'Corporate Client', content: 'Kami pesan mug custom untuk souvenir perusahaan. Hasilnya sangat memuaskan dan tepat waktu.', avatar: '', rating: 5 },
  { id: '3', name: 'Ibu Ratna', role: 'Pelanggan Setia', content: 'Sudah 3x pesan gantungan kunci dan ID Card di sini. Kualitas selalu terjaga dan harga bersahabat.', avatar: '', rating: 5 },
];
export const getTestimonials = (): Testimonial[] => defaultTestimonials;

export const WHATSAPP_NUMBER = '6281234567890';
export const generateWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const BUSINESS_INFO = {
  name: 'CreativeStudio',
  tagline: 'Undangan Online & Custom Printing',
  address: 'Jl. Contoh No. 123, Jakarta, Indonesia',
  phone: '+62 812-3456-7890',
  email: 'info@creativestudio.id',
  instagram: 'https://instagram.com/creativestudio',
  facebook: 'https://facebook.com/creativestudio',
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.2087634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1',
};
