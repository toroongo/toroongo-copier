import React, { useState } from 'react';
import { Check, Copy, Tag, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetailModal = ({ product, onClose }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success('Copied to clipboard', {
        duration: 1800,
        position: 'bottom-center',
      });

      setTimeout(() => {
        setCopiedId(null);
      }, 1400);
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  const handleCopyAll = async () => {
    const bundle = product.scripts
      .map((script) => `${script.question}\n${script.answer}`)
      .join('\n\n---\n\n');

    handleCopy(bundle, 'all');
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      <button type="button" className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} aria-label="Close modal" />

      <div className="relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white/95 shadow-2xl animate-fade-in md:mx-4 md:max-w-4xl md:rounded-3xl backdrop-blur">
        <header className="bg-gradient-to-r from-primary to-accent-warm p-5 text-white md:p-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-white/15"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <div className="pr-12">
            <h2 className="mb-2 text-xl font-bold md:text-2xl">{product.name}</h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/90 md:text-base">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Tag size={16} />
                {product.price}
              </span>
              <span className="rounded-full bg-white/15 px-2 py-1 text-xs md:text-sm">{product.category}</span>
              <span className="rounded-full bg-white/15 px-2 py-1 text-xs md:text-sm">{product.stock}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {product.image && (
            <div className="mb-5 overflow-hidden rounded-2xl border border-primary/15 bg-surface">
              <img src={product.image} alt={product.name} className="h-52 w-full object-cover md:h-64" />
            </div>
          )}

          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">Support scripts</h3>
            <button
              type="button"
              onClick={handleCopyAll}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/20 px-3 py-2 text-sm font-medium text-secondary transition hover:bg-primary/10"
            >
              <Copy size={15} />
              Copy all
            </button>
          </div>

          <div className="space-y-4">
            {product.scripts.map((script, index) => {
              const scriptId = `${product.id}-${index}`;
              const isCopied = copiedId === scriptId;

              return (
                <section key={scriptId} className="rounded-xl border border-primary/10 bg-white/75 p-4 md:p-5 shadow-soft">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h4 className="text-sm font-semibold text-secondary md:text-base">{script.question}</h4>
                    <button
                      type="button"
                      onClick={() => handleCopy(script.answer, scriptId)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                        isCopied ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                    >
                      {isCopied ? <Check size={16} /> : <Copy size={16} />}
                      {isCopied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-secondary/85 md:text-base">{script.answer}</p>
                </section>
              );
            })}
          </div>
        </div>

        <footer className="border-t border-primary/10 p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-secondary px-4 py-3 font-semibold text-white transition hover:bg-secondary/90"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ProductDetailModal;

