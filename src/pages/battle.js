/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";
import { css } from "@emotion/core";

import pokeball from "../images/PokeballSVG.svg";
import Image from "../components/poke-image";
import BattleTransition, {
    TrainerImage,
    TrainerAltImage,
    PartyBallContainer,
    PartyBall,
} from "../components/BattleTransition";
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
        "p1Image    p1MonImage  dialogue        dialogue"
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

const Dialogue = styled.div`
    grid-area: dialogue;
    width: 100%;
    max-width: 300px;
    height: 100%;
    max-height: 75px;
    background: white;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    padding: 0 15px;
    justify-self: flex-end;
    align-self: center;
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
    pointer-events: ${({ disabled }) => (disabled ? `none` : `initial`)};
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

const DialogueBox = props => {
    return (
        <Dialogue>
            <p>{props.dialogueText}</p>
        </Dialogue>
    );
};

const Move = props => (
    <MoveCard {...props}>
        <p>{props.name}</p>
        <p>{props.power}</p>
    </MoveCard>
);

const BattleCard = props => {
    const hpRatio = (props.currentHp / props.totalHp) * 100;
    let currentColor = "#2187E7"; // blue for > 1/2 hp

    if (hpRatio <= 50 && hpRatio > 20) {
        currentColor = "#FFE748"; // yellow for < 1/2 hp
    } else if (hpRatio <= 20) {
        currentColor = "#D11B1C"; // red for < 1/5 hp
    }

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
                />
            </HpBarContainer>
            <HP isOpponent={props.isOpponent}>
                {props.currentHp} / {props.totalHp}
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
    const [party, setParty] = useState([...p1Party]);
    const [oppParty, setOppParty] = useState([...opponentParty]);
    const trainerType = selectedTrainer.name;
    const trainerImage = trainerImages[selectedTrainer.image];
    const trainerAltImage = trainerImages[selectedTrainer.alt_image];
    const opponentImage = trainerImages[location.state.opponent.image];
    const opponentAltImage = trainerImages[location.state.opponent.alt_image];
    const [opponentGender, setOpponentGender] = useState("");
    const [currentMonIndex, setCurrentMonIndex] = useState(0);
    const [currentOppMonIndex, setCurrentOppMonIndex] = useState(0);
    const [isPartyOpen, setIsPartyOpen] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);
    const [dialogueText, setDialogueText] = useState(
        `Go ${party[currentMonIndex].name}! ${opponent.name} Alex sent out ${oppParty[currentOppMonIndex].name}!`
    );

    // returns random index for which move in the move array
    // used in handleAttack
    const getRandomMove = () => {
        const randomNum = Math.random();

        if (randomNum >= 0.5) {
            return 0;
        } else if (randomNum < 0.5) {
            return 1;
        }
    };

    // State needed: party, oppParty, currentMonIndex, currentOppMonIndex, setDialogueText, setParty, setOppParty, setCurrentMonIndex, setCurrentOppMonIndex, setIsAttacking
    // other variables/functions needed: moveTypeEffectiveness, getRandomMove()
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
        let dialogue = "";

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

        // want to delay so that opponent doesn't attack at the same time as player
        const delay = t => new Promise(resolve => setTimeout(resolve, t));

        let playerDamageDealt = Math.floor(
            calculateDamage(playerMonTypes, opponentMonTypes, playerMove)
        );

        dialogue = `${playerMon.name} used ${playerMove.name}!`;
        setDialogueText(dialogue);

        opponentMon.hp -= playerDamageDealt;
        opponentParty[currentOppMonIndex] = opponentMon;

        if (opponentMon.hp <= 0) {
            opponentMon.hp = 0;
            dialogue += `\n${opponentMon.name} fainted!`;
            opponentIndex++;
        }

        setDialogueText(dialogue);

        if (opponentMon.hp <= 0) {
            dialogue = `${opponent.name} Alex sent out ${opponentParty[opponentIndex].name}!`;
        }

        setOppParty(opponentParty);
        await delay(1500);
        setDialogueText(dialogue);
        setCurrentOppMonIndex(opponentIndex);

        // if opponent hasn't fainted yet, they get to attack
        if (opponentIndex === currentOppMonIndex) {
            let opponentDamageDealt = Math.floor(
                calculateDamage(opponentMonTypes, playerMonTypes, opponentMove)
            );

            dialogue = `${opponentMon.name} used ${opponentMove.name}!`;
            setDialogueText(dialogue);

            playerMon.hp -= opponentDamageDealt;
            playerParty[currentMonIndex] = playerMon;
        }

        setDialogueText(dialogue);

        if (playerMon.hp <= 0) {
            playerMon.hp = 0;
            dialogue += `\n${playerMon.name} fainted!`;
            playerIndex++;
        }
        setDialogueText(dialogue);

        if (playerMon.hp <= 0) {
            dialogue = `Go ${playerParty[playerIndex].name}!`;
        }

        setParty(playerParty);
        await delay(1500);
        setDialogueText(dialogue);
        setCurrentMonIndex(playerIndex);
        await delay(1000);
        dialogue = "";
        setDialogueText(dialogue);
        setIsAttacking(false);
    };

    // if opponent trainer has 2 gender options, pick one randomly
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

        // Delay to give time to read initial render dialogue text before resetting it
        setTimeout(() => {
            setDialogueText("");
        }, 1500);
    }, []);

    return (
        <BattleContainer>
            {/* For battle transition screen */}
            <BattleTransition
                altImage={altImage}
                selectedTrainer={selectedTrainer}
                trainerType={trainerType}
                trainerName={trainerName}
                trainerImage={trainerImage}
                trainerAltImage={trainerAltImage}
                party={party}
                opponentGender={opponentGender}
                opponentImage={opponentImage}
                opponentAltImage={opponentAltImage}
                opponent={opponent}
                oppParty={oppParty}
            />

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

                    <DialogueBox dialogueText={dialogueText} />

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
