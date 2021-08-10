import React from 'react';

import ArticleReviewTable from '../../../tables/ArticleReviewTable';
import Toolbar from '../../../toolbar/AdminToolbar';

const Publish = ({ titleToolbar }: any) => {
  return (
    <>
      <Toolbar title={titleToolbar} />
      <div className="container-views custom-scroll">
        <div className="mt-6">
          <ArticleReviewTable />
        </div>
      </div>
    </>
  );
};

export default Publish;
