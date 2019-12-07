import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import TrainerCard from "./trainer-card";

const Header = styled.header`
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

export default props => {
    return (
        <>
            <Header>
                <h1
                    css={css`
                        margin: 0 auto;
                    `}
                >
                    Choose your trainer
                </h1>
                <p
                    css={css`
                        cursor: pointer;
                    `}
                >
                    Next →
                </p>
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
                        {/* create another card for the some trainer name if there is another image (to get both genders) */}
                        {trainer.alt_image && (
                            <TrainerCard
                                trainer={trainer}
                                image={props.trainerImages[trainer.alt_image]}
                                key={trainer.id + "alt"} // "alt" makes it a unique key
                                handleTrainerSelect={props.handleTrainerSelect}
                                selected={
                                    props.selectedTrainer === `${trainer.id}alt`
                                }
                                alt={true}
                            />
                        )}
                    </>
                ))}
            </CardWrapper>
        </>
    );
};
