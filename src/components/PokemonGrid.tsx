
"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { getPokemonList } from "@/lib/pokemon";
import { pokemonKeys } from "@/lib/queries";
import PokemonCard from "@/components/PokemonCard";
interface PokemonGridProps {
  limit: number;
  offset: number;
}

export default function PokemonGrid({
  limit,
  offset,
}: PokemonGridProps) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: pokemonKeys.list(limit, offset),
    queryFn: () => getPokemonList(limit, offset),
  });

  if (isPending) {
    return <p>Cargando Pokémon...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="pokemon-grid">
      {data.results.map((pokemon) => {
        const id = Number(
          pokemon.url.split("/").filter(Boolean).pop()
        );

        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        return (
          <Link
            href={`/pokemon/${id}`}
            className="pokemon-card"
            key={id}
          >
            <img
              src={image}
              alt={pokemon.name}
              width={160}
              height={160}
            />

            <h2>{pokemon.name}</h2>

            <span>
              #{String(id).padStart(3, "0")}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
