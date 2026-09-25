import React, { useState, useEffect } from 'react';
import { PhotoCategory, PhotoItem } from './types/property';
import { INITIAL_CATEGORIES, getSampleCategories } from './data/samplePhotos';
import { PhotoUploaderBox } from './components/PhotoUploaderBox';
import { RequirementsCard } from './components/RequirementsCard';
import { LightboxModal } from './components/LightboxModal';
import { ListingPreviewModal } from './components/ListingPreviewModal';
import { PropertyHeader } from './components/PropertyHeader';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

export default function App() {
  const [categories, setCategories] = useState<PhotoCategory[]>(INITIAL_CATEGORIES);

  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [isAttemptedSubmit, setIsAttemptedSubmit] = useState(false);
  const [selectedLightboxPhoto, setSelectedLightboxPhoto] = useState<{
    photo: PhotoItem;
    categoryLabel: string;
    categoryId: string;
    isPrimary: boolean;
  } | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Auto-dismiss notifications after 6s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Handle uploading photos with resolution validation (min 400x400 px)
  const handleAddPhotos = (categoryId: string, files: File[]) => {
    const targetCat = categories.find((c) => c.id === categoryId);
    if (!targetCat) return;

    const availableSlots = targetCat.maxPhotos - targetCat.photos.length;
    if (availableSlots <= 0) {
      setErrorMessages((prev) => ({
        ...prev,
        [categoryId]: `Kategori ini sudah mencapai batas maksimal ${targetCat.maxPhotos} foto.`
      }));
      return;
    }

    const filesToProcess = files.slice(0, availableSlots);
    setErrorMessages((prev) => ({ ...prev, [categoryId]: '' }));

    filesToProcess.forEach((file) => {
      // Validate format
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrorMessages((prev) => ({
          ...prev,
          [categoryId]: `File "${file.name}" tidak didukung. Format wajib JPG atau PNG.`
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          // Validate minimum resolution: 400 x 400 px
          if (img.width < 400 || img.height < 400) {
            setErrorMessages((prev) => ({
              ...prev,
              [categoryId]: `Foto "${file.name}" berukuran ${img.width}x${img.height}px. Syarat minimum adalah 400x400 px.`
            }));
            return;
          }

          const newPhoto: PhotoItem = {
            id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            url: dataUrl,
            name: file.name,
            size: file.size,
            width: img.width,
            height: img.height,
            uploadedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            caption: 'Foto baru diunggah'
          };

          setCategories((prev) =>
            prev.map((cat) => {
              if (cat.id === categoryId) {
                if (cat.photos.length >= cat.maxPhotos) return cat;
                return {
                  ...cat,
                  photos: [...cat.photos, newPhoto]
                };
              }
              return cat;
            })
          );

          setNotification({
            message: `Foto "${file.name}" ditambahkan ke ${targetCat.label}.`,
            type: 'success'
          });
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  };


  // Delete photo
  const handleDeletePhoto = (categoryId: string, photoId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            photos: cat.photos.filter((p) => p.id !== photoId)
          };
        }
        return cat;
      })
    );

    if (selectedLightboxPhoto && selectedLightboxPhoto.photo.id === photoId) {
      setSelectedLightboxPhoto(null);
    }
  };

  // View photo in lightbox
  const handleViewPhoto = (photo: PhotoItem, categoryLabel: string) => {
    const parentCat = categories.find((c) => c.label === categoryLabel);
    const isPrimary = parentCat ? parentCat.photos[0]?.id === photo.id : false;
    setSelectedLightboxPhoto({
      photo,
      categoryLabel,
      categoryId: parentCat?.id || '',
      isPrimary
    });
  };

  // Load sample demo photos
  const handleLoadSamples = () => {
    setCategories(getSampleCategories());
    setErrorMessages({});
    setIsAttemptedSubmit(false);
    setNotification({
      message: 'Foto contoh arsitektur properti dimuat lengkap dengan foto utama dan galeri swipe.',
      type: 'info'
    });
  };

  // Clear all photos
  const handleClearAll = () => {
    setCategories(INITIAL_CATEGORIES);
    setErrorMessages({});
    setIsAttemptedSubmit(false);
    setNotification({
      message: 'Semua foto dibersihkan. Anda dapat mengunggah foto Anda sendiri (min. 1 foto per kategori).',
      type: 'info'
    });
  };

  const totalPhotosCount = categories.reduce((sum, c) => sum + c.photos.length, 0);
  const requiredCategories = categories.filter((c) => c.required);
  const emptyRequiredCategories = requiredCategories.filter((c) => c.photos.length === 0);
  const completedRequired = requiredCategories.filter((c) => c.photos.length >= 1).length;
  const allRequiredFulfilled = completedRequired === requiredCategories.length;

  // Handle submit validation (ensures every category has min. 1 photo)
  const handleSubmitOrPreview = () => {
    setIsAttemptedSubmit(true);
    if (!allRequiredFulfilled) {
      const missingNames = emptyRequiredCategories.map((c) => c.label).join(', ');
      setNotification({
        message: `Per kategori minimal terisi 1 foto. Masih ada kategori yang belum diisi: ${missingNames}`,
        type: 'error'
      });
      return;
    }
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col">
      {/* Top Bar adhering to Top Bar Contract */}
      <PropertyHeader
        onLoadSamples={handleLoadSamples}
        onClearAll={handleClearAll}
        onOpenPreview={handleSubmitOrPreview}
        totalPhotosCount={totalPhotosCount}
        allRequiredFulfilled={allRequiredFulfilled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Floating Notification Toast */}
        {notification && (
          <div
            className={`mb-4 p-3 rounded-xl text-white text-xs font-medium shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 ${
              notification.type === 'error'
                ? 'bg-rose-950 border border-rose-500/40 text-rose-100'
                : 'bg-slate-900 border border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  notification.type === 'error' ? 'bg-rose-400' : 'bg-amber-400'
                }`}
              ></span>
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-300 hover:text-white text-xs underline cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Primary White Card matching user's screenshot layout */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Section Header matching screenshot */}
          <div className="pb-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Upload Foto Properti
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Foto pertama otomatis di-highlight sebagai tampilan utama. Foto ke-2 sampai ke-4 tersusun di mini-box kanan bawah dengan sistem swipe/galeri.
              </p>
            </div>

            {/* Quick summary badge */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-medium text-slate-500">Total Foto:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                {totalPhotosCount} / 16 Foto
              </span>
            </div>
          </div>

          {/* Minimalist category fulfillment badges (Visual confirmation that min. 1 photo is required) */}
          <div className="py-3 px-4 bg-slate-50 rounded-xl border border-slate-200/80 my-4 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Ketentuan Wajib: Minimal terisi 1 foto per kategori</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((c) => {
                const filled = c.photos.length >= 1;
                return (
                  <span
                    key={c.id}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      filled
                        ? 'bg-emerald-100/70 text-emerald-800 border border-emerald-300/60'
                        : 'bg-amber-100/60 text-amber-800 border border-amber-300/60'
                    }`}
                  >
                    {filled ? (
                      <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    )}
                    <span>{c.label.split(' ')[0]}: {c.photos.length}/4</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* 2x2 Responsive Grid matching screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
            {categories.map((cat) => (
              <PhotoUploaderBox
                key={cat.id}
                category={cat}
                onAddPhotos={handleAddPhotos}
                onDeletePhoto={handleDeletePhoto}
                onViewPhoto={handleViewPhoto}
                errorMessage={errorMessages[cat.id]}
                isAttemptedSubmit={isAttemptedSubmit}
              />
            ))}
          </div>

          {/* Syarat Upload Section matching screenshot */}
          <RequirementsCard
            categoriesStatus={{
              totalRequired: requiredCategories.length,
              completedRequired,
              allValid: allRequiredFulfilled
            }}
          />

          {/* Bottom Action Footer */}
          <div className="mt-8 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs">
              {allRequiredFulfilled ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Semua 4 kategori telah memenuhi syarat (minimal 1 foto terisi).
                </span>
              ) : (
                <span className="text-amber-700 font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Wajib mengisi minimal 1 foto pada tiap kategori bertanda bintang (*).
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleLoadSamples}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Muat Contoh Foto
              </button>

              <button
                type="button"
                onClick={handleSubmitOrPreview}
                className={`px-5 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                  allRequiredFulfilled
                    ? 'bg-slate-900 hover:bg-slate-800 text-white hover:shadow-md'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                <span>{allRequiredFulfilled ? 'Simpan & Pratinjau Listing' : 'Lengkapi 4 Kategori'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <LightboxModal
        photo={selectedLightboxPhoto?.photo || null}
        categoryLabel={selectedLightboxPhoto?.categoryLabel}
        isPrimary={selectedLightboxPhoto?.isPrimary}
        onClose={() => setSelectedLightboxPhoto(null)}
      />

      {/* Listing Preview Modal */}
      <ListingPreviewModal
        categories={categories}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
