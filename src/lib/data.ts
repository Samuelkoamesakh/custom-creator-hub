// CMS Data Store using localStorage

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

const defaultCategories: Category[] = [
  { id: '1', name: 'Undangan Pernikahan Online', slug: 'undangan-pernikahan', description: 'Undangan digital elegan untuk pernikahan impian Anda', icon: '💍', parentGroup: 'undangan-online' },
  { id: '2', name: 'Undangan Ulang Tahun', slug: 'undangan-ulang-tahun', description: 'Undangan digital meriah untuk pesta ulang tahun', icon: '🎂', parentGroup: 'undangan-online' },
  { id: '3', name: 'Undangan Acara Gereja', slug: 'undangan-gereja', description: 'Undangan digital untuk acara keagamaan', icon: '⛪', parentGroup: 'undangan-online' },
  { id: '4', name: 'Undangan Event', slug: 'undangan-event', description: 'Undangan digital untuk berbagai acara & event', icon: '🎉', parentGroup: 'undangan-online' },
  { id: '5', name: 'Cetak Mug Custom', slug: 'cetak-mug', description: 'Mug dengan desain custom sesuai keinginan', icon: '☕', parentGroup: 'custom-printing' },
  { id: '6', name: 'Gantungan Kunci Custom', slug: 'gantungan-kunci', description: 'Gantungan kunci unik dengan foto atau desain Anda', icon: '🔑', parentGroup: 'custom-printing' },
  { id: '7', name: 'ID Card + Lanyard', slug: 'id-card-lanyard', description: 'ID Card profesional lengkap dengan lanyard', icon: '🪪', parentGroup: 'custom-printing' },
  { id: '8', name: 'Print DTF Baju', slug: 'print-dtf', description: 'Cetak DTF berkualitas tinggi untuk kaos', icon: '👕', parentGroup: 'custom-printing' },
  { id: '9', name: 'Jam Dinding MDF', slug: 'jam-dinding-mdf', description: 'Jam dinding custom dari bahan MDF premium', icon: '🕐', parentGroup: 'custom-printing' },
];

