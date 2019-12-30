import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";

import Welcome from "../components/welcome";
import TrainerSelection from "../components/trainer";
import PokemonSelection from "../components/pokemon";
import ConfirmSelection from "../components/confirm-selections";
// import PokemonHpCard from "./pokemon-hp-card";

// import pokeball from "../images/pokeball.svg";
import "../global.css";
import "../fonts/Pokemon-Solid.ttf";
require("typeface-heebo");

// need to get the following input/info -- trainer name, trainer type, & Pokemon party (choose 3)
// Welcome screen --> 'Welcome to Poke Battle! What's your name? ________, click 'Next'
// Choose your trainer --> images of different trainer sprites --> select trainer, click 'Next' button
// Choose your party (pick 3) --> images of pokemon options for selected trainer type, click 'Ready to battle' button
// Battle transition screen with trainer sprites --> "TRAINER NAME is challenged by OPPONENT"
// Battle screen with Pokemon, HP cards, moves, and Party menu button

// Current Pokemon needs to grab corresponding image, HP, and moves (moves just for Player 1 mon)
// https://pokeres.bastionbot.org/images/pokemon/1.png where #.png is the pokedex number of the pokemon

// randomize opponent

const backgroundReveal = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1
    }
`;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: white;

    &:before {
        content: "";
        position: absolute;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
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
        opacity: 0;
        animation: ${backgroundReveal} 1s forwards ease-in 3.85s;
    }
`;

const Slides = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    transform: ${props => css`translateX(${props.translateValue}%)`};
    transition: transform ease-out 0.45s;
    display: grid;
    grid-template-columns: repeat(4, 100vw);
