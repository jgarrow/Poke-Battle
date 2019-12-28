import React from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";

// animation for Title
const shine = keyframes`
    from {
        left: -6%;
    }

    to {
        left: 100%;
    }
`;

// animation for rest of content besides Title
const reveal = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const boxShadow = keyframes`
    from {
        box-shadow: none;
    }
    to {
        box-shadow: 0px 0px 10px 0px gray;
    }
`;

const WelcomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: inline-block;
    overflow: auto;
    overflow-x: hidden;
    position: relative;

    a {
        text-underline: none;
    }
`;

const ContentCard = styled.div`
    box-sizing: border-box;
    white-space: nowrap;
    background: white;
    width: 550px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: none;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    animation: ${props =>
        props
            ? css`
                  ${boxShadow} forwards 1s ease-in 3.85s;
              `
            : "none"};
`;

const Title = styled.h1`
    font-family: "Pokemon Solid";
    font-size: 5rem;
    margin-top: 0;
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
    animation: ${props =>
        props ? "desktopTitleReveal 3.25s forwards ease-in" : "none"};

    @keyframes desktopTitleReveal {
        0% {
            opacity: 0;
            font-size: 5rem;
        }
        40%,
        80% {
            opacity: 1;
            font-size: 6rem;
        }
        100% {
            opacity: 1;
            font-size: 5rem;
        }
    }

    @media (max-width: 600px) {
        font-size: 4rem;
        animation: ${props =>
            props ? "mediumTitleReveal 3.25s forwards ease-in" : "none"};

        @keyframes mediumTitleReveal {
            0% {
                opacity: 0;
                font-size: 4rem;
            }
            40%,
            80% {
                opacity: 1;
                font-size: 5rem;
            }
            100% {
                opacity: 1;
                font-size: 4rem;
            }
        }
    }

    @media (max-width: 400px) {
        font-size: 3rem;
        animation: ${props =>
            props ? "mobileTitleReveal 3.25s forwards ease-in" : "none"};

        @keyframes mobileTitleReveal {
            0% {
                opacity: 0;
                font-size: 3rem;
            }
            40%,
            80% {
                opacity: 1;
                font-size: 4rem;
            }
            100% {
                opacity: 1;
                font-size: 3rem;
            }
        }
    }

    @media (max-width: 400px) {
        font-size: 2.8rem;
        animation: ${props =>
            props ? "smallMobileTitleReveal 3.25s forwards ease-in" : "none"};

        @keyframes smallMobileTitleReveal {
            0% {
                opacity: 0;
                font-size: 2.8rem;
            }
            40%,
            80% {
                opacity: 1;
                font-size: 3.25rem;
            }
            100% {
                opacity: 1;
                font-size: 2.8rem;
            }
        }
    }

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
                      ${shine} forwards 0.75s ease-in-out 1.8s;
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

const Content = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    opacity: 0;
    animation: ${props =>
        props
            ? css`
                  ${reveal} forwards 1s ease-in 3.85s;
              `
            : "none"};
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
    background: #81a4db;
    padding: 5px 10px;
    color: black;
    font-size: 1rem;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    width: 75px;
    text-align: center;
    margin-top: 2rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        color: white;
        background: #356abc;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
    }
`;

export default ({ handleChange, trainerName, handleTransition }) => {
    return (
        <WelcomeContainer>
            <WelcomeWrapper>
                <ContentCard>
                    <Title>Poké Battle!</Title>
                    {/* <a href="https://fontmeme.com/fonts/pokmon-font/">
                        <img
                            src="https://fontmeme.com/permalink/191225/a204749edea003aa3378de9855458102.png"
                            alt="pokmon-font"
                            border="0"
                        />
                    </a> */}
                    <Content>
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
                                } else if (
                                    e.key === "Enter" &&
                                    trainerName === ""
                                ) {
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
                    </Content>
                </ContentCard>
            </WelcomeWrapper>
        </WelcomeContainer>
    );
};
