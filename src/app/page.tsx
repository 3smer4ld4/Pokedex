import Pagination from "@/components/Pagination";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/queryClient";
import { getPokemonList } from "@/lib/pokemon";
import { pokemonKeys } from "@/lib/queries";
import PokemonGrid from "@/components/PokemonGrid";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

const LIMIT = 50;

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const requestedPage = Number(params.page ?? "1");

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const offset = (currentPage - 1) * LIMIT;

  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: pokemonKeys.list(LIMIT, offset),
    queryFn: () => getPokemonList(LIMIT, offset),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <h1>Pokédex</h1>

        <p>
          Explora los Pokémon. Página {currentPage}.
        </p>

        <PokemonGrid limit={LIMIT} offset={offset} />
        <Pagination
  currentPage={currentPage}
  totalPages={Math.ceil(1025 / LIMIT)}
/>
      </main>
    </HydrationBoundary>
  );
}
