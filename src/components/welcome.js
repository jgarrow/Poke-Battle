import React from "react";
import styled from "@emotion/styled";

const WelcomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: inline-block;
    overflow: auto;
    position: relative;

    p {
        cursor: pointer;
    }
`;

const WelcomeWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;

export default ({ handleChange, trainerName, handleTransition }) => {
    return (
        <WelcomeContainer>
            <WelcomeWrapper>
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
            </WelcomeWrapper>
        </WelcomeContainer>
    );
};
