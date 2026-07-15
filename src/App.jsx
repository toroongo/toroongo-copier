import React, { useMemo, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ArrowLeft, ClipboardList, Grid3X3, LayoutList, Search } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import { products } from './data/products';

const ORDER_INSTRUCTIONS = `এখন থেকে আমরা সব অর্ডার সরাসরি ওয়েবসাইট থেকেই গ্রহণ করছি!

অর্ডার করতে যা করবেন:
১. পছন্দের প্রোডাক্টের পেজে যান।
২. 'Add to Cart' অথবা 'Buy Now' বাটনে ক্লিক করুন।
৩. চেকআউট পেজে আপনার নাম, ফোন নম্বর এবং সম্পূর্ণ ডেলিভারি ঠিকানা দিন।
৪. অর্ডার কনফার্ম করুন — ব্যস, হয়ে গেল!

ওয়েবসাইট: https://toroongo.com`;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const categories = useMemo(() => {
    const categorySet = new Set(products.map((product) => product.category));
    return ['All', ...Array.from(categorySet).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let nextProducts = products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      if (!matchesCategory) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.price.toLowerCase().includes(query) ||
        product.scripts.some(
          (script) =>
            script.question.toLowerCase().includes(query) ||
            script.answer.toLowerCase().includes(query),
        )
      );
    });

    nextProducts = [...nextProducts].sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'scripts-desc') return b.scripts.length - a.scripts.length;
      if (sortBy === 'scripts-asc') return a.scripts.length - b.scripts.length;
      return 0;
    });

    return nextProducts;
  }, [searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('name-asc');
  };

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
    setSearchQuery('');
  };

  const handleCopyOrderInstructions = async () => {
    try {
      await navigator.clipboard.writeText(ORDER_INSTRUCTIONS);
      toast.success('Order instructions copied');
    } catch (error) {
      toast.error('Clipboard permission blocked.');
    }
  };

  const handleQuickCopy = async (product) => {
    if (!product.scripts?.length) return;

    const findAnswer = (question) => product.scripts.find((script) => script.question === question)?.answer;

    const description = findAnswer('প্রোডাক্টের বিবরণ');
    const features = findAnswer('মূল ফিচার');
    const link = findAnswer('প্রোডাক্ট লিংক');
    const variationLine =
      product.variationCount > 0
        ? `ভ্যারিয়েশন: ${product.variationCount}টি অপশন উপলব্ধ`
        : 'ভ্যারিয়েশন: একটি কনফিগারেশন';

    const summary = [
      product.name,
      description,
      features ? `মূল ফিচার: ${features}` : null,
      `মূল্য: ${product.price}`,
      variationLine,
      `স্টক: ${product.stock}`,
      link,
    ]
      .filter(Boolean)
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(summary);
      toast.success(`Copied full summary for ${product.name}`);
    } catch (error) {
      toast.error('Clipboard permission blocked. Please copy from details.');
    }
  };

  return (
    <div className="min-h-screen bg-surface text-secondary">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#3bbba514,transparent_55%),radial-gradient(ellipse_at_bottom,#0a7d8914,transparent_60%)]" />
      <Toaster
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#0a7d89',
            color: '#ffffff',
          },
        }}
      />

      <header className="sticky top-0 z-40 border-b border-primary/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 md:gap-4 md:py-4">
          {/* Mobile: icon-only search that expands to fill the row, YouTube-style */}
          {mobileSearchOpen ? (
            <div className="flex w-full items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={closeMobileSearch}
                aria-label="Close search"
                className="shrink-0 rounded-lg p-2 text-secondary transition hover:bg-primary/10"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/45" size={18} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search products, pricing, or script text..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full rounded-xl border border-primary/20 bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
                />
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center gap-2 md:hidden">
              <img
                src="/logo_colourful.png"
                alt="Torongoo"
                className="h-7 w-auto shrink-0 object-contain"
              />
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(true)}
                  aria-label="Open search"
                  className="rounded-lg border border-primary/20 p-2 text-secondary transition hover:bg-primary/10"
                >
                  <Search size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleCopyOrderInstructions}
                  aria-label="Order instructions"
                  className="rounded-lg border border-primary/20 p-2 text-secondary transition hover:bg-primary/10"
                >
                  <ClipboardList size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'))}
                  className="rounded-lg border border-primary/20 p-2 text-secondary transition hover:bg-primary/10"
                  aria-label={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
                >
                  {viewMode === 'grid' ? <LayoutList size={18} /> : <Grid3X3 size={18} />}
                </button>
              </div>
            </div>
          )}

          {/* Desktop: logo + inline search + actions, always visible */}
          <img
            src="/logo_colourful.png"
            alt="Torongoo"
            className="hidden h-11 w-auto shrink-0 object-contain md:block"
          />

          <div className="relative hidden min-w-0 flex-1 md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/45" size={20} />
            <input
              type="text"
              placeholder="Search products, pricing, or script text..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-xl border border-primary/20 bg-white py-2.5 pl-12 pr-4 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
            />
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <button
              type="button"
              onClick={handleCopyOrderInstructions}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/20 px-3 py-2 text-sm font-medium text-secondary transition hover:bg-primary/10"
              aria-label="Order instructions"
            >
              <ClipboardList size={16} />
              <span>Order instructions</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'))}
              className="rounded-lg border border-primary/20 p-2 text-secondary transition hover:bg-primary/10"
              aria-label={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
            >
              {viewMode === 'grid' ? <LayoutList size={18} /> : <Grid3X3 size={18} />}
            </button>
          </div>
        </div>
      </header>

      <SearchBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onClear={clearFilters}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <p className="mb-4 text-sm text-secondary/70 md:text-base">
          Showing <span className="font-semibold text-primary">{filteredProducts.length}</span> of {products.length} products
        </p>

        {filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6' : 'space-y-4'}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                onClick={setSelectedProduct}
                onQuickCopy={handleQuickCopy}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-primary/25 bg-white/85 py-16 text-center backdrop-blur">
            <div className="mb-4 text-5xl">🔎</div>
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="mt-1 text-secondary/65">Try another keyword or clear filters.</p>
          </div>
        )}
      </main>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default App;

