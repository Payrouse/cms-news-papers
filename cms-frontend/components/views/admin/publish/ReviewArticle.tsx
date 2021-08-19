import {
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core';
import Link from 'next/link';
import Router from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import useArticle from '../../../../hooks/data/useArticle';
import { FetchApi } from '../../../../library/Http';
import { Article, ArticleStatus } from '../../../../models/article.model';
import { ButtonType } from '../../../buttons/Button';
import ButtonWithSpinner from '../../../buttons/ButtonWithSpinner';
import News from '../../../article/News';
import Toolbar from '../../../toolbar/AdminToolbar';

const ReviewArticle = ({ titleToolbar, articleId }: any) => {
  const { article, isErrorArticle, isLoadingArticle } = useArticle(articleId);

  return (
    <>
      <Toolbar title={titleToolbar} />
      <div className="container-views custom-scroll">
        <div className="flex mt-6">
          <Link href="/admin/publish">
            <a className="bg-gray-700 hover:bg-gray-800 text-white rounded shadow text-center font-bold px-4 py-2">
              Volver
            </a>
          </Link>
        </div>
        <div className="mt-4 rounded shadow bg-white px-4 py-4 mb-4">
          {isLoadingArticle ? (
            <LoadingArticle />
          ) : !isErrorArticle && article ? (
            <ReviewArticleForm article={article} />
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

type ArticleValues = {
  feedback: string;
  status: number;
};

interface EditArticleFormProps {
  article: Article;
}

const ReviewArticleForm = ({ article }: EditArticleFormProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // states
  const [highlight, setHighlight] = useState(false);
  const [waitingReject, setWaitingReject] = useState(false);
  const [waitingPublish, setWaitingPublish] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<ArticleValues>({
    defaultValues: { feedback: article.feedback || '' },
  });

  const handlePublishArticle = async () => {
    setWaitingPublish(true);
    const data = highlight ? ArticleStatus.HIGHLIGHTED : ArticleStatus.POSTED;
    const r = await FetchApi({
      url: `/articles/${article.articleId}/status`,
      method: 'PUT',
      body: { status: data },
    });
    if (r.ok) {
      enqueueSnackbar('Se publico el articulo', {
        variant: 'success',
      });
      Router.push('/admin/publish');
    } else {
      enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }
    setWaitingPublish(false);
  };

  // customized
  const action = (key: any) => (
    <>
      <Button
        onClick={() => {
          rejectArticle(key);
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

  const handleRejectArticle: SubmitHandler<ArticleValues> = (data) => {
    enqueueSnackbar('¿Quieres rechazar el articulo?', {
      variant: 'warning',
      action,
    });
  };

  const rejectArticle = async (key: any) => {
    closeSnackbar(key);
    setWaitingReject(true);
    const r = await FetchApi({
      url: `/articles/${article.articleId}/status`,
      method: 'PUT',
      body: { status: ArticleStatus.REJECTED, feedback: getValues('feedback')},
    });
    if (r.ok) {
      enqueueSnackbar('Se rechazo el articulo', {
        variant: 'success',
      });
      Router.push('/admin/publish');
    } else {
      enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }
    setWaitingReject(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHighlight(event.target.checked);
  };

  return (
    <>
      <h2 className="text-lg font-bold">Revisión del articulo:</h2>
      <div className="mx-4">
        <News article={article} />
      </div>
      <form onSubmit={handleSubmit(handleRejectArticle)}>
        <Controller
          name="feedback"
          control={control}
          rules={{
            required:'Debe tener un mensaje de retroalimentación',
            minLength: {
              value: 10,
              message: 'Debe tener al menos 10 caracteres',
            },
          }}
          render={({ field }) => (
            <div className="mx-4 mt-4">
              <TextField
                {...field}
                label="Retroalimentación"
                variant="outlined"
                placeholder="El articulo debería tener..."
                error={!!errors.feedback}
                helperText={errors.feedback ? errors.feedback?.message : ''}
                minRows={4}
                multiline
                fullWidth
              />
            </div>
          )}
        />
        <div className="border-t border-b mx-4 mt-4 pb-4">
          <p>Opciones:</p>
          <FormControlLabel
            value="start"
            control={
              <Switch
                color="primary"
                checked={highlight}
                onChange={handleChange}
              />
            }
            label="Destacar articulo"
            labelPlacement="start"
          />
          <div>
            <ButtonWithSpinner
              waiting={waitingReject}
              type={ButtonType.Submit}
              width="w-auto"
              normalColor="bg-red-600 text-white hover:bg-red-700 border-red-500"
              waitingColor="bg-red-400 text-white border-red-400 cursor-default"
              // onClick={handleRejectArticle}
            >
              Rechazar articulo
            </ButtonWithSpinner>
          </div>
        </div>

        <div className="flex justify-between mx-4 mt-4">
          <ButtonWithSpinner
            waiting={waitingPublish}
            type={ButtonType.Button}
            onClick={handlePublishArticle}
          >
            Publicar articulo
          </ButtonWithSpinner>
        </div>
      </form>
    </>
  );
};

export default ReviewArticle;
