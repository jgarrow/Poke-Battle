import React from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";

import pokeball from "../images/PokeballSVG.svg";

const Trainer = styled.div`
    text-align: center;
    position: relative;
    align-self: ${props => (props.isOpponent ? "flex-start" : "flex-end")};
    left: ${props => (props.isOpponent ? "unset" : "-100%")};
    right: ${props => (props.isOpponent ? "-100%" : "unset")};
    animation: ${props =>
        props.isOpponent
            ? "slideLeft 1s forwards linear 1.75s"
            : "slideRight 1s forwards linear 1.75s"};

    @keyframes slideRight {
        0% {
            left: -100%;
        }
        100% {
            left: 0;
        }
    }

    @keyframes slideLeft {
        0% {
            right: -100%;
        }
        100% {
            right: 0;
        }
    }
`;

export const TrainerImage = styled.div`
    width: 200px;
    height: 200px;
    transform: ${props =>
        (props.facing_right && props.isOpponent) || // Facing right AND Opponent
        (!props.facing_right && !props.isOpponent) // Facing left AND Player 1
            ? "scaleX(-1)"
            : "none"};
`;

export const TrainerAltImage = styled.div`
    width: 200px;
    height: 200px;
    transform: ${props =>
        (props.alt_facing_right && props.isOpponent) || // Facing right AND Opponent
        (!props.alt_facing_right && !props.isOpponent) // Facing left AND Player 1
            ? "scaleX(-1)"
            : "none"};
`;

const TrainerName = styled.h3`
    text-align: center;
    margin: 0;
    max-width: 200px;
`;

export const PartyBallContainer = styled.div`
    width: 70px;
    height: 20px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

export const PartyBall = styled.img`
    width: 20px;
    height: 20px;
`;

export default ({
    isOpponent,
    facing_right,
    fluid,
    trainerType,
    trainerName,
    pokeParty,
}) => {
    return (
        <Trainer isOpponent={isOpponent}>
            <TrainerImage facing_right={facing_right} isOpponent={isOpponent}>
                <Img fluid={fluid} alt={trainerType} />
            </TrainerImage>
            <TrainerName>
                {trainerType} {trainerName}
            </TrainerName>
            <PartyBallContainer>
                {pokeParty.map(pokemon => (
                    <PartyBall
                        key={`${pokemon.id}p1`}
                        src={pokeball}
                        alt="Blue pokeball to represent a pokemon in the trainer's party"
                    />
                ))}
            </PartyBallContainer>
        </Trainer>
    );
};
