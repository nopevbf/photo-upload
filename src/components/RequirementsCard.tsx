import React from 'react';
import { CheckCircle2, AlertCircle, Info, ShieldCheck } from 'lucide-react';

interface RequirementsCardProps {
  categoriesStatus: {
    totalRequired: number;
    completedRequired: number;
    allValid: boolean;
  };
}

export const RequirementsCard: React.FC<RequirementsCardProps> = ({ categoriesStatus }) => {
  return (
    <div className="pt-6 border-t border-slate-200 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-slate-700" />
          <span>Syarat Upload</span>
        </h3>

        {/* Minimalist completion tracker */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Status Kelengkapan:</span>
          <span
            className={`font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
              categoriesStatus.allValid
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {categoriesStatus.allValid ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Semua 4 Kategori Terisi (Min. 1 Foto Terpenuhi)</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{categoriesStatus.completedRequired} dari {categoriesStatus.totalRequired} Kategori Terisi (Wajib Min. 1 Foto)</span>
              </>
            )}
          </span>
        </div>
      </div>

      <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside">
        <li>
          <span className="font-medium">Format:</span> JPG atau PNG (atau WebP resolusi tinggi).
        </li>
        <li>
          <span className="font-medium">Resolusi:</span> Minimum 400 × 400 px.
        </li>
        <li>
          <span className="font-semibold text-slate-900">Per kategori wajib minimal terisi 1 foto:</span> Keempat kategori foto bertanda bintang (*) wajib memiliki sekurang-kurangnya 1 foto agar listing dapat dipublikasikan.
        </li>
        <li>
          <span className="font-semibold text-slate-900">Maksimal 4 foto per kategori:</span> Foto pertama otomatis di-highlight sebagai tampilan utama, foto ke-2 sampai ke-4 tersusun rapi di mini-box kanan bawah dengan sistem swipe/galeri agar antarmuka tetap bersih dan minimalis.
        </li>
      </ul>

      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-slate-800">Tips Tata Letak Foto:</span> Foto pertama yang diunggah akan otomatis menjadi tampilan highlight utama. Foto ke-2 sampai ke-4 dapat dilihat atau dihapus melalui mini-box di pojok kanan bawah.
        </p>
      </div>
    </div>
  );
};
