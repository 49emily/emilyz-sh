"use client";

import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-4xl mb-4 text-primary">Page Not Found</h2>
        <p className="text-lg text-secondary mb-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link href="/" className="link text-lg">
          Go back home
        </Link>
      </div>
    </div>
  );
}

