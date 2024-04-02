function PokemonDetails({ pokemon, }) {
  console.log("Pokemon in PokemonDetails:", pokemon);
  if (!pokemon) return null;

  return (
    <>
      {/* Schermi neri */}
      {/* Primo schermo nero */}
      <div className="w-80 h-40 bg-slate-800 ml-4 mt-12 flex flex-col justify-center items-start border rounded-md right-screen">
        <p className="flex items-center gap-2 ml-2">
          <span className="font-bold info-card">Name: </span>
          <span className="text-slate-100"> {pokemon.name}</span>
        </p>
        <p className="flex items-center gap-2  ml-2">
          <span className="font-bold info-card">Height: </span>
          <span className="text-slate-100"> {pokemon.height}</span>
        </p>
        <p className="flex items-center gap-2  ml-2">
          <span className="font-bold info-card">Weight:</span>
          <span className="text-slate-100">{pokemon.weight} kg</span>
        </p>
        <p className="mt-2 mb-2 flex items-center gap-2  ml-2">
          <span className="font-bold info-card">Ability: </span>{" "}
          <span className="text-slate-100">
            {pokemon.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </span>
        </p>
        <p className="flex items-center gap-2  ml-2">
          <span className="font-bold info-card">Type: </span>{" "}
          <span className="text-slate-100">
            {pokemon.types.map((type) => type.type.name).join(", ")}
          </span>
        </p>
      </div>

      {/* Secondo schermo e terzo schermo */}
     
     <div className="w-40 h-40 bg-slate-800 ml-4 mt-1 flex flex-col justify-center items-start border rounded-md right-screen">
     <p className="font-bold info-card ml-6 mb-2">Normal Version</p>
        <div className="flex justify-center gap-1 p-1 ml-2">
          <img
            className="w-16 h-16"
            src={pokemon.sprites.other.showdown.front_default}
            alt=""
          />
          <img
            className="w-16 h-16"
            src={pokemon.sprites.other.showdown.back_default}
            alt=""
          />
        </div>
     </div>
      <div className="w-40 h-40 bg-slate-800 ml-4 mt-1 flex flex-col justify-center items-start border rounded-md right-screen right-screen-second">
      <p className="font-bold info-card ml-6 mb-2">Shiny Version</p>
        <div className="flex justify-center gap-1 p-1 ml-2">
          <img
            className="w-16 h-16"
            src={pokemon.sprites.other.showdown.front_shiny}
            alt=""
          />
          <img
            className="w-16 h-16"
            src={pokemon.sprites.other.showdown.back_shiny}
            alt=""
          />
        </div>
      </div>
     
    </>
  );
}

export default PokemonDetails;

