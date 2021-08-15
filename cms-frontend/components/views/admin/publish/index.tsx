import ListReviewArticles from './ListReviewArticles';
import ReviewArticle from './ReviewArticle';

const Publish = ({ childRoute }: any) => {
  console.log('childRoute', childRoute);

  if ('publish' === childRoute) {
    return <ListReviewArticles titleToolbar="Revisión" />;
  } else if (/^(publish\/article\/)/.test(childRoute)) {
    return <ReviewArticle titleToolbar="Revisar articulo" />;
  } else {
    return <div>No route found</div>;
  }
};

export default Publish;
