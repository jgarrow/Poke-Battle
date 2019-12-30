import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";
import { css } from "@emotion/core";

import pokeball from "../images/PokeballSVG.svg";
import Image from "../components/poke-image";

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
    transform: ${props =>
        (props.facing_right && props.isOpponent) || // Facing right AND Opponent
        (!props.facing_right && !props.isOpponent) // Facing left AND Player 1
            ? "scaleX(-1)"
            : "none"};
`;

const TrainerAltImage = styled.div`
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

const BattleBG = styled.div`
    width: 100%;
    height: 100%;
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
    background-attachment: fixed;
    background-repeat: no-repeat;
`;

const BattleContent = styled.section`
    margin: 0 auto;
    width: 80%;
    max-width: 960px;
    display: grid;
    grid-row-gap: 15px;
    grid-template-columns: 200px minmax(200px, 1fr) minmax(200px, 1fr) 200px;
    grid-template-areas:
        ".          .           oppMonCard      oppImage"
        ".          .           oppMonImage     oppImage"
        "p1Image    p1MonImage  .               ."
        "p1Image    p1MonCard   moves           party";
`;

const HpCard = styled.div`
    width: 100%;
    height: 100px;
    padding: 10px 15px;
    grid-area: ${props => (props.isOpponent ? "oppMonCard" : "p1MonCard")};
    justify-self: ${props => (props.isOpponent ? "flex-end" : "flex-start")};
    background: #d1e9ff;
    border-radius: 20px;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);

    p {
        margin: 0;
    }
`;

const HP = styled.p`
    display: ${props => (props.isOpponent ? "none" : "inline")};
`;

const PokemonImgContainer = styled.div`
    grid-area: ${props => (props.isOpponent ? "oppMonImage" : "p1MonImage")};
    justify-self: ${props => (props.isOpponent ? "flex-end" : "flex-start")};
    width: 100%;
    max-width: 150px;
    max-height: 150px;
    transform: ${props =>
        (props.facing_right && props.isOpponent) || // Facing right AND Opponent
        (!props.facing_right && !props.isOpponent) // Facing left AND Player 1
            ? "scaleX(-1)"
            : "none"};
`;

const MovesContainer = styled.div`
    grid-area: moves;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-evenly;
`;

const MoveCard = styled.div`
    cursor: pointer;
    width: 50%;
    height: auto;
    max-height: 50px;
    background: ${props => typeBg[props.bg]};
    border-radius: 15px;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;

    p {
        margin: 5px 0;
    }
`;

const Moves = props => (
    <MoveCard bg={props.bg}>
        <p>{props.name}</p>
        {/* <p>{props.type}</p> */}
        <p>{props.power}</p>
    </MoveCard>
);

const BattleCard = props => (
    <HpCard isOpponent={props.isOpponent}>
        <p>{props.name}</p>
        <div>Party balls</div>
        <div>HP bar</div>
        <HP isOpponent={props.isOpponent}>
            {props.hp} / {props.totalHp}
        </HP>
    </HpCard>
);

