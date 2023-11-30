import { useAppDispatch } from '@/hooks';
import { uploadImage } from '@/store/features/formDataSlice';
import React, { useState } from 'react';

interface ImageUploadProps {
  acceptedFormats: string[]; // Массив разрешенных форматов (например, ['.png', '.jpeg', '.jpg'])
  maxFileSize: number; // Максимальный размер файла в байтах
  onImageUploaded: (base64Image: string) => void; // Callback-функция при успешной загрузке изображения
}

const ImageUpload: React.FC<ImageUploadProps> = ({ acceptedFormats, maxFileSize }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Проверка на размер и расширение файла
    if (file.size <= maxFileSize && acceptedFormats.some((format) => file.name.endsWith(format))) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target?.result as string;

        // Сохранение base64-изображения в сторе Redux
        dispatch(uploadImage(base64Image));

        // Установка выбранного изображения для отображения
        setSelectedImage(base64Image);
      };

      reader.readAsDataURL(file);
    } else {
      // Файл не соответствует критериям, выполните необходимые действия для обработки ошибки
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
