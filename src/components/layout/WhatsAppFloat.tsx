import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/data';

export default function WhatsAppFloat() {
  return (
    <a
      href={BUSINESS_INFO.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[hsl(142,70%,45%)] text-primary-foreground px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-float"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline font-semibold text-sm">Chat WhatsApp</span>
    </a>
  );
}
