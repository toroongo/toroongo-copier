import React from 'react';
import { Copy, Layers, Tag } from 'lucide-react';

const categoryStyles = {
  Decor: 'bg-accent-soft text-primary',
  Gadget: 'bg-accent-soft text-primary',
  Lighting: 'bg-accent-soft text-primary',
  Toys: 'bg-accent-soft text-primary',
  Crafts: 'bg-accent-soft text-primary',
};

const ProductCard = ({ product, viewMode, onClick, onQuickCopy }) => {
  const handleQuickCopyClick = (event) => {
    event.stopPropagation();
    onQuickCopy(product);
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onClick(product)}
      onKeyDown={(event) => event.key === 'Enter' && onClick(product)}
      className="flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white/85 p-3 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow backdrop-blur md:p-4"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-base font-semibold md:text-lg">{product.name}</h3>
        {viewMode !== 'list' && (
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyles[product.category] || 'bg-surface text-secondary'}`}>
            {product.category}
          </span>
        )}
      </div>

      <div className="mb-3 space-y-1.5 text-xs md:text-sm text-secondary/75">
        <div className="flex items-center gap-1 font-semibold text-primary">
          <Tag size={14} className="shrink-0" />
          <span>{product.price}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1">
            <Layers size={14} />
            {product.variationCount > 0 ? `${product.variationCount} variants` : 'Single variant'}
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
            {product.stock}
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <p className="text-xs text-secondary/60 md:text-sm">{product.scripts.length} scripts</p>
        <button
          type="button"
          onClick={handleQuickCopyClick}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary/90 md:text-sm"
        >
          <Copy size={14} />
          Quick copy
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
