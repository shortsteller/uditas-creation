import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Udita's Creation Jewelry" },
      { name: "description", content: "Explore earrings, necklaces, bangles, bracelets, rings, anklets, sets and new arrivals." },
      { property: "og:title", content: "Categories — Udita's Creation Jewelry" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">The edit</p>
      <h1 className="mt-2 font-serif text-4xl md:text-6xl">Shop by category</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        From understated everyday pieces to festive statements — find the piece for the moment.
      </p>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {CATEGORIES.map((c, i) => {
          const count = PRODUCTS.filter((p) => p.category === c.slug).length;
          return (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link to="/shop" className="group relative block overflow-hidden rounded-3xl border border-border/60 bg-beige">
                <img src={c.image} alt={c.name} loading="lazy"
                     className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-primary-foreground">
                  <div>
                    <p className="font-serif text-2xl">{c.name}</p>
                    <p className="text-xs uppercase tracking-[0.25em] opacity-80">{count || "Coming"} pieces</p>
                  </div>
                  <span className="rounded-full border border-primary-foreground/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em]">Shop</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}