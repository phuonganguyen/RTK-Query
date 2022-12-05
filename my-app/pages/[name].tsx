import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

import Layout from "../components/layout";
import { useGetPokemonByNameQuery } from "../lib/pokemonApi";

// Partial because first render (will get empty props while `getStaticProps` runs)
export default function Pokemon() {
  const router = useRouter();
  const name = router.query.name;
  const result = useGetPokemonByNameQuery(
    typeof name === "string" ? name : skipToken,
    {
      // If the page is not yet generated, router.isFallback will be true
      // initially until getStaticProps() finishes running
      skip: router.isFallback,
    }
  );
  const { isLoading, error, data } = result;

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Ops</>;
  }

  return (
    <Layout>
      <Head>
        <title>{data?.species.name ?? ""}</title>
      </Head>
      <article>
        <h3>{data?.species.name}</h3>
        <img src={data?.sprites.front_shiny} alt={data?.species.name} />
      </article>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const store = makeStore();
//   const result = await store.dispatch(getPokemonList.initiate());

//   return {
//     paths: result.data?.results.map((p) => `/${p.name}`).slice(0, 10),
//     fallback: true,
//   };
// }

// export const getStaticProps = wrapper.getStaticProps(
//   (store) => async (context) => {
//     const name = context.params?.name as string;
//     const { isLoading, error, data } = await store.dispatch(
//       getPokemonByName.initiate(name)
//     );

//     await Promise.all(store.dispatch(getRunningQueriesThunk()));
//     return {
//       props: { isLoading, error, data },
//     };
//   }
// );
