import React from "react";
import styled from "@emotion/styled";

const WelcomeContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    display: inline-flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    position: relative;

    p {
        cursor: pointer;
    }
`;

export default ({ handleChange, trainerName, handleTransition }) => {
    return (
        <WelcomeContainer>
            <h1>Welcome to Poké Battle!</h1>
            <h2>Please enter your name:</h2>
            <input
                type="text"
                name="trainerName"
                placeholder="Your name"
                onChange={e => handleChange(e)}
                value={trainerName}
            />
            <p
                onClick={() => {
                    trainerName !== ""
                        ? handleTransition("next")
                        : alert("No name, no game");
                }}
            >
                Next
            </p>
        </WelcomeContainer>
    );
};
