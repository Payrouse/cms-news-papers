import Router from 'next/router';
import { useSnackbar } from 'notistack';

import useArticlesByJournalist from '../../hooks/data/useArticlesByJournalist';
import { ControllerDate } from '../../library/Time';
import { Article, ArticleStatus } from '../../models/article.model';

const ArticleEditorTable = () => {
  const { articles, isError, isLoading } = useArticlesByJournalist();

  return (
    <div className="flex flex-col my-3">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Titulo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Categoría
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Creado
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <PlaceholderRow />
                ) : !isError && articles.length > 0 ? (
                  articles.map((articles: Article, index: number) => {
                    return <ArticleEditorRow article={articles} key={index} />;
                  })
                ) : (
                  <tr className="bg-white">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="font-normal">
                          {isError
                            ? 'Hubo un error, intente más tarde'
                            : articles.length == 0
                            ? 'No hay artículos redactados'
                            : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm  bg-gray-200 px-12 py-2 rounded" />
                      <div className="text-sm bg-gray-200 px-12 py-2 rounded mt-1" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-gray-200 px-12 py-1 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="bg-gray-200 px-6 py-2 rounded" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaceholderRow = () => {
  return (
    <tr className=" bg-white hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm bg-gray-200 px-12 py-2 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex text-xs bg-gray-200 px-12 py-2 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex text-xs bg-gray-200 px-12 py-2 rounded animate-pulse" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="bg-gray-200 px-12 py-2 rounded animate-pulse" />
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
        preventDuplicate: false,
      });
    }
    enqueueSnackbar('El articulo esta en espera de revisión', {
      variant: 'info',
      preventDuplicate: false,
    });
  };

  return (
    <tr
      className="cursor-pointer bg-white hover:bg-gray-100"
      onClick={handleRow}
    >
      <td className="px-6 py-4">
        <div className="text-sm text-black font-medium">{article.title}</div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-500">{article.category?.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span>{ControllerDate.parseDate(article.createdAt)}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
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
