import { useAppSelector } from '@/hooks';
import { Gallery } from '@/components/Gallery';

const Home: React.FC = () => {
  const formData = useAppSelector((state) => state.formData.values);

  return (
    <div className="container page">
      {!(formData.length > 0) && (
        <h4 className="text-center">
          You must go to the form page and fill in the fields correctly. <br />
          Then you will see the result
        </h4>
      )}
      <Gallery data={formData} />
    </div>
  );
};

export default Home;
