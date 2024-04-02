import { useState, useEffect } from "react";
import RadarChart from "./RadarChart"; // Assicurati di importare il componente RadarChart

const EvolutionChain = ({ evolutionChain, pokemon }) => {
  const [evolutionData, setEvolutionData] = useState(null);

  useEffect(() => {
    const fetchEvolutionData = async (chain) => {
      const { species, evolves_to } = chain;
      if (!species) return;

      // Ottieni i dati del Pokémon corrente
      const currentPokemonData = await fetchPokemonData(species.name);

      // Aggiungi i dati del Pokémon corrente alla lista delle evoluzioni
      setEvolutionData((prevState) => ({
        ...prevState,
        [species.name]: currentPokemonData
      }));

      // Richiama ricorsivamente fetchEvolutionData per ogni evoluzione
      if (evolves_to && evolves_to.length > 0) {
        evolves_to.forEach(async (evolution) => {
          await fetchEvolutionData(evolution);
        });
      }
    };

    fetchEvolutionData(evolutionChain);
  }, [evolutionChain]);

  // Funzione per recuperare i dati del Pokémon da API
  const fetchPokemonData = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const pokemonData = await response.json();
      return pokemonData;
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      return null;
    }
  };

  // Funzione ricorsiva per rendere le evoluzioni
  const renderEvolution = (chain) => {
    const { species, evolves_to } = chain;

    if (!species) return null;

    return (
      <div key={species.name} className="flex flex-col-reverse justify-center items-center">
        <div className="flex justify-around items-center gap-2">
          {/* Mostra l'immagine e il nome del Pokémon corrente */}
          <p className="text-xl text-pokemon-evolution">{species.name}</p>
          {evolutionData && evolutionData[species.name] && (
            <img
              src={evolutionData[species.name].sprites.other["official-artwork"].front_default}
              alt={species.name}
              className="pokemon-evolution-img"
            />
          )}
          <span className="text-xl text-pokemon-evolution animate-bounce">&harr;</span>
          {evolutionData && evolutionData[species.name] && (
            // Mostra il grafico radar per il Pokémon corrente
            <div className="radar-chart-container">
              <RadarChart pokemon={evolutionData[species.name]} />
            </div>
          )}
        </div>
        
        {/* Renderizza le evoluzioni ricorsivamente */}
        {evolves_to && evolves_to.length > 0 && (
          <div className="flex">
            {evolves_to.map((evolution) => (
              <div key={evolution.species.name}>
                {renderEvolution(evolution)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return <div>{evolutionData && renderEvolution(evolutionChain)}</div>;
};

export default EvolutionChain;



