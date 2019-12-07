import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { GoInfo } from "react-icons/go";

import Image from "./poke-image";

const PokemonCard = styled.div`
    background: ${props => (props.selected ? "#99CDFF" : "#D1E9FF")};
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    margin: 0 auto;
    padding-top: 0.5rem;
    width: 250px;
    height: fit-content;
    cursor: pointer;
    position: relative;
`;

const Icon = styled(GoInfo)`
    position: absolute;
    font-size: 1.75rem;
    right: 1.5rem;
    top: 1rem;
`;

const Name = styled.h2`
    margin-bottom: 0;
`;

const ImageWrapper = styled.div`
    width: 150px;
    height: 150px;
    margin: 1rem auto 0;
`;

const TypeWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
`;

const HiddenInfo = styled.div`
    max-height: ${props => (props.invisible ? "0" : "80px")};
    overflow: ${props => (props.invisible ? "hidden" : "auto")};
    transition: all 0.2s ease-in-out;
    line-height: 1;
    margin-bottom: ${props => (props.invisible ? "0" : "1rem")};

    p:first-of-type {
        margin-top: 0;
    }
`;

export default ({
    pokemon,
    handlePokemonSelect,
    selected,
    openInfo,
    handleInfoClick,
}) => {
    return (
        <PokemonCard
            onClick={() => {
                if (handlePokemonSelect) {
                    handlePokemonSelect(pokemon);
                }
            }}
            selected={selected}
        >
            {handleInfoClick && (
                <Icon
                    onClick={e => {
                        handleInfoClick(pokemon.id);
                        e.stopPropagation(); // stops the click event from bubbling up to PokemonCard (don't want to trigger a "select")
                    }}
                />
            )}
            <ImageWrapper>
                <Image
                    name={pokemon.name}
                    css={css`
                        margin-top: 0.5rem;
                    `}
                />
            </ImageWrapper>
            <Name>{pokemon.name}</Name>
            <TypeWrapper>
                <p>{pokemon.types[0].type.name}</p>
                {pokemon.types[1] && <p>{pokemon.types[1].type.name}</p>}
            </TypeWrapper>
            <HiddenInfo invisible={!openInfo}>
                <p>HP: {pokemon.hp}</p>
                <p>
                    {pokemon.moves[0].move.name} {pokemon.moves[0].move.power}{" "}
                    {pokemon.moves[0].move.type.name}
                </p>
                {pokemon.moves[1] && (
                    <p>
                        {pokemon.moves[1].move.name}{" "}
                        {pokemon.moves[1].move.power}{" "}
                        {pokemon.moves[1].move.type.name}
                    </p>
                )}
            </HiddenInfo>
        </PokemonCard>
    );
};
