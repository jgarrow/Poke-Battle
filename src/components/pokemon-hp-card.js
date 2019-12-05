import React, { useState } from "react";

export default props => {
    const [hp, setHp] = useState();

    return (
        <div>
            <div className="party-pokeballs"></div>
            <div className="pokemon-info-container">
                <h4>{props.pokemonName}</h4>
                <label htmlFor="hp">HP</label>
                {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress */}
                {/* let health = document.getElementById("health")
    health.value -= 10; //Or whatever you want to do with it. */}
                {/* https://loading.io/progress/ */}
                <progress id="hp" max={props.hp} value={props.hp}>
                    {props.hp}
                </progress>
            </div>
        </div>
    );
};
