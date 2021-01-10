import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};

interface HomeProps {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
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

export default function Home({ allPostsData = [] }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>
          { siteTitle }
        </title>
      </Head>

      <section className={ utilStyles.headingMd }>
        <p>
          I am a software engineer, web developer, and programmer, currently living in Saint
          Petersburg, Russia with my wife and a little son. My interests range from science to
          buddhism. I am also interested in productivity techniques, tea, music, and literature.
        </p>

        <p>
          My top values in people are honesty, rationalism, benevolence. As a developer I prefer to
          work in team, supporting my colleagues and finding ways to achieve a common goal.
        </p>

        <p>
          Currently working as a front-end developer in Wrike.
        </p>

        <p>
          (This is a sample website - you’ll be building a site like this on{ ' ' }

          <a href="https://nextjs.org/learn">
            our Next.js tutorial
          </a>.)
        </p>
      </section>

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
