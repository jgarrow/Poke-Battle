import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { useScrollPosition } from "../hooks/useScrollPosition";

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
    border-radius: 15px 15px 0 0;
    margin-top: 0;
    padding: 0 1.5rem;
    box-shadow: ${props =>
        props.scrolled ? "none" : "0px 10px 10px -10px lightgrey"};
    transition: all 0.15s ease-in-out;
`;

const Title = styled.h1`
    margin: 0 auto;
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
    width: 80px;
    text-align: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: white;
        background: #356abc;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
    }
`;

export default props => {
    const [headerAtTop, setHeaderAtTop] = useState(true);
    const trainerSelection = useRef(null);

    useScrollPosition(
        ({ currPos }) => {
            const atTop = currPos.y === 0 ? true : false;
            setHeaderAtTop(atTop);
        },
        [],
        trainerSelection,
        false,
        100
    );

    return (
        <TrainerSelection ref={trainerSelection}>
            <TrainerContainer>
                <ContentCard>
                    <Header scrolled={headerAtTop}>
                        <Button
                            displayed={true}
                            onClick={() => {
                                props.handleTransition("previous");
                            }}
                        >
                            ← Back
                        </Button>
                        <Title>Choose your trainer</Title>
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
                        {props.trainers.map(trainer => {
                            let trainerCards = [];
                            trainerCards.push(
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
                            );
                            if (trainer.alt_image) {
                                trainerCards.push(
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
                                );
                            }
                            return trainerCards;
                        })}
                    </CardWrapper>
                </ContentCard>
            </TrainerContainer>
        </TrainerSelection>
    );
};
