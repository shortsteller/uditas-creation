import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { WhatsAppButton } from "@/components/wa-button";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Udita's Creation Jewelry" },
      { name: "description", content: "Browse handcrafted earrings, necklaces, bangles, rings, anklets and bridal sets from Udita's Creation." },
      { property: "og:title", content: "Shop — Udita's Creation Jewelry" },
      { property: "og:description", content: "Handcrafted fashion jewelry, thoughtfully priced." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [max, setMax] = useState<number>(5000);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (p.price > max) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.short.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat, max]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
      <div className="flex flex-col items-start gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">The Shop</p>
        <h1 className="font-serif text-4xl md:text-6xl">All jewelry</h1>
        <p className="max-w-xl text-muted-foreground">
          Every piece is designed in our Delhi studio and handcrafted in small batches. Tap any product to order directly on WhatsApp.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Search</label>
            <div className="mt-2 flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Try 'jhumka'"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Category</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setCat("all")}
                className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition ${cat === "all" ? "border-gold bg-gold/10 text-gold" : "border-border text-foreground/70 hover:border-gold"}`}
              >
                All
              </button>
              {CATEGORIES.slice(0, 7).map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCat(c.slug)}
                  className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.2em] transition ${cat === c.slug ? "border-gold bg-gold/10 text-gold" : "border-border text-foreground/70 hover:border-gold"}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>Max price</span>
              <span className="text-foreground">₹{max}</span>
            </div>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="mt-3 w-full accent-[color:var(--gold)]"
            />
          </div>
        </aside>

        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {filtered.length} pieces
          </p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card"
              >
                <Link to="/product/$id" params={{ id: p.id }} className="block overflow-hidden bg-beige">
                  <img src={p.image} alt={p.name} loading="lazy"
                       className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.category}</p>
                      <Link to="/product/$id" params={{ id: p.id }} className="mt-1 block font-serif text-lg gold-underline">{p.name}</Link>
                    </div>
                    <p className="font-serif text-base text-gold">₹{p.price}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.short}</p>
                  <WhatsAppButton
                    variant="outline"
                    className="mt-auto w-full"
                    message={`Hi Udita's Creation! I'd like to order ${p.name} (₹${p.price}).`}
                  >
                    Order on WhatsApp
                  </WhatsAppButton>
                </div>
              </motion.article>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No pieces match your filters. <button onClick={() => { setQ(""); setCat("all"); setMax(5000); }} className="text-gold underline">Reset</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}