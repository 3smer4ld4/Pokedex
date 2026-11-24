
import {
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { notFound } from "next/navigation";

import { makeQueryClient } from "@/lib/queryClient";
import { getPokemonDetails } from "@/lib/pokemon";
import { pokemonKeys } from "@/lib/queries";

import PokemonDetail from "@/components/PokemonDetail";

interface PokemonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PokemonPage({
  params,
}: PokemonPageProps) {
  const { id } = await params;

  const pokemonId = Number(id);

  // Validar el identificador
  if (!Number.isInteger(pokemonId) || pokemonId < 1) {
    notFound();
  }

  const queryClient = makeQueryClient();

  // Precargar los detalles en el servidor
  await queryClient.prefetchQuery({
    queryKey: pokemonKeys.detail(pokemonId),
    queryFn: () => getPokemonDetails(pokemonId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetail id={pokemonId} />
    </HydrationBoundary>
  );
}
