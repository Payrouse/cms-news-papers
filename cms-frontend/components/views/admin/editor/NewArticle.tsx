import Link from 'next/link';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { FormControlLabel, Switch } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';

import useAllCategories from '../../../../hooks/data/useAllCategories';
import { FetchApi } from '../../../../library/Http';
import { ArticleValidation } from '../../../../library/Validations';
import { ArticleStatus } from '../../../../models/article.model';
import { ButtonType } from '../../../buttons/Button';
import ButtonWithSpinner from '../../../buttons/ButtonWithSpinner';
import GalleryPhotos from '../../../gallery/GalleryPhoto';
import Input from '../../../inputs/Input';
import SelectInput from '../../../inputs/SelectInput';
import MarkDownEditor from '../../../textEditor/MarkDownEditor';
import Toolbar from '../../../toolbar/AdminToolbar';

type ArticleValues = {
  title: string;
  subtitle: string;
  keywords: string;
  picture: string;
  body: string;
  categoryId: string;

  status: number;
};

const NewArticle = ({ titleToolbar }: any) => {
  // hooks
  const { enqueueSnackbar } = useSnackbar();
  const { categories, isLoading, isError } = useAllCategories();
  // states
  const [draft, setDraft] = useState(true);
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ArticleValues>();

  const sendReviewArticle: SubmitHandler<ArticleValues> = async (data) => {
    setWaiting(true);
    data.status = draft ? ArticleStatus.DRAFT : ArticleStatus.WAIT;
    console.log(data);
    const r = await FetchApi({ url: '/articles', method: 'POST', body: data });
    if (r.ok) {
      const msg = draft
        ? 'Se ha guardado el articulo'
        : 'Se ha enviado el articulo exitosamente';
      enqueueSnackbar(msg, {
        variant: 'success',
      });
      reset();
    } else {
      enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }
    setWaiting(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.checked);
  };

  return (
    <>
      <Toolbar title={titleToolbar} />
      <div className="container-views custom-scroll">
        <div className="flex mt-6">
          <Link href="/admin/editor">
            <a className="bg-gray-700 hover:bg-gray-800 text-white rounded shadow text-center font-bold px-4 py-2">
              Volver
            </a>
          </Link>
        </div>
        <div className="mt-4 rounded shadow bg-white px-4 py-4 mb-4">
          <h2 className="text-lg font-bold">Redacción del articulo:</h2>
          <form onSubmit={handleSubmit(sendReviewArticle)}>
            <Input
              name="title"
              label="Titular"
              placeholder="Soy el titular"
              register={register}
              validations={ArticleValidation.title}
              required={true}
              error={errors.title}
            />
            <Input
              name="subtitle"
              label="Subtitulo"
              placeholder="Soy el subtitulo"
              register={register}
              validations={ArticleValidation.subtitle}
              required={true}
              error={errors.subtitle}
            />
            <div className="md:grid md:grid-cols-2">
              {isLoading ? (
                <div>Cargando categorías..</div>
              ) : !isError && categories ? (
                <SelectInput
                  name="categoryId"
                  label="Categoría"
                  register={register}
                  items={categories}
                  keyValue="categoryId"
                  keyName="name"
                  validations={{
                    required: 'Se debe seleccionar una categoría',
                  }}
                  required={true}
                  error={errors.categoryId}
                />
              ) : (
                <div className="mt-2 mx-2">Error al cargar las categorías</div>
              )}
              <Input
                name="keywords"
                label="Palabras claves"
                placeholder="Soy las palabras claves"
                register={register}
                validations={ArticleValidation.keywords}
                required={true}
                error={errors.keywords}
              />
            </div>
            <GalleryPhotos
              name="picture"
              defaultImg="http://atrilco.com/wp-content/uploads/2017/11/ef3-placeholder-image.jpg"
              register={register}
              validations={{ required: 'Se necesita una imagen del articulo' }}
              setValue={setValue}
              required={true}
              error={errors.picture}
            />
            <MarkDownEditor
              name="body"
              register={register}
              validations={ArticleValidation.body}
              setValue={setValue}
              error={errors.body}
            />

            <div className="border-t border-b mx-4 mt-4">
              <p>Opciones:</p>
              <FormControlLabel
                value="start"
                control={
                  <Switch
                    color="primary"
                    checked={draft}
                    onChange={handleChange}
                  />
                }
                label="Borrador"
                labelPlacement="start"
              />
            </div>

            <div className="flex justify-between mx-4 mt-2">
              <ButtonWithSpinner waiting={waiting} type={ButtonType.Submit}>
                {draft ? 'Guardar como borrador' : 'Enviar a revisión'}
              </ButtonWithSpinner>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewArticle;
