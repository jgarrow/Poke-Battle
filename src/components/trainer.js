/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import TrainerCard from "./trainer-card";

const TrainerSelection = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    position: relative;
    display: inline-block;
    padding-bottom: 2rem;
`;

const TrainerContainer = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const ContentCard = styled.div`
    background: white;
    border-radius: 30px;
    box-shadow: 0px 0px 15px 0px lightgray;
    margin-top: 1rem;
    padding-top: 1rem;
`;

const Header = styled.header`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 1rem auto;
    position: sticky;
    top: 0;
    z-index: 5;
    background: white;
    border-radius: 15px;
    margin-top: 0;
    padding: 0 1.5rem;
`;

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 30px;
    text-align: center;
    padding: 1rem;
    padding-top: 0;
`;

const Button = styled.p`
    visibility: ${props => (props.displayed === true ? "visible" : "hidden")};
    cursor: pointer;
    background: #81a4db;
    padding: 5px 10px;
    color: black;
    font-size: 1rem;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    width: 75px;
    text-align: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: white;
        background: #356abc;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
    }
`;

export default props => {
    return (
        <TrainerSelection>
            <TrainerContainer>
                <ContentCard>
                    <Header>
                        <Button
                            displayed={true}
                            onClick={() => {
                                props.handleTransition("previous");
                            }}
                        >
                            ← Back
                        </Button>
                        <h1
                            css={{
                                margin: "0 auto",
                            }}
                        >
                            Choose your trainer
                        </h1>
                        <Button
                            displayed={props.selectedTrainer ? true : false}
                            onClick={() => {
                                props.selectedTrainer
                                    ? props.handleTransition("next")
                                    : alert("Select a trainer");
                            }}
                        >
                            Next →
                        </Button>
                    </Header>
                    <CardWrapper>
                        {props.trainers.map(trainer => (
                            <>
                                <TrainerCard
                                    trainer={trainer}
                                    image={props.trainerImages[trainer.image]}
                                    key={trainer.id}
                                    handleTrainerSelect={
                                        props.handleTrainerSelect
                                    }
                                    selected={
                                        props.selectedTrainer === trainer.id
                                    }
                                />
                                {/* create another card for the same trainer name if there is another image (to get both genders) */}
                                {trainer.alt_image && (
                                    <TrainerCard
                                        trainer={trainer}
                                        image={
                                            props.trainerImages[
                                                trainer.alt_image
                                            ]
                                        }
                                        key={trainer.id + "alt"} // "alt" makes it a unique key
                                        handleTrainerSelect={
                                            props.handleTrainerSelect
                                        }
                                        selected={
                                            props.selectedTrainer ===
                                            `${trainer.id}alt`
                                        }
                                        alt={true}
                                    />
                                )}
                            </>
                        ))}
                    </CardWrapper>
                </ContentCard>
            </TrainerContainer>
        </TrainerSelection>
    );
};
