import React from "react";
import styled from "@emotion/styled";

const WelcomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: inline-block;
    overflow: auto;
    position: relative;

    h1 {
        font-family: "Pokemon Solid";
        color: #ffcc03;
        text-shadow: -1px -1px 0 #356abc, 1px -1px 0 #356abc, -1px 1px 0 #356aba,
            1px 1px 0 #356abc;
    }

    a {
        text-underline: none;
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
    box-shadow: 2px 2px 5px 0px grey;
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
    border: 1px solid lightgray;
    box-shadow: 2px 2px 5px 0px gray;
    width: 75px;
    text-align: center;
    margin-top: 2rem;

    &:hover {
        color: white;
        background: #356abc;
        border: 1px solid #356abc;
        box-shadow: 2px 2px 5px 0px #356abc;
    }
`;

export default ({ handleChange, trainerName, handleTransition }) => {
    return (
        <WelcomeContainer>
            <WelcomeWrapper>
                {/* <h1>Poké Battle!</h1> */}
                <a href="https://fontmeme.com/fonts/pokmon-font/">
                    <img
                        src="https://fontmeme.com/permalink/191225/a204749edea003aa3378de9855458102.png"
                        alt="pokmon-font"
                        border="0"
                    />
                </a>
                <h2>Enter your trainer name:</h2>
                <Input
                    type="text"
                    name="trainerName"
                    placeholder="Your name"
                    onChange={e => handleChange(e)}
                    value={trainerName}
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
