
"use client";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import { getPokemonDetails } from "@/lib/pokemon";
import { pokemonKeys } from "@/lib/queries";

interface PokemonCardProps {
  name: string;
  id: number;
}

export default function PokemonCard({
  name,
  id,
}: PokemonCardProps) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: pokemonKeys.detail(id),
      queryFn: () => getPokemonDetails(id),
    });
  };

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link
      href={`/pokemon/${id}`}
      className="pokemon-card"
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
    >
      <img
        src={image}
        alt={name}
        width={160}
        height={160}
      />

      <h2>{name}</h2>

      <span>#{String(id).padStart(3, "0")}</span>
    </Link>
  );
}