const defaultProducts: Product[] = [
  {
    id: '1', title: 'Undangan Pernikahan Elegant Rose', description: 'Desain undangan elegan dengan tema bunga mawar', longDescription: 'Undangan pernikahan digital dengan desain elegan bertema bunga mawar. Dilengkapi dengan fitur RSVP, galeri foto, countdown, maps lokasi, dan musik latar. Template responsif yang tampil sempurna di semua perangkat.',
    price: 'Rp 150.000', category: 'Undangan Pernikahan Online', categorySlug: 'undangan-pernikahan',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', gallery: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=800', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800'],
    demoUrl: '#', whatsappMessage: 'Halo, saya tertarik dengan Undangan Pernikahan Elegant Rose. Bisa info lebih lanjut?'
  },
  {
    id: '2', title: 'Undangan Pernikahan Minimalist Gold', description: 'Desain minimalis dengan aksen emas mewah', longDescription: 'Undangan pernikahan digital bergaya minimalis dengan sentuhan emas yang mewah. Fitur lengkap termasuk RSVP online, countdown, galeri foto, dan integrasi maps.',
    price: 'Rp 175.000', category: 'Undangan Pernikahan Online', categorySlug: 'undangan-pernikahan',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600', gallery: ['https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800'],
    demoUrl: '#', whatsappMessage: 'Halo, saya tertarik dengan Undangan Pernikahan Minimalist Gold. Bisa info lebih lanjut?'
  },
  {
    id: '3', title: 'Undangan Ulang Tahun Colorful', description: 'Desain ceria penuh warna untuk pesta ulang tahun', longDescription: 'Undangan ulang tahun digital dengan desain colorful dan ceria. Cocok untuk anak-anak maupun dewasa. Dilengkapi animasi, countdown, dan konfirmasi kehadiran.',
    price: 'Rp 100.000', category: 'Undangan Ulang Tahun', categorySlug: 'undangan-ulang-tahun',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600', gallery: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800'],
    demoUrl: '#', whatsappMessage: 'Halo, saya tertarik dengan Undangan Ulang Tahun Colorful.'
  },
  {
    id: '4', title: 'Mug Custom Foto', description: 'Mug keramik dengan cetak foto berkualitas tinggi', longDescription: 'Mug keramik berkualitas tinggi dengan cetak foto full color. Cocok untuk souvenir, hadiah, atau merchandise. Tahan dicuci dan warna tidak mudah pudar.',
    price: 'Rp 45.000', category: 'Cetak Mug Custom', categorySlug: 'cetak-mug',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600', gallery: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800'],
    whatsappMessage: 'Halo, saya ingin pesan Mug Custom Foto. Bisa info lebih lanjut?'
  },
  {
    id: '5', title: 'Gantungan Kunci Akrilik', description: 'Gantungan kunci akrilik custom dengan desain bebas', longDescription: 'Gantungan kunci dari bahan akrilik premium dengan cetak UV berkualitas tinggi. Bisa custom desain, foto, atau logo. Cocok untuk souvenir dan merchandise.',
    price: 'Rp 15.000', category: 'Gantungan Kunci Custom', categorySlug: 'gantungan-kunci',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600', gallery: ['https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800'],
    whatsappMessage: 'Halo, saya ingin pesan Gantungan Kunci Akrilik Custom.'
  },
  {
    id: '6', title: 'ID Card PVC + Lanyard', description: 'Cetak ID Card PVC profesional lengkap lanyard', longDescription: 'ID Card PVC berkualitas tinggi dengan cetak full color dua sisi. Dilengkapi lanyard premium dengan pilihan warna. Cocok untuk perusahaan, event, atau organisasi.',
    price: 'Rp 35.000', category: 'ID Card + Lanyard', categorySlug: 'id-card-lanyard',
    image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=600', gallery: ['https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=800'],
    whatsappMessage: 'Halo, saya ingin pesan ID Card + Lanyard.'
  },
  {
    id: '7', title: 'Print DTF Kaos A3', description: 'Cetak DTF berkualitas tinggi untuk kaos ukuran A3', longDescription: 'Layanan cetak DTF (Direct to Film) ukuran A3 dengan kualitas warna terbaik. Hasil cetak tahan lama, tidak mudah retak, dan bisa diaplikasikan ke berbagai jenis kain.',
    price: 'Rp 25.000', category: 'Print DTF Baju', categorySlug: 'print-dtf',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600', gallery: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800'],
    whatsappMessage: 'Halo, saya ingin pesan Print DTF ukuran A3.'
  },
  {
    id: '8', title: 'Jam Dinding MDF Custom', description: 'Jam dinding dari MDF dengan desain custom', longDescription: 'Jam dinding berbahan MDF premium dengan cetak full color. Mesin jam berkualitas dan akurat. Bisa custom desain, foto, atau logo sesuai keinginan.',
    price: 'Rp 85.000', category: 'Jam Dinding MDF', categorySlug: 'jam-dinding-mdf',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600', gallery: ['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800'],
    whatsappMessage: 'Halo, saya ingin pesan Jam Dinding MDF Custom.'
  },
];

