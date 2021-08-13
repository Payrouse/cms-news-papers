import Link from 'next/link';
import React from 'react';
import ArticleEditorTable from '../../../tables/ArticleEditorTable';
import Toolbar from '../../../toolbar/AdminToolbar';

const ListArticles = ({ titleToolbar }: any) => {
  return (
    <>
      <Toolbar title={titleToolbar} />
      <div className="container-views custom-scroll">
        <div className="flex justify-end mt-6">
          <Link href="/admin/editor/new">
            <a className="bg-blue-500 hover:bg-blue-600 text-white rounded shadow text-center font-bold px-4 py-2">
              Nuevo articulo
            </a>
          </Link>
        </div>
        <div className="mt-1">
          <ArticleEditorTable />
        </div>
      </div>
    </>
  );
};

export default ListArticles;
