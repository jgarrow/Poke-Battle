import React from "react";
import styled from "@emotion/styled";

import pokeball from "../images/PokeballSVG.svg";

const BattleContainer = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
`;

const Bg = styled.div`
    margin: 0;
    width: 100vw;
    height: 100vh;
    background: repeating-linear-gradient(
        135deg,
        white 0%,
        white 1%,
        lightgray 1%,
        lightgray 3%,
        white 3%,
        white 3.5%,
        lightgray 3.5%,
        lightgray 5%,
        white 5%,
        white 6%,
        lightgray 6%,
        lightgray 7%,
        white 7%,
        white 8%,
        lightgray 8%,
        lightgray 9%,
        white 9%,
        white 12%,
        lightgray 12%,
        lightgray 13%,
        white 13%,
        white 15%,
        lightgray 15%,
        lightgray 16%,
        white 16%,
        white 17%,
        lightgray 17%,
        lightgray 18.5%,
        white 18.5%,
        white 20%
    );
    background-repeat: no-repeat;
    background-attachment: fixed;
`;

const PokeballContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0;
    background: transparent;
`;

const Pokeball = styled.div`
    max-width: 276px;
    max-height: 276px;
    text-align: center;
    transform: translateX(-100%);
    animation: slide 5s forwards 1s;
    position: absolute;
    margin: calc((100vh - 276px) / 2) 0;

    img {
        animation: roll 5s forwards 1s;
    }

    @keyframes slide {
        100% {
            transform: translateX(100vw);
        }
    }

    @keyframes roll {
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Content = styled.section`
    margin: 0 auto;
    width: 80%;
    max-width: 960px;
    padding: 1.5rem 0;
`;

const Title = styled.h1`
    margin-top: 0;
`;

export default ({ location }) => {
    const { trainerName, party, oppParty } = location.state;
    const trainerType = location.state.selectedTrainer.name;
    const opponent = location.state.opponent.name;

    return (
        <BattleContainer>
            <Bg>
                <PokeballContainer>
                    <Pokeball>
                        <img
                            src={pokeball}
                            alt="Blue pokeball for transition to page"
                        />
                    </Pokeball>

                    <Content>
                        <Title>Battle Page</Title>
                        <h2>trainerName: {trainerName}</h2>
                        <p>selectedTrainer: {trainerType}</p>
                        {party.map(pokemon => (
                            <p key={pokemon.id}>{pokemon.name}</p>
                        ))}
                        <h2>Opponent: {opponent}</h2>
                        {oppParty.map(pokemon => (
                            <p key={pokemon.pokemon.id}>
                                {pokemon.pokemon.name}
                            </p>
                        ))}
                    </Content>
                </PokeballContainer>
            </Bg>
        </BattleContainer>
    );
};
