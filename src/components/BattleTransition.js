import React from "react";
import styled from "@emotion/styled";

import pokeball from "../images/PokeballSVG.svg";
import Trainer from "./BattleTransitionTrainer";

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
                {/* Player 1 Trainer component */}
                {altImage ? (
                    <Trainer
                        isOpponent={false}
                        altImage={altImage}
                        trainerType={trainerType}
                        facing_right={selectedTrainer.alt_facing_right}
                        fluid={trainerAltImage.childImageSharp.fluid}
                        trainerName={trainerName}
                        pokeParty={party}
                    />
                ) : (
                    <Trainer
                        isOpponent={false}
                        altImage={altImage}
                        trainerType={trainerType}
                        facing_right={selectedTrainer.facing_right}
                        fluid={trainerImage.childImageSharp.fluid}
                        trainerName={trainerName}
                        pokeParty={party}
                    />
                )}

                <Title>VS</Title>

                {/* Opponent Trainer component */}
                {opponentAltImage && opponentGender === "male" ? (
                    <Trainer
                        isOpponent={true}
                        altImage={opponentAltImage}
                        trainerType={opponent.name}
                        facing_right={opponent.alt_facing_right}
                        fluid={opponentAltImage.childImageSharp.fluid}
                        trainerName="Alex"
                        pokeParty={oppParty}
                    />
                ) : (
                    <Trainer
                        isOpponent={true}
                        altImage={opponentAltImage}
                        trainerType={opponent.name}
                        facing_right={opponent._facing_right}
                        fluid={opponentImage.childImageSharp.fluid}
                        trainerName="Alex"
                        pokeParty={oppParty}
                    />
                )}
            </Content>
        </TransitionBg>
    );
};
