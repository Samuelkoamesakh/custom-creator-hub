import { useEffect, useState } from 'react';
import { fetchBanner, saveBanner, type Banner } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function AdminBannerPage() {
  const [form, setForm] = useState<Banner>({ headline: '', subheadline: '', ctaText: '', ctaLink: '/katalog', image: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanner().then(b => { setForm(b); setLoading(false); });
  }, []);

  const handleSave = async () => {
    try {
      await saveBanner(form);
      toast.success('Banner diupdate!');
    } catch (e: any) { toast.error(e.message || 'Gagal menyimpan'); }
  };

  if (loading) return <div className="text-muted-foreground">Memuat...</div>;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Manajemen Banner</h2>
      <div className="bg-card rounded-xl p-6 shadow-card max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Headline</label>
            <Input value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} maxLength={200} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Sub-headline</label>
            <Textarea value={form.subheadline} onChange={e => setForm({ ...form, subheadline: e.target.value })} rows={3} maxLength={500} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Teks CTA</label>
            <Input value={form.ctaText} onChange={e => setForm({ ...form, ctaText: e.target.value })} maxLength={50} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Link CTA</label>
            <Input value={form.ctaLink} onChange={e => setForm({ ...form, ctaLink: e.target.value })} maxLength={200} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">URL Gambar Banner</label>
            <Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} maxLength={500} />
          </div>
          {form.image && (
            <div className="rounded-xl overflow-hidden aspect-video">
              <img src={form.image} alt="Preview banner" className="w-full h-full object-cover" />
            </div>
          )}
          <Button variant="hero" onClick={handleSave}>Simpan Perubahan</Button>
        </div>
      </div>
    </div>
  );
}
