export interface PhotoItem {
  id: string;
  url: string;
  name: string;
  size: number;
  width?: number;
  height?: number;
  uploadedAt: string;
  caption?: string;
}

export interface PhotoCategory {
  id: string;
  label: string;
  required: boolean;
  maxPhotos: number;
  description?: string;
  photos: PhotoItem[];
}

export interface UploadError {
  categoryId: string;
  message: string;
}
