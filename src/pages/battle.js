import React from "react";

export default ({ location }) => {
    return (
        <div>
            <h1>Battle Page</h1>
            <h2>trainerName: {location.state.trainerName}</h2>
            <p>selectedTrainer: {location.state.selectedTrainer.name}</p>
            {location.state.party.map(pokemon => {
                return <p key={pokemon.id}>{pokemon.name}</p>;
            })}
            <h2>Opponent: {location.state.opponent.name}</h2>
            {location.state.oppParty.map(pokemon => {
                return <p key={pokemon.pokemon.id}>{pokemon.pokemon.name}</p>;
            })}
        </div>
    );
};
