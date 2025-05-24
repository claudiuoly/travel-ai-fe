import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface PhotoUploadProps {
    photos: string[];
    onChange: (photos: string[]) => void;
}

export const PhotoUpload = ({ photos, onChange }: PhotoUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const { t } = useTranslation();

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        onChange([...photos, e.target.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const removePhoto = (index: number) => {
        const newPhotos = photos.filter((_, i) => i !== index);
        onChange(newPhotos);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };

    return (
        <div className="space-y-4">
            {/* Photo Grid */}
            {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={photo}
                                alt={`Fotografie ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border"
                            />
                            <button
                                onClick={() => removePhoto(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
            >
                <Camera className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg text-gray-600 mb-4">
                    {t('profile.photoUpload.dragText')}
                </p>

                <div className="flex justify-center space-x-4">
                    <Button variant="outline" className="relative">
                        <Upload className="w-4 h-4 mr-2" />
                        {t('profile.photoUpload.chooseFiles')}
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileSelect(e.target.files)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </Button>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                    {t('profile.photoUpload.supportedFormats')}
                </p>
            </div>
        </div>
    );
};