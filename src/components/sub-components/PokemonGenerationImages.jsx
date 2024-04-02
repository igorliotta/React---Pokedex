import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonPopUp from "./PokemonPopUp";

const PokemonGenerationImages = ({ generation, pokemons }) => {
  const [selectedGeneration, setSelectedGeneration] = useState(generation);
  const [generationData, setGenerationData] = useState(null);
  const [pokemonImages, setPokemonImages] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [nameFilter, setNameFilter] = useState(""); // Aggiunto stato per il filtro per nome

  useEffect(() => {
    const fetchGenerationData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/generation/${selectedGeneration}`
        );
        console.log("Generation Data:", response.data);
        setGenerationData(response.data);

        const pokemonSpeciesUrls = response.data.pokemon_species.map(
          (species) => species.url
        );

        const pokemonDetailsPromises = pokemonSpeciesUrls.map((url) =>
          axios.get(url)
        );
        const pokemonDetailsResponses = await Promise.all(
          pokemonDetailsPromises
        );
        const pokemonDetails = pokemonDetailsResponses.map(
          (response) => response.data
        );

        const pokemonImages = {};
        pokemonDetails.forEach((pokemon) => {
          const pokemonId = pokemon.id;
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
          pokemonImages[pokemonId] = imageUrl;
        });

        setPokemonImages(pokemonImages);
      } catch (error) {
        console.error("Error fetching generation data:", error);
      }
    };

    fetchGenerationData();
  }, [selectedGeneration]);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleGenerationChange = (event) => {
    setSelectedGeneration(event.target.value);
  };

  // Funzione per gestire il cambiamento del filtro per nome
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  return (
    <>
      <div className="card-pokemons-container-2 flex justify-center flex-wrap gap-5">
        <div className="select-generation-container mb-4 bg-zinc-600 p-4 rounded flex">
          <h1 className="title-select mr-2">Generation:</h1>
          <select
            value={selectedGeneration}
            onChange={handleGenerationChange}
          >
            <option value="generation-i">Generation I</option>
            <option value="generation-ii">Generation II</option>
            <option value="generation-iii">Generation III</option>
            <option value="generation-iv">Generation IV</option>
            <option value="generation-v">Generation V</option>
            <option value="generation-vi">Generation VI</option>
            <option value="generation-vii">Generation VII</option>
            <option value="generation-viii">Generation VIII</option>
          </select>
        </div>

        {/* Filtro per nome */}
        <div className="mb-4 bg-zinc-600 p-4 rounded flex items-center">
          <div className="form__group_one">
            <input
              type="text"
              className="form__group_oneform__field w-100"
              placeholder="Input text"
              value={nameFilter} // Collega il valore dell'input allo stato
              onChange={handleNameFilterChange} // Gestisce il cambiamento dell'input
            />
            <label htmlFor="name" className="form__group_oneform__label mr-2">
              Pokemon
            </label>
          </div>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-10">
  {Object.keys(pokemonImages).some(pokemonId => {
    const currentPokemon = pokemons[pokemonId - 1];
    return (
      currentPokemon &&
      currentPokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }) ? (
    Object.keys(pokemonImages).map(pokemonId => {
      const currentPokemon = pokemons[pokemonId - 1];
      if (
        currentPokemon &&
        currentPokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return (
          <div key={pokemonId} className="cards">
            <figure className="card">
              <img
                src={pokemonImages[pokemonId]}
                alt={`Pokemon ${pokemonId}`}
                className="pokemon-3d-card-img"
                onClick={() => handlePokemonClick(currentPokemon)}
              />
            </figure>
            <figcaption className="card_title">
              {currentPokemon.name}
            </figcaption>
          </div>
        );
      } else {
        return null;
      }
    })
  ) : (
    <div className="cards">
      <p className="pokemon-not-found animate-bounce">Pokemon Not Found!</p>
    </div>
  )}
</div>

        {/* Visualizza il popup se è stato selezionato un Pokémon */}
        {showPopup && selectedPokemon && (
          <PokemonPopUp pokemon={selectedPokemon} onClose={handleClosePopup} />
        )}
      </div>
    </>
  );
};

export default PokemonGenerationImages;

