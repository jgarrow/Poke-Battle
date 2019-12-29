import React from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";

import pokeball from "../images/PokeballSVG.svg";

const BattleContainer = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
`;

// Need to tweak background, don't like current linear-gradient
const Bg = styled.div`
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

const TrainerImage = styled.div`
    width: 200px;
    height: 200px;
`;

const TrainerName = styled.h3`
    text-align: center;
    margin: 0;
    max-width: 200px;
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
                                    fluid={trainerImage.childImageSharp.fluid}
                                    alt={trainerType}
                                />
                            ) : null}
                        </TrainerImage>
                        <TrainerName>
                            {trainerType} {trainerName}
                        </TrainerName>
                        <PartyBallContainer>
                            {party.map(pokemon => (
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
                                    fluid={opponentImage.childImageSharp.fluid}
                                    alt={opponent}
                                />
                            ) : null}
                        </TrainerImage>
                        <TrainerName>{opponent} Alex</TrainerName>
                        <PartyBallContainer>
                            {oppParty.map(pokemon => (
                                <PartyBall
                                    key={pokemon.pokemon.id}
                                    src={pokeball}
                                    alt="Blue pokeball"
                                />
                            ))}
                        </PartyBallContainer>
                    </Trainer>
                </Content>
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
