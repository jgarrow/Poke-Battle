/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";
import { css } from "@emotion/core";

import pokeball from "../images/PokeballSVG.svg";
import Image from "../components/poke-image";
import { moveTypeEffectiveness } from "../data/moveTypeEffectiveness";

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
    grid-template-rows: 75px 150px 150px 115px;
    grid-template-areas:
        ".          .           oppMonCard      oppImage"
        ".          .           oppMonImage     oppImage"
        "p1Image    p1MonImage  .               ."
        "p1Image    p1MonCard   moves           party";
`;

const HpCard = styled.div`
    align-self: ${props => (props.isOpponent ? "flex-end" : "flex-start")};
    width: 100%;
    height: 75px;
    padding: 10px 15px;
    grid-area: ${props => (props.isOpponent ? "oppMonCard" : "p1MonCard")};
    justify-self: ${props => (props.isOpponent ? "flex-end" : "flex-start")};
    background: #d1e9ff;
    border-radius: 20px;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);

    p {
        margin: 0;
        font-size: 1.15rem;
    }
`;

const Row = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
`;

const HpBarContainer = styled.div`
    width: 100%;
    height: 10px;
    background: white;
    border: 1px solid black;
    position: relative;
`;

const HpBar = styled.div`
    margin: 0 auto;
    height: 100%;
    border: none;
    transition: width 1s ease-out;
    /* transition-delay: ${({ delay }) => delay}; */
    position: absolute;
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
    height: 75px;
    grid-area: moves;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
`;

const MoveCard = styled.div`
    pointer-events: ${({ disabled }) => disabled ? `none` : `initial` };
    cursor: pointer;
    width: 75%;
    min-width: 130px;
    max-width: 150px;
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

const PartyTitle = styled.h3`
    cursor: pointer;
    margin-top: 0;
    margin-bottom: 0.5rem;
`;

const PartyMenu = styled.div`
    display: ${props => (props.isPartyOpen ? "block" : "none")};
`;

const Party = styled.div`
    grid-area: party;

    p {
        margin: 0;
    }
