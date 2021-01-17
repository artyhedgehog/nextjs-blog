import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import Layout from '../../components/layout';
import {
  getAllPostIds,
  getPostData,
  PostIdParams,
  PostData,
} from '../../server/lib/posts.service';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { getHomeDescriptionData } from '../../server/lib/home.service';

// noinspection JSUnusedGlobalSymbols
export const getStaticPaths: GetStaticPaths<PostIdParams & ParsedUrlQuery> = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<PostProps, PostIdParams> = async ({ params }) => {
  const siteData = await getHomeDescriptionData();
  const postData = await getPostData(params.id);

  const props: PostProps = { postData, siteTitle: siteData.title };

  return { props };
};

interface PostProps {
  postData: PostData;
  siteTitle: string;
}

// noinspection JSUnusedGlobalSymbols
export default function Post({ postData, siteTitle }: PostProps) {
  return (
    <Layout siteTitle={ siteTitle }>
      <Head>
        <title>
          { postData.title }
        </title>
      </Head>

      <article>
        <h1 className={ utilStyles.headingXl }>
          { postData.title }
        </h1>

        <div className={ utilStyles.lightText }>
          <Date dateString={ postData.date }/>
        </div>

        <div dangerouslySetInnerHTML={ { __html: postData.contentHtml } }/>
      </article>
    </Layout>
  );
}
