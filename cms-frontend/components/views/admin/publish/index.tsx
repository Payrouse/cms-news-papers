import ListReviewArticles from './ListReviewArticles';
import ReviewArticle from './ReviewArticle';

const Publish = ({ childRoute }: any) => {
  console.log('childRoute', childRoute);

  if ('publish' === childRoute) {
    return <ListReviewArticles titleToolbar="Revisión" />;
  } else if (/^(publish\/article\/)/.test(childRoute)) {
    let id = childRoute.split('/')[2];
    return <ReviewArticle titleToolbar="Revisar articulo" articleId={id} />;
  } else {
    return <div>No route found</div>;
  }
};

export default Publish;
