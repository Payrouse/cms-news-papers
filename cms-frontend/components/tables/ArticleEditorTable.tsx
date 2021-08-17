import Router from 'next/router';
import { useSnackbar } from 'notistack';
import useArticlesByJournalist from '../../hooks/data/useArticlesByJournalist';
import { ControllerDate } from '../../library/Time';
import { Article, ArticleStatus } from '../../models/article.model';

const ArticleEditorTable = () => {
  const { articles, isError, isLoading } = useArticlesByJournalist();

  return (
    <div className="bg-white shadow-md rounded my-6 sm:w-full md:w-full">
      <table className={'min-w-max w-full table-auto'}>
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-3 text-left">Titulo</th>
            <th className="py-3 px-3 text-left">Categoría</th>
            <th className="hidden sm:block py-3 px-3 text-center">Creado</th>
            <th className="py-3 px-3 text-center">Estado</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {isLoading ? (
            <PlaceholderRow />
          ) : !isError && articles.length > 0 ? (
            articles.map((article: Article, index: number) => {
              return <ArticleEditorRow key={index} article={article} />;
            })
          ) : (
            <tr className="border-b border-gray-200">
              <td className="py-3 px-3 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">
                    {articles.length
                      ? articles.length === 0
                        ? 'No se encontraron artículos'
                        : ''
                      : 'Hubo un error, intente más tarde'}
                  </span>
                </div>
              </td>
              <td className="py-3 px-3 text-left">
                <div className="flex items-center">
                  <span className="bg-gray-200 px-12 py-2 rounded"></span>
                </div>
              </td>
              <td className="hidden sm:block py-3 px-3 text-center">
                <div className="flex justify-center">
                  <span className="bg-gray-200 px-12 py-2 rounded"></span>
                </div>
              </td>
              <td className="py-3 px-3 text-center">
                <div className="flex justify-center">
                  <span className={`bg-gray-200 px-12 py-2 rounded`}></span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const PlaceholderRow = () => {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-3 px-3 text-left whitespace-nowrap">
        <div className="flex items-center">
          <span className="font-medium bg-gray-200 animate-pulse px-20 py-2 rounded"></span>
        </div>
      </td>
      <td className="py-3 px-3 text-left">
        <div className="flex items-center">
          <span className="bg-gray-200 animate-pulse px-12 py-2 rounded"></span>
        </div>
      </td>
      <td className="hidden sm:block py-3 px-3 text-center">
        <div className="flex justify-center">
          <span className="bg-gray-200 animate-pulse px-12 py-2 rounded"></span>
        </div>
      </td>
      <td className="py-3 px-3 text-center">
        <div className="flex justify-center">
          <span
            className={` bg-gray-200 animate-pulse px-12 py-2 rounded`}
          ></span>
        </div>
      </td>
    </tr>
  );
};

interface ArticleEditorProps {
  article: Article;
}

const ArticleEditorRow = ({ article }: ArticleEditorProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const colorState: any = {
    0: {
      color: 'bg-gray-200 text-gray-600',
      title: 'Borrador',
    },
    1: {
      color: 'bg-purple-200 text-purple-600',
      title: 'Espera',
    },
    2: {
      color: 'bg-red-200 text-red-600',
      title: 'Rechazado',
    },
    3: {
      color: 'bg-yellow-200 text-yellow-600',
      title: 'Destacado',
    },
    4: {
      color: 'bg-green-200 text-green-600',
      title: 'Publicado',
    },
  };

  const handleRow = () => {
    if (
      article.status === ArticleStatus.DRAFT ||
      article.status === ArticleStatus.REJECTED
    ) {
      return Router.push(`/admin/editor/article/${article.articleId}`);
    }
    if (
      article.status === ArticleStatus.POSTED ||
      article.status === ArticleStatus.HIGHLIGHTED
    ) {
      return enqueueSnackbar('El articulo ya fue publicado', {
        variant: 'info',
      });
    }
    enqueueSnackbar('El articulo esta en espera de revisión', {
      variant: 'info',
    });
  };

  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
      onClick={handleRow}
    >
      <td className="py-3 px-3 text-left whitespace-nowrap">
        <div className="flex items-center">
          <span className="font-medium">{article.title}</span>
        </div>
      </td>
      <td className="py-3 px-3 text-left">
        <div className="flex items-center">
          <span>{article.category && article.category.name}</span>
        </div>
      </td>
      <td className="hidden sm:block py-3 px-3 text-center">
        <div className="flex items-center justify-center">
          <span>{ControllerDate.parseDate(article.createdAt)}</span>
        </div>
      </td>
      <td className="py-3 px-3 text-center">
        <span
          className={`${
            colorState[article.status].color
          } py-1 px-3 rounded-full text-xs`}
        >
          {colorState[article.status].title}
        </span>
      </td>
    </tr>
  );
};

export default ArticleEditorTable;
