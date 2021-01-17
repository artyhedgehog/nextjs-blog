import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';

export default function Layout({ children, home, siteTitle }: LayoutProps) {
  return (
    <div className={ styles.container }>
      <LayoutHead siteTitle={ siteTitle }/>

      <header className={ styles.header }>
        <LayoutHeaderContent home={ home } siteTitle={ siteTitle }/>
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

interface LayoutProps extends SiteTitleProvider {
  children: React.ReactNode;
  home?: boolean;
}

function LayoutHead({ siteTitle }: SiteTitleProvider) {
  const siteTitleUri = encodeURI(siteTitle);
  const ogImageContent = `https://og-image.now.sh/${ siteTitleUri }.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`;

  return (
    <Head>
      <title>
        { siteTitle }
      </title>

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
  );
}

interface SiteTitleProvider {
  siteTitle: string,
}

function ProfileImage({ siteTitle }: SiteTitleProvider) {
  return (
    <img
      src="/images/profile.jpg"
      className={ `${ styles.headerImage } ${ utilStyles.borderCircle }` }
      alt={ siteTitle }
    />
  );
}

interface LayoutHeaderContentProps extends SiteTitleProvider {
  home: boolean,
}

function LayoutHeaderContent({ home, siteTitle }: LayoutHeaderContentProps) {
  if (home) {
    return (
      <>
        <ProfileImage siteTitle={ siteTitle }/>

        <h1 className={ utilStyles.heading2Xl }>
          { siteTitle }
        </h1>
      </>
    );
  }

  return (
    <>
      <Link href="/">
        <a>
          <ProfileImage siteTitle={ siteTitle }/>
        </a>
      </Link>

      <h2 className={ utilStyles.headingLg }>
        <Link href="/">
          <a className={ utilStyles.colorInherit }>
            { siteTitle }
          </a>
        </Link>
      </h2>
    </>
  );
}
