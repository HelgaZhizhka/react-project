// import { useAppDispatch } from '@/hooks';
// import { uploadImage } from '@/store/features/formDataSlice';
import React, { useState } from 'react';

interface ImageUploadProps {
  acceptedFormats: string[];
  maxFileSize: number;
  onImageUploaded: (base64Image: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ acceptedFormats, maxFileSize }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // const dispatch = useAppDispatch();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size <= maxFileSize && acceptedFormats.some((format) => file.name.endsWith(format))) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target?.result as string;

        // dispatch(uploadImage(base64Image));

        setSelectedImage(base64Image);
      };

      reader.readAsDataURL(file);
    } else {
      console.error('Invalid file');
    }
  };

  return (
    <div>
      <input type="file" accept={acceptedFormats.join(', ')} onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Uploaded" />}
    </div>
  );
};

export default ImageUpload;
