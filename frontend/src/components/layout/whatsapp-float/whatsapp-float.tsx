import { WHATSAPP_MESSAGES } from "@/lib/constants/config";

export default function WhatsAppFloat() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGES.general)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 bg-tertiary-container text-on-tertiary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.989 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217c5.506 0 9.988-4.478 9.988-9.984 0-5.509-4.482-9.996-9.988-9.996zm5.666 14.078c-.239.672-1.39 1.283-1.907 1.324-.462.037-.89.207-3.007-.626-2.553-1.003-4.177-3.592-4.303-3.76-.126-.167-1.03-1.37-1.03-2.613 0-1.242.652-1.856.884-2.11.232-.254.506-.317.675-.317.168 0 .337 0 .484.009.168.009.378-.057.585.45.213.516.724 1.77.788 1.898.063.127.105.275.02.443-.084.168-.126.273-.252.42-.126.147-.265.328-.378.44-.126.127-.258.264-.11.516.147.253.654 1.078 1.404 1.747.964.86 1.778 1.127 2.03 1.253.253.126.4.106.548-.063.147-.168.632-.737.8-.99.169-.254.337-.211.569-.127.232.084 1.467.692 1.718.818.252.126.42.19.483.295.063.105.063.61-.176 1.193z" />
      </svg>
    </a>
  );
}
