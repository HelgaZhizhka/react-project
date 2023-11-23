import { Photo } from '@/utils/interfaces';
import { Gallery } from '@/components/Gallery';

interface Props {
  galleryData: Photo[];
  totalResults?: number;
  children?: React.ReactNode;
}

const LayoutPage: React.FC<Props> = ({ children, galleryData, totalResults }) => (
  <>
    <Gallery galleryData={galleryData} totalResults={totalResults} />
    {children}
  </>
);

export default LayoutPage;
