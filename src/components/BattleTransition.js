import React from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";

import pokeball from "../images/PokeballSVG.svg";

// Need to tweak background, don't like current linear-gradient
const TransitionBg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        white 0%,
        rgb(209, 233, 255) 2.5%,
        white 4%,
        rgb(209, 233, 255) 6.5%,
        white 7.5%,
        rgb(209, 233, 255) 9%,
        white 11%,
        rgb(209, 233, 255) 16.25%,
        white 18%,
        rgb(209, 233, 255) 25%,
        white 40%,
        white 60%,
        rgb(209, 233, 255) 75%,
        white 82.5%,
        rgb(209, 233, 255) 88%,
        white 92%,
        rgb(209, 233, 255) 95%,
        white 98%,
        rgb(209, 233, 255) 100%
    );
    background-attachment: fixed;
    background-repeat: no-repeat;
`;

const Pokeball = styled.div`
    width: 276px;
    height: 276px;
    position: absolute;
    opacity: 0;
    animation: diminish 0.75s forwards linear 1s;

    @keyframes diminish {
        0% {
            transform: scale(3);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

const Content = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 1rem 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    z-index: 1;
`;

const Title = styled.h1`
    opacity: 0;
    animation: fadeIn 0.5s forwards ease-in 2.75s;

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

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
    altImage,
    selectedTrainer,
    trainerType,
    trainerName,
    trainerImage,
    trainerAltImage,
    party,
    opponentGender,
    opponentImage,
    opponentAltImage,
    opponent,
    oppParty,
}) => {
    return (
        <TransitionBg>
            <Pokeball>
                <img
                    src={pokeball}
                    alt="Blue pokeball for transition to page"
                />
            </Pokeball>

            <Content>
                <Trainer isOpponent={false}>
                    {altImage ? (
                        <TrainerAltImage
                            alt_facing_right={selectedTrainer.alt_facing_right}
                            isOpponent={false}
                        >
                            <Img
                                fluid={trainerAltImage.childImageSharp.fluid}
                                alt={trainerType}
                            />
                        </TrainerAltImage>
                    ) : (
                        <TrainerImage
                            facing_right={selectedTrainer.facing_right}
                            isOpponent={false}
                        >
                            <Img
                                fluid={trainerImage.childImageSharp.fluid}
                                alt={trainerType}
                            />
                        </TrainerImage>
                    )}

                    <TrainerName>
                        {trainerType} {trainerName}
                    </TrainerName>
                    <PartyBallContainer>
                        {party.map(pokemon => (
                            <PartyBall
                                key={`${pokemon.id}p1`}
                                src={pokeball}
                                alt="Blue pokeball to represent a pokemon in the trainer's party"
                            />
                        ))}
                    </PartyBallContainer>
                </Trainer>

                <Title>VS</Title>

                <Trainer isOpponent={true}>
                    {opponentGender === "male" && opponentAltImage ? (
                        <TrainerAltImage
                            alt_facing_right={opponent.alt_facing_right}
                            isOpponent={true}
                        >
                            <Img
                                fluid={opponentAltImage.childImageSharp.fluid}
                                alt={opponent.name}
                            />
                        </TrainerAltImage>
                    ) : (
                        <TrainerImage
                            facing_right={opponent.facing_right}
                            isOpponent={true}
                        >
                            <Img
                                fluid={opponentImage.childImageSharp.fluid}
                                alt={opponent.name}
                            />
                        </TrainerImage>
                    )}

                    <TrainerName>{opponent.name} Alex</TrainerName>

                    <PartyBallContainer>
                        {oppParty.map(pokemon => (
                            <PartyBall
                                key={`${pokemon.id}opp`}
                                src={pokeball}
                                alt="Blue pokeball to represent a pokemon in the trainer's party"
                            />
                        ))}
                    </PartyBallContainer>
                </Trainer>
            </Content>
        </TransitionBg>
    );
};
