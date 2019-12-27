import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { GoInfo } from "react-icons/go";

import Image from "./poke-image";

const typeBg = {
    Normal: "#A4ACAF",
    Fire: "#FD7D24",
    Water: "#4592C4",
    Electric: "#EED535",
    Grass: "#9BCC90",
    Ice: "#51C4E7",
    Fighting: "#D56723",
    Poison: "#B97FC9",
    Ground: "linear-gradient(180deg, #F7DE3F 0%, #AB9842 100%)",
    Flying: "linear-gradient(180deg, #3DC7EF 0%, #BDB9B8 100%)",
    Psychic: "#F366B9",
    Bug: "#729F3F",
    Rock: "#A38C21",
    Ghost: "#7B62A3",
    Dragon: "linear-gradient(180deg, #53A4CF 0%, #F16E57 100%)",
    Dark: "#707070",
    Steel: "#9EB7B8",
    Fairy: "#FDB9E9",
};

const PokemonCard = styled.div`
    background: ${props => (props.selected ? "#99CDFF" : "#D1E9FF")};
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    margin: 0 auto;
    padding-top: 0.5rem;
    width: 250px;
    height: ${props => (props.invisible ? "290px" : "400px")};
    cursor: pointer;
    position: relative;
    transition: height 0.25s ease-in-out;
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

const Type = styled.p`
    width: 70px;
    height: 25px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background: ${props => typeBg[props.bg]};
`;

const HiddenInfo = styled.div`
    max-height: ${props => (props.invisible ? "0" : "100px")};
    overflow: ${props => (props.invisible ? "hidden" : "auto")};
    transition: all 0.2s ease-in-out;
    line-height: 1;
    margin-bottom: ${props => (props.invisible ? "0" : "1rem")};
`;

const HpContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    width: 100px;
    margin: 0 auto;

    p {
        margin: 0;
    }
`;

const MoveInfoContainer = styled.div`
    display: grid;
    grid-template-columns: minmax(auto, 50%) 1fr 70px;
    grid-template-rows: repeat(2, 50%);
    width: 225px;
    margin: 10px auto 0;
    justify-items: flex-start;
    align-items: center;

    p {
        margin: 0.25rem 0;
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
            invisible={!openInfo}
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
                <Type bg={pokemon.types[0].type.name}>
                    {pokemon.types[0].type.name}
                </Type>
                {pokemon.types[1] && (
                    <Type bg={pokemon.types[1].type.name}>
                        {pokemon.types[1].type.name}
                    </Type>
                )}
            </TypeWrapper>
            <HiddenInfo invisible={!openInfo}>
                <HpContainer>
                    <p>HP</p>
                    <p>{pokemon.hp}</p>
                </HpContainer>
                <MoveInfoContainer>
                    {/* <HpLabel>HP</HpLabel>
                    <Hp>{pokemon.hp}</Hp> */}
                    <p>{pokemon.moves[0].move.name}</p>
                    <p>{pokemon.moves[0].move.power}</p>
                    <Type bg={pokemon.moves[0].move.type.name}>
                        {pokemon.moves[0].move.type.name}
                    </Type>
                    {/* Some pokemon only have 1 move (like metapod) */}
                    {pokemon.moves[1] && <p>{pokemon.moves[1].move.name}</p>}
                    {pokemon.moves[1] && <p>{pokemon.moves[1].move.power}</p>}
                    {pokemon.moves[1] && (
                        <Type bg={pokemon.moves[1].move.type.name}>
                            {pokemon.moves[1].move.type.name}
                        </Type>
                    )}
                </MoveInfoContainer>
            </HiddenInfo>
        </PokemonCard>
    );
};