const defaultArticles: Article[] = [
  {
    id: '1', title: 'Tips Memilih Undangan Pernikahan Online yang Tepat', slug: 'tips-memilih-undangan-pernikahan-online',
    excerpt: 'Panduan lengkap memilih undangan pernikahan digital yang sesuai dengan tema dan budget Anda.',
    content: 'Memilih undangan pernikahan online yang tepat sangat penting untuk memberikan kesan pertama yang baik kepada tamu undangan. Berikut beberapa tips yang bisa Anda pertimbangkan:\n\n1. Sesuaikan dengan Tema Pernikahan\nPilih desain undangan yang selaras dengan tema pernikahan Anda.\n\n2. Perhatikan Fitur yang Ditawarkan\nPastikan undangan memiliki fitur RSVP, maps, countdown, dan galeri foto.\n\n3. Responsif di Semua Perangkat\nUndangan harus tampil baik di smartphone, tablet, maupun desktop.\n\n4. Mudah Dibagikan\nPilih undangan yang mudah dibagikan via WhatsApp, Instagram, atau media sosial lainnya.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    publishedAt: '2024-12-01', tags: ['undangan', 'pernikahan', 'tips']
  },
  {
    id: '2', title: 'Keuntungan Custom Printing untuk Bisnis Anda', slug: 'keuntungan-custom-printing-bisnis',
    excerpt: 'Mengapa custom printing menjadi pilihan cerdas untuk branding dan promosi bisnis.',
    content: 'Custom printing menawarkan banyak keuntungan untuk bisnis Anda. Dari mug custom hingga kaos DTF, produk custom printing bisa menjadi media promosi yang efektif.\n\n1. Branding yang Kuat\nProduk custom dengan logo perusahaan meningkatkan brand awareness.\n\n2. Souvenir Event\nMug, gantungan kunci, dan produk custom lainnya cocok sebagai souvenir event.\n\n3. Harga Terjangkau\nDengan teknologi cetak modern, custom printing semakin terjangkau.\n\n4. Kualitas Tinggi\nHasil cetak berkualitas tinggi yang tahan lama.',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800',
    publishedAt: '2024-11-15', tags: ['custom printing', 'bisnis', 'branding']
  },
];

const defaultBanner: Banner = {
  headline: 'Undangan Online & Custom Printing Berkualitas',
  subheadline: 'Wujudkan momen spesial Anda dengan undangan digital elegan dan produk custom printing berkualitas tinggi',
  ctaText: 'Lihat Katalog',
  ctaLink: '/katalog',
  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
};

const defaultTestimonials: Testimonial[] = [
  { id: '1', name: 'Sarah & Budi', role: 'Pasangan Pengantin', content: 'Undangan online-nya sangat elegan dan mudah dibagikan. Tamu undangan sangat terkesan!', avatar: '', rating: 5 },
  { id: '2', name: 'PT Maju Bersama', role: 'Corporate Client', content: 'Kami pesan mug custom untuk souvenir perusahaan. Hasilnya sangat memuaskan dan tepat waktu.', avatar: '', rating: 5 },
  { id: '3', name: 'Ibu Ratna', role: 'Pelanggan Setia', content: 'Sudah 3x pesan gantungan kunci dan ID Card di sini. Kualitas selalu terjaga dan harga bersahabat.', avatar: '', rating: 5 },
];

function getStorage<T>(key: string, defaultVal: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultVal;
  } catch { return defaultVal; }
}

function setStorage<T>(key: string, val: T) {
  localStorage.setItem(key, JSON.stringify(val));
}

// Public getters
export const getProducts = (): Product[] => getStorage('cms_products', defaultProducts);
export const getCategories = (): Category[] => getStorage('cms_categories', defaultCategories);
export const getArticles = (): Article[] => getStorage('cms_articles', defaultArticles);
export const getBanner = (): Banner => getStorage('cms_banner', defaultBanner);
export const getTestimonials = (): Testimonial[] => getStorage('cms_testimonials', defaultTestimonials);

// Setters
export const saveProducts = (p: Product[]) => setStorage('cms_products', p);
export const saveCategories = (c: Category[]) => setStorage('cms_categories', c);
export const saveArticles = (a: Article[]) => setStorage('cms_articles', a);
export const saveBanner = (b: Banner) => setStorage('cms_banner', b);

// Helpers
export const getProductById = (id: string) => getProducts().find(p => p.id === id);
export const getProductsByCategory = (slug: string) => getProducts().filter(p => p.categorySlug === slug);
export const getArticleBySlug = (slug: string) => getArticles().find(a => a.slug === slug);
export const getCategoryBySlug = (slug: string) => getCategories().find(c => c.slug === slug);

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
