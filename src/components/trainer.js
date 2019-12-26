import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import StickyHeader from "react-sticky-header";

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

const Header = styled(StickyHeader)`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 1rem auto;
`;

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 30px;
    text-align: center;
`;

const NextButton = styled.p`
    cursor: pointer;
    visibility: ${props => (props.displayed ? "visible" : "hidden")};
`;

export default props => {
    return (
        <TrainerSelection>
            <TrainerContainer>
                <Header>
                    <p
                        css={css`
                            cursor: pointer;
                        `}
                        onClick={() => {
                            props.handleTransition("previous");
                        }}
                    >
                        ← Back
                    </p>
                    <h1
                        css={css`
                            margin: 0 auto;
                        `}
                    >
                        Choose your trainer
                    </h1>
                    {/* Need to fix -- when going "back" to this page, should not be able to deselect trainer and press Next */}
                    <NextButton
                        displayed={props.selectedTrainer ? true : false}
                        onClick={() => {
                            props.selectedTrainer
                                ? props.handleTransition("next")
                                : alert("Select a trainer");
                        }}
                    >
                        Next →
                    </NextButton>
                </Header>
                <CardWrapper>
                    {props.trainers.map(trainer => (
                        <>
                            <TrainerCard
                                trainer={trainer}
                                image={props.trainerImages[trainer.image]}
                                key={trainer.id}
                                handleTrainerSelect={props.handleTrainerSelect}
                                selected={props.selectedTrainer === trainer.id}
                            />
                            {/* create another card for the same trainer name if there is another image (to get both genders) */}
                            {trainer.alt_image && (
                                <TrainerCard
                                    trainer={trainer}
                                    image={
                                        props.trainerImages[trainer.alt_image]
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
            </TrainerContainer>
        </TrainerSelection>
    );
};
