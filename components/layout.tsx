import Head from 'next/head';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import React from 'react';

const name = 'Artem Kolomycev';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div className={ styles.container }>
      <LayoutHead/>

      <header className={ styles.header }>
        <LayoutHeaderContent home={home}/>
      </header>

      <main>
        { children }
      </main>

      { !home && (
        <div className={ styles.backToHome }>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      ) }
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode
  home?: boolean

}

function LayoutHead() {
  const siteTitleUri = encodeURI(siteTitle);
  const ogImageContent = `https://og-image.now.sh/${ siteTitleUri }.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`;

  return (
    <Head>
      <link rel="icon" href="/favicon.ico"/>

      <meta
        name="description"
        content="Learn how to build a personal website using Next.js"
      />
      <meta
        property="og:image"
        content={ ogImageContent }
      />
      <meta name="og:title" content={ siteTitle }/>
      <meta name="twitter:card" content="summary_large_image"/>
    </Head>
  )
}

function ProfileImage() {
  return (
    <img
      src="/images/profile.jpg"
      className={ `${ styles.headerImage } ${ utilStyles.borderCircle }` }
      alt={ name }
    />
  )
}

function LayoutHeaderContent({ home }: { home: boolean }) {
  if (home) {
    return (
      <>
        <ProfileImage/>

        <h1 className={ utilStyles.heading2Xl }>
          { name }
        </h1>
      </>
    )
  }

  return (
    <>
      <Link href="/">
        <a>
          <ProfileImage/>
        </a>
      </Link>

      <h2 className={ utilStyles.headingLg }>
        <Link href="/">
          <a className={ utilStyles.colorInherit }>
            { name }
          </a>
        </Link>
      </h2>
    </>
  );
}
