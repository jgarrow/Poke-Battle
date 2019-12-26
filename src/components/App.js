import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";

import Welcome from "./welcome";
import TrainerSelection from "./trainer";
import PokemonSelection from "./pokemon";
import ConfirmSelection from "./confirm-selections";
import PokemonHpCard from "./pokemon-hp-card";

// import pokeball from "../images/pokeball.svg";

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

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
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
`;

const Slides = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    transform: ${props => `translateX(${props.translateValue}%)`};
    transition: transform ease-out 0.45s;
`;

const TrainerQuery = gql`
    query {
        trainer(order_by: { name: asc }) {
            name
            id
            image
            alt_image
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
    const [displayMoves, setDisplayMoves] = useState(false);
    const [displayParty, setDisplayParty] = useState(false);
    const [altImage, setAltImage] = useState(false);

    const [opponent, setOpponent] = useState(null);
    const [oppParty, setOppParty] = useState([]);
    const [oppPartyOptions, setOppPartyOptions] = useState([]);

    const { data: trainerData, loading } = useQuery(TrainerQuery); // query from my hasura database
    const trainers = !loading ? trainerData.trainer : [];
    const trainerImages = useStaticQuery(trainerImagesQuery);

    // for input for trainer name
    const handleChange = e => {
        setTrainerName(e.target.value);
    };

    // "page" transitions
    const handleTransition = direction => {
        console.log("In handleTransition: ", direction);
        if (direction === "next") {
            setComponentPosition(componentPosition - 100);
        } else if (direction === "previous") {
            setComponentPosition(componentPosition + 100);
        }
    };

    // "page" transitions for ConfirmSelection to go back to trainer or party selections
    const handleConfirmTransitions = btn => {
        console.log("In handleConfirmTransition: ", btn);
        if (btn === "trainer") {
            setComponentPosition(componentPosition + 200);
        } else if (btn === "party") {
            setComponentPosition(componentPosition + 100);
        }
    };

    const handleTrainerSelect = (trainerId, selectedTrainerObject, alt) => {
        console.log("alt: ", alt);
        setSelectedTrainer(trainerId);
        setAltImage(alt); // for trainers that have different genders with different sprites
        setPartyOptions(selectedTrainerObject.pokemons);
        setParty([]);
        setPartySelection(0);
    };

    const handlePokemonSelect = pokemon => {
        console.log("Pokemon: ", pokemon);
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

    const getRandomTrainer = () => {
        const randomNum = getRandomIndex(trainers.length);
        console.log("Random num: ", randomNum);
        return trainers[randomNum];
    };

    const getRandomParty = partyOpts => {
        const tempParty = [...oppParty];
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
    };

    useEffect(() => {
        let newOpponent = {};
        let oppPokemonOptions = [];
        if (trainers.length !== 0) {
            newOpponent = getRandomTrainer();
            oppPokemonOptions = newOpponent.pokemons;
        }

        setOpponent(newOpponent);
        setOppPartyOptions(oppPokemonOptions);
        getRandomParty(oppPokemonOptions);
    }, [trainers]);

    opponent
        ? console.log("Random opponent: ", opponent)
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
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        aceTrainerMPic: file(relativePath: { eq: "cool_trainer_m.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        beautyPic: file(relativePath: { eq: "beauty.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        birdKeeperPic: file(relativePath: { eq: "bird_keeper.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        blackbeltPic: file(relativePath: { eq: "blackbelt.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        bugCatcherPic: file(relativePath: { eq: "bug_catcher.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        burglarPic: file(relativePath: { eq: "burglar.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        camperPic: file(relativePath: { eq: "camper.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        channelerPic: file(relativePath: { eq: "channeler.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        engineerPic: file(relativePath: { eq: "engineer.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        fishermanPic: file(relativePath: { eq: "fisherman.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        gamerPic: file(relativePath: { eq: "gamer.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        gentlemanPic: file(relativePath: { eq: "gentleman.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        hikerPic: file(relativePath: { eq: "hiker.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        jugglerPic: file(relativePath: { eq: "juggler.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        lassPic: file(relativePath: { eq: "lass.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        picnickerPic: file(relativePath: { eq: "picnicker.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        pokeManiacPic: file(relativePath: { eq: "poke_maniac.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        psychicPic: file(relativePath: { eq: "psychic.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        punkGuyPic: file(relativePath: { eq: "punk_guy.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        rockerPic: file(relativePath: { eq: "rocker.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        roughneckPic: file(relativePath: { eq: "roughneck.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        sailorPic: file(relativePath: { eq: "sailor.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        scientistPic: file(relativePath: { eq: "scientist.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        superNerdPic: file(relativePath: { eq: "super_nerd.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        swimmerFPic: file(relativePath: { eq: "swimmer_f.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        swimmerMPic: file(relativePath: { eq: "swimmer.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        tamerPic: file(relativePath: { eq: "tamer.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        teamRocketGruntFPic: file(relativePath: { eq: "rocket_grunt_f.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        teamRocketGruntMPic: file(relativePath: { eq: "rocket_grunt_m.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        youngsterPic: file(relativePath: { eq: "youngster.png" }) {
            childImageSharp {
                fixed(width: 200, height: 200) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }
`;
