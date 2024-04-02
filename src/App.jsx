import { useState } from "react";
import "./styles/style.css";
import Left from "./components/Left";
import Right from "./components/Right";
import Rightback from "./components/RightBack";
import PokedexLogo from "./images/logoo.png";
import Modal from "./components/sub-components/Modal";
import SecondModal from "./components/sub-components/SecondModal";
import AllPokemonsModal from "./components/sub-components/AllPokemonsModal";
import Credits from "./images/credits.png";

function App() {
  const [showPokedex, setShowPokedex] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [showRight, setShowRight] = useState(false);
  const [evolutionData, setEvolutionData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isAllPokemonsModalOpen, setIsAllPokemonsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSecondModal = () => {
    setIsSecondModalOpen(true);
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
  };

  const openAllPokemonsModal = () => {
    // Funzione per aprire la modale per tutti i Pokémon
    setIsAllPokemonsModalOpen(true);
  };

  const closeAllPokemonsModal = () => {
    // Funzione per chiudere la modale per tutti i Pokémon
    setIsAllPokemonsModalOpen(false);
  };

  const closeRight = () => {
    setShowRight(false);
  };

  const togglePokedex = () => {
    setShowPokedex((prevState) => !prevState);
  };

  const handleSelectPokemon = (pokemon) => {
    setCurrentPokemon(pokemon);
  };

  const openPokedex = () => {
    setShowRight(!showRight);
  };

  const hideRightBack = () => {
    setShowRight(false);
  };

  const handleEvolutionData = (evolutionData) => {
    setEvolutionData(evolutionData);
  };

  return (
    <>
      <div className="mt-10">
        <img
          src={PokedexLogo}
          alt=""
          className="w-auto h-22 m-auto cursor-pointer-2 animate-bounce logo"
          onClick={togglePokedex}
        />
        <div
          className={`pokedex-container ${
            showPokedex ? "show animate-slide-in" : "show animate-slide-out"
          }`}
        >
          <div id="pokedex">
            <Left
              onClick={openPokedex}
              onPokemonData={(data) => {
                setPokemons(data);
              }}
              onSelectPokemon={handleSelectPokemon}
              onEvolutionData={handleEvolutionData}
              openAllPokemonsModal={openAllPokemonsModal} // Passa la funzione per aprire la modale per tutti i Pokémon
            />
            {showRight ? (
              <Right
                pokemon={currentPokemon}
                evolutionData={evolutionData}
                openModal={openModal}
                openSecondModal={openSecondModal}
              />
            ) : (
              <Rightback onClick={openPokedex} />
            )}
          </div>
          {isModalOpen && (
            <Modal onClose={closeModal} pokemon={currentPokemon} />
          )}
          {isSecondModalOpen && (
            <SecondModal
              onCloseSecondModal={closeSecondModal}
              pokemon={currentPokemon}
            />
          )}
          {isAllPokemonsModalOpen && (
            <AllPokemonsModal
              onCloseAllPokemonsModal={closeAllPokemonsModal}
              pokemons={pokemons} // Passa l'array dei Pokémon come prop
            />
          )}
        </div>
      </div>
      <figure className="credits">
        <img src={Credits} alt="" />
      </figure>
    </>
  );
}

export default App;



