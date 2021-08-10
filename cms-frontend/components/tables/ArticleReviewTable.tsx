import Router from 'next/router';

const ArticleReviewTable = () => {
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
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
          <ArticleReviewRow state={1} />
        </tbody>
      </table>
    </div>
  );
};

interface ArticleEditorProps {
  state: number;
}

const ArticleReviewRow = ({ state }: ArticleEditorProps) => {
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
      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        Router.push('/admin/publish/1');
      }}
    >
      <td className="py-3 px-3 text-left whitespace-nowrap">
        <div className="flex items-center">
          <span className="font-medium">Algo soy titulo...</span>
        </div>
      </td>
      <td className="py-3 px-3 text-left">
        <div className="flex items-center">
          <span>Deporte</span>
        </div>
      </td>
      <td className="hidden sm:block py-3 px-3 text-center">
        <div className="flex items-center justify-center">
          <span>06/08/2021</span>
        </div>
      </td>
      <td className="py-3 px-3 text-center">
        <span
          className={`${colorState[state].color} py-1 px-3 rounded-full text-xs`}
        >
          {colorState[state].title}
        </span>
      </td>
    </tr>
  );
};

export default ArticleReviewTable;
