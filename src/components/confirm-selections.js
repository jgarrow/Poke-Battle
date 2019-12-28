import React from "react";
import styled from "@emotion/styled";

import TrainerCard from "./trainer-card";
import Image from "./poke-image";

const ConfirmationWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    position: relative;
    display: inline-block;
    padding-bottom: 2rem;
`;

const ConfirmationContainer = styled.div`
    width: 80%;
    max-width: 960px;
    margin: 1.5rem auto;

    @media (max-width: 750px) {
        width: 90%;
    }
`;

const ContentCard = styled.div`
    background: white;
    border-radius: 30px;
    box-shadow: 0px 0px 15px 0px lightgray;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Name = styled.h2`
    margin: 0 auto;
    text-align: center;
`;

const PokemonWrapper = styled.div`
    margin: 1rem auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    width: 80%;
    max-width: 960px;

    @media (max-width: 575px) {
        width: 90%;
    }

    @media (max-width: 500px) {
        justify-content: space-between;
    }
`;

const PartyCard = styled.div`
    background: #d1e9ff;
    border-radius: 40px;
    width: 150px;
    height: 150px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    @media (max-width: 700px) {
        width: 125px;
        height: 125px;
        border-radius: 30px;
    }

    @media (max-width: 500px) {
        width: 100px;
        height: 100px;
        border-radius: 20px;
    }

    @media (max-width: 380px) {
        width: 80px;
        height: 80px;
    }
`;

const ImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 auto;

    @media (max-width: 700px) {
        width: 100%;
        height: auto;
        box-sizing: border-box;
        padding: 10px;
    }

    @media (max-width: 500px) {
        padding: 8px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 85%;

    @media (max-width: 800px) {
        width: 90%;
    }
`;

const Button = styled.div`
    width: 175px;
    height: 50px;
    text-align: center;
    margin-bottom: 1rem;
    background: #81a4db;
    color: black;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: white;
        background: #356abc;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
    }

    @media (max-width: 800px) {
        font-size: 1.15rem;
        width: 140px;
        height: 40px;
    }

    @media (max-width: 500px) {
        font-size: 1rem;
        width: 80px;
        height: auto;
        border-radius: 12px;
    }
`;

const BattleButton = styled.div`
    width: 175px;
    height: 50px;
    text-align: center;
    margin: 1rem auto 0;
    background: #9ade8f;
    color: black;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: white;
        background: #7bb372;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
    }
`;

const PokemonCard = ({ name }) => {
    return (
        <PartyCard>
            <ImageWrapper>
                <Image name={name} />
            </ImageWrapper>
        </PartyCard>
    );
};

export default ({
    trainerName,
    trainerImages,
    selectedTrainer,
    altImage, // boolean
    party,
    handleConfirmTransitions,
}) => {
    const img = altImage
        ? trainerImages[selectedTrainer.alt_image]
        : trainerImages[selectedTrainer.image];

    return (
        <ConfirmationWrapper>
            <ConfirmationContainer>
                <ContentCard>
                    <Name>
                        {selectedTrainer.name} {trainerName}
                    </Name>
                    {/* <PokemonWrapper> */}
                    <TrainerCard
                        trainer={selectedTrainer} // must be a trainer object
                        image={selectedTrainer !== null ? img : null}
                        selected={false}
                    />
                    <PokemonWrapper>
                        {party.map(partymon => (
                            <PokemonCard
                                key={partymon.id}
                                name={partymon.name}
                            />
                        ))}
                    </PokemonWrapper>

                    <ButtonContainer>
                        <Button
                            onClick={() => {
                                handleConfirmTransitions("trainer");
                            }}
                        >
                            Change trainer
                        </Button>

                        <Button
                            onClick={() => {
                                handleConfirmTransitions("party");
                            }}
                        >
                            Change party
                        </Button>

                        {/* <Button
                            onClick={() => {
                                console.log("Ready to battle!");
                                // go to battle page
                            }}
                        >
                            Ready to battle!
                        </Button> */}
                    </ButtonContainer>
                </ContentCard>

                <BattleButton
                    onClick={() => {
                        console.log("Ready to battle!");
                        // go to battle page
                    }}
                >
                    Ready to battle!
                </BattleButton>
            </ConfirmationContainer>
        </ConfirmationWrapper>
    );
};
