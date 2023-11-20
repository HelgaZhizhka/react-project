import { NextPageContext } from 'next';

const ErrorPage = ({ statusCode }: { statusCode: number }) => {
  return (
    <div>
      <h4>
        {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
      </h4>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
