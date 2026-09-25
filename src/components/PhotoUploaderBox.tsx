import React, { useRef, useState, useEffect } from 'react';
import { Upload, Eye, Trash2, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { PhotoCategory, PhotoItem } from '../types/property';
import { MiniGalleryBox } from './MiniGalleryBox';

interface PhotoUploaderBoxProps {
  category: PhotoCategory;
  onAddPhotos: (categoryId: string, files: File[]) => void;
  onDeletePhoto: (categoryId: string, photoId: string) => void;
  onViewPhoto: (photo: PhotoItem, categoryLabel: string) => void;
  errorMessage?: string;
  isAttemptedSubmit?: boolean;
}

export const PhotoUploaderBox: React.FC<PhotoUploaderBoxProps> = ({
  category,
  onAddPhotos,
  onDeletePhoto,
  onViewPhoto,
  errorMessage,
  isAttemptedSubmit = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Ensure activePhotoIndex is always in range when photos array changes
  useEffect(() => {
    if (category.photos.length === 0) {
      setActivePhotoIndex(0);
    } else if (activePhotoIndex >= category.photos.length) {
      setActivePhotoIndex(category.photos.length - 1);
    }
  }, [category.photos.length, activePhotoIndex]);

  const safeActiveIndex = category.photos.length > 0
    ? Math.min(activePhotoIndex, category.photos.length - 1)
    : 0;

  const activePhoto = category.photos[safeActiveIndex];
  const canAddMore = category.photos.length < category.maxPhotos;
  const isFulfilled = category.photos.length >= 1;
  const hasError = !!errorMessage || (isAttemptedSubmit && !isFulfilled);

  // Next photo with cyclic loopback to 1st photo when reaching end
  const handleNextPhoto = () => {
    if (category.photos.length <= 1) return;
    setActivePhotoIndex((prev) => (prev + 1) % category.photos.length);
  };

  // Prev photo with cyclic loopback to last photo when at beginning
  const handlePrevPhoto = () => {
    if (category.photos.length <= 1) return;
    setActivePhotoIndex((prev) => (prev - 1 + category.photos.length) % category.photos.length);
  };

  const handleSelectPhoto = (index: number) => {
    if (index >= 0 && index < category.photos.length) {
      setActivePhotoIndex(index);
    }
  };

  const handleDeleteActiveOrSubPhoto = (photoId: string) => {
    onDeletePhoto(category.id, photoId);
    setActivePhotoIndex(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onAddPhotos(category.id, selectedFiles);
      e.target.value = ''; // reset
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      onAddPhotos(category.id, droppedFiles);
    }
  };

  const openFilePicker = () => {
    if (!canAddMore) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Category Label Header matching screenshot */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <span>{category.label}</span>
          {category.required && <span className="text-rose-500 font-bold">*</span>}
        </label>

        {/* Counter & Status indicator */}
        <div className="flex items-center gap-2 text-xs">
          {isFulfilled ? (
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              <span>Terpenuhi ({category.photos.length}/{category.maxPhotos})</span>
            </span>
          ) : (
            <span
              className={`font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                hasError
                  ? 'bg-rose-50 text-rose-700 border border-rose-300 animate-pulse'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              <AlertCircle className="w-3 h-3" />
              <span>Wajib min. 1 foto</span>
            </span>
          )}
        </div>
      </div>

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Upload Box / Highlight Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={activePhoto ? undefined : openFilePicker}
        className={`relative w-full h-64 sm:h-72 rounded-2xl transition-all duration-200 overflow-hidden select-none ${
          activePhoto
            ? 'bg-slate-900 border border-slate-200 shadow-sm'
            : isDragOver
            ? 'border-2 border-dashed border-sky-500 bg-sky-50/50 cursor-pointer shadow-md'
            : hasError
            ? 'border-2 border-dashed border-rose-300 bg-rose-50/20 hover:border-rose-400 cursor-pointer'
            : 'border-2 border-dashed border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50/50 cursor-pointer'
        }`}
      >
        {activePhoto ? (
          /* State 1: Has photos - Foto aktif di-highlight penuh */
          <div className="relative w-full h-full group">
            {/* Active highlighted image */}
            <img
              src={activePhoto.url}
              alt={activePhoto.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            />

            {/* Subtle top gradient scrim for controls visibility */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

            {/* Top-Right Quick Actions */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewPhoto(activePhoto, category.label);
                }}
                title="Perbesar foto utama"
                className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-105 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteActiveOrSubPhoto(activePhoto.id);
                }}
                title="Hapus foto ini"
                className="p-1.5 rounded-lg bg-black/60 hover:bg-rose-600 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-105 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom-Right: Foto lainnya dalam mini-box galeri swipe */}
            {category.photos.length > 1 ? (
              <MiniGalleryBox
                photos={category.photos}
                activePhotoIndex={safeActiveIndex}
                maxPhotos={category.maxPhotos}
                onPrevPhoto={handlePrevPhoto}
                onNextPhoto={handleNextPhoto}
                onSelectPhoto={handleSelectPhoto}
                onDeletePhoto={handleDeleteActiveOrSubPhoto}
                onViewPhoto={(photo) => onViewPhoto(photo, category.label)}
                onAddMoreClick={openFilePicker}
              />
            ) : canAddMore ? (
              /* When only 1 photo exists, offer clean "Tambah Foto Galeri (1/4)" */
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openFilePicker();
                }}
                title="Tambahkan foto ke-2 sampai ke-4 ke mini-box galeri"
                className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md border border-white/25 text-white px-3 py-2 rounded-xl text-xs font-semibold shadow-xl transition-all hover:scale-[1.03] cursor-pointer"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Tambah Foto Galeri ({category.photos.length}/{category.maxPhotos})</span>
              </button>
            ) : null}
          </div>
        ) : (
          /* State 2: Empty slot */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-110 ${
              hasError ? 'bg-rose-100 text-rose-500' : 'bg-slate-100 text-slate-400'
            }`}>
              <Upload className="w-6 h-6 stroke-[1.75]" />
            </div>
            <p className="text-sm font-semibold text-slate-600">Klik untuk unggah</p>
            <p className="text-xs text-slate-400 mt-0.5">atau seret foto ke sini</p>
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <span>Wajib min. 1 foto (Maks. 4)</span>
            </div>
          </div>
        )}

        {/* Drag over active overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-sky-600/20 backdrop-blur-xs border-2 border-sky-500 rounded-2xl flex flex-col items-center justify-center z-30 pointer-events-none text-sky-800">
            <Upload className="w-10 h-10 animate-bounce" />
            <p className="text-sm font-semibold mt-2">Lepas foto untuk menambahkan</p>
          </div>
        )}
      </div>

      {/* Error Message if empty on submit or invalid file */}
      {(errorMessage || (isAttemptedSubmit && !isFulfilled)) && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage || `Kategori "${category.label}" wajib diisi minimal 1 foto.`}</span>
        </div>
      )}
    </div>
  );
};
