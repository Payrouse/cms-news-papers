import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import GalleryPhotos from '../../../gallery/GalleryPhoto';

import Input from '../../../inputs/Input';
import MultilineInput from '../../../inputs/MultilineInput';
import SelectInput from '../../../inputs/SelectInput';
import Toolbar from '../../../toolbar/AdminToolbar';

type ArticleValues = {
  title: string;
  subtitle: string;
  keywords: string;
  picture: string;
  body: string;

  status: string;
  category_id: string;
};

const EditArticle = ({ titleToolbar }: any) => {
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
          <Link href="/admin/editor">
            <a className="bg-gray-500 hover:bg-gray-700 text-white rounded shadow text-center font-bold px-4 py-2">
              Volver
            </a>
          </Link>
        </div>
        <div className="mt-4 rounded shadow bg-white px-4 py-4 mb-4">
          <h2 className="text-lg font-bold">Corrección del articulo:</h2>
          <form onSubmit={handleSubmit(handleArticle)}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              dolore consequuntur minus quos corrupti quo, magnam accusantium
              vero tempore doloremque aliquid minima iste, ipsa laudantium! Ipsa
              facilis ullam voluptas enim.
            </p>
            <Input
              name="title"
              label="Titular"
              placeholder="Soy el titular"
              register={register}
              validations={{}}
              required={true}
              error={errors.title}
            />
            <Input
              name="subtitle"
              label="Subtitulo"
              placeholder="Soy el subtitulo"
              register={register}
              validations={{}}
              required={true}
              error={errors.subtitle}
            />
            <SelectInput
              name="category_id"
              label="Categoría"
              register={register}
              items={CATEGORIES}
              keyValue="category_id"
              keyName="name"
              validations={{}}
              required={true}
              error={errors.category_id}
            />
            <Input
              name="keywords"
              label="Palabras claves"
              placeholder="Soy las palabras claves"
              register={register}
              validations={{}}
              required={true}
              error={errors.keywords}
            />
            <GalleryPhotos
              name="picture"
              defaultImg=""
              register={register}
              validations={{}}
              setValue={setValue}
              required={true}
              error={errors.picture}
            />
            <MultilineInput
              name="body"
              label="Cuerpo"
              placeholder="Soy el cuerpo"
              register={register}
              validations={{}}
              required={true}
              error={errors.body}
            />

            <div className="flex justify-between mx-4 mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white rounded shadow text-center font-medium px-4 py-2"
                type="button"
              >
                Eliminar
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

const CATEGORIES = [
  {
    category_id: '1',
    name: 'Deporte',
  },
  {
    category_id: '2',
    name: 'Política',
  },
  {
    category_id: '3',
    name: 'Comida',
  },
];

export default EditArticle;
