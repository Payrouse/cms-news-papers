import NewArticle from './NewArticle';
import EditArticle from './EditArticle';
import ListArticles from './ListArticles';

const Editor = ({ childRoute }: any) => {
  console.log('childRoute', childRoute);

  if ('editor' === childRoute) {
    return <ListArticles titleToolbar="Redacción" />;
  } else if ('editor/new' === childRoute) {
    return <NewArticle titleToolbar="Nuevo articulo" />;
  } else if (/^(editor\/article\/)/.test(childRoute)) {
    return <EditArticle titleToolbar="Editar articulo" />;
  } else {
    return <div>No route found</div>;
  }
};

export default Editor;
