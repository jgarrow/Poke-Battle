import React from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";

import pokeball from "../images/PokeballSVG.svg";

const BattleContainer = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
`;

const Bg = styled.div`
    margin: 0;
    width: 100vw;
    height: 100vh;
    background: repeating-linear-gradient(
        135deg,
        white 0%,
        white 1%,
        lightgray 1%,
        lightgray 3%,
        white 3%,
        white 3.5%,
        lightgray 3.5%,
        lightgray 5%,
        white 5%,
        white 6%,
        lightgray 6%,
        lightgray 7%,
        white 7%,
        white 8%,
        lightgray 8%,
        lightgray 9%,
        white 9%,
        white 12%,
        lightgray 12%,
        lightgray 13%,
        white 13%,
        white 15%,
        lightgray 15%,
        lightgray 16%,
        white 16%,
        white 17%,
        lightgray 17%,
        lightgray 18.5%,
        white 18.5%,
        white 20%
    );
    background-repeat: no-repeat;
    background-attachment: fixed;
`;

const PokeballContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0;
    background: transparent;
`;

const Pokeball = styled.div`
    max-width: 276px;
    max-height: 276px;
    text-align: center;
    transform: translateX(-100%);
    animation: slide 3s forwards 1s;
    position: absolute;
    margin: calc((100vh - 276px) / 2) 0;

    img {
        animation: roll 3s forwards 1s;
    }

    @keyframes slide {
        100% {
            transform: translateX(100vw);
        }
    }

    @keyframes roll {
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Content = styled.section`
    width: 100vw;
    height: 100vh;
    padding: 1rem 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
`;

const Title = styled.h1`
    margin-top: 0;
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

const TrainerImage = styled.div`
    width: 200px;
    height: 200px;
`;

const TrainerName = styled.h3`
    text-align: center;
    margin: 0;
`;

const PartyBallContainer = styled.div`
    width: 70px;
    height: 20px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

const PartyBall = styled.img`
    width: 20px;
    height: 20px;
