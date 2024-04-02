import React, { useState, useEffect } from "react";
import PokemonSecondPopUp from "./PokemonSecondPopUp"; // Importa il secondo popup

function PokemonPopUp({ pokemon, onClose }) {
  const [showSecondPopup, setShowSecondPopup] = useState(false); // Stato per gestire la visibilità del secondo popup
  const [isClosing, setIsClosing] = useState(false);

  // Gestore di eventi per il click sull'icona della lente
  const handleLensClick = () => setShowSecondPopup(true);

  const handleLensClickClose = () => setIsClosing(true);

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        onClose();
      }, 500); // Tempo dell'animazione fade-out

      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  return (
    <div className={`pokemon-popup fade-in ${isClosing ? "fade-out" : ""}`}>
      <div className="popup-content">
        <div className="icons-pop-up">
          <i
            className="fa-solid fa-chart-column text-xs text-cyan-400 icon-graphic-popup"
            onClick={handleLensClick} // Aggiungi l'evento onClick per gestire il click sull'icona della lente
          ></i>
          <span className="icon-close-popup" onClick={handleLensClickClose}>
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
        <p className="flex items-center gap-2 ml-2">
          <span className="font-bold info-card">Name: </span>
          <span className="popup-text">{pokemon.name}</span>
        </p>
        <p className="flex items-center gap-2 ml-2">
          <span className="font-bold info-card">Height: </span>
          <span className="popup-text">{pokemon.height}</span>
        </p>
        <p className="flex items-center gap-2 ml-2">
          <span className="font-bold info-card">Weight:</span>
          <span className="popup-text">{pokemon.weight} kg</span>
        </p>
        <p className="mt-2 mb-2 flex items-center gap-2 ml-2">
          <span className="font-bold info-card">Abilities: </span>{" "}
          <span className="popup-text">
            {pokemon.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </span>
        </p>
        <p className="flex items-center gap-2 ml-2">
          <span className="font-bold info-card">Types: </span>{" "}
          <span className="popup-text">
            {pokemon.types.map((type) => type.type.name).join(", ")}
          </span>
        </p>
      </div>
      {/* Mostra il secondo popup solo se showSecondPopup è true */}
      {showSecondPopup && (
          <PokemonSecondPopUp pokemon={pokemon} onClose={handleLensClickClose} />
        )}

      <style jsx>{`
        .pokemon-popup {
          position: fixed;
          top: 52%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border: 2px solid black;
          border-radius: 10px;
          z-index: 1000;
          box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
        }

        .popup-content {
          margin-top: 10px;
        } 

        .icons-pop-up {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .text-black {
          color: black;
          cursor: pointer;
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

        .font-bold {
          font-weight: bold;
        }

        .popup-text {
          color: black;
        }
      `}</style>
    </div>
  );
}

export default PokemonPopUp;


