import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BUSINESS_INFO, generateWhatsAppLink } from '@/lib/data';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Mohon isi semua field');
      return;
    }
    const msg = `Halo, saya ${form.name} (${form.email}).\n\n${form.message}`;
    window.open(generateWhatsAppLink(msg), '_blank');
    toast.success('Pesan dikirim via WhatsApp!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Hubungi Kami</h1>
        <p className="text-muted-foreground text-center mb-12">Kami siap membantu kebutuhan Anda</p>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <h2 className="font-heading text-xl font-bold text-foreground mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Nama</label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama lengkap" maxLength={100} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@contoh.com" maxLength={255} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Pesan</label>
                <Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tuliskan pesan Anda..." rows={5} maxLength={1000} />
              </div>
              <Button type="submit" variant="hero" className="w-full">
                <Send size={16} /> Kirim via WhatsApp
              </Button>
            </form>
          </div>

          {/* Info + Maps */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Informasi Kontak</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{BUSINESS_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary shrink-0" />
                  <span className="text-foreground text-sm">{BUSINESS_INFO.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary shrink-0" />
                  <span className="text-foreground text-sm">{BUSINESS_INFO.email}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-card aspect-video">
              <iframe
                src={BUSINESS_INFO.mapsEmbed}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi kami"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
