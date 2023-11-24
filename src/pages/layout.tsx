import { Gallery } from '@/components/Gallery';
import { Photo } from '@/utils/interfaces';

interface Props {
  children?: React.ReactNode;
  photos: Photo[];
  totalResults: number;
}

const LayoutPage: React.FC<Props> = ({ children, photos, totalResults }) => {
  return (
    <>
      <Gallery photos={photos} totalResults={totalResults} />
      {children}
    </>
  );
};

export default LayoutPage;
