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
  const isList = viewMode === 'list';

  const wrapperClass = isList
    ? 'flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white/85 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow md:flex-row backdrop-blur h-full'
    : 'flex flex-col h-full overflow-hidden rounded-2xl border border-primary/10 bg-white/85 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow backdrop-blur';

  return (
    <article className={wrapperClass}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => onClick(product)}
        onKeyDown={(event) => event.key === 'Enter' && onClick(product)}
        className={isList ? 'flex flex-row flex-1 cursor-pointer' : 'flex flex-col flex-1 cursor-pointer'}
      >
        <div className="flex flex-1 flex-col p-3 md:p-4">
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-base font-semibold md:text-lg">{product.name}</h3>
            {viewMode !== 'list' && (
               <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyles[product.category] || 'bg-surface text-secondary'}`}>
                 {product.category}
               </span>
            )}
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs md:text-sm text-secondary/75">
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              <Tag size={14} />
              {product.price}
            </span>
            <span className="inline-flex items-center gap-1">
              <Layers size={14} />
              {product.variationCount > 0 ? `${product.variationCount} variants` : 'Single variant'}
            </span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
              {product.stock}
            </span>
          </div>

          <p className="mt-auto text-xs md:text-sm text-secondary/70">{product.scripts.length} ready-to-copy support scripts</p>
        </div>
      </div>

      <div className={isList ? 'border-t border-primary/10 p-3 md:flex md:w-44 md:items-center md:border-l md:border-t-0' : 'mt-auto border-t border-primary/10 p-3'}>
        <button
          type="button"
          onClick={() => onQuickCopy(product)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          <Copy size={16} />
          Quick copy
        </button>
      </div>
    </article>
  );
};

export default ProductCard;

