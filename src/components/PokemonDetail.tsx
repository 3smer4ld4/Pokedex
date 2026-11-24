
"use client";

import { useQuery } from "@tanstack/react-query";
import type { EvolutionChainLink } from "@/types/pokemon";
import { getPokemonDetails } from "@/lib/pokemon";
import { pokemonKeys } from "@/lib/queries";

interface PokemonDetailProps {
  id: number;
}

export default function PokemonDetail({
  id,
}: PokemonDetailProps) {
  const {
    data: pokemon,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: pokemonKeys.detail(id),
    queryFn: () => getPokemonDetails(id),
  });

  if (isPending) {
    return <p className="loading">Cargando información...</p>;
  }

  if (isError) {
    return (
      <p className="error">
        No se pudo cargar el Pokémon: {error.message}
      </p>
    );
  }

if (!pokemon) {
    return <p className="loading">Cargando información...</p>;
}

  const officialImage =
    pokemon.sprites.other?.["official-artwork"]?.front_default
    ?? pokemon.sprites.front_default;

// Obtener todas las especies de la cadena evolutiva
function getEvolutionNames(
  chain: EvolutionChainLink
): string[] {
  return [
    chain.species.name,
    ...chain.evolves_to.flatMap((evolution) =>
      getEvolutionNames(evolution)
    ),
  ];
}

  const evolutions = getEvolutionNames(pokemon.evolutionChain);

  return (
    <main className="detail-container">
      <a href="/" className="back-link">
        ← Volver a la Pokédex
      </a>

      <section className="detail-header">
        <div className="detail-image">
          {officialImage && (
            <img
              src={officialImage}
              alt={pokemon.name}
            />
          )}
        </div>

        <div className="detail-information">
          <span className="pokemon-number">
            #{String(pokemon.id).padStart(3, "0")}
          </span>

          <h1>{pokemon.name}</h1>

          <div className="pokemon-types">
            {pokemon.types.map((item) => (
              <span
                key={item.type.name}
                className={`type type-${item.type.name}`}
              >
                {item.type.name}
              </span>
            ))}
          </div>

          <div className="physical-data">
            <p>
              <strong>Altura:</strong>{" "}
              {(pokemon.height / 10).toFixed(1)} m
            </p>

            <p>
              <strong>Peso:</strong>{" "}
              {(pokemon.weight / 10).toFixed(1)} kg
            </p>

            <p>
              <strong>Experiencia base:</strong>{" "}
              {pokemon.base_experience ?? "No disponible"}
            </p>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <h2>Estadísticas</h2>

        <div className="stats-list">
          {pokemon.stats.map((stat) => (
            <div className="stat-row" key={stat.stat.name}>
              <span className="stat-name">
                {stat.stat.name.replace("-", " ")}
              </span>

              <span className="stat-value">
                {stat.base_stat}
              </span>

              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${Math.min(stat.base_stat, 200) / 2}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2>Habilidades</h2>

        <div className="abilities-list">
          {pokemon.abilities.map((item) => (
            <div
              className="ability"
              key={item.ability.name}
            >
              <span>{item.ability.name.replace("-", " ")}</span>

              {item.is_hidden && (
                <small>Habilidad oculta</small>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2>Cadena evolutiva</h2>

        <div className="evolution-list">
          {evolutions.map((name, index) => (
            <div className="evolution-item" key={`${name}-${index}`}>
              <span>{name}</span>

              {index < evolutions.length - 1 && (
                <span className="evolution-arrow">→</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2>Sprites</h2>

        <div className="sprites-grid">
          {[
            {
              name: "Frontal",
              image: pokemon.sprites.front_default,
            },
            {
              name: "Frontal shiny",
              image: pokemon.sprites.front_shiny,
            },
            {
              name: "Trasero",
              image: pokemon.sprites.back_default,
            },
            {
              name: "Trasero shiny",
              image: pokemon.sprites.back_shiny,
            },
          ]
            .filter((sprite) => sprite.image)
            .map((sprite) => (
              <div className="sprite-card" key={sprite.name}>
                <img
                  src={sprite.image!}
                  alt={`${pokemon.name} ${sprite.name}`}
                />
                <span>{sprite.name}</span>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
