import React from 'react';
import Toolbar from '../../../toolbar/AdminToolbar';

const Publish = ({ titleToolbar }: any) => {
  return (
    <>
      <Toolbar title={titleToolbar} />
      <div className="container-views">Publish</div>
    </>
  );
};

export default Publish;