`;

export default ({ location }) => {
    const {
        trainerName,
        party,
        oppParty,
        selectedTrainer,
        trainerImages,
    } = location.state;
    const trainerType = selectedTrainer.name;
    const trainerImage = trainerImages[selectedTrainer.image];
    const opponent = location.state.opponent.name;
    const opponentImage = trainerImages[location.state.opponent.image];

    console.log("selectedTrainer: ", location.state.selectedTrainer);

    return (
        <BattleContainer>
            <Bg>
                <PokeballContainer>
                    <Pokeball>
                        <img
                            src={pokeball}
                            alt="Blue pokeball for transition to page"
                        />
                    </Pokeball>

                    <Content>
                        <Trainer isOpponent={false}>
                            <TrainerImage>
                                {trainerImage ? (
                                    <Img
                                        fluid={
                                            trainerImage.childImageSharp.fluid
                                        }
                                        alt={trainerType}
                                    />
                                ) : null}
                            </TrainerImage>
                            <TrainerName>
                                {trainerType} {trainerName}
                            </TrainerName>
                            <PartyBallContainer>
                                {party.map(pokemon => (
                                    // <p key={pokemon.id}>{pokemon.name}</p>
                                    <PartyBall
                                        key={pokemon.id}
                                        src={pokeball}
                                        alt="Blue pokeball"
                                    />
                                ))}
                            </PartyBallContainer>
                        </Trainer>

                        <Title>VS</Title>

                        <Trainer isOpponent={true}>
                            <TrainerImage>
                                {opponentImage ? (
                                    <Img
                                        fluid={
                                            opponentImage.childImageSharp.fluid
                                        }
                                        alt={opponent}
                                    />
                                ) : null}
                            </TrainerImage>
                            <TrainerName>{opponent} Alex</TrainerName>
                            <PartyBallContainer>
                                {oppParty.map(pokemon => (
                                    // <p key={pokemon.pokemon.id}>
                                    //     {pokemon.pokemon.name}
                                    // </p>
                                    <PartyBall
                                        key={pokemon.pokemon.id}
                                        src={pokeball}
                                        alt="Blue pokeball"
                                    />
                                ))}
                            </PartyBallContainer>
                        </Trainer>
                    </Content>
                </PokeballContainer>
            </Bg>
        </BattleContainer>
    );
};

// STAB (same-type attack bonus) = +50% when move type matches pokemon type
// strength of each type key AGAINST other types
const moveTypeEffectiveness = {
    Normal: {
        Normal: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Grass: 1,
        Ice: 1,
        Fighting: 1,
        Poison: 1,
        Ground: 1,
        Flying: 1,
        Psychic: 1,
        Bug: 1,
        Rock: 0.5,
        Ghost: 0,
        Dragon: 1,
        Dark: 1,
        Steel: 0.5,
        Fairy: 1,
    },
    Fire: {
        Normal: 1,
        Fire: 0.5,
        Water: 0.5,
        Electric: 1,
        Grass: 2,
        Ice: 2,
        Fighting: 1,
        Poison: 1,
        Ground: 1,
        Flying: 1,
        Psychic: 1,
        Bug: 2,
        Rock: 0.5,
        Ghost: 1,
        Dragon: 0.5,
        Dark: 1,
        Steel: 2,
        Fairy: 1,
    },
    Water: {
        Normal: 1,
        Fire: 2,
        Water: 0.5,
        Electric: 1,
        Grass: 0.5,
        Ice: 1,
        Fighting: 1,
        Poison: 1,
        Ground: 2,
        Flying: 1,
        Psychic: 1,
        Bug: 1,
        Rock: 2,
        Ghost: 1,
        Dragon: 0.5,
        Dark: 1,
        Steel: 1,
        Fairy: 1,
    },
    Electric: {
        Normal: 1,
        Fire: 1,
        Water: 2,
        Electric: 0.5,
        Grass: 0.5,
        Ice: 1,
        Fighting: 1,
        Poison: 1,
        Ground: 0,
        Flying: 2,
        Psychic: 1,
        Bug: 1,
        Rock: 1,
        Ghost: 1,
        Dragon: 0.5,
        Dark: 1,
        Steel: 1,
        Fairy: 1,
    },
    Grass: {
        Normal: 1,
        Fire: 0.5,
        Water: 2,
        Electric: 1,
        Grass: 0.5,
        Ice: 1,
        Fighting: 1,
        Poison: 0.5,
        Ground: 2,
        Flying: 0.5,
        Psychic: 1,
        Bug: 0.5,
        Rock: 2,
        Ghost: 1,
        Dragon: 0.5,
        Dark: 1,
        Steel: 0.5,
        Fairy: 1,
    },
    Ice: {
        Normal: 1,
        Fire: 0.5,
        Water: 0.5,
        Electric: 1,
        Grass: 2,
        Ice: 0.5,
        Fighting: 1,
        Poison: 1,
        Ground: 2,
        Flying: 2,
        Psychic: 1,
        Bug: 1,
        Rock: 1,
        Ghost: 1,
        Dragon: 2,
        Dark: 1,
        Steel: 0.5,
        Fairy: 1,
    },
    Fighting: {
        Normal: 2,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Grass: 1,
        Ice: 2,
        Fighting: 1,
        Poison: 0.5,
        Ground: 1,
        Flying: 0.5,
        Psychic: 0.5,
        Bug: 0.5,
        Rock: 2,
        Ghost: 0,
        Dragon: 1,
        Dark: 2,
        Steel: 2,
        Fairy: 0.5,
    },
    Poison: {
        Normal: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Grass: 2,
        Ice: 1,
        Fighting: 1,
        Poison: 0.5,
        Ground: 0.5,
        Flying: 1,
        Psychic: 1,
        Bug: 1,
        Rock: 0.5,
        Ghost: 0.5,
        Dragon: 1,
        Dark: 1,
        Steel: 0,
        Fairy: 2,
    },
    Ground: {
        Normal: 1,
        Fire: 2,
        Water: 1,
        Electric: 2,
        Grass: 0.5,
        Ice: 1,
        Fighting: 1,
        Poison: 2,
        Ground: 1,
        Flying: 0,
        Psychic: 1,
        Bug: 0.5,
        Rock: 2,
        Ghost: 1,
        Dragon: 1,
        Dark: 1,
        Steel: 2,
        Fairy: 1,
    },
    Flying: {
        Normal: 1,
        Fire: 1,
        Water: 1,
        Electric: 0.5,
        Grass: 2,
        Ice: 1,
        Fighting: 2,
        Poison: 1,
        Ground: 1,
        Flying: 1,
        Psychic: 1,
        Bug: 2,
        Rock: 0.5,
        Ghost: 1,
        Dragon: 1,
        Dark: 1,
        Steel: 0.5,
        Fairy: 1,
    },
    Psychic: {
        Normal: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Grass: 1,
        Ice: 1,
        Fighting: 2,
        Poison: 2,
        Ground: 1,
        Flying: 1,
        Psychic: 0.5,
        Bug: 1,
        Rock: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 0,
        Steel: 0.5,
        Fairy: 1,
    },
    Bug: {
        Normal: 1,
        Fire: 0.5,
        Water: 1,
        Electric: 1,
        Grass: 2,
        Ice: 1,
        Fighting: 0.5,
        Poison: 0.5,
        Ground: 1,
        Flying: 0.5,
        Psychic: 2,
        Bug: 1,
        Rock: 1,
        Ghost: 0.5,
        Dragon: 1,
        Dark: 2,
        Steel: 0.5,
        Fairy: 0.5,
    },
    Rock: {
        Normal: 1,
        Fire: 2,
        Water: 1,
        Electric: 1,
        Grass: 1,
        Ice: 2,
        Fighting: 0.5,
        Poison: 1,
        Ground: 0.5,
        Flying: 2,
        Psychic: 1,
        Bug: 2,
        Rock: 1,
        Ghost: 1,
        Dragon: 1,
        Dark: 1,
        Steel: 0.5,
        Fairy: 1,
    },
    Ghost: {
        Normal: 0,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Grass: 1,
        Ice: 1,
        Fighting: 1,
        Poison: 1,
        Ground: 1,
        Flying: 1,
        Psychic: 2,
        Bug: 1,
        Rock: 1,
        Ghost: 2,
        Dragon: 1,
        Dark: 0.5,
        Steel: 1,
        Fairy: 1,
    },
    Dragon: {
        Normal: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Grass: 1,
        Ice: 1,
        Fighting: 1,
        Poison: 1,
        Ground: 1,
        Flying: 1,
        Psychic: 1,
        Bug: 1,
        Rock: 1,
        Ghost: 1,
        Dragon: 2,
        Dark: 1,
        Steel: 0.5,
        Fairy: 0,
    },
    Dark: {
        Normal: 1,
        Fire: 1,
        Water: 1,
        Electric: 1,
        Grass: 1,
        Ice: 1,
        Fighting: 0.5,
        Poison: 1,
        Ground: 1,
        Flying: 1,
        Psychic: 2,
        Bug: 1,
        Rock: 1,
        Ghost: 2,
        Dragon: 1,
        Dark: 0.5,
        Steel: 1,
        Fairy: 0.5,
    },
    Steel: {
        Normal: 1,
        Fire: 0.5,
        Water: 0.5,
        Electric: 0.5,
        Grass: 1,
        Ice: 2,
        Fighting: 1,
        Poison: 1,
        Ground: 1,
        Flying: 1,
        Psychic: 1,
        Bug: 1,
        Rock: 2,
        Ghost: 1,
        Dragon: 1,
        Dark: 1,
        Steel: 0.5,
        Fairy: 2,
    },
    Fairy: {
        Normal: 1,
        Fire: 0.5,
        Water: 1,
        Electric: 1,
        Grass: 1,
        Ice: 1,
        Fighting: 2,
        Poison: 0.5,
        Ground: 1,
        Flying: 1,
        Psychic: 1,
        Bug: 1,
        Rock: 1,
        Ghost: 1,
        Dragon: 2,
        Dark: 2,
        Steel: 1,
        Fairy: 0.5,
    },
};
