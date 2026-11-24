
// Respuesta de la lista de Pokémon
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// Información básica de cada Pokémon
export interface PokemonListItem {
  name: string;
  url: string;
}

// Estadísticas
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

// Tipos de Pokémon
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

// Habilidades
export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

// Imágenes
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    ["official-artwork"]?: {
      front_default: string | null;
      front_shiny: string | null;
    };
    home?: {
      front_default: string | null;
    };
  };
}

// Información completa de un Pokémon
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonSpeciesResponse {
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChainResponse {
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
}

export type PokemonDetails = Pokemon & {
  evolutionChain: EvolutionChainLink;
};
