import React, { useState, useEffect } from "react";
import PokemonPopUp from "./PokemonPopUp";
import axios from "axios";
import PokemonGenerationImages from "./PokemonGenerationImages";

function AllPokemonsModal({ onCloseAllPokemonsModal, pokemons }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedGeneration, setSelectedGeneration] = useState("all");
  const [selectedType, setSelectedType] = useState("all"); // Nuovo stato per il tipo selezionato
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialSelectVisible, setInitialSelectVisible] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const [types, setTypes] = useState([]); // Nuovo stato per i tipi di Pokémon

  useEffect(() => {
    async function fetchGenerations() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/generation"
        );
        const { results } = response.data;
        setGenerations(results);
      } catch (error) {
        console.error("Error fetching generations:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchPokemonTypes() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        const { results } = response.data;
        setTypes(results);
      } catch (error) {
        console.error("Error fetching Pokemon types:", error);
      }
    }

    fetchGenerations();
    fetchPokemonTypes();
  }, []);

  const openPopup = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closePopup = () => {
    setSelectedPokemon(null);
  };

  const handleGenerationChange = (event) => {
    setSelectedGeneration(event.target.value);
    setInitialSelectVisible(false);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };
  

  return (
    <div className="modal-overlay ">
      <div className="modal-content flex flex-col items-center relative">
        <div className="flex gap-10 justify-center items-center mb-12">
          <div className="close">
            <span
              className="absolute top-0 right-5"
              onClick={onCloseAllPokemonsModal}
            >
              &times;
            </span>
            <p className="modal-title absolute top-4 right-5 flex items-center gap-2">
              <span>All Pokemons</span>
              <img className="w-4 h-4" src="public/poke-back.png" alt="" />
            </p>
          </div>
        </div>

        {initialSelectVisible && (
          <>
            <div className="flex gap-2">
              <div className="select-generation-container mb-4 bg-zinc-600 p-4 rounded">
                <label htmlFor="generation" className="title-select mr-2">
                  Generazion:{" "}
                </label>
                <select
                  id="generation"
                  value={selectedGeneration}
                  onChange={handleGenerationChange}
                >
                  <option value="all">All generations</option>
                  {loading ? (
                    <option value="" disabled>
                      Loading...
                    </option>
                  ) : (
                    generations.map((generation, index) => (
                      <option key={index} value={generation.name}>
                        {generation.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="select-type-container mb-4 bg-zinc-600 p-4 rounded">
                <label htmlFor="type" className="title-select mr-2">
                  Type:{" "}
                </label>
                <select
                  id="type"
                  value={selectedType}
                  onChange={handleTypeChange}
                >
                  <option value="all">All types</option>
                  {types.map((type, index) => (
                    <option key={index} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 bg-zinc-600 p-4 rounded flex items-center">
                <div className="form__group_one">
                  <input
                    type="text"
                    className="form__group_oneform__field w-100"
                    placeholder="Input text"
                    value={nameFilter}
                    onChange={handleNameFilterChange}
                  />
                  <label
                    htmlFor="name"
                    className="form__group_oneform__label mr-2"
                  >
                    Pokemon
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedGeneration !== "all" && (
          <PokemonGenerationImages
            generation={selectedGeneration}
            pokemons={pokemons}
            className="mt-10"
          />
        )}
        <div className="card-pokemons-container p-10">
  <div className="flex flex-wrap justify-around items-center card-pokemon-modal">
    {pokemons
      .filter((pokemon) =>
        selectedGeneration === "all"
          ? true
          : pokemon.versions
          ? Object.values(pokemon.versions).some((version) =>
              version.name
                .toLowerCase()
                .includes(selectedGeneration.toLowerCase())
            )
          : false
      )
      .filter((pokemon) =>
        selectedType === "all" || pokemon.types.some(type => type.type.name === selectedType)
      )
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
      .map((pokemon, index) => (
        <div key={index} className="cards mb-10">
          <figure className="card" onClick={() => openPopup(pokemon)}>
            <img
              src={pokemon.sprites.other.home.front_default}
              alt={pokemon.name}
              className="pokemon-3d-card-img"
            />
            <figcaption className="card_title">
              {pokemon.name}
            </figcaption>
          </figure>
        </div>
      ))}
  </div>
  {pokemons.filter((pokemon) =>
    selectedGeneration === "all"
      ? true
      : pokemon.versions
      ? Object.values(pokemon.versions).some((version) =>
          version.name
            .toLowerCase()
            .includes(selectedGeneration.toLowerCase())
        )
      : false
  )
  .filter((pokemon) =>
    selectedType === "all" || pokemon.types.some(type => type.type.name === selectedType)
  )
  .filter((pokemon) =>
    pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())
  ).length === 0 && ( // Se nessun Pokemon viene trovato
    <div className="cards flex jusify-center">
      <p className="pokemon-not-found animate-bounce"></p>
    </div>
  )}
</div>

      </div>
      {selectedPokemon && (
        <PokemonPopUp pokemon={selectedPokemon} onClose={closePopup} />
      )}
    </div>
  );
}

export default AllPokemonsModal;

