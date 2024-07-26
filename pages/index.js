import Link from 'next/link';
import Styles from '@/styles/Home.module.css'; // Adjust the path as needed

export default function Home() {
  return (
    <div className={Styles.homeMainContent}>
      <div className={Styles.homePage}>
        <h1>Join Our Community of Readers and Writers</h1>
        <p>This is the home page of our Next.js application.</p>
        <Link href="/blogPage" className={Styles.blogButton}>
          <button>Post Blog</button>
        </Link>
      </div>
    </div>
  );
}
