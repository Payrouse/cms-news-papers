import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import News from '../../../article/News';
import GalleryPhotos from '../../../gallery/GalleryPhoto';

import Input from '../../../inputs/Input';
import MultilineInput from '../../../inputs/MultilineInput';
import SelectInput from '../../../inputs/SelectInput';
import Toolbar from '../../../toolbar/AdminToolbar';

type ArticleValues = {
  feedback: string;
  status: string;
};

const ReviewArticle = ({ titleToolbar }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ArticleValues>();

  const handleArticle: SubmitHandler<ArticleValues> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Toolbar title={titleToolbar} />
      <div className="container-views custom-scroll">
        <div className="flex mt-6">
          <Link href="/admin/publish">
            <a className="bg-gray-500 hover:bg-gray-700 text-white rounded shadow text-center font-bold px-4 py-2">
              Volver
            </a>
          </Link>
        </div>
        <div className="mt-4 rounded shadow bg-white px-4 py-4 mb-4">
          <h2 className="text-lg font-bold">Revisión del articulo:</h2>
          <div className="mx-4">
            <News />
          </div>
          <form onSubmit={handleSubmit(handleArticle)}>
            <MultilineInput
              name="feedback"
              label="Retroalimentación"
              placeholder="Soy el feedback"
              register={register}
              validations={{}}
              required={true}
              error={errors.feedback}
            />
            <div className="flex justify-between mx-4 mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white rounded shadow text-center font-medium px-4 py-2"
                type="button"
              >
                Rechazar
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded shadow text-center font-medium px-4 py-2"
                type="button"
              >
                Destacar
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white rounded shadow text-center font-medium px-4 py-2"
                type="submit"
              >
                Enviar a revisión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewArticle;
