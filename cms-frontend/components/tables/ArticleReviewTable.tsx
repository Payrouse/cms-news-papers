import Router from 'next/router';

import useReviewArticles from '../../hooks/data/useReviewArticles';
import { ControllerDate } from '../../library/Time';
import { Article } from '../../models/article.model';

const ArticleReviewTable = () => {
  const { articles, isError, isLoading } = useReviewArticles();

  console.log(articles, isError, isLoading);

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
                    Periodista
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Articulo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actualizado
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
                  articles.map((articles, index) => {
                    return <ArticleReviewRow article={articles} key={index} />;
                  })
                ) : (
                  <tr className="bg-white">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="font-normal">
                          {isError
                            ? 'Hubo un error, intente más tarde'
                            : articles.length == 0
                            ? 'No hay artículos por revisar'
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
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
          </div>
          <div className="ml-4">
            <div className="text-sm bg-gray-200 px-12 py-2 rounded animate-pulse" />
            <div className="text-sm bg-gray-200 px-12 py-2 rounded animate-pulse mt-1" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm bg-gray-200 px-12 py-2 rounded animate-pulse" />
        <div className="text-sm bg-gray-200 px-12 py-2 rounded animate-pulse mt-1" />
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

const ArticleReviewRow = ({ article }: ArticleEditorProps) => {
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

  return (
    <tr
      className="cursor-pointer bg-white hover:bg-gray-100"
      onClick={() => {
        Router.push(`/admin/publish/article/${article.articleId}`);
      }}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={article.author?.avatar}
              alt={article.author?.firstName}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {article.author?.firstName + ' ' + article.author?.lastName}
            </div>
            <div className="text-sm text-gray-500">{article.author?.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 ">
        <div className="text-sm text-black font-medium">{article.title}</div>
        <div className="text-sm text-gray-500">{article.category?.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span>{ControllerDate.parseDate(article.updatedAt)}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {/* <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span> */}
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
{
  /* <tr className="cursor-pointer bg-white hover:bg-gray-100">
  <td className="px-6 py-4 whitespace-nowrap">
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
        <div className="text-sm text-gray-500">jane.cooper@example.com</div>
      </div>
    </div>
  </td>
  <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm text-gray-900">Regional Paradigm Technician</div>
    <div className="text-sm text-gray-500">Optimization</div>
  </td>
  <td className="px-6 py-4 whitespace-nowrap">
    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
      Active
    </span>
  </td>
  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>
</tr>; */
}

export default ArticleReviewTable;
