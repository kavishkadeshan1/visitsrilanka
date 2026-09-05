import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

interface WhatsAppButtonProps {
  message?: string;
}

export function WhatsAppButton({ message = "Hi! I'm interested in planning a trip to Sri Lanka." }: WhatsAppButtonProps) {
  const whatsappLink = getWhatsAppLink(message);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 
                 bg-[#25D366] text-white rounded-full shadow-lg 
                 hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300
                 whatsapp-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" fill="currentColor" />
    </a>
  );
}
