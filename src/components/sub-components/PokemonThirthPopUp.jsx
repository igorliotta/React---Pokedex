import EvolutionChain from "./EvolutionChain";
import { useState, useEffect } from "react";

function PokemonThirthPopUp({ onClose, pokemon }) {
  const [evolutionData, setEvolutionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Stato per il caricamento
  const [showLoader, setShowLoader] = useState(true); // Stato per mostrare il loader
  const [isClosing, setIsClosing] = useState(false);

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

  const handleClosing = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        onClose();
      }, 500); // Tempo dell'animazione fade-out

      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  return (
    <>
      <div
        className={`pokemon-popup-third fade-in ${isClosing ? "fade-out" : ""}`}
      >
        <div className="popup-content">
          <div className="icons-pop-up">
            <span className="text-evolution-popup mr-2">Evolutions</span>
            <span className="icon-close-popup" onClick={handleClosing}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          {!showLoader && evolutionData && (
            <div className="flex flex-col items-center">
              {/* Passa i dati del Pokémon direttamente al componente EvolutionChain */}
              <EvolutionChain
                evolutionChain={evolutionData.chain}
                pokemon={pokemon}
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .pokemon-popup-third {
          width: 500px;
          height: 550px;
          position: fixed;
          top: 26%;
          left: -200px;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border: 2px solid black;
          border-radius: 10px;
          z-index: 1000;
          box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
            rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
            rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
            rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
            rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
            rgba(0, 0, 0, 0.09) 0px 32px 16px;
        }

        .popup-content {
          margin-top: 10px;
        }

        .icons-pop-up {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text-evolution-popup {
          font-size: 18px;
          font-weight: bold;
          color: black;
        }

        .icon-close-popup {
          cursor: pointer;
          font-size: 20px;
        }

        .fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }

        .fade-out {
          opacity: 0;
        }
      `}</style>
    </>
  );
}

export default PokemonThirthPopUp;
