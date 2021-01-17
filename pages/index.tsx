import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData, PostListItemData } from '../server/lib/posts.service';
import Date from '../components/date';
import { getHomeDescriptionData, HomeDescriptionData } from '../server/lib/home.service';

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<HomeProps, {}> = async () => {
  const allPostsData = getSortedPostsData();
  const homeDescriptionData = await getHomeDescriptionData();

  const props: HomeProps = {
    allPostsData,
    homeDescriptionData,
  };
  return {
    props,
  };
};

// noinspection JSUnusedGlobalSymbols
export default function Home({ allPostsData = [], homeDescriptionData = { contentHtml: null } }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>
          { siteTitle }
        </title>
      </Head>

      <section
        className={ utilStyles.headingMd }
        dangerouslySetInnerHTML={ { __html: homeDescriptionData.contentHtml } }
      />

      <section className={ `${ utilStyles.headingMd } ${ utilStyles.padding1px }` }>
        <h2 className={ utilStyles.headingLg }>
          Blog
        </h2>

        <ul className={ utilStyles.list }>
          { allPostsData.map(PostListItem) }
        </ul>
      </section>
    </Layout>
  );
}

interface HomeProps {
  allPostsData: PostListItemData[],
  homeDescriptionData: HomeDescriptionData,
}

interface PostListItemProps {
  id: string,
  date: string,
  title: string,
}

function PostListItem({ id, date, title }: PostListItemProps) {
  return (
    <li className={ utilStyles.listItem } key={ id }>
      <Link href={ `/posts/${ id }` }>
        <a>
          { title }
        </a>
      </Link>

      <br/>

      <small className={ utilStyles.lightText }>
        <Date dateString={ date }/>
      </small>
    </li>
  );
}
