import RadarChart from "./RadarChart"; 

function Modal({ onClose, pokemon }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content flex flex-col justify-center items-center relative">
        <div className="flex gap-10 justify-center items-center">
          {pokemon && (
            <img
              className="pokemon-image-modal"
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
          )}
          <span className="close" onClick={onClose}>
            <span className="absolute top-0 right-5">&times;</span>
            <div className="absolute top-4 right-5 flex items-center gap-2">
              <span className="modal-title">Stats Here</span>
              <img className="w-4 h-4 mt-4" src="public/poke-back.png" alt="" />
            </div>
          </span>
        </div>
        <RadarChart pokemon={pokemon} /> 
      </div>
    </div>
  );
}

export default Modal;


