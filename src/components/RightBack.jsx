import { useState } from "react";
import Pokeball from "../images/pokeball-back.png";

function RightBack({onClick}) {

  return (
    <>
      <div id="left" >
        <div id="logo"></div>
        <div id="bg_curve1_left"></div>
        <div id="bg_curve22_left">
          <img src={Pokeball} alt="" className="poke-back"/>
        </div>
        <div id="curve1_left">
          <div id="buttonGlass" onClick={onClick}> 
            <div id="reflect"> </div>
          </div>
          <div id="miniButtonGlass1"></div>
          <div id="miniButtonGlass2"></div>
          <div id="miniButtonGlass3"></div>
        </div>
        <div id="curve22_left">
          <div id="junction">
            <div id="junction1"></div>
            <div id="junction2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RightBack;
