import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";

// animation for Title
const shine = keyframes`
from {
    left: 0;
}

to {
    left: 100%;
}
`;

const WelcomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: inline-block;
    overflow: auto;
    position: relative;

    a {
        text-underline: none;
    }
`;

const Title = styled.h1`
    font-family: "Pokemon Solid";
    font-size: 5rem;
    margin-bottom: 0;
    text-stroke: 4px #356abc;
    -webkit-text-stroke: 4px #356abc;
    text-fill-color: rgba(0, 0, 0, 0);
    -webkit-text-fill-color: rgba(0, 0, 0, 0);
    background: #ffcc03;
    background-clip: text;
    -webkit-background-clip: text;
    background-size: 100%;
    position: relative;
    display: inline-block;
    border-radius: 10px;
    z-index: 100;

    &:before {
        border-radius: inherit;
        background: linear-gradient(
            90deg,
            white,
            white 6%,
            rgba(255, 204, 3, 0) 6%
        );
        content: "";
        display: block;
        height: 100%;
        position: absolute;
        left: -6%;
        top: 0;
        opacity: 1;
        width: 100%;
        z-index: -100;
        animation: ${props =>
            props
                ? css`
                      ${shine} forwards 0.75s ease-in-out 3s;
                  `
                : "none"};
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

const Input = styled.input`
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border: 1px solid lightgray;
    font-size: 1rem;
`;

const NextButton = styled.p`
    cursor: pointer;
    background: white;
    padding: 5px 10px;
    color: black;
    font-size: 1rem;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    width: 75px;
    text-align: center;
    margin-top: 2rem;

    &:hover {
        color: white;
        background: #356abc;
    }
`;

export default ({ handleChange, trainerName, handleTransition }) => {
    return (
        <WelcomeContainer>
            <WelcomeWrapper>
                <Title>Poké Battle!</Title>
                {/* <a href="https://fontmeme.com/fonts/pokmon-font/">
                    <img
                        src="https://fontmeme.com/permalink/191225/a204749edea003aa3378de9855458102.png"
                        alt="pokmon-font"
                        border="0"
                    />
                </a> */}
                <h2>Enter your trainer name:</h2>
                <Input
                    type="text"
                    name="trainerName"
                    placeholder="Your name"
                    onChange={e => handleChange(e)}
                    value={trainerName}
                    onKeyPress={e => {
                        if (e.key === "Enter" && trainerName !== "") {
                            handleTransition("next");
                        } else if (e.key === "Enter" && trainerName === "") {
                            alert("No name, no game");
                        }
                    }}
                />
                <NextButton
                    onClick={() => {
                        trainerName !== ""
                            ? handleTransition("next")
                            : alert("No name, no game");
                    }}
                >
                    Next
                </NextButton>
            </WelcomeWrapper>
        </WelcomeContainer>
    );
};
