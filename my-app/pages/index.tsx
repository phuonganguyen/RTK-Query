import Head from "next/head";
import Link from "next/link";

import Layout, { siteTitle } from "../components/layout";
import { getPokemonList, getRunningQueriesThunk } from "../lib/pokemonApi";
import { wrapper } from "../lib/store";
import utilStyles from "../styles/utils.module.css";

type Props = {
  pokemonList: Array<{ name: string }>;
};

const Home = ({ pokemonList }: Props) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>take a look at some pokemon</h2>
        <ul>
          {pokemonList.map((pokemon, index) => {
            return (
              <li key={index}>
                <Link href={`/${pokemon.name}`}>{pokemon.name}</Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const result = await store.dispatch(getPokemonList.initiate());
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      pokemonList: result.data?.results,
    },
  };
});

export default Home;
