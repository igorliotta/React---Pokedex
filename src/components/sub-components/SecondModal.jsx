import EvolutionChain from "./EvolutionChain";
import Loader from "./Loader";
import { useState, useEffect } from "react";

const SecondModal = ({ onCloseSecondModal, pokemon }) => {
  const [evolutionData, setEvolutionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Stato per il caricamento
  const [showLoader, setShowLoader] = useState(true); // Stato per mostrare il loader

  useEffect(() => {
    if (!pokemon) return;

    const fetchEvolutionData = async () => {
      setIsLoading(true); // Imposta isLoading a true prima di iniziare a caricare i dati
      try {
        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();

        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();

        setEvolutionData(evolutionData);
      } catch (error) {
        console.error("Error fetching evolution data:", error);
      } finally {
        setIsLoading(false); // Imposta isLoading a false dopo che i dati sono stati caricati o in caso di errore
        setTimeout(() => {
          setShowLoader(false); // Nasconde il loader dopo 3 secondi
        }, 2500);
      }
    };

    fetchEvolutionData();
  }, [pokemon]);

  return (
    <div className="modal-overlay">
      <div className="modal-content flex flex-col justify-center items-center relative p-2">
        <div className="flex gap-10 justify-center items-center">
          <span className="close">
            <span
              className="absolute top-0 left-5"
              onClick={onCloseSecondModal}
            >
              &times;
            </span>
            <div className="modal-title absolute top-4 left-5">Evolutions</div>
          </span>
          {showLoader && <Loader />} {/* Mostra il loader solo quando showLoader è true */}
          {!showLoader && evolutionData && (
            <div className="flex flex-col items-center">
              {/* Passa i dati del Pokémon direttamente al componente EvolutionChain */}
              <EvolutionChain evolutionChain={evolutionData.chain} pokemon={pokemon} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondModal;

<img className="w-4 h-4 mt-4" src="public/poke-back.png" alt="" />





