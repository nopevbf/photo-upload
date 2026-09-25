import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { PhotoItem } from '../types/property';

interface LightboxModalProps {
  photo: PhotoItem | null;
  categoryLabel?: string;
  isPrimary?: boolean;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  categoryLabel,
  isPrimary = false,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-3">
            {categoryLabel && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-white/10 text-white">
                {categoryLabel}
              </span>
            )}
            <h4 className="text-sm font-semibold text-white truncate max-w-sm sm:max-w-md">
              {photo.name}
            </h4>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={onClose}
              title="Tutup (Esc)"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main image viewer */}
        <div className="relative flex-1 min-h-[350px] sm:min-h-[500px] flex items-center justify-center p-4 bg-black/60">
          <img
            src={photo.url}
            alt={photo.name}
            referrerPolicy="no-referrer"
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg"
          />
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 border-t border-white/10 bg-slate-950/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
          <div>
            {photo.caption ? (
              <p className="text-slate-200 font-medium">{photo.caption}</p>
            ) : (
              <p className="text-slate-400 italic">Tidak ada keterangan tambahan</p>
            )}
          </div>

          <div className="flex items-center gap-4 text-slate-400 shrink-0">
            {photo.width && photo.height && (
              <span>Resolusi: {photo.width} × {photo.height} px</span>
            )}
            <span>Ukuran: {(photo.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