`;

const TrainerQuery = gql`
    query {
        trainer(order_by: { name: asc }) {
            name
            id
            image
            alt_image
            facing_right
            alt_facing_right
            pokemons(order_by: { pokemon: { pokedex_num: asc } }) {
                pokemon {
                    id
                    pokedex_num
                    name
                    types {
                        type {
                            name
                        }
                    }
                    img
                    facing_right
                    hp
                    moves {
                        move {
                            name
                            power
                            type {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default () => {
    const [componentPosition, setComponentPosition] = useState(0);

    const [trainerName, setTrainerName] = useState("");
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [partySelection, setPartySelection] = useState(0);
    const [party, setParty] = useState([]);
    const [partyOptions, setPartyOptions] = useState([]); // pokemon options for selected trainer
    // const [displayMoves, setDisplayMoves] = useState(false);
    // const [displayParty, setDisplayParty] = useState(false);
    const [altImage, setAltImage] = useState(false);

    const [opponent, setOpponent] = useState(null);
    const [oppParty, setOppParty] = useState([]);
    // const [oppPartyOptions, setOppPartyOptions] = useState([]);

    const { data: trainerData, loading } = useQuery(TrainerQuery); // query from my hasura database
    const trainers = !loading ? trainerData.trainer : [];
    const trainerImages = useStaticQuery(trainerImagesQuery);

    // for input for trainer name
    const handleChange = e => {
        setTrainerName(e.target.value);
    };

    // "page" transitions
    const handleTransition = direction => {
        if (direction === "next") {
            setComponentPosition(componentPosition - 100);
        } else if (direction === "previous") {
            setComponentPosition(componentPosition + 100);
        }
    };

    // "page" transitions for ConfirmSelection to go back to trainer or party selections
    const handleConfirmTransitions = btn => {
        if (btn === "trainer") {
            setComponentPosition(componentPosition + 200);
        } else if (btn === "party") {
            setComponentPosition(componentPosition + 100);
        }
    };

    const handleTrainerSelect = (trainerId, selectedTrainerObject, alt) => {
        if (trainerId === null) {
            setSelectedTrainer(null);
            setAltImage(false);
            setPartyOptions([]);
            setParty([]);
            setPartySelection(0);
        } else {
            setSelectedTrainer(trainerId);
            setAltImage(alt); // for trainers that have different genders with different sprites
            setPartyOptions(selectedTrainerObject.pokemons);
            setParty([]);
            setPartySelection(0);
        }
    };

    const handlePokemonSelect = pokemon => {
        const tempParty = [...party];
        // if an element doesn't exist, .indexOf will return -1
        if (party.indexOf(pokemon) !== -1) {
            let index = party.indexOf(pokemon);
            // shorthand for swapping --> a = 2, b = 3 but you want a = 3, b = 2 ==> [a, b] = [b, a]
            [tempParty[index], tempParty[partySelection]] = [
                tempParty[partySelection],
                tempParty[index],
            ];
        }

        tempParty[partySelection] = pokemon;
        setParty(tempParty);

        if (partySelection < 2) {
            setPartySelection(partySelection + 1);
        }
    };

    const handlePartySelect = index => {
        setPartySelection(index);
    };

    const selectedTrainerObject = trainerId => {
        const tempTrainers = trainers;

        return trainerId !== null
            ? tempTrainers.find(({ id }) => id === parseInt(trainerId))
            : null;
    };

    const getRandomIndex = max => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    // get random opponent
    useEffect(() => {
        let newOpponent = {};
        let oppPokemonOptions = [];

        const getRandomTrainer = () => {
            const randomNum = getRandomIndex(trainers.length);
            return trainers[randomNum];
        };

        const getRandomParty = partyOpts => {
            const tempParty = [];
            for (let i = 0; i < partyOpts.length && i < 3; i++) {
                let randomNum = Math.floor(
                    Math.random() * Math.floor(partyOpts.length)
                );
                // check for duplicates to make sure all pokemon in party are different
                while (tempParty.includes(partyOpts[randomNum])) {
                    randomNum = Math.floor(
                        Math.random() * Math.floor(partyOpts.length)
                    );
                }

                tempParty.push(partyOpts[randomNum]);
            }
            console.log("Opponent party: ", tempParty);
            setOppParty(tempParty);
        };

        if (trainers.length !== 0) {
            newOpponent = getRandomTrainer();
            oppPokemonOptions = newOpponent.pokemons;
            getRandomParty(oppPokemonOptions);
            console.log("Opponent: ", newOpponent);
        }

        setOpponent(newOpponent);
    }, [trainers]);

    opponent && oppParty.length > 0
        ? console.log(
              `Random opponent: ${opponent}\n Random party: ${oppParty}`
          )
        : console.log("No random opponent yet");

    return (
        <Container>
            <Slides translateValue={componentPosition}>
                <Welcome
                    handleChange={handleChange}
                    trainerName={trainerName}
                    handleTransition={handleTransition}
                />
                <TrainerSelection
                    trainers={trainers}
                    trainerImages={trainerImages}
                    handleTrainerSelect={handleTrainerSelect}
                    selectedTrainer={selectedTrainer}
                    handleTransition={handleTransition}
                />

                <PokemonSelection
                    party={party}
                    partyOptions={partyOptions}
                    partySelection={partySelection}
                    handlePokemonSelect={handlePokemonSelect}
                    handlePartySelect={handlePartySelect}
                    handleTransition={handleTransition}
                />

                {selectedTrainer !== null && party !== [] && (
                    <ConfirmSelection
                        trainerName={trainerName}
                        trainerImages={trainerImages}
                        // need to grab all data for selectedTrainer from trainers b/c selectedTrainer is just an ID
                        selectedTrainer={selectedTrainerObject(selectedTrainer)}
                        party={party}
                        handlePokemonSelect={handlePokemonSelect}
                        altImage={altImage}
                        handleConfirmTransitions={handleConfirmTransitions}
                        setComponentPosition={setComponentPosition}
                        opponent={opponent}
                        oppParty={oppParty}
                    />
                )}
            </Slides>

            {/* {opponent && (
                <div>
                    <h2>Opponent: {opponent.name}</h2>
                </div>
            )}

            <PokemonHpCard />
            <PokemonHpCard />

            <div className="battle-interface">
                
                {displayMoves && (
                    <div>
                        <button>{party[0].moves[0].move.name}</button>

                        {party[0].moves[1] && (
                            <button>{party[0].moves[1].move.name}</button>
                        )}
                    </div>
                )}

                <button
                    className="fight"
                    onClick={() => setDisplayMoves(!displayMoves)}
                >
                    Fight
                </button>

                {displayParty &&
                    party !== [] &&
                    party.map((pokemon, index) => <div key={index}>{pokemon.name}</div>)}

                <button
                    className="party"
                    onClick={() => setDisplayParty(!displayParty)}
                >
                    Pokémon
                </button>
            </div> */}
        </Container>
    );
};

const trainerImagesQuery = graphql`
    query {
        aceTrainerFPic: file(relativePath: { eq: "cool_trainer_f.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        aceTrainerMPic: file(relativePath: { eq: "cool_trainer_m.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        beautyPic: file(relativePath: { eq: "beauty.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        birdKeeperPic: file(relativePath: { eq: "bird_keeper.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        blackbeltPic: file(relativePath: { eq: "blackbelt.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        bugCatcherPic: file(relativePath: { eq: "bug_catcher.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        burglarPic: file(relativePath: { eq: "burglar.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        camperPic: file(relativePath: { eq: "camper.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        channelerPic: file(relativePath: { eq: "channeler.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        engineerPic: file(relativePath: { eq: "engineer.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        fishermanPic: file(relativePath: { eq: "fisherman.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        gamerPic: file(relativePath: { eq: "gamer.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        gentlemanPic: file(relativePath: { eq: "gentleman.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        hikerPic: file(relativePath: { eq: "hiker.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        jugglerPic: file(relativePath: { eq: "juggler.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        lassPic: file(relativePath: { eq: "lass.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        picnickerPic: file(relativePath: { eq: "picnicker.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        pokeManiacPic: file(relativePath: { eq: "poke_maniac.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        psychicPic: file(relativePath: { eq: "psychic.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        punkGuyPic: file(relativePath: { eq: "punk_guy.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        rockerPic: file(relativePath: { eq: "rocker.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        roughneckPic: file(relativePath: { eq: "roughneck.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        sailorPic: file(relativePath: { eq: "sailor.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        scientistPic: file(relativePath: { eq: "scientist.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        superNerdPic: file(relativePath: { eq: "super_nerd.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        swimmerFPic: file(relativePath: { eq: "swimmer_f.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        swimmerMPic: file(relativePath: { eq: "swimmer.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        tamerPic: file(relativePath: { eq: "tamer.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        teamRocketGruntFPic: file(relativePath: { eq: "rocket_grunt_f.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        teamRocketGruntMPic: file(relativePath: { eq: "rocket_grunt_m.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        youngsterPic: file(relativePath: { eq: "youngster.png" }) {
            childImageSharp {
                fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;
