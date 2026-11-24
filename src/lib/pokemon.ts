
import type {
  Pokemon,
  PokemonListResponse,
  PokemonSpeciesResponse,
  EvolutionChainResponse,
  PokemonDetails,
} from "@/types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

// Obtener una lista de Pokémon
export async function getPokemonList(
  limit: number = 50,
  offset: number = 0
): Promise<PokemonListResponse> {
  const response = await fetch(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`,
    {
      next: {
        revalidate: 86400,
      },
    }
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener la lista de Pokémon");
  }

  return response.json();
}

// Obtener información básica de un Pokémon
export async function getPokemon(
  idOrName: string | number
): Promise<Pokemon> {
  const response = await fetch(
    `${API_URL}/pokemon/${idOrName}`,
    {
      next: {
        revalidate: 86400,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`No se pudo obtener el Pokémon: ${idOrName}`);
  }

  return response.json();
}

// Obtener información completa de un Pokémon
export async function getPokemonDetails(
  idOrName: string | number
): Promise<PokemonDetails> {

  // Obtener información general
  const pokemon = await getPokemon(idOrName);

  // Obtener información de su especie
  const speciesResponse = await fetch(
    pokemon.species.url,
    {
      next: {
        revalidate: 86400,
      },
    }
  );

  if (!speciesResponse.ok) {
    throw new Error("No se pudo obtener la especie del Pokémon");
  }

  const species: PokemonSpeciesResponse =
    await speciesResponse.json();

  // Obtener cadena evolutiva
  const evolutionResponse = await fetch(
    species.evolution_chain.url,
    {
      next: {
        revalidate: 86400,
      },
    }
  );

  if (!evolutionResponse.ok) {
    throw new Error("No se pudo obtener la cadena evolutiva");
  }

  const evolutionData: EvolutionChainResponse =
    await evolutionResponse.json();

  return {
    ...pokemon,
    evolutionChain: evolutionData.chain,
  };
}
