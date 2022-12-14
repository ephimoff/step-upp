import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="text-red-400">Pages:</div>
      <ul>
        <li>
          <Link href="/auth/login" className="text-blue-700 underline">
            Login page
          </Link>
        </li>
        <li>
          <Link href="/account" className="text-blue-700 underline">
            Account - Protected page
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
