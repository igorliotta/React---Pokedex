import { useState, useEffect } from "react";
import BackgroundPokedex from "../images/bg-2.avif";

function Left({ onClick, onSelectPokemon, onPokemonData, onEvolutionData, openAllPokemonsModal }) {
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [selectedGeneration, setSelectedGeneration] = useState("all");
  const [generations, setGenerations] = useState([]);

  // useState che mi permette di gestire la ricerva sulle evoluzioni del pokemon
  const [evolutionChainUrl, setEvolutionChainUrl] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((response) => response.json())
      .then((data) => {
        const pokemonResults = data.results;

        Promise.all(
          pokemonResults.map((pokemon) =>
            fetch(pokemon.url)
              .then((response) => response.json())
              .then((data) => data)
          )
        ).then((pokemonData) => {
          onPokemonData(pokemonData);
          setPokemons(pokemonData);
        });

      });
  }, [onPokemonData]);

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

    fetchGenerations();
  }, []);

  useEffect(() => {
    if (pokemons.length > 0) {
      onSelectPokemon(pokemons[currentPokemonIndex]);
      // Set evolution chain URL
      setEvolutionChainUrl(pokemons[currentPokemonIndex].species.url);
    }
  }, [currentPokemonIndex, onSelectPokemon, pokemons]);

  useEffect(() => {
    if (evolutionChainUrl) {
      fetch(evolutionChainUrl)
        .then((response) => response.json())
        .then((data) => {
          // Handle evolution chain data as needed
          // console.log(data);
          // Pass evolution data to parent component
          onEvolutionData(data);
        })
        .catch((error) => console.error("Error fetching evolution chain:", error));
    }
  }, [evolutionChainUrl, onEvolutionData]);

  const handleNextPokemon = () => {
    if (currentPokemonIndex < pokemons.length - 1) {
      setCurrentPokemonIndex(currentPokemonIndex + 1);
    }
  };

  const handlePreviousPokemon = () => {
    if (currentPokemonIndex > 0) {
      setCurrentPokemonIndex(currentPokemonIndex - 1);
    }
  };

  return (
    <div id="left">
      <div id="logo"></div>
      <div id="bg_curve1_left"></div>
      <div id="bg_curve2_left">
      <div className="bg-black w-96"></div>
      </div>
      <div id="curve1_left">
        <div id="buttonGlass">
          {" "}
          <div id="reflect"></div>
        </div>
        <div id="miniButtonGlass1" onClick={onClick}></div>
        <div id="miniButtonGlass2"></div>
        <div id="miniButtonGlass3" className="animate-pulse"></div>
      </div>
      <div id="curve2_left">
        <button className="bg-slate-100 rounded border-2 text-xs button-all-pokemon"onClick={openAllPokemonsModal}>All Pokemons</button>
        <div id="junction">
          <div id="junction1"></div>
          <div id="junction2"></div>
        </div>
      </div>

      <div id="screen">
        {pokemons.length > 0 && (
          <div>
            <div id="topPicture">
              <div id="buttontopPicture1"></div>
              <div id="buttontopPicture2"></div>
            </div>
            <div id="picture" style={{ backgroundImage:`url(${BackgroundPokedex})` }}>
              <img
                className="pokemon-img w-22"
                src={pokemons[currentPokemonIndex].sprites.other.home.front_default}
                alt={pokemons[currentPokemonIndex].name}
                height=""
              />
            </div>
            <div id="buttonbottomPicture" className="animate-pulse"></div>
            {/* Qui va la select */}
            <div id="speakers">
              <div className="sp"></div>
              <div className="sp"></div>
              <div className="sp"></div>
              <div className="sp"></div>
            </div>
          </div>
        )}
      </div>

      <div id="bigbluebutton"></div>
      <div id="barbutton1"></div>
      <div id="barbutton2"></div>
      <div id="cross">
        <div id="leftcross" onClick={handlePreviousPokemon}>
          <div id="leftT"></div>
        </div>
        <div id="topcross">
          <div id="upT"></div>
        </div>
        <div id="rightcross" onClick={handleNextPokemon}>
          <div id="rightT"></div>
        </div>
        <div id="midcross">
          <div id="midCircle"></div>
        </div>
        <div id="botcross">
          <div id="downT"></div>
        </div>
      </div>
    </div>
  );
}

export default Left;





