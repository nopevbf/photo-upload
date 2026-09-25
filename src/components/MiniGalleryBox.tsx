import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Eye, Plus } from 'lucide-react';
import { PhotoItem } from '../types/property';

interface MiniGalleryBoxProps {
  photos: PhotoItem[]; // All photos in this category
  activePhotoIndex: number;
  maxPhotos: number;
  onPrevPhoto: () => void;
  onNextPhoto: () => void;
  onSelectPhoto: (index: number) => void;
  onDeletePhoto: (photoId: string) => void;
  onViewPhoto: (photo: PhotoItem) => void;
  onAddMoreClick: () => void;
}

export const MiniGalleryBox: React.FC<MiniGalleryBoxProps> = ({
  photos,
  activePhotoIndex,
  maxPhotos,
  onPrevPhoto,
  onNextPhoto,
  onSelectPhoto,
  onDeletePhoto,
  onViewPhoto,
  onAddMoreClick,
}) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  // Photos that are not currently active (the "sisanya")
  // We keep their original indexes in `photos` so clicking them sets the correct active index
  const remainingWithIndex = photos
    .map((photo, index) => ({ photo, originalIndex: index }))
    .filter((item) => item.originalIndex !== activePhotoIndex);

  const canAddMore = photos.length < maxPhotos;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-3 right-3 z-20 max-w-[calc(100%-24px)] transition-all duration-200"
    >
      <div className="bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-2 text-white">
        {/* Header bar of mini box */}
        <div className="flex items-center justify-between gap-3 px-1 mb-1 text-[11px] font-medium text-slate-300 border-b border-white/10 pb-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-bold text-white tracking-tight">
              Galeri Mini
            </span>
            <span className="text-slate-400 text-[10px]">
              ({activePhotoIndex + 1}/{photos.length})
            </span>
          </div>

          {/* Navigation chevrons: Click to switch photo in main box, loops when reaching end */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrevPhoto();
              }}
              title="Ganti ke foto sebelumnya (looping)"
              aria-label="Foto sebelumnya"
              className="p-1 rounded hover:bg-white/20 text-white transition-colors cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNextPhoto();
              }}
              title="Ganti ke foto berikutnya (looping)"
              aria-label="Foto berikutnya"
              className="p-1 rounded hover:bg-white/20 text-white transition-colors cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Carousel / Swipeable Thumbnails Row */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 select-none"
          style={{ maxWidth: '260px' }}
        >
          {remainingWithIndex.map(({ photo, originalIndex }) => {
            const isHovered = activeHoverId === photo.id;
            return (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(originalIndex)}
                onMouseEnter={() => setActiveHoverId(photo.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                title="Klik untuk tampilkan sebagai foto utama"
                className="relative group shrink-0 w-13 h-13 rounded-lg overflow-hidden border border-white/20 bg-slate-800 transition-all duration-150 hover:scale-105 hover:border-amber-400 shadow-md cursor-pointer"
              >
                {/* Thumbnail image */}
                <img
                  src={photo.url}
                  alt={photo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* Hover overlay with smaller eye and trash buttons */}
                <div
                  className={`absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center gap-1 transition-opacity duration-150 ${
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <button
                    type="button"
                    title="Lihat Foto"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewPhoto(photo);
                    }}
                    className="p-1 rounded bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  >
                    <Eye className="w-2.5 h-2.5" />
                  </button>

                  <button
                    type="button"
                    title="Hapus Foto"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePhoto(photo.id);
                    }}
                    className="p-1 rounded bg-rose-500/90 hover:bg-rose-500 text-white transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Quick add more slot if under 4 photos */}
          {canAddMore && (
            <button
              type="button"
              onClick={onAddMoreClick}
              title={`Tambah foto (${photos.length}/${maxPhotos})`}
              className="shrink-0 w-13 h-13 rounded-lg border border-dashed border-white/30 hover:border-amber-400 hover:bg-white/10 flex flex-col items-center justify-center gap-0.5 text-white/80 hover:text-white transition-all duration-150 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[9px] font-medium leading-tight">Tambah</span>
            </button>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-end mt-1 px-1 text-[10px] text-slate-400 pt-1 border-t border-white/10">
          <button
            type="button"
            onClick={onAddMoreClick}
            disabled={!canAddMore}
            className={`font-semibold transition-colors ${
              canAddMore ? 'text-amber-400 hover:text-amber-300 hover:underline cursor-pointer' : 'text-slate-500 cursor-default'
            }`}
          >
            {canAddMore ? `Tambah (${photos.length}/${maxPhotos})` : 'Maksimal 4/4'}
          </button>
        </div>
      </div>
    </div>
  );
};