export default ({ location }) => {
    const {
        trainerName,
        altImage,
        party,
        oppParty,
        selectedTrainer,
        trainerImages,
    } = location.state;
    const trainerType = selectedTrainer.name;
    const trainerImage = trainerImages[selectedTrainer.image];
    const trainerAltImage = trainerImages[selectedTrainer.alt_image];
    const opponent = location.state.opponent;
    const [opponentGender, setOpponentGender] = useState("");

    console.log("selectedTrainer: ", location.state.selectedTrainer);

    const getRandomOpponentImage = () => {
        const randomNum = Math.random();

        if (randomNum >= 0.5) {
            return "female";
        } else if (randomNum < 0.5) {
            return "male";
        }
    };

    useEffect(() => {
        setOpponentGender(getRandomOpponentImage);
    }, []);

    return (
        <BattleContainer>
            {/* For battle transition screen */}
            <Bg>
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
                                alt_facing_right={
                                    selectedTrainer.alt_facing_right
                                }
                                isOpponent={false}
                            >
                                <Img
                                    fluid={
                                        trainerAltImage.childImageSharp.fluid
                                    }
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
                                    key={pokemon.id}
                                    src={pokeball}
                                    alt="Blue pokeball"
                                />
                            ))}
                        </PartyBallContainer>
                    </Trainer>

                    <Title>VS</Title>

                    <Trainer isOpponent={true}>
                        {opponentGender === "male" &&
                        trainerImages[location.state.opponent.alt_image] ? (
                            <TrainerAltImage
                                alt_facing_right={opponent.alt_facing_right}
                                isOpponent={true}
                            >
                                <Img
                                    fluid={
                                        trainerImages[
                                            location.state.opponent.alt_image
                                        ].childImageSharp.fluid
                                    }
                                    alt={opponent.name}
                                />
                            </TrainerAltImage>
                        ) : (
                            <TrainerImage
                                facing_right={opponent.facing_right}
                                isOpponent={true}
                            >
                                <Img
                                    fluid={
                                        trainerImages[
                                            location.state.opponent.image
                                        ].childImageSharp.fluid
                                    }
                                    alt={opponent.name}
                                />
                            </TrainerImage>
                        )}

                        <TrainerName>{opponent.name} Alex</TrainerName>
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

            <BattleBG>
                <h1>
                    {trainerType} {trainerName} VS {opponent.name} Alex
                </h1>
                <BattleContent>
                    {/* Opponent Pokemon card */}
                    <BattleCard
                        isOpponent={true}
                        name={oppParty[0].pokemon.name}
                        // hp={oppParty[0].pokemon.hp}
                        // totalHp={oppParty[0].pokemon.hp}
                    />
                    {/* Opponent trainer image */}
                    {opponentGender === "male" &&
                    trainerImages[location.state.opponent.alt_image] ? (
                        <TrainerAltImage
                            alt_facing_right={opponent.alt_facing_right}
                            isOpponent={true}
                            css={css`
                                grid-area: oppImage;
                                align-self: center;
                            `}
                        >
                            <Img
                                fluid={
                                    trainerImages[
                                        location.state.opponent.alt_image
                                    ].childImageSharp.fluid
                                }
                                alt={opponent.name}
                            />
                        </TrainerAltImage>
                    ) : (
                        <TrainerImage
                            facing_right={opponent.facing_right}
                            isOpponent={true}
                            css={css`
                                grid-area: oppImage;
                                align-self: center;
                            `}
                        >
                            <Img
                                fluid={
                                    trainerImages[location.state.opponent.image]
                                        .childImageSharp.fluid
                                }
                                alt={opponent.name}
                            />
                        </TrainerImage>
                    )}

                    {/* Opponent Pokemon */}
                    <PokemonImgContainer
                        facing_right={oppParty[0].pokemon.facing_right}
                        isOpponent={true}
                    >
                        <Image name={oppParty[0].pokemon.name} />
                    </PokemonImgContainer>

                    {/* Player 1 Pokemon card */}
                    <BattleCard
                        isOpponent={false}
                        name={party[0].name}
                        hp={party[0].hp}
                        totalHp={party[0].hp}
                    />

                    {/* Player 1 Pokemon image */}
                    <PokemonImgContainer
                        facing_right={party[0].facing_right}
                        isOpponent={false}
                    >
                        <Image name={party[0].name} />
                    </PokemonImgContainer>

                    {/* Player 1 trainer image */}
                    {opponentGender === "male" &&
                    trainerImages[location.state.opponent.alt_image] ? (
                        <TrainerAltImage
                            alt_facing_right={selectedTrainer.alt_facing_right}
                            isOpponent={false}
                            css={css`
                                grid-area: p1Image;
                                align-self: center;
                            `}
                        >
                            <Img
                                fluid={trainerImage.childImageSharp.fluid}
                                alt={trainerType}
                            />
                        </TrainerAltImage>
                    ) : (
                        <TrainerImage
                            facing_right={selectedTrainer.facing_right}
                            isOpponent={false}
                            css={css`
                                grid-area: p1Image;
                                align-self: center;
                            `}
                        >
                            <Img
                                fluid={trainerImage.childImageSharp.fluid}
                                alt={trainerType}
                            />
                        </TrainerImage>
                    )}

                    <MovesContainer>
                        {party[0].moves.map((move, index) => (
                            <Moves
                                key={index}
                                name={move.move.name}
                                bg={move.move.type.name}
                                power={move.move.power}
                            />
                        ))}
                    </MovesContainer>
                </BattleContent>
            </BattleBG>
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
