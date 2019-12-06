import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import TrainerCard from "./trainer-card";
import PokemonCard from "./pokemon-card";
// import Image from "./poke-image";

const ConfirmationWrapper = styled.div`
    margin: 1.5rem auto;
`

const Name = styled.h2`
    margin: 0 auto;
    text-align: center;
`;

// const PokemonCard = styled.div`
//     background: ${props => (props.selected ? "#99CDFF" : "#D1E9FF")};
//     box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
//     border-radius: 40px;
//     margin: 0 auto;
//     padding-top: 0.5rem;
//     width: 250px;
//     height: fit-content;
//     cursor: pointer;
// `;

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

const TrainCard = styled(TrainerCard)`
    text-align: center;
    max-height: 285px;
    
    h3 {
        margin-bottom: 0;
    }
`;

const PokemonName = styled.h2`
    margin-bottom: 0;
`;

const ImageWrapper = styled.div`
    width: 150px;
    height: 150px;
    margin: 1rem auto 0;
`;

const TypeWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
`;

const InfoWrapper = styled.div`
    max-height: 80px;
    line-height: 1;
    margin-bottom: 1rem;

    p:first-of-type {
        margin-top: 0;
    }
`;

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
    party,
    handlePokemonSelect,
    openInfoId,
    handleInfoClick,
}) => {
    // console.log("trainerName: ", trainerName);
    console.log("selectedTrainerObject: ", selectedTrainer);

    return (
        <ConfirmationWrapper>
            <Name>Trainer Name: {trainerName}</Name>
            <PokemonWrapper>
                <TrainerCard
                    // css={css`
                    //     h3 {
                    //         margin-bottom: 0;
                    //     }
                    // `}
                    trainer={selectedTrainer} // must be a trainer object
                    image={
                        selectedTrainer !== null
                            ? trainerImages[selectedTrainer.image]
                            : null
                    }
                    // image={null}
                    handleClick={null} // go back to trainer select screen
                    selected={false} // logic depends on handleClick function above
                />
                {/* 3 Pokemon Cards for Party --> with all info */}

                {party.map(partymon => (
                    <PokemonCard
                        key={partymon.id}
                        pokemon={partymon}
                        openInfo={openInfoId === partymon.id}
                        handleClick={handlePokemonSelect}
                        handleInfoClick={handleInfoClick}
                        selected={party.some(mon => mon.id === partymon.id)}
                    >
                        {/* <ImageWrapper>
                            <Image
                                name={partymon.name}
                                css={css`
                                    margin-top: 0.5rem;
                                `}
                            />
                        </ImageWrapper>
                        <PokemonName>{partymon.name}</PokemonName>
                        <TypeWrapper>
                            <p>{partymon.types[0].type.name}</p>
                            {partymon.types[1] && (
                                <p>{partymon.types[1].type.name}</p>
                            )}
                        </TypeWrapper>
                        <InfoWrapper>
                            <p>HP: {partymon.hp}</p>
                            <p>
                                {partymon.moves[0].move.name}{" "}
                                {partymon.moves[0].move.power}{" "}
                                {partymon.moves[0].move.type.name}
                            </p>
                            {partymon.moves[1] && (
                                <p>
                                    {partymon.moves[1].move.name}{" "}
                                    {partymon.moves[1].move.power}{" "}
                                    {partymon.moves[1].move.type.name}
                                </p>
                            )}
                        </InfoWrapper> */}
                    </PokemonCard>
                ))}
            </PokemonWrapper>

            {/* Confirmation button */}
            <Button
                onClick={() => {
                    console.log("Ready to battle!");
                    // go to battle page
                }}
            >
                Ready to battle!
            </Button>
        </ConfirmationWrapper>
    );
};
