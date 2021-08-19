import Link from 'next/link';
import Router from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import useAllCategories from '../../../../hooks/data/useAllCategories';
import useArticle from '../../../../hooks/data/useArticle';
import { ArticleValidation } from '../../../../library/Validations';
import { FetchApi } from '../../../../library/Http';
import GalleryPhotos from '../../../gallery/GalleryPhoto';
import MarkDownEditor from '../../../textEditor/MarkDownEditor';
import Toolbar from '../../../toolbar/AdminToolbar';
import { Category } from '../../../../models/category.model';
import { Article, ArticleStatus } from '../../../../models/article.model';
import ButtonWithSpinner from '../../../buttons/ButtonWithSpinner';
import { ButtonType } from '../../../buttons/Button';

type ArticleValues = {
  title: string;
  subtitle: string;
  keywords: string;
  picture: string;
  body: string;
  categoryId: string;

  status: number;
};

const EditArticle = ({ titleToolbar, articleId }: any) => {
  const { article, isErrorArticle, isLoadingArticle } = useArticle(articleId);
  const { categories, isLoading, isError } = useAllCategories();

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
          {isLoadingArticle && isLoading ? (
            <LoadingArticle />
          ) : !isErrorArticle && article ? (
            <EditArticleForm article={article} categories={categories} />
          ) : (
            <ErrorArticle />
          )}
        </div>
      </div>
    </>
  );
};

const LoadingArticle = () => {
  return (
    <div>
      <CircularProgress />
    </div>
  );
};

const ErrorArticle = () => {
  return <div>Error</div>;
};

interface EditArticleFormProps {
  article: Article;
  categories: Category[];
}

const EditArticleForm = ({ article, categories }: EditArticleFormProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // states
  const [draft, setDraft] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [waitingDelete, setWaitingDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<ArticleValues>({
    defaultValues: {
      title: article.title,
      subtitle: article.subtitle,
      keywords: article.keywords,
      categoryId: article.category?.categoryId,
      picture: article.picture,
      body: article.body,
      status: article.status,
    },
  });

  const handleUpdateArticle: SubmitHandler<ArticleValues> = async (data) => {
    setWaiting(true);
    data.status = draft ? ArticleStatus.DRAFT : ArticleStatus.WAIT;
    const r = await FetchApi({
      url: `/articles/${article.articleId}`,
      method: 'PUT',
      body: data,
    });
    if (r.ok) {
      const msg = draft
        ? 'Se ha guardado el articulo'
        : 'Se ha enviado el articulo exitosamente';
      enqueueSnackbar(msg, {
        variant: 'success',
      });
      if (!draft) Router.push('/admin/editor');
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

  // customized
  const action = (key: any) => (
    <>
      <Button
        onClick={() => {
          deleteArticle(key);
        }}
      >
        Ok
      </Button>
      <Button
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        Cancelar
      </Button>
    </>
  );

  const handleDelete = () => {
    enqueueSnackbar('¿Quieres borrar el articulo?', {
      variant: 'warning',
      action,
    });
  };

  const deleteArticle = async (key: any) => {
    closeSnackbar(key);
    setWaitingDelete(true);
    const r = await FetchApi({
      url: `/articles/${article.articleId}`,
      method: 'DELETE',
    });
    if (r.ok) {
      enqueueSnackbar('Se elimino el articulo', {
        variant: 'success',
      });
      Router.push('/admin/editor');
    } else {
      setWaitingDelete(false);
      enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <h2 className="text-lg font-bold">
        {article.status === ArticleStatus.DRAFT
          ? 'Redacción del articulo'
          : 'Corrección del articulo:'}
      </h2>
      <form onSubmit={handleSubmit(handleUpdateArticle)}>
        {article.status === ArticleStatus.REJECTED ? (
          <p>{article.feedback}</p>
        ) : null}

        <Controller
          name="title"
          control={control}
          rules={ArticleValidation.title}
          render={({ field }) => (
            <div className="mx-4 mt-4">
              <TextField
                {...field}
                label="Título"
                variant="outlined"
                placeholder="Título"
                error={!!errors.title}
                helperText={errors.title ? errors.title?.message : ''}
                fullWidth
                required
              />
            </div>
          )}
        />
        <Controller
          name="subtitle"
          control={control}
          rules={ArticleValidation.subtitle}
          render={({ field }) => (
            <div className="mx-4 mt-4">
              <TextField
                {...field}
                label="Subtitulo"
                variant="outlined"
                placeholder="Subtitulo"
                error={!!errors.subtitle}
                helperText={errors.subtitle ? errors.subtitle?.message : ''}
                fullWidth
                required
              />
            </div>
          )}
        />
        <div className="md:grid md:grid-cols-2">
          {categories ? (
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: 'Se debe seleccionar una categoría' }}
              render={({ field }) => (
                <div className="mx-4 mt-4">
                  <FormControl
                    variant="outlined"
                    required
                    fullWidth
                    error={!!errors.categoryId}
                  >
                    <InputLabel id={'category-label'}>Categoría</InputLabel>
                    <Select
                      {...field}
                      labelId="category-label"
                      id="category-id"
                      label="Categoría"
                    >
                      {categories.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.categoryId}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>
                      {errors.categoryId ? errors.categoryId?.message : ''}
                    </FormHelperText>
                  </FormControl>
                </div>
              )}
            />
          ) : null}

          <Controller
            name="keywords"
            control={control}
            rules={ArticleValidation.keywords}
            render={({ field }) => (
              <div className="mx-4 mt-4">
                <TextField
                  {...field}
                  label="Palabras claves"
                  variant="outlined"
                  placeholder="Palabras claves"
                  error={!!errors.keywords}
                  helperText={errors.keywords ? errors.keywords?.message : ''}
                  fullWidth
                  required
                />
              </div>
            )}
          />
        </div>
        <GalleryPhotos
          name="picture"
          defaultImg={article.picture}
          register={register}
          validations={{
            required: 'Se necesita una imagen del articulo',
          }}
          setValue={setValue}
          required={true}
          error={errors.picture}
        />
        <MarkDownEditor
          defaultValue={article.body}
          name="body"
          register={register}
          validations={ArticleValidation.body}
          setValue={setValue}
          error={errors.body}
        />
        <div className="border-t border-b mx-4 mt-4 pb-4">
          <p>Opciones:</p>
          <FormControlLabel
            value="start"
            control={
              <Switch color="primary" checked={draft} onChange={handleChange} />
            }
            label="Borrador"
            labelPlacement="start"
          />
          {article.status === ArticleStatus.DRAFT ? (
            <div>
              <ButtonWithSpinner
                waiting={waitingDelete}
                type={ButtonType.Button}
                width="w-auto"
                normalColor="bg-red-600 text-white hover:bg-red-700 border-red-500"
                waitingColor="bg-red-400 text-white border-red-400 cursor-default"
                onClick={handleDelete}
              >
                Eliminar articulo
              </ButtonWithSpinner>
            </div>
          ) : null}
        </div>
        <div className="flex justify-between mx-4 mt-2">
          <ButtonWithSpinner waiting={waiting} type={ButtonType.Submit}>
            {draft ? 'Guardar como borrador' : 'Enviar a revisión'}
          </ButtonWithSpinner>
        </div>
      </form>
    </>
  );
};

export default EditArticle;
