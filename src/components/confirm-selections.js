import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import TrainerCard from "./trainer-card";
import PokemonCard from "./pokemon-card";

const ConfirmationWrapper = styled.div`
    margin: 1.5rem auto;
`

const Name = styled.h2`
    margin: 0 auto;
    text-align: center;
`;

const PokemonWrapper = styled.div`
    margin: 1rem auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-rows: auto;
    grid-gap: 30px;
    text-align: center;

    div:first-of-type {
        max-height: 285px;

        h3 {
            margin-bottom: 0;
        }
    }
`;

// const TrainCard = styled(TrainerCard)`
//     text-align: center;
//     max-height: 285px;
    
//     h3 {
//         margin-bottom: 0;
//     }
// `;

const Button = styled.div`
    width: 175px;
    height: 50px;
    margin: 1.5rem auto;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    cursor: pointer;

    &:hover {
        background: #C4C4C4;
    }
`;

export default ({
    trainerName,
    trainerImages,
    selectedTrainer,
    altImage, // boolean
    party
}) => {

    const img = altImage ? trainerImages[selectedTrainer.alt_image] : trainerImages[selectedTrainer.image];

    return (
        <ConfirmationWrapper>
            <Name>{selectedTrainer.name} {trainerName}</Name>
            <PokemonWrapper>
                <TrainerCard
                    trainer={selectedTrainer} // must be a trainer object
                    image={
                        selectedTrainer !== null
                            ? img
                            : null
                    }
                    selected={false}
                />

                {party.map(partymon => (
                    <PokemonCard
                        key={partymon.id}
                        pokemon={partymon}
                        openInfo={true}
                        selected={false}
                    >
                    </PokemonCard>
                ))}
            </PokemonWrapper>

            <div css={css`
                display: flex;
                justify-content: space-evenly;
                align-items: center;
            `}>
                <Button
                    onClick={() => {
                        console.log("Change trainer type");
                        // go to trainer selection page
                    }}
                >
                    Change trainer
                </Button>
    
                <Button
                    onClick={() => {
                        console.log("Change party");
                        // go to party selection page
                    }}
                >
                    Change party
                </Button>
    
                <Button
                    onClick={() => {
                        console.log("Ready to battle!");
                        // go to battle page
                    }}
                >
                    Ready to battle!
                </Button>
            </div>
        </ConfirmationWrapper>
    );
};
