import Link from 'next/link';

export default function Page() {
  return (
    <div className="">
      <div className="">
        <div className="">
          <Link
            href="/protected"
            className=""
          >
            Protected Page
          </Link>
          <a
            href="https://vercel.com/templates/next.js/prisma-postgres-auth-starter"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            Deploy to Vercel
          </a>
        </div>
      </div>
    </div>
  );
}