`;

const Move = props => (
    <MoveCard {...props}>
        <p>{props.name}</p>
        <p>{props.power}</p>
    </MoveCard>
);

const BattleCard = props => {
    const hpRatio = (props.currentHp / props.totalHp) * 100;
    let currentColor = "#2187E7";

    if (hpRatio <= 0.5 && hpRatio > 0.2) {
        currentColor = "#FFE748";
    } else if (hpRatio <= 0.2) {
        currentColor = "#D11B1C";
    }

    console.log("hpRatio in BattleCard: ", hpRatio);
    return (
        <HpCard isOpponent={props.isOpponent}>
            <Row>
                <p>{props.name}</p>
                <PartyBallContainer
                    css={css`
                        margin: 0;
                    `}
                >
                    {props.party.map(pokemon => (
                        <PartyBall
                            key={pokemon.id}
                            src={pokeball}
                            alt="Blue pokeball to represent a pokemon in the trainer's party"
                        />
                    ))}
                </PartyBallContainer>
            </Row>
            <HpBarContainer>
                <HpBar
                    css={css`
                        background: ${currentColor};
                        width: ${hpRatio}%;
                    `}
                    // delay={!props.isOpponent ? `2s` : 0}
                />
            </HpBarContainer>
            <HP isOpponent={props.isOpponent}>
                {/* {setTimeout(() => { */}
                {props.currentHp} / {props.totalHp}
                {/* }, 2000)} */}
            </HP>
        </HpCard>
    );
};

export default ({ location }) => {
    const {
        trainerName,
        altImage,
        party: p1Party,
        oppParty: opponentParty,
        selectedTrainer,
        trainerImages,
        opponent,
    } = location.state;
    console.log("i am at the beginning of battle component");
    const [party, setParty] = useState([...p1Party]);
    const [oppParty, setOppParty] = useState([...opponentParty]);
    const trainerType = selectedTrainer.name;
    const trainerImage = trainerImages[selectedTrainer.image];
    const trainerAltImage = trainerImages[selectedTrainer.alt_image];
    const [opponentGender, setOpponentGender] = useState("");
    const [currentMonIndex, setCurrentMonIndex] = useState(0);
    const [currentOppMonIndex, setCurrentOppMonIndex] = useState(0);
    const [isPartyOpen, setIsPartyOpen] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);

    // returns random index for which move in the move array
    const getRandomMove = () => {
        const randomNum = Math.random();

        if (randomNum >= 0.5) {
            return 0;
        } else if (randomNum < 0.5) {
            return 1;
        }
    };

    const handleAttack = async attackMoveIndex => {
        let playerParty = [...party];
        let opponentParty = [...oppParty];
        let playerIndex = currentMonIndex;
        let opponentIndex = currentOppMonIndex;
        let playerMon = { ...playerParty[currentMonIndex] };
        let opponentMon = { ...opponentParty[currentOppMonIndex] };
        let playerMonTypes = playerMon.types.map(type => type.type.name);
        let opponentMonTypes = opponentMon.types.map(type => type.type.name);
        let playerMove = playerMon.moves[attackMoveIndex].move;
        let opponentMove = opponentMon.moves[getRandomMove()].move;

        const calculateDamage = (attackerTypes, defenderTypes, move) => {
            let typeEffectiveness = 1;
            let stabBonus = 1;
            let moveType = move.type.name;
            let movePower = move.power;

            if (attackerTypes.includes(moveType)) {
                stabBonus = 1.5; // STAB (same-type attack bonus) = +50% when move type matches pokemon type
            }

            defenderTypes.forEach(type => {
                typeEffectiveness *= moveTypeEffectiveness[moveType][type];
            });

            let damage = movePower * typeEffectiveness * stabBonus;
            return damage;
        };

        const delay = t => new Promise(resolve => setTimeout(resolve, t));

        console.log(
            `${opponentMon.name}'s HP before being attacked:  ${opponentMon.hp}`
        );

        let playerDamageDealt = Math.floor(
            calculateDamage(playerMonTypes, opponentMonTypes, playerMove)
        );
        console.log(
            `${playerMon.name} used ${playerMove.name}! ${opponentMon.name} took ${playerDamageDealt} damage.`
        );

        opponentMon.hp -= playerDamageDealt;
        opponentParty[currentOppMonIndex] = opponentMon;

        if (opponentMon.hp <= 0) {
            opponentMon.hp = 0;
            opponentIndex++;
        }

        setOppParty(opponentParty);
        setCurrentOppMonIndex(opponentIndex);

        console.log(
            `${opponentMon.name}'s HP after being attacked:  ${opponentMon.hp}`
        );
        console.log(
            `${playerMon.name}'s HP before being attacked:  ${playerMon.hp}`
        );

        // if opponent hasn't fainted yet, they get to attack
        if (opponentIndex === currentOppMonIndex) {
            let opponentDamageDealt = Math.floor(
                calculateDamage(opponentMonTypes, playerMonTypes, opponentMove)
            );
            console.log(
                `${opponentMon.name} used ${opponentMove.name}! ${playerMon.name} took ${opponentDamageDealt} damage.`
            );

            playerMon.hp -= opponentDamageDealt;
            playerParty[currentMonIndex] = playerMon;

            if (playerMon.hp <= 0) {
                playerMon.hp = 0;
                playerIndex++;
            }
            await delay(2500);
        }

        setParty(playerParty);
        setCurrentMonIndex(playerIndex);
        setIsAttacking(false);

        console.log(
            `${playerMon.name}'s HP after being attacked:  ${playerMon.hp}`
        );

        console.log(
            `oppPartyHp: ${oppParty[currentOppMonIndex].hp} / ${oppParty[currentOppMonIndex].totalHp}`
        );

        console.log(
            `partyHp: ${party[currentMonIndex].hp} / ${party[currentMonIndex].totalHp}`
        );
    };

    const getRandomOpponentImage = () => {
        const randomNum = Math.random();

        if (randomNum >= 0.5) {
            return "female";
        } else if (randomNum < 0.5) {
            return "male";
        }
    };

    // const opponentAttack = () => {
    //     let oppMoveIndex = getRandomMove();

    //     setParty(handleAttack(oppMoveIndex));
    // };

    // if opponent trainer has 2 gender options, pick one randomly
    useEffect(() => {
        setOpponentGender(getRandomOpponentImage);
    }, []);

    useEffect(() => {
        console.log("oppParty changed: ", oppParty);
    }, [oppParty]);

    // useEffect(() => {
    //     if (!isPlayerTurn) {
    //         const opponentAttack = () => {
    //             let oppMoveIndex = getRandomMove();

    //             setParty(handleAttack(oppMoveIndex));
    //         };
    //         const timer = setTimeout(() => {
    //             console.log("This will log after 2 seconds.");

    //             opponentAttack();
    //         }, 2000);

    //         return () => clearTimeout(timer);
    //     }
    // }, [isPlayerTurn]);

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
                                    key={`${pokemon.id}p1`}
                                    src={pokeball}
                                    alt="Blue pokeball to represent a pokemon in the trainer's party"
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
                                    key={`${pokemon.id}opp`}
                                    src={pokeball}
                                    alt="Blue pokeball to represent a pokemon in the trainer's party"
                                />
                            ))}
                        </PartyBallContainer>
                    </Trainer>
                </Content>
            </Bg>

            <BattleBG>
                <h1
                    css={css`
                        text-align: center;
                    `}
                >
                    {trainerType} {trainerName} VS {opponent.name} Alex
                </h1>
                <BattleContent>
                    {/* Opponent Pokemon card */}
                    <BattleCard
                        isOpponent={true}
                        name={oppParty[currentOppMonIndex].name}
                        party={oppParty}
                        currentHp={oppParty[currentOppMonIndex].hp}
                        totalHp={oppParty[currentOppMonIndex].totalHp}
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
                        facing_right={oppParty[currentOppMonIndex].facing_right}
                        isOpponent={true}
                    >
                        <Image name={oppParty[currentOppMonIndex].name} />
                    </PokemonImgContainer>

                    {/* Player 1 Pokemon card */}
                    <BattleCard
                        isOpponent={false}
                        name={party[currentMonIndex].name}
                        party={party}
                        totalHp={party[currentMonIndex].totalHp}
                        currentHp={party[currentMonIndex].hp}
                    />

                    {/* Player 1 Pokemon image */}
                    <PokemonImgContainer
                        facing_right={party[currentMonIndex].facing_right}
                        isOpponent={false}
                    >
                        <Image name={party[currentMonIndex].name} />
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
                        {party[currentMonIndex].moves.map((move, index) => (
                            <Move
                                key={index}
                                name={move.move.name}
                                bg={move.move.type.name}
                                power={move.move.power}
                                disabled={isAttacking}
                                onClick={() => {
                                    setIsAttacking(true);
                                    handleAttack(index);
                                }}
                            />
                        ))}
                    </MovesContainer>

                    <Party>
                        <PartyTitle
                            onClick={() => setIsPartyOpen(!isPartyOpen)}
                        >
                            Party
                        </PartyTitle>
                        <PartyMenu isPartyOpen={isPartyOpen}>
                            {party.map(pokemon => (
                                <p key={pokemon.id}>{pokemon.name}</p>
                            ))}
                        </PartyMenu>
                    </Party>
                </BattleContent>
            </BattleBG>
        </BattleContainer>
    );
};
