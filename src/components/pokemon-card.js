import React, { useState } from "react";
import styled from "@emotion/styled";
import { FaInfoCircle } from "react-icons/fa";

import Image from "./poke-image";

const PokemonCard = styled.div`
    background: ${props => (props.selected ? "#99CDFF" : "#D1E9FF")};
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    margin: 0 auto;
    padding-top: 0.5rem;
    width: 250px;
    cursor: pointer;
    position: relative;
`;

const Icon = styled(FaInfoCircle)`
    position: absolute;
    font-size: 1.5rem;
    right: 1.5rem;
    top: 1rem;
`;

const HiddenInfo = styled.div`
    display: ${props => (props.hidden ? "none" : "block")};
`;

// when pokemon is clicked on, change bg color and add that pokemon to the party cards at the top of the page

export default ({ pokemon, handleClick, selected }) => {
    const [hidden, setHidden] = useState(true);

    console.log(pokemon);
    return (
        <PokemonCard
            onClick={() => {
                console.log("clicked card");
                selected ? handleClick(null) : handleClick(pokemon.pokemon.id);
            }}
            selected={selected}
        >
            <Icon
                onClick={e => {
                    console.log("clicked hiddeninfo");
                    setHidden(!hidden);
                    e.stopPropagation();
                }}
            />
            <Image name={pokemon.pokemon.name} />
            <h2>{pokemon.pokemon.name}</h2>
            <HiddenInfo hidden={hidden}>
                <p>HP: {pokemon.pokemon.hp}</p>
                <p>Moves:</p>
                <p>
                    {pokemon.pokemon.moves[0].move.name}{" "}
                    {pokemon.pokemon.moves[0].move.power}{" "}
                    {pokemon.pokemon.moves[0].move.type.name}
                </p>
                <p>
                    {pokemon.pokemon.moves[1].move.name}{" "}
                    {pokemon.pokemon.moves[1].move.power}{" "}
                    {pokemon.pokemon.moves[1].move.type.name}
                </p>
            </HiddenInfo>
        </PokemonCard>
    );
};
