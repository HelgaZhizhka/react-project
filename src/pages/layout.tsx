import { Photo } from '@/utils/interfaces';
import { Gallery } from '@/components/Gallery';

interface Props {
  galleryData: Photo[];
  children?: React.ReactNode;
}

const LayoutPage: React.FC<Props> = ({ children, galleryData }) => (
  <>
    <Gallery galleryData={galleryData} />
    {children}
  </>
);

export default LayoutPage;
