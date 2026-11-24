
export const pokemonKeys = {
  all: ["pokemon"] as const,

  lists: () => [...pokemonKeys.all, "list"] as const,

  list: (limit: number, offset: number) =>
    [...pokemonKeys.lists(), { limit, offset }] as const,

  details: () => [...pokemonKeys.all, "detail"] as const,

  detail: (idOrName: string | number) =>
    [...pokemonKeys.details(), String(idOrName)] as const,
};
