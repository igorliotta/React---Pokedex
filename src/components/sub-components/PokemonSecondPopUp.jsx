import React, { useState, useEffect } from "react";
import RadarChart from "./RadarChart";
import PokemonThirthPopUp from "./PokemonThirthPopUp";

function PokemonSecondPopUp({ pokemon, onClose }) {
  const [showThirthPopup, setShowThirthPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleEvolutionClick = () => setShowThirthPopup(true);
  const handleEvolutionClickClose = () => setIsClosing(true);

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        onClose();
      }, 500); // Tempo dell'animazione fade-out

      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  return (
    <div className={`pokemon-second-popup fade-in ${isClosing ? "fade-out" : ""}`}>
      <div className="popup-content">
        <div className="icons-pop-up">
          <span className="text-black" onClick={handleEvolutionClick}>
            <i className="fa-solid fa-arrow-up-right-dots icon-evolution"></i>
          </span>
          <span className="icon-close-popup" onClick={handleEvolutionClickClose}>
            &times;
          </span>
        </div>
        <RadarChart pokemon={pokemon} />
      </div>
      {showThirthPopup && <PokemonThirthPopUp onClose={onClose} pokemon={pokemon} />}
      <style jsx>{`
        .pokemon-second-popup {
          height: 300px;
          position: fixed;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 30px;
          border: 2px solid black;
          border-radius: 10px;
          z-index: 1001;
          box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
            rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
            rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
            rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
            rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
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

export default PokemonSecondPopUp;


