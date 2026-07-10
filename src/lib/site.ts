export const SITE = {
  name: "Udita's Creation",
  tagline: "Elegant Jewelry for Every Occasion",
  whatsapp: "919999999999", // change to your WA number (no + or spaces)
  email: "hello@aabharan.co",
  phone: "+91 99999 99999",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  address: "12 Chandni Chowk, New Delhi, India",
};

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}