import React, { useMemo, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Grid3X3, LayoutList } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import { products } from './data/products';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleQuickCopy = async (product) => {
    if (!product.scripts?.length) return;

    try {
      await navigator.clipboard.writeText(product.scripts[0].answer);
      toast.success(`Copied quick reply for ${product.name}`);
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
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-4 md:py-5">
          <img
            src="/logo_colourful.png"
            alt="Torongoo"
            className="h-11 w-auto max-w-[220px] object-contain md:h-14 md:max-w-[300px]"
          />
        </div>
      </header>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onClear={clearFilters}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/15 bg-white/90 p-4 shadow-soft backdrop-blur">
          <p className="text-sm text-secondary/80 md:text-base">
            Showing <span className="font-semibold text-primary">{filteredProducts.length}</span> of {products.length} products
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`rounded-lg p-2 transition ${
                viewMode === 'grid' ? 'bg-primary text-white' : 'bg-surface text-secondary hover:bg-primary/10'
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`rounded-lg p-2 transition ${
                viewMode === 'list' ? 'bg-primary text-white' : 'bg-surface text-secondary hover:bg-primary/10'
              }`}
              aria-label="List view"
            >
              <LayoutList size={18} />
            </button>
          </div>
        </div>

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

