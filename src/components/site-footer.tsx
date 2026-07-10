import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-serif text-2xl">{SITE.name}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Handcrafted fashion jewelry for the modern woman. Small-batch, thoughtfully made.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Shop</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/shop" className="gold-underline">All jewelry</Link></li>
            <li><Link to="/categories" className="gold-underline">Categories</Link></li>
            <li><Link to="/shop" className="gold-underline">New arrivals</Link></li>
            <li><Link to="/shop" className="gold-underline">Best sellers</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Studio</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="gold-underline">Our story</Link></li>
            <li><Link to="/contact" className="gold-underline">Contact</Link></li>
            <li>{SITE.address}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Follow</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> {SITE.email}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> {SITE.phone}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
               className="grid h-10 w-10 place-items-center rounded-full border border-border/70 transition hover:border-gold hover:text-gold">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"
               className="grid h-10 w-10 place-items-center rounded-full border border-border/70 transition hover:border-gold hover:text-gold">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} {SITE.name}. Crafted with care.</p>
          <p className="tracking-[0.2em] uppercase">Handmade in India</p>
        </div>
      </div>
    </footer>
  );
}