import React, { useState } from 'react';
import { X, CheckCircle, MapPin, Building, Layers } from 'lucide-react';
import { PhotoCategory } from '../types/property';

interface ListingPreviewModalProps {
  categories: PhotoCategory[];
  isOpen: boolean;
  onClose: () => void;
}

export const ListingPreviewModal: React.FC<ListingPreviewModalProps> = ({
  categories,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  if (!isOpen) return null;

  const coverCategory = categories.find((c) => c.id === 'cover');
  const mainCover = coverCategory?.photos[0];
  const allPhotos = categories.flatMap((c) =>
    c.photos.map((p, idx) => ({ ...p, categoryLabel: c.label, isPrimary: idx === 0 }))
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pratinjau Listing Properti
              </h3>
              <p className="text-xs text-slate-500">
                Total {allPhotos.length} foto siap dipublikasikan ke marketplace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Hero Card Preview */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden relative shadow-lg aspect-16/9 sm:aspect-21/9 max-h-[340px]">
            {mainCover ? (
              <img
                src={mainCover.url}
                alt="Foto Utama"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                Belum ada foto utama cover
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded">
                  DIJUAL
                </span>
                <span className="text-xs text-slate-300">Modern Minimalist Cluster</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold">Villa Botanica Residence</h2>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> BSD City, Tangerang Selatan
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> LT 180m² / LB 220m²
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown per Category */}
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Susunan Foto per Kategori ({allPhotos.length} Foto)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => {
                const primary = cat.photos[0];
                const subs = cat.photos.slice(1);
                return (
                  <div
                    key={cat.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800">{cat.label}</span>
                      <span className="text-[11px] font-medium text-slate-500">
                        {cat.photos.length}/4 Foto
                      </span>
                    </div>

                    {primary ? (
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-300">
                          <img
                            src={primary.url}
                            alt={primary.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-amber-300 text-center font-bold py-0.5">
                            Highlight
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {primary.name}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            +{subs.length} foto dalam galeri mini swipe
                          </p>
                          <div className="flex gap-1 mt-1.5 overflow-hidden">
                            {subs.map((s, idx) => (
                              <div
                                key={s.id}
                                className="w-6 h-6 rounded border border-slate-300 overflow-hidden shrink-0"
                              >
                                <img
                                  src={s.url}
                                  alt={s.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-rose-500 italic py-3 text-center">
                        Kategori ini belum memiliki foto
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Semua foto telah divalidasi sesuai syarat resolusi & format.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Kembali Edit
            </button>
            <button
              type="button"
              onClick={() => {
                alert('Properti dan galeri foto berhasil disimpan!');
                onClose();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
            >
              Konfirmasi & Publikasikan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
