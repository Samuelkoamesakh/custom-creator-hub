
-- Categories
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  parent_group TEXT NOT NULL DEFAULT 'undangan-online',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Products
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  long_description TEXT DEFAULT '',
  price TEXT DEFAULT '',
  category TEXT DEFAULT '',
  category_slug TEXT DEFAULT '',
  image TEXT DEFAULT '',
  gallery TEXT[] NOT NULL DEFAULT '{}',
  demo_url TEXT,
  whatsapp_message TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Articles
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  image TEXT DEFAULT '',
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Banner (singleton)
CREATE TABLE public.banner (
  id INT NOT NULL PRIMARY KEY DEFAULT 1,
  headline TEXT NOT NULL DEFAULT '',
  subheadline TEXT NOT NULL DEFAULT '',
  cta_text TEXT NOT NULL DEFAULT '',
  cta_link TEXT NOT NULL DEFAULT '/katalog',
  image TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT banner_singleton CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Public read banner" ON public.banner FOR SELECT USING (true);

-- Temporary public write policies (TODO: replace with admin auth)
CREATE POLICY "Public write categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write articles" ON public.articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public write banner" ON public.banner FOR ALL USING (true) WITH CHECK (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_articles_updated BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_banner_updated BEFORE UPDATE ON public.banner FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default banner row
INSERT INTO public.banner (id, headline, subheadline, cta_text, cta_link, image)
VALUES (1,
  'Undangan Online & Custom Printing Berkualitas',
  'Wujudkan momen spesial Anda dengan undangan digital elegan dan produk custom printing berkualitas tinggi',
  'Lihat Katalog',
  '/katalog',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200'
);

-- Seed default categories
INSERT INTO public.categories (name, slug, description, icon, parent_group) VALUES
('Undangan Pernikahan Online', 'undangan-pernikahan', 'Undangan digital elegan untuk pernikahan impian Anda', '💍', 'undangan-online'),
('Undangan Ulang Tahun', 'undangan-ulang-tahun', 'Undangan digital meriah untuk pesta ulang tahun', '🎂', 'undangan-online'),
('Undangan Acara Gereja', 'undangan-gereja', 'Undangan digital untuk acara keagamaan', '⛪', 'undangan-online'),
('Undangan Event', 'undangan-event', 'Undangan digital untuk berbagai acara & event', '🎉', 'undangan-online'),
('Cetak Mug Custom', 'cetak-mug', 'Mug dengan desain custom sesuai keinginan', '☕', 'custom-printing'),
('Gantungan Kunci Custom', 'gantungan-kunci', 'Gantungan kunci unik dengan foto atau desain Anda', '🔑', 'custom-printing'),
('ID Card + Lanyard', 'id-card-lanyard', 'ID Card profesional lengkap dengan lanyard', '🪪', 'custom-printing'),
('Print DTF Baju', 'print-dtf', 'Cetak DTF berkualitas tinggi untuk kaos', '👕', 'custom-printing'),
('Jam Dinding MDF', 'jam-dinding-mdf', 'Jam dinding custom dari bahan MDF premium', '🕐', 'custom-printing');

-- Seed default products
INSERT INTO public.products (title, description, long_description, price, category, category_slug, image, gallery, demo_url, whatsapp_message) VALUES
('Undangan Pernikahan Elegant Rose', 'Desain undangan elegan dengan tema bunga mawar', 'Undangan pernikahan digital dengan desain elegan bertema bunga mawar. Dilengkapi dengan fitur RSVP, galeri foto, countdown, maps lokasi, dan musik latar. Template responsif yang tampil sempurna di semua perangkat.', 'Rp 150.000', 'Undangan Pernikahan Online', 'undangan-pernikahan', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600', ARRAY['https://images.unsplash.com/photo-1519741497674-611481863552?w=800','https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800'], '#', 'Halo, saya tertarik dengan Undangan Pernikahan Elegant Rose. Bisa info lebih lanjut?'),
('Undangan Pernikahan Minimalist Gold', 'Desain minimalis dengan aksen emas mewah', 'Undangan pernikahan digital bergaya minimalis dengan sentuhan emas yang mewah. Fitur lengkap termasuk RSVP online, countdown, galeri foto, dan integrasi maps.', 'Rp 175.000', 'Undangan Pernikahan Online', 'undangan-pernikahan', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600', ARRAY['https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800'], '#', 'Halo, saya tertarik dengan Undangan Pernikahan Minimalist Gold. Bisa info lebih lanjut?'),
('Undangan Ulang Tahun Colorful', 'Desain ceria penuh warna untuk pesta ulang tahun', 'Undangan ulang tahun digital dengan desain colorful dan ceria. Cocok untuk anak-anak maupun dewasa. Dilengkapi animasi, countdown, dan konfirmasi kehadiran.', 'Rp 100.000', 'Undangan Ulang Tahun', 'undangan-ulang-tahun', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600', ARRAY['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800'], '#', 'Halo, saya tertarik dengan Undangan Ulang Tahun Colorful.'),
('Mug Custom Foto', 'Mug keramik dengan cetak foto berkualitas tinggi', 'Mug keramik berkualitas tinggi dengan cetak foto full color. Cocok untuk souvenir, hadiah, atau merchandise. Tahan dicuci dan warna tidak mudah pudar.', 'Rp 45.000', 'Cetak Mug Custom', 'cetak-mug', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600', ARRAY['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800'], NULL, 'Halo, saya ingin pesan Mug Custom Foto. Bisa info lebih lanjut?'),
('Gantungan Kunci Akrilik', 'Gantungan kunci akrilik custom dengan desain bebas', 'Gantungan kunci dari bahan akrilik premium dengan cetak UV berkualitas tinggi. Bisa custom desain, foto, atau logo. Cocok untuk souvenir dan merchandise.', 'Rp 15.000', 'Gantungan Kunci Custom', 'gantungan-kunci', 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600', ARRAY['https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800'], NULL, 'Halo, saya ingin pesan Gantungan Kunci Akrilik Custom.'),
('ID Card PVC + Lanyard', 'Cetak ID Card PVC profesional lengkap lanyard', 'ID Card PVC berkualitas tinggi dengan cetak full color dua sisi. Dilengkapi lanyard premium dengan pilihan warna. Cocok untuk perusahaan, event, atau organisasi.', 'Rp 35.000', 'ID Card + Lanyard', 'id-card-lanyard', 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=600', ARRAY['https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=800'], NULL, 'Halo, saya ingin pesan ID Card + Lanyard.'),
('Print DTF Kaos A3', 'Cetak DTF berkualitas tinggi untuk kaos ukuran A3', 'Layanan cetak DTF (Direct to Film) ukuran A3 dengan kualitas warna terbaik. Hasil cetak tahan lama, tidak mudah retak, dan bisa diaplikasikan ke berbagai jenis kain.', 'Rp 25.000', 'Print DTF Baju', 'print-dtf', 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600', ARRAY['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800'], NULL, 'Halo, saya ingin pesan Print DTF ukuran A3.'),
('Jam Dinding MDF Custom', 'Jam dinding dari MDF dengan desain custom', 'Jam dinding berbahan MDF premium dengan cetak full color. Mesin jam berkualitas dan akurat. Bisa custom desain, foto, atau logo sesuai keinginan.', 'Rp 85.000', 'Jam Dinding MDF', 'jam-dinding-mdf', 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600', ARRAY['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800'], NULL, 'Halo, saya ingin pesan Jam Dinding MDF Custom.');

-- Seed default articles
INSERT INTO public.articles (title, slug, excerpt, content, image, published_at, tags) VALUES
('Tips Memilih Undangan Pernikahan Online yang Tepat', 'tips-memilih-undangan-pernikahan-online', 'Panduan lengkap memilih undangan pernikahan digital yang sesuai dengan tema dan budget Anda.', 'Memilih undangan pernikahan online yang tepat sangat penting untuk memberikan kesan pertama yang baik kepada tamu undangan. Berikut beberapa tips yang bisa Anda pertimbangkan:

1. Sesuaikan dengan Tema Pernikahan
Pilih desain undangan yang selaras dengan tema pernikahan Anda.

2. Perhatikan Fitur yang Ditawarkan
Pastikan undangan memiliki fitur RSVP, maps, countdown, dan galeri foto.

3. Responsif di Semua Perangkat
Undangan harus tampil baik di smartphone, tablet, maupun desktop.

4. Mudah Dibagikan
Pilih undangan yang mudah dibagikan via WhatsApp, Instagram, atau media sosial lainnya.', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', '2024-12-01', ARRAY['undangan','pernikahan','tips']),
('Keuntungan Custom Printing untuk Bisnis Anda', 'keuntungan-custom-printing-bisnis', 'Mengapa custom printing menjadi pilihan cerdas untuk branding dan promosi bisnis.', 'Custom printing menawarkan banyak keuntungan untuk bisnis Anda. Dari mug custom hingga kaos DTF, produk custom printing bisa menjadi media promosi yang efektif.

1. Branding yang Kuat
Produk custom dengan logo perusahaan meningkatkan brand awareness.

2. Souvenir Event
Mug, gantungan kunci, dan produk custom lainnya cocok sebagai souvenir event.

3. Harga Terjangkau
Dengan teknologi cetak modern, custom printing semakin terjangkau.

4. Kualitas Tinggi
Hasil cetak berkualitas tinggi yang tahan lama.', 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800', '2024-11-15', ARRAY['custom printing','bisnis','branding']);
