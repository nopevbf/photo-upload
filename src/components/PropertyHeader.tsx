import React from 'react';
import { Sparkles, Trash2, Eye } from 'lucide-react';

interface PropertyHeaderProps {
  onLoadSamples: () => void;
  onClearAll: () => void;
  onOpenPreview: () => void;
  totalPhotosCount: number;
  allRequiredFulfilled: boolean;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  onLoadSamples,
  onClearAll,
  onOpenPreview,
  totalPhotosCount,
  allRequiredFulfilled,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <a href="/" className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
            PropertiHub Studio
          </a>
        </div>

        {/* Zone 2: Navigation / Info */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <span className="text-slate-400">Tahap 2 dari 3: Kelengkapan Media</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">Maksimal 4 foto per kategori</span>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onLoadSamples}
            title="Muat data contoh foto properti arsitektur lengkap untuk uji coba sistem"
            className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Muat Foto Contoh</span>
            <span className="sm:hidden">Contoh</span>
          </button>

          {totalPhotosCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              title="Hapus semua foto yang telah diunggah"
              className="px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={onOpenPreview}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              allRequiredFulfilled
                ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Pratinjau Listing</span>
          </button>
        </div>
      </div>
    </header>
  );
};
