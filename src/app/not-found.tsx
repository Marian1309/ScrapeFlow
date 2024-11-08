import type { NextPage } from 'next';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

const NotFoundPage: NextPage = () => {
  return (
    <div className="min-h-screen flex-col p-4 flex-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-8 max-w-md text-muted-foreground">
          Don&apos;t worry, even the best data sometimes gets lost in the Internet.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            className="rounded-md bg-primary px-4 py-2 text-white transition-colors flex-center hover:bg-primary/80"
            href="/"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        If you believe this is an error, please contact our support team.
      </footer>
    </div>
  );
};

export default NotFoundPage;
