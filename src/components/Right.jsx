import { useEffect, useState } from "react";
import PokemonDetails from "./sub-components/PokemonDetails";

function Right({ pokemon, openModal, openSecondModal }) {
  const [showRight, setShowRight] = useState(false); // Impostato su false di default

  const openPokedex = () => {
    setShowRight(!showRight); // Mostra il componente Right quando si clicca su "Right back"
  };

  return (
    <div id="right" className="relative right-open">
      <div id="bg_curve1_right"></div>
      <div id="bg_curve2_right"></div>
      <div id="curve1_right">
        {pokemon && (
          <>
            <PokemonDetails pokemon={pokemon} />

            {/* Button Stats */}
            <button
              type="button"
              className="absolute ml-4 mt-2 mb-20 rounded border border-2"
              onClick={openModal}
            >
              <div className="button-top">
                {/* <img className="info" src={Info} alt="" /> */}
                More Info
              </div>
              <div className="button-bottom"></div>
              <div className="button-base"></div>
            </button>

            {/* Button Evolution */}
            <button
              type="button-evolution"
              className="absolute ml-60 mt-2 mb-20 bg-blue-200 rounded border border-2"
              onClick={openSecondModal}
            >
              <div className="button-top-evolution">Show Evolution</div>
              <div className="button-bottom-evolution"></div>
              <div className="button-base-evolution"></div>
            </button>
          </>
        )}
      </div>
      <div id="curve2_right"></div>
    </div>
  );
}

export default Right;


// import { useEffect, useState } from "react";
// import PokemonDetails from "./sub-components/PokemonDetails";

// function Right({ pokemon, openModal, openSecondModal, filteredPokemons }) {
//   const [showRight, setShowRight] = useState(false); // Impostato su false di default

//   const openPokedex = () => {
//     setShowRight(!showRight); // Mostra il componente Right quando si clicca su "Right back"
//   };

//   return (
//     <div id="right" className="relative right-open">
//       <div id="bg_curve1_right"></div>
//       <div id="bg_curve2_right"></div>
//       <div id="curve1_right">
//         {pokemon && (
//           <>
//             <PokemonDetails pokemon={pokemon} />

//             {/* Button Stats */}
//             <button
//               type="button"
//               className="absolute ml-4 mt-2 mb-20 rounded border border-2"
//               onClick={openModal}
//             >
//               <div className="button-top">
//                 {/* <img className="info" src={Info} alt="" /> */}
//                 More Info
//               </div>
//               <div className="button-bottom"></div>
//               <div className="button-base"></div>
//             </button>

//             {/* Button Evolution */}
//             <button
//               type="button-evolution"
//               className="absolute ml-60 mt-2 mb-20 bg-blue-200 rounded border border-2"
//               onClick={openSecondModal}
//             >
//               <div className="button-top-evolution">Show Evolution</div>
//               <div className="button-bottom-evolution"></div>
//               <div className="button-base-evolution"></div>
//             </button>
//           </>
//         )}
//       </div>
//       <div id="curve2_right"></div>
//     </div>
//   );
// }

// export default Right;
