import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
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

const Name = styled.h2`
    margin-bottom: 0;
`

const TypeWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
`

const HiddenInfo = styled.div`
    display: ${props => (props.hidden ? "none" : "block")};
`;

// when pokemon is clicked on, change bg color and add that pokemon to the party cards at the top of the page

export default ({ pokemon, handleClick, selected }) => {
    const [hidden, setHidden] = useState(true);

    return (
        <PokemonCard
            onClick={() => {
                console.log("clicked card");
                selected ? handleClick(null) : handleClick(pokemon);
            }}
            selected={selected}
        >
            <Icon
                onClick={e => {
                    console.log("clicked hiddeninfo");
                    setHidden(!hidden);
                    e.stopPropagation(); // stops the click event from bubbling up to PokemonCard (don't want to trigger a "select")
                }}
            />
            <Image name={pokemon.name} css={css`margin-top: 0.5rem;`} />
            <Name>{pokemon.name}</Name>
            <TypeWrapper>
                <p>{pokemon.types[0].type.name}</p>
                {pokemon.types[1] && (
                    <p>{pokemon.types[1].type.name}</p>
                )}
            </TypeWrapper>
            <HiddenInfo hidden={hidden}>
                <p>HP: {pokemon.hp}</p>
                <p>Moves:</p>
                <p>
                    {pokemon.moves[0].move.name}{" "}
                    {pokemon.moves[0].move.power}{" "}
                    {pokemon.moves[0].move.type.name}
                </p>
                <p>
                    {pokemon.moves[1].move.name}{" "}
                    {pokemon.moves[1].move.power}{" "}
                    {pokemon.moves[1].move.type.name}
                </p>
            </HiddenInfo>
        </PokemonCard>
    );
};
