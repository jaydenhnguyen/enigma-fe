import Head from 'next/head';
import Link from 'next/link';
import { NextPageWithLayout } from './_app';

const Custom404: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | AZ Moving Admin</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center px-6">
          <div className="mb-8">
            <div className="text-8xl mb-4">📦</div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you
              entered the wrong URL.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Go Back Home
            </Link>

            <div className="text-sm text-gray-500">
              <button onClick={() => window.history.back()} className="text-blue-600 hover:text-blue-800 underline">
                Go back to previous page
              </button>
            </div>
          </div>

          <div className="mt-12 text-xs text-gray-400">Error Code: 404 - Not Found</div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
