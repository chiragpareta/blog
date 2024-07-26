import Link from 'next/link';
import Styles from '@/styles/About.module.css';

export default function About() {
  return (
    <div className={Styles.aboutPage}>
      <h1>About Us</h1>
      <p>This page contains information about us.</p>
      <Link href="/">
        <a className={Styles.link}>Back to Home</a>
      </Link>
    </div>
  );
}

