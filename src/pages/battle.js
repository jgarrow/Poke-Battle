import React from "react";

export default ({ location }) => {
    const { trainerName, party, oppParty } = location.state;
    const trainerType = location.state.selectedTrainer.name;
    const opponent = location.state.opponent.name;

    return (
        <div>
            <h1>Battle Page</h1>
            <h2>trainerName: {trainerName}</h2>
            <p>selectedTrainer: {trainerType}</p>
            {party.map(pokemon => (
                <p key={pokemon.id}>{pokemon.name}</p>
            ))}
            <h2>Opponent: {opponent}</h2>
            {oppParty.map(pokemon => (
                <p key={pokemon.pokemon.id}>{pokemon.pokemon.name}</p>
            ))}
        </div>
    );
};
