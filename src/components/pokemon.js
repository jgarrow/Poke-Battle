import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import Image from "./poke-image";
import PokemonCard from "./pokemon-card";

const Header = styled.header`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 1rem auto;
`;

const PartyWrapper = styled.div`
    width: 80%;
    max-width: 530px;
    margin: 0 auto 1.5rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;

const PartyCard = styled.div`
    background: ${props => (props.selected ? "#99CDFF" : "#D1E9FF")};
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    margin: 0 auto;
    width: 150px;
    height: 150px;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const ImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 auto;
`;

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-rows: auto;
    grid-gap: 30px;
    text-align: center;
`;

export default ({
    party,
    partyOptions,
    partySelection,
    handlePokemonSelect,
    handlePartySelect
}) => {
    const [openInfoId, setOpenInfoId] = useState(null);

    const handleInfoClick = pokemonId => {
        const monId = openInfoId === pokemonId ? null : pokemonId;
        setOpenInfoId(monId);
    };

    return (
        <>
            <Header>
                <h1
                    css={css`
                        margin: 0 auto;
                    `}
                >
                    Choose 3 Pokémon
                </h1>
                <p
                    css={css`
                        cursor: pointer;
                    `}
                >
                    Next →
                </p>
            </Header>
            <PartyWrapper>
                <PartyCard
                    onClick={() => {
                        handlePartySelect(0);
                    }}
                    selected={partySelection === 0}
                >
                    <ImageWrapper>
                        {party[0] && <Image name={party[0].name} />}
                    </ImageWrapper>
                </PartyCard>

                <PartyCard
                    onClick={() => {
                        handlePartySelect(1);
                    }}
                    selected={partySelection === 1}
                >
                    <ImageWrapper>
                        {party[1] && <Image name={party[1].name} />}
                    </ImageWrapper>
                </PartyCard>

                <PartyCard
                    onClick={() => {
                        handlePartySelect(2);
                    }}
                    selected={partySelection === 2}
                >
                    <ImageWrapper>
                        {party[2] && <Image name={party[2].name} />}
                    </ImageWrapper>
                </PartyCard>
            </PartyWrapper>

            <CardWrapper>
                {partyOptions.map(pokemon => {
                    return (
                        <PokemonCard
                            key={pokemon.pokemon.id}
                            pokemon={pokemon.pokemon}
                            openInfo={openInfoId === pokemon.pokemon.id}
                            handlePokemonSelect={handlePokemonSelect}
                            handleInfoClick={handleInfoClick}
                            selected={party.some(
                                partymon => partymon.id === pokemon.pokemon.id
                            )}
                        />
                    );
                })}
            </CardWrapper>
        </>
    );
};

// class Pokemon {
//     constructor(attr) {
//         this.name = attr.name;
//         this.type = attr.type;
//         this.secondType = attr.secondType;
//         this.firstMove = attr.firstMove; // object { moveName, moveType, movePower }
//         this.secondMove = attr.secondMove; // object { moveName, moveType, movePower }
//         this.hp = attr.hp;
//     }
//     attack(move, opponentType) {
//         // return attack power of selected move
//         if (move.moveType === 'Normal' && opponentType === 'Rock' ||
//             move.moveType === 'Normal' && opponentType === 'Steel' ||
//             move.moveType === 'Fighting' && opponentType === 'Flying' ||
//             move.moveType === 'Fighting' && opponentType === 'Poison' ||
//             move.moveType === 'Fighting' && opponentType === 'Bug' ||
//             move.moveType === 'Fighting' && opponentType === 'Psychic' ||
//             move.moveType === 'Fighting' && opponentType === 'Fairy' ||
//             move.moveType === 'Flying' && opponentType === 'Rock' ||
//             move.moveType === 'Flying' && opponentType === 'Steel' ||
//             move.moveType === 'Flying' && opponentType === 'Electric' ||
//             move.moveType === 'Poison' && opponentType === 'Poison' ||
//             move.moveType === 'Poison' && opponentType === 'Ground' ||
//             move.moveType === 'Poison' && opponentType === 'Rock' ||
//             move.moveType === 'Poison' && opponentType === 'Ghost' ||
//             move.moveType === 'Ground' && opponentType === 'Bug' ||
//             move.moveType === 'Ground' && opponentType === 'Grass' ||
//             move.moveType === 'Rock' && opponentType === 'Ground' ||
//             move.moveType === 'Rock' && opponentType === 'Steel' ||
//             move.moveType === 'Bug' && opponentType === 'Fighting' ||
//             move.moveType === 'Bug' && opponentType === 'Flying' ||
//             move.moveType === 'Bug' && opponentType === 'Poison' ||
//             move.moveType === 'Bug' && opponentType === 'Ghost' ||
//             move.moveType === 'Bug' && opponentType === 'Steel' ||
//             move.moveType === 'Bug' && opponentType === 'Fire' ||
//             move.moveType === 'Bug' && opponentType === 'Fairy' ||
//             move.moveType === 'Ghost' && opponentType === 'Dark' ||
//             move.moveType === 'Steel' && opponentType === 'Steel' ||
//             move.moveType === 'Steel' && opponentType === 'Fire' ||
//             move.moveType === 'Steel' && opponentType === 'Water' ||
//             move.moveType === 'Steel' && opponentType === 'Electric' ||
//             move.moveType === 'Fire' && opponentType === 'Rock' ||
//             move.moveType === 'Fire' && opponentType === 'Fire' ||
//             move.moveType === 'Fire' && opponentType === 'Water' ||
//             move.moveType === 'Fire' && opponentType === 'Dragon' ||
//             move.moveType === 'Water' && opponentType === 'Water' ||
//             move.moveType === 'Water' && opponentType === 'Grass' ||
//             move.moveType === 'Water' && opponentType === 'Dragon' ||
//             move.moveType === 'Grass' && opponentType === 'Flying' ||
//             move.moveType === 'Grass' && opponentType === 'Poison' ||
//             move.moveType === 'Grass' && opponentType === 'Bug' ||
//             move.moveType === 'Grass' && opponentType === 'Steel' ||
//             move.moveType === 'Grass' && opponentType === 'Fire' ||
//             move.moveType === 'Grass' && opponentType === 'Grass' ||
//             move.moveType === 'Grass' && opponentType === 'Dragon' ||
//             move.moveType === 'Electric' && opponentType === 'Grass' ||
//             move.moveType === 'Electric' && opponentType === 'Electric' ||
//             move.moveType === 'Electric' && opponentType === 'Dragon' ||
//             move.moveType === 'Psychic' && opponentType === 'Steel' ||
//             move.moveType === 'Psychic' && opponentType === 'Psychic' ||
//             move.moveType === 'Ice' && opponentType === 'Steel' ||
//             move.moveType === 'Ice' && opponentType === 'Fire' ||
//             move.moveType === 'Ice' && opponentType === 'Water' ||
//             move.moveType === 'Ice' && opponentType === 'Ice' ||
//             move.moveType === 'Dragon' && opponentType === 'Steel' ||
//             move.moveType === 'Dark' && opponentType === 'Fighting' ||
//             move.moveType === 'Dark' && opponentType === 'Dark' ||
//             move.moveType === 'Dark' && opponentType === 'Fairy' ||
//             move.moveType === 'Fairy' && opponentType === 'Poison' ||
//             move.moveType === 'Fairy' && opponentType === 'Steel' ||
//             move.moveType === 'Fairy' && opponentType === 'Fire'
//         ) {
//             return move.movePower * 0.5;
//         } else if (move.moveType === 'Normal' && opponentType === 'Ghost' ||
//                 move.moveType === 'Fighting' && opponentType === 'Ghost' ||
//                 move.moveType === 'Poison' && opponentType === 'Steel' ||
//                 move.moveType === 'Ground' && opponentType === 'Flying' ||
//                 move.moveType === 'Ghost' && opponentType === 'Normal' ||
//                 move.moveType === 'Electric' && opponentType === 'Ground' ||
//                 move.moveType === 'Psychic' && opponentType === 'Dark' ||
//                 move.moveType === 'Dragon' && opponentType === 'Fairy'
//         ) {
//             return 0;
//         } else if (move.moveType === 'Fighting' && opponentType === 'Normal' ||
//                 move.moveType === 'Fighting' && opponentType === 'Rock' ||
//                 move.moveType === 'Fighting' && opponentType === 'Steel' ||
//                 move.moveType === 'Fighting' && opponentType === 'Ice' ||
//                 move.moveType === 'Fighting' && opponentType === 'Dark' ||
//                 move.moveType === 'Flying' && opponentType === 'Fighting' ||
//                 move.moveType === 'Flying' && opponentType === 'Bug' ||
//                 move.moveType === 'Flying' && opponentType === 'Grass' ||
//                 move.moveType === 'Poison' && opponentType === 'Grass' ||
//                 move.moveType === 'Poison' && opponentType === 'Fairy' ||
//                 move.moveType === 'Ground' && opponentType === 'Poison' ||
//                 move.moveType === 'Ground' && opponentType === 'Rock' ||
//                 move.moveType === 'Ground' && opponentType === 'Steel' ||
//                 move.moveType === 'Ground' && opponentType === 'Fire' ||
//                 move.moveType === 'Ground' && opponentType === 'Electric' ||
//                 move.moveType === 'Rock' && opponentType === 'Flying' ||
//                 move.moveType === 'Rock' && opponentType === 'Bug' ||
//                 move.moveType === 'Rock' && opponentType === 'Fire' ||
//                 move.moveType === 'Rock' && opponentType === 'Ice' ||
//                 move.moveType === 'Bug' && opponentType === 'Grass' ||
//                 move.moveType === 'Bug' && opponentType === 'Psychic' ||
//                 move.moveType === 'Bug' && opponentType === 'Dark' ||
//                 move.moveType === 'Ghost' && opponentType === 'Ghost' ||
//                 move.moveType === 'Ghost' && opponentType === 'Psychic' ||
//                 move.moveType === 'Steel' && opponentType === 'Rock' ||
//                 move.moveType === 'Steel' && opponentType === 'Ice' ||
//                 move.moveType === 'Steel' && opponentType === 'Fairy' ||
//                 move.moveType === 'Fire' && opponentType === 'Bug' ||
//                 move.moveType === 'Fire' && opponentType === 'Steel' ||
//                 move.moveType === 'Fire' && opponentType === 'Grass' ||
//                 move.moveType === 'Fire' && opponentType === 'Ice' ||
//                 move.moveType === 'Water' && opponentType === 'Ground' ||
//                 move.moveType === 'Water' && opponentType === 'Rock' ||
//                 move.moveType === 'Water' && opponentType === 'Fire' ||
//                 move.moveType === 'Grass' && opponentType === 'Ground' ||
//                 move.moveType === 'Grass' && opponentType === 'Rock' ||
//                 move.moveType === 'Grass' && opponentType === 'Water' ||
//                 move.moveType === 'Electric' && opponentType === 'Flying' ||
//                 move.moveType === 'Electric' && opponentType === 'Water' ||
//                 move.moveType === 'Psychic' && opponentType === 'Fighting' ||
//                 move.moveType === 'Psychic' && opponentType === 'Poison' ||
//                 move.moveType === 'Ice' && opponentType === 'Flying' ||
//                 move.moveType === 'Ice' && opponentType === 'Ground' ||
//                 move.moveType === 'Ice' && opponentType === 'Grass' ||
//                 move.moveType === 'Ice' && opponentType === 'Dragon' ||
//                 move.moveType === 'Dragon' && opponentType === 'Dragon' ||
//                 move.moveType === 'Dark' && opponentType === 'Ghost' ||
//                 move.moveType === 'Dark' && opponentType === 'Psychic' ||
//                 move.moveType === 'Fairy' && opponentType === 'Fighting' ||
//                 move.moveType === 'Fairy' && opponentType === 'Dragon' ||
//                 move.moveType === 'Fairy' && opponentType === 'Dark'
//         ) {
//             return move.movePower * 2;
//         } else {
//             return move.movePower;
//         }
//     }

//     takeDamage(opponentAttack) {
//         // subtract opponent's attack damage from this.hp
//         return this.hp - opponentAttack(opponentMove, this.type);
//     }
// }

// const Bulbasaur = new Pokemon({
//     name = 'Bulbasaur',
//     type = 'Grass',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Vine Whip',
//         moveType: 'Grass',
//         movePower: 10,
//     },
//     hp = 20,
// });

// const Ivysaur = new Pokemon({
//     name = 'Ivysaur',
//     type = 'Grass',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Razor Leaf',
//         moveType: 'Grass',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Vine Whip',
//         moveType: 'Grass',
//         movePower: 10,
//     },
//     hp = 55,
// });

// const Venusaur = new Pokemon({
//     name = 'Venusaur',
//     type = 'Grass',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Razor Leaf',
//         moveType: 'Grass',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Solar Beam',
//         moveType: 'Grass',
//         movePower: 30,
//     },
//     hp = 130,
// });

// const Charmander = new Pokemon({
//     name = 'Charmander',
//     type = 'Fire',
//     secondType = '',
//     firstMove = {
//         moveName: 'Scratch',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Ember',
//         moveType: 'Fire',
//         movePower: 10,
//     },
//     hp = 20,
// })

// const Charmeleon = new Pokemon({
//     name = 'Charmeleon',
//     type = 'Fire',
//     secondType = '',
//     firstMove = {
//         moveName: 'Slash',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Ember',
//         moveType: 'Fire',
//         movePower: 10,
//     },
//     hp = 47,
// });

// const Charizard = new Pokemon({
//     name = 'Charizard',
//     type = 'Fire',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Wing Attack',
//         moveType: 'Flying',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Flamethrower',
//         moveType: 'Fire',
//         movePower: 20,
//     },
//     hp = 120,
// });

// const Squirtle = new Pokemon({
//     name = 'Squirtle',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Bubble',
//         moveType: 'Water',
//         movePower: 10,
//     },
//     hp = 20,
// });

// const Wartortle = new Pokemon({
//     name = 'Wartortle',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Bite',
//         moveType: 'Dark',
//         movePower: 8,
//     },
//     secondMove = {
//         moveName: 'Water Gun',
//         moveType: 'Water',
//         movePower: 15,
//     },
//     hp = 45,
// });

// const Blastoise = new Pokemon({
//     name = 'Blastoise',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Hydro Pump',
//         moveType: 'Water',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Skull Bash',
//         moveType: 'Normal',
//         movePower: 25,
//     },
//     hp = 125,
// });

// const Caterpie = new Pokemon({
//     name = 'Caterpie',
//     type = 'Bug',
//     secondType = '',
//     firstMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'String Shot',
//         moveType: 'Bug',
//         movePower: 0,
//     },
//     hp = 15,
// });

// const Metapod = new Pokemon({
//     name = 'Metapod',
//     type = 'Bug',
//     secondType = '',
//     firstMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Harden',
//         moveType: 'Normal',
//         movePower: 0,
//     },
//     hp = 30,
// });

// const Butterfree = new Pokemon({
//     name = 'Butterfree',
//     type = 'Bug',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Gust',
//         moveType: 'Flying',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Bug Buzz',
//         moveType: 'Bug',
//         movePower: 20,
//     },
//     hp = 95,
// });

// const Weedle = new Pokemon({
//     name = 'Weedle',
//     type = 'Bug',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Poison Sting',
//         moveType: 'Poison',
//         movePower: 4,
//     },
//     secondMove = {
//         moveName: 'String Shot',
//         moveType: 'Bug',
//         movePower: 0,
//     },
//     hp = 15,
// });

// const Kakuna = new Pokemon({
//     name = 'Kakuna',
//     type = 'Bug',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Poison Sting',
//         moveType: 'Poison',
//         movePower: 4,
//     },
//     secondMove = {
//         moveName: 'Harden',
//         moveType: 'Normal',
//         movePower: 0,
//     },
//     hp = 30,
// });

// const Beedrill = new Pokemon({
//     name = 'Beedrill',
//     type = 'Bug',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Poison Jab',
//         moveType: 'Poison',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Pin Missile',
//         moveType: 'Bug',
//         movePower: 18,
//     },
//     hp = 95,
// });

// const Pidgey = new Pokemon({
//     name = 'Pidgey',
//     type = 'Normal',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Gust',
//         moveType: 'Flying',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Quick Attack',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 18,
// });

// const Pidgeotto = new Pokemon({
//     name = 'Pidgeotto',
//     type = 'Normal',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Wing Attack',
//         moveType: 'Flying',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Roost',
//         moveType: 'Flying',
//         movePower: 0,
//     },
//     hp = 45,
// });

// const Pidgeot = new Pokemon({
//     name = 'Pidgeot',
//     type = 'Normal',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Air Slash',
//         moveType: 'Flying',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Razor Wind',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 45,
// });

// const Pidgeot = new Pokemon({
//     name = 'Pidgeot',
//     type = 'Normal',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Air Slash',
//         moveType: 'Flying',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Razor Wind',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 105,
// });

// const Rattata = new Pokemon({
//     name = 'Rattata',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Quick Attack',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 15,
// });

// const Raticate = new Pokemon({
//     name = 'Raticate',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Crunch',
//         moveType: 'Dark',
//         movePower: 18,
//     },
//     secondMove = {
//         moveName: 'Hyper Fang',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 60,
// });

// const Spearow = new Pokemon({
//     name = 'Spearow',
//     type = 'Normal',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Peck',
//         moveType: 'Flying',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Fury Attack',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     hp = 15,
// });

// const Fearow = new Pokemon({
//     name = 'Fearow',
//     type = 'Normal',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Quick Attack',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     secondMove = {
//         moveName: 'Sky Attack',
//         moveType: 'Flying',
//         movePower: 25,
//     },
//     hp = 65,
// });

// const Ekans = new Pokemon({
//     name = 'Ekans',
//     type = 'Poison',
//     secondType = '',
//     firstMove = {
//         moveName: 'Poison Sting',
//         moveType: 'Poison',
//         movePower: 4,
//     },
//     secondMove = {
//         moveName: 'Bite',
//         moveType: 'Dark',
//         movePower: 8,
//     },
//     hp = 15,
// });

// const Arbok = new Pokemon({
//     name = 'Arbok',
//     type = 'Poison',
//     secondType = '',
//     firstMove = {
//         moveName: 'Poison Jab',
//         moveType: 'Poison',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Slam',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 55,
// });

// const Pikachu = new Pokemon({
//     name = 'Pikachu',
//     type = 'Electric',
//     secondType = '',
//     firstMove = {
//         moveName: 'Thunder Shock',
//         moveType: 'Electric',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Quick Attack',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 18,
// });

// const Raichu = new Pokemon({
//     name = 'Raichu',
//     type = 'Electric',
//     secondType = '',
//     firstMove = {
//         moveName: 'Thunder',
//         moveType: 'Electric',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Slam',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 60,
// });

// const Sandshrew = new Pokemon({
//     name = 'Sandshrew',
//     type = 'Ground',
//     secondType = '',
//     firstMove = {
//         moveName: 'Scratch',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Swift',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 12,
// });

// const Sandslash = new Pokemon({
//     name = 'Sandslash',
//     type = 'Ground',
//     secondType = '',
//     firstMove = {
//         moveName: 'Slash',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Dig',
//         moveType: 'Ground',
//         movePower: 20,
//     },
//     hp = 60,
// });

// const Nidoran♀ = new Pokemon({
//     name = 'Nidoran♀',
//     type = 'Poison',
//     secondType = '',
//     firstMove = {
//         moveName: 'Scratch',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Poison Sting',
//         moveType: 'Poison',
//         movePower: 4,
//     },
//     hp = 15,
// });

// const Nidorina = new Pokemon({
//     name = 'Nidorina',
//     type = 'Poison',
//     secondType = '',
//     firstMove = {
//         moveName: 'Double Kick',
//         moveType: 'Fighting',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Crunch',
//         moveType: 'Dark',
//         movePower: 18,
//     },
//     hp = 65,
// });

// const Nidoqueen = new Pokemon({
//     name = 'Nidoqueen',
//     type = 'Poison',
//     secondType = 'Ground',
//     firstMove = {
//         moveName: 'Superpower',
//         moveType: 'Fighting',
//         movePower: 30,
//     },
//     secondMove = {
//         moveName: 'Body Slam',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 115,
// });

// const Nidoran♂ = new Pokemon({
//     name = 'Nidoran♂',
//     type = 'Poison',
//     secondType = '',
//     firstMove = {
//         moveName: 'Peck',
//         moveType: 'Flying',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Poison Sting',
//         moveType: 'Poison',
//         movePower: 4,
//     },
//     hp = 15,
// });

// const Nidorino = new Pokemon({
//     name = 'Nidorino',
//     type = 'Poison',
//     secondType = '',
//     firstMove = {
//         moveName: 'Horn Attack',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Poison Jab',
//         moveType: 'Poison',
//         movePower: 15,
//     },
//     hp = 65,
// });

// const Nidoking = new Pokemon({
//     name = 'Nidoking',
//     type = 'Poison',
//     secondType = 'Ground',
//     firstMove = {
//         moveName: 'Megahorn',
//         moveType: 'Bug',
//         movePower: 30,
//     },
//     secondMove = {
//         moveName: 'Earthquake',
//         moveType: 'Ground',
//         movePower: 20,
//     },
//     hp = 115,
// });

// const Clefairy = new Pokemon({
//     name = 'Clefairy',
//     type = 'Fairy',
//     secondType = '',
//     firstMove = {
//         moveName: 'Pound',
//         moveType: 'Normal',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Double Slap',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 12,
// });

// const Clefable = new Pokemon({
//     name = 'Clefable',
//     type = 'Fairy',
//     secondType = '',
//     firstMove = {
//         moveName: 'Body Slam',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Moonblast',
//         moveType: 'Fairy',
//         movePower: 25,
//     },
//     hp = 70,
// });

// const Vulpix = new Pokemon({
//     name = 'Vulpix',
//     type = 'Fire',
//     secondType = '',
//     firstMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Ember',
//         moveType: 'Fire',
//         movePower: 10,
//     },
//     hp = 18,
// });

// const Ninetales = new Pokemon({
//     name = 'Ninetales',
//     type = 'Fire',
//     secondType = '',
//     firstMove = {
//         moveName: 'Quick Attack',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     secondMove = {
//         moveName: 'Flamethrower',
//         moveType: 'Fire',
//         movePower: 20,
//     },
//     hp = 75,
// });

// const Jigglypuff = new Pokemon({
//     name = 'Jigglypuff',
//     type = 'Normal',
//     secondType = 'Fairy',
//     firstMove = {
//         moveName: 'Pound',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Double Slap',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 12,
// });

// const Wigglytuff = new Pokemon({
//     name = 'Wigglytuff',
//     type = 'Normal',
//     secondType = 'Fairy',
//     firstMove = {
//         moveName: 'Headbutt',
//         moveType: 'Normal',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Body Slam',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 65,
// });

// const Zubat = new Pokemon({
//     name = 'Zubat',
//     type = 'Poison',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Wing Attack',
//         moveType: 'Flying',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Bite',
//         moveType: 'Dark',
//         movePower: 8,
//     },
//     hp = 15,
// });

// const Golbat = new Pokemon({
//     name = 'Golbat',
//     type = 'Poison',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Air Slash',
//         moveType: 'Flying',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Bite',
//         moveType: 'Dark',
//         movePower: 8,
//     },
//     hp = 55,
// });

// const Oddish = new Pokemon({
//     name = 'Oddish',
//     type = 'Grass',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Razor Leaf',
//         moveType: 'Grass',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Absorb',
//         moveType: 'Grass',
//         movePower: 4,
//     },
//     hp = 20,
// });

// const Gloom = new Pokemon({
//     name = 'Gloom',
//     type = 'Grass',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Razor Leaf',
//         moveType: 'Grass',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Absorb',
//         moveType: 'Grass',
//         movePower: 4,
//     },
//     hp = 60,
// });

// const Vileplume = new Pokemon({
//     name = 'Vileplume',
//     type = 'Grass',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Solar Beam',
//         moveType: 'Grass',
//         movePower: 30,
//     },
//     secondMove = {
//         moveName: 'Moonblast',
//         moveType: 'Fairy',
//         movePower: 25,
//     },
//     hp = 115,
// });

// const Paras = new Pokemon({
//     name = 'Paras',
//     type = 'Bug',
//     secondType = 'Grass',
//     firstMove = {
//         moveName: 'Scratch',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Fury Swipes',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     hp = 12,
// });

// const Parasect = new Pokemon({
//     name = 'Parasect',
//     type = 'Bug',
//     secondType = 'Grass',
//     firstMove = {
//         moveName: 'Slash',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'X-Scissor',
//         moveType: 'Bug',
//         movePower: 20,
//     },
//     hp = 50,
// });

// const Venonat = new Pokemon({
//     name = 'Venonat',
//     type = 'Bug',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Confusion',
//         moveType: 'Psychic',
//         movePower: 10,
//     },
//     hp = 14,
// });

// const Venomoth = new Pokemon({
//     name = 'Venomoth',
//     type = 'Bug',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Bug Buzz',
//         moveType: 'Bug',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Psybeam',
//         moveType: 'Psychic',
//         movePower: 15,
//     },
//     hp = 60,
// });

// const Diglett = new Pokemon({
//     name = 'Diglett',
//     type = 'Ground',
//     secondType = '',
//     firstMove = {
//         moveName: 'Scratch',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Dig',
//         moveType: 'Ground',
//         movePower: 15,
//     },
//     hp = 13,
// });

// const Dugtrio = new Pokemon({
//     name = 'Dugtrio',
//     type = 'Ground',
//     secondType = '',
//     firstMove = {
//         moveName: 'Sucker Punch',
//         moveType: 'Dark',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Earthquake',
//         moveType: 'Ground',
//         movePower: 20,
//     },
//     hp = 50,
// });

// const Meowth = new Pokemon({
//     name = 'Meowth',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Bite',
//         moveType: 'Dark',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Scratch',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     hp = 12,
// });

// const Persian = new Pokemon({
//     name = 'Persian',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Play Rough',
//         moveType: 'Fairy',
//         movePower: 18,
//     },
//     secondMove = {
//         moveName: 'Slash',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     hp = 60,
// });

// const Psyduck = new Pokemon({
//     name = 'Psyduck',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Water Gun',
//         moveType: 'Water',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Confusion',
//         moveType: 'Psychic',
//         movePower: 10,
//     },
//     hp = 14,
// });

// const Golduck = new Pokemon({
//     name = 'Golduck',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Surf',
//         moveType: 'Water',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Psybeam',
//         moveType: 'Psychic',
//         movePower: 15,
//     },
//     hp = 65,
// });

// const Mankey = new Pokemon({
//     name = 'Mankey',
//     type = 'Fighting',
//     secondType = '',
//     firstMove = {
//         moveName: 'Scratch',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Karate Chop',
//         moveType: 'Fighting',
//         movePower: 10,
//     },
//     hp = 13,
// });

// const Primeape = new Pokemon({
//     name = 'Primeape',
//     type = 'Fighting',
//     secondType = '',
//     firstMove = {
//         moveName: 'Seismic Toss',
//         moveType: 'Fighting',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Low Kick',
//         moveType: 'Fighting',
//         movePower: 12,
//     },
//     hp = 65,
// });

// const Growlithe = new Pokemon({
//     name = 'Growlithe',
//     type = 'Fire',
//     secondType = '',
//     firstMove = {
//         moveName: 'Ember',
//         moveType: 'Fire',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Bite',
//         moveType: 'Dark',
//         movePower: 5,
//     },
//     hp = 14,
// });

// const Arcanine = new Pokemon({
//     name = 'Arcanine',
//     type = 'Fire',
//     secondType = '',
//     firstMove = {
//         moveName: 'Flamethrower',
//         moveType: 'Fire',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Crunch',
//         moveType: 'Dark',
//         movePower: 12,
//     },
//     hp = 85,
// });

// const Poliwag = new Pokemon({
//     name = 'Poliwag',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Pound',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Water Gun',
//         moveType: 'Water',
//         movePower: 10,
//     },
//     hp = 15,
// });

// const Poliwhirl = new Pokemon({
//     name = 'Poliwhirl',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Body Slam',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Bubblebeam',
//         moveType: 'Water',
//         movePower: 15,
//     },
//     hp = 65,
// });

// const Poliwrath = new Pokemon({
//     name = 'Poliwrath',
//     type = 'Water',
//     secondType = 'Fighting',
//     firstMove = {
//         moveName: 'Ice Punch',
//         moveType: 'Ice',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Bubblebeam',
//         moveType: 'Water',
//         movePower: 15,
//     },
//     hp = 115,
// });

// const Abra = new Pokemon({
//     name = 'Abra',
//     type = 'Psychic',
//     secondType = '',
//     firstMove = {
//         moveName: 'Teleport',
//         moveType: 'Psychic',
//         movePower: 0,
//     },
//     secondMove = {
//         moveName: 'Headbutt',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 14,
// });

// const Kadabra = new Pokemon({
//     name = 'Kadabra',
//     type = 'Psychic',
//     secondType = '',
//     firstMove = {
//         moveName: 'Psybeam',
//         moveType: 'Psychic',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Confusion',
//         moveType: 'Psychic',
//         movePower: 10,
//     },
//     hp = 55,
// });

// const Alakazam = new Pokemon({
//     name = 'Alakazam',
//     type = 'Psychic',
//     secondType = '',
//     firstMove = {
//         moveName: 'Psychic',
//         moveType: 'Psychic',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Confusion',
//         moveType: 'Psychic',
//         movePower: 10,
//     },
//     hp = 100,
// });

// const Machop = new Pokemon({
//     name = 'Alakazam',
//     type = 'Fighting',
//     secondType = '',
//     firstMove = {
//         moveName: 'Low Kick',
//         moveType: 'Fighting',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Karate Chop',
//         moveType: 'Fighting',
//         movePower: 10,
//     },
//     hp = 13,
// });

// const Machoke = new Pokemon({
//     name = 'Machoke',
//     type = 'Fighting',
//     secondType = '',
//     firstMove = {
//         moveName: 'Brick Break',
//         moveType: 'Fighting',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Submission',
//         moveType: 'Fighting',
//         movePower: 20,
//     },
//     hp = 65,
// });

// const Machamp = new Pokemon({
//     name = 'Machamp',
//     type = 'Fighting',
//     secondType = '',
//     firstMove = {
//         moveName: 'Superpower',
//         moveType: 'Fighting',
//         movePower: 30,
//     },
//     secondMove = {
//         moveName: 'Submission',
//         moveType: 'Fighting',
//         movePower: 20,
//     },
//     hp = 118,
// });

// const Bellsprout = new Pokemon({
//     name = 'Bellsprout',
//     type = 'Grass',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Vine Whip',
//         moveType: 'Grass',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Wrap',
//         moveType: 'Fighting',
//         movePower: 5,
//     },
//     hp = 14,
// });

// const Weepinbell = new Pokemon({
//     name = 'Weepinbell',
//     type = 'Grass',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Razor Leaf',
//         moveType: 'Grass',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Poison Jab',
//         moveType: 'Poison',
//         movePower: 15,
//     },
//     hp = 60,
// });

// const Victreebel = new Pokemon({
//     name = 'Victreebel',
//     type = 'Grass',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Power Whip',
//         moveType: 'Grass',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Poison Jab',
//         moveType: 'Poison',
//         movePower: 15,
//     },
//     hp = 112,
// });

// const Tentacool = new Pokemon({
//     name = 'Tentacool',
//     type = 'Water',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Bubblebeam',
//         moveType: 'Water',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Poison Sting',
//         moveType: 'Poison',
//         movePower: 4,
//     },
//     hp = 12,
// });

// const Tentacruel = new Pokemon({
//     name = 'Tentacruel',
//     type = 'Water',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Hydro Pump',
//         moveType: 'Water',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Poison Jab',
//         moveType: 'Poison',
//         movePower: 15,
//     },
//     hp = 80,
// });

// const Geodude = new Pokemon({
//     name = 'Geodude',
//     type = 'Rock',
//     secondType = 'Ground',
//     firstMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Rock Throw',
//         moveType: 'Rock',
//         movePower: 10,
//     },
//     hp = 13,
// });

// const Graveler = new Pokemon({
//     name = 'Graveler',
//     type = 'Rock',
//     secondType = 'Ground',
//     firstMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Rock Slide',
//         moveType: 'Rock',
//         movePower: 15,
//     },
//     hp = 58,
// });

// const Golem = new Pokemon({
//     name = 'Golem',
//     type = 'Rock',
//     secondType = 'Ground',
//     firstMove = {
//         moveName: 'Earthquake',
//         moveType: 'Ground',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Rock Slide',
//         moveType: 'Rock',
//         movePower: 15,
//     },
//     hp = 112,
// });

// const Ponyta = new Pokemon({
//     name = 'Ponyta',
//     type = 'Fire',
//     secondType = '',
//     firstMove = {
//         moveName: 'Ember',
//         moveType: 'Fire',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Quick Attack',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 13,
// });

// const Rapidash = new Pokemon({
//     name = 'Rapidash',
//     type = 'Fire',
//     secondType = '',
//     firstMove = {
//         moveName: 'Fire Blast',
//         moveType: 'Fire',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Stomp',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     hp = 85,
// });

// const Slowpoke = new Pokemon({
//     name = 'Slowpoke',
//     type = 'Water',
//     secondType = 'Psychic',
//     firstMove = {
//         moveName: 'Water Gun',
//         moveType: 'Water',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Confusion',
//         moveType: 'Psychic',
//         movePower: 10,
//     },
//     hp = 12,
// });

// const Slowbro = new Pokemon({
//     name = 'Slowbro',
//     type = 'Water',
//     secondType = 'Psychic',
//     firstMove = {
//         moveName: 'Surf',
//         moveType: 'Water',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Psychic',
//         moveType: 'Psychic',
//         movePower: 20,
//     },
//     hp = 75,
// });

// const Magnemite = new Pokemon({
//     name = 'Magnemite',
//     type = 'Electric',
//     secondType = 'Steel',
//     firstMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Thunder Shock',
//         moveType: 'Electric',
//         movePower: 10,
//     },
//     hp = 13,
// });

// const Magneton = new Pokemon({
//     name = 'Magneton',
//     type = 'Electric',
//     secondType = 'Steel',
//     firstMove = {
//         moveName: 'Flash Cannon',
//         moveType: 'Steel',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Thunder',
//         moveType: 'Electric',
//         movePower: 25,
//     },
//     hp = 88,
// });

// const Farfetchd = new Pokemon({
//     name = 'Farfetch\'d',
//     type = 'Normal',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Peck',
//         moveType: 'Flying',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Slash',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     hp = 45,
// });

// const Doduo = new Pokemon({
//     name = 'Doduo',
//     type = 'Normal',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Peck',
//         moveType: 'Flying',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Quick Attack',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 12,
// });

// const Dodrio = new Pokemon({
//     name = 'Dodrio',
//     type = 'Normal',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Jump Kick',
//         moveType: 'Fighting',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Tri Attack',
//         moveType: 'Normal',
//         movePower: 15,
//     },
//     hp = 75,
// });

// const Seel = new Pokemon({
//     name = 'Seel',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Aqua Jet',
//         moveType: 'Water',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Headbutt',
//         moveType: 'Normal',
//         movePower: 15,
//     },
//     hp = 14,
// });

// const Dewgong = new Pokemon({
//     name = 'Dewgong',
//     type = 'Water',
//     secondType = 'Ice',
//     firstMove = {
//         moveName: 'Waterfall',
//         moveType: 'Water',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Aurora Beam',
//         moveType: 'Ice',
//         movePower: 15,
//     },
//     hp = 80,
// });

// const Grimer = new Pokemon({
//     name = 'Grimer',
//     type = 'Poison',
//     secondType = '',
//     firstMove = {
//         moveName: 'Pound',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Sludge',
//         moveType: 'Poison',
//         movePower: 10,
//     },
//     hp = 12,
// });

// const Muk = new Pokemon({
//     name = 'Muk',
//     type = 'Poison',
//     secondType = '',
//     firstMove = {
//         moveName: 'Sludge Bomb',
//         moveType: 'Poison',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Sludge',
//         moveType: 'Poison',
//         movePower: 10,
//     },
//     hp = 78,
// });

// const Shellder = new Pokemon({
//     name = 'Shellder',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Water Gun',
//         moveType: 'Water',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     hp = 13,
// });

// const Cloyster = new Pokemon({
//     name = 'Cloyster',
//     type = 'Water',
//     secondType = 'Ice',
//     firstMove = {
//         moveName: 'Ice Beam',
//         moveType: 'Ice',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Hydro Pump',
//         moveType: 'Water',
//         movePower: 25,
//     },
//     hp = 85,
// });

// const Gastly = new Pokemon({
//     name = 'Gastly',
//     type = 'Ghost',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Lick',
//         moveType: 'Ghost',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Sucker Punch',
//         moveType: 'Dark',
//         movePower: 12,
//     },
//     hp = 12,
// });

// const Haunter = new Pokemon({
//     name = 'Haunter',
//     type = 'Ghost',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Shadow Ball',
//         moveType: 'Ghost',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Sucker Punch',
//         moveType: 'Dark',
//         movePower: 12,
//     },
//     hp = 55,
// });

// const Gengar = new Pokemon({
//     name = 'Gengar',
//     type = 'Ghost',
//     secondType = 'Poison',
//     firstMove = {
//         moveName: 'Shadow Ball',
//         moveType: 'Ghost',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Dark Pulse',
//         moveType: 'Dark',
//         movePower: 15,
//     },
//     hp = 100,
// });

// const Onix = new Pokemon({
//     name = 'Onix',
//     type = 'Rock',
//     secondType = 'Ground',
//     firstMove = {
//         moveName: 'Rock Slide',
//         moveType: 'Rock',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Earthquake',
//         moveType: 'Ground',
//         movePower: 20,
//     },
//     hp = 75,
// });

// const Drowzee = new Pokemon({
//     name = 'Drowzee',
//     type = 'Psychic',
//     secondType = '',
//     firstMove = {
//         moveName: 'Pound',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Confusion',
//         moveType: 'Psychic',
//         movePower: 10,
//     },
//     hp = 13,
// });

// const Hypno = new Pokemon({
//     name = 'Hypno',
//     type = 'Psychic',
//     secondType = '',
//     firstMove = {
//         moveName: 'Headbutt',
//         moveType: 'Normal',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Psychic',
//         moveType: 'Psychic',
//         movePower: 20,
//     },
//     hp = 80,
// });

// const Krabby = new Pokemon({
//     name = 'Krabby',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Vice Grip',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Bubble',
//         moveType: 'Water',
//         movePower: 10,
//     },
//     hp = 13,
// });

// const Kingler = new Pokemon({
//     name = 'Kingler',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Crabhammer',
//         moveType: 'Water',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Slam',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 88,
// });

// const Voltorb = new Pokemon({
//     name = 'Voltorb',
//     type = 'Electric',
//     secondType = '',
//     firstMove = {
//         moveName: 'Thunder Shock',
//         moveType: 'Electric',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     hp = 12,
// });

// const Electrode = new Pokemon({
//     name = 'Electrode',
//     type = 'Electric',
//     secondType = '',
//     firstMove = {
//         moveName: 'Thunderbolt',
//         moveType: 'Electric',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Swift',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 72,
// });

// const Exeggcute = new Pokemon({
//     name = 'Exeggcute',
//     type = 'Grass',
//     secondType = 'Psychic',
//     firstMove = {
//         moveName: 'Confusion',
//         moveType: 'Psychic',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Psybeam',
//         moveType: 'Psychic',
//         movePower: 15,
//     },
//     hp = 13,
// });

// const Exeggutor = new Pokemon({
//     name = 'Exeggutor',
//     type = 'Grass',
//     secondType = 'Psychic',
//     firstMove = {
//         moveName: 'Solar Beam',
//         moveType: 'Grass',
//         movePower: 30,
//     },
//     secondMove = {
//         moveName: 'Psybeam',
//         moveType: 'Psychic',
//         movePower: 15,
//     },
//     hp = 90,
// });

// const Cubone = new Pokemon({
//     name = 'Cubone',
//     type = 'Ground',
//     secondType = '',
//     firstMove = {
//         moveName: 'Bone Club',
//         moveType: 'Ground',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Headbutt',
//         moveType: 'Normal',
//         movePower: 15,
//     },
//     hp = 12,
// });

// const Marowak = new Pokemon({
//     name = 'Marowak',
//     type = 'Ground',
//     secondType = '',
//     firstMove = {
//         moveName: 'Bonemerang',
//         moveType: 'Ground',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Headbutt',
//         moveType: 'Normal',
//         movePower: 15,
//     },
//     hp = 70,
// });

// const Hitmonlee = new Pokemon({
//     name = 'Hitmonlee',
//     type = 'Fighting',
//     secondType = '',
//     firstMove = {
//         moveName: 'Jump Kick',
//         moveType: 'Fighting',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'High Jump Kick',
//         moveType: 'Fighting',
//         movePower: 30,
//     },
//     hp = 75,
// });

// const Hitmonchan = new Pokemon({
//     name = 'Hitmonchan',
//     type = 'Fighting',
//     secondType = '',
//     firstMove = {
//         moveName: 'Dizzy Punch',
//         moveType: 'Normal',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Mega Punch',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 75,
// });

// const Lickitung = new Pokemon({
//     name = 'Lickitung',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Lick',
//         moveType: 'Ghost',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Power Whip',
//         moveType: 'Grass',
//         movePower: 25,
//     },
//     hp = 70,
// });

// const Koffing = new Pokemon({
//     name = 'Koffing',
//     type = 'Poison',
//     secondType = '',
//     firstMove = {
//         moveName: 'Smog',
//         moveType: 'Poison',
//         movePower: 4,
//     },
//     secondMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     hp = 12,
// });

// const Weezing = new Pokemon({
//     name = 'Weezing',
//     type = 'Poison',
//     secondType = '',
//     firstMove = {
//         moveName: 'Sludge Bomb',
//         moveType: 'Poison',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     hp = 72,
// });

// const Rhyhorn = new Pokemon({
//     name = 'Rhyhorn',
//     type = 'Ground',
//     secondType = 'Rock',
//     firstMove = {
//         moveName: 'Horn Attack',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Rock Throw',
//         moveType: 'Rock',
//         movePower: 10,
//     },
//     hp = 14,
// });

// const Rhydon = new Pokemon({
//     name = 'Rhydon',
//     type = 'Ground',
//     secondType = 'Rock',
//     firstMove = {
//         moveName: 'Megahorn',
//         moveType: 'Bug',
//         movePower: 30,
//     },
//     secondMove = {
//         moveName: 'Earthquake',
//         moveType: 'Ground',
//         movePower: 20,
//     },
//     hp = 98,
// });

// const Chansey = new Pokemon({
//     name = 'Chansey',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Eggbomb',
//         moveType: 'Normal',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Pound',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     hp = 120,
// });

// const Tangela = new Pokemon({
//     name = 'Tangela',
//     type = 'Grass',
//     secondType = '',
//     firstMove = {
//         moveName: 'Power Whip',
//         moveType: 'Grass',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Slam',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 85,
// });

// const Kangaskhan = new Pokemon({
//     name = 'Kangaskhan',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Dizzy Punch',
//         moveType: 'Normal',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Crunch',
//         moveType: 'Dark',
//         movePower: 12,
//     },
//     hp = 90,
// });

// const Horsea = new Pokemon({
//     name = 'Horsea',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Bubble',
//         moveType: 'Water',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Water Gun',
//         moveType: 'Water',
//         movePower: 10,
//     },
//     hp = 13,
// });

// const Seadra = new Pokemon({
//     name = 'Seadra',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Hydro Pump',
//         moveType: 'Water',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Dragon Pulse',
//         moveType: 'Dragon',
//         movePower: 20,
//     },
//     hp = 90,
// });

// const Goldeen = new Pokemon({
//     name = 'Goldeen',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Peck',
//         moveType: 'Flying',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Horn Attack',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     hp = 12,
// });

// const Seaking = new Pokemon({
//     name = 'Seaking',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Waterfall',
//         moveType: 'Water',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Megahorn',
//         moveType: 'Bug',
//         movePower: 25,
//     },
//     hp = 82,
// });

// const Staryu = new Pokemon({
//     name = 'Staryu',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Water Gun',
//         moveType: 'Water',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Swift',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 13,
// });

// const Starmie = new Pokemon({
//     name = 'Starmie',
//     type = 'Water',
//     secondType = 'Psychic',
//     firstMove = {
//         moveName: 'Hydro Pump',
//         moveType: 'Water',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Psychic',
//         moveType: 'Psychic',
//         movePower: 20,
//     },
//     hp = 75,
// });

// const MrMime = new Pokemon({
//     name = 'Mr. Mime',
//     type = 'Psychic',
//     secondType = 'Fairy',
//     firstMove = {
//         moveName: 'Psybeam',
//         moveType: 'Psychic',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Psychic',
//         moveType: 'Psychic',
//         movePower: 20,
//     },
//     hp = 85,
// });

// const Scyther = new Pokemon({
//     name = 'Scyther',
//     type = 'Bug',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Razor Wind',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'X-Scissor',
//         moveType: 'Bug',
//         movePower: 20,
//     },
//     hp = 85,
// });

// const Jynx = new Pokemon({
//     name = 'Jynx',
//     type = 'Ice',
//     secondType = 'Psychic',
//     firstMove = {
//         moveName: 'Ice Punch',
//         moveType: 'Ice',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Psychic',
//         moveType: 'Psychic',
//         movePower: 20,
//     },
//     hp = 85,
// });

// const Electabuzz = new Pokemon({
//     name = 'Electabuzz',
//     type = 'Electric',
//     secondType = '',
//     firstMove = {
//         moveName: 'Thunder Punch',
//         moveType: 'Electric',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Thunder',
//         moveType: 'Electric',
//         movePower: 25,
//     },
//     hp = 85,
// });

// const Magmar = new Pokemon({
//     name = 'Magmar',
//     type = 'Fire',
//     secondType = '',
//     firstMove = {
//         moveName: 'Fire Punch',
//         moveType: 'Fire',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Fire Blast',
//         moveType: 'Fire',
//         movePower: 25,
//     },
//     hp = 85,
// });

// const Pinsir = new Pokemon({
//     name = 'Pinsir',
//     type = 'Bug',
//     secondType = '',
//     firstMove = {
//         moveName: 'X-Scissor',
//         moveType: 'Bug',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Superpower',
//         moveType: 'Fighting',
//         movePower: 30,
//     },
//     hp = 80,
// });

// const Tauros = new Pokemon({
//     name = 'Tauros',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Horn Attack',
//         moveType: 'Normal',
//         movePower: 12,
//     },
//     secondMove = {
//         moveName: 'Take Down',
//         moveType: 'Normal',
//         movePower: 18,
//     },
//     hp = 80,
// });

// const Magikarp = new Pokemon({
//     name = 'Magikarp',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Splash',
//         moveType: 'Normal',
//         movePower: 0,
//     },
//     secondMove = {
//         moveName: 'Tackle',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     hp = 10,
// });

// const Gyarados = new Pokemon({
//     name = 'Gyarados',
//     type = 'Water',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Dragon Tail',
//         moveType: 'Dragon',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Hydro Pump',
//         moveType: 'Water',
//         movePower: 25,
//     },
//     hp = 120,
// });

// const Lapras = new Pokemon({
//     name = 'Lapras',
//     type = 'Water',
//     secondType = 'Ice',
//     firstMove = {
//         moveName: 'Blizzard',
//         moveType: 'Ice',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Hydro Pump',
//         moveType: 'Water',
//         movePower: 25,
//     },
//     hp = 110,
// });

// const Ditto = new Pokemon({
//     name = 'Ditto',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Transform',
//         moveType: 'Normal',
//         movePower: 0,
//     },
//     secondMove = {
//     },
//     hp = 70,
// });

// const Eevee = new Pokemon({
//     name = 'Eevee',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Swift',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     secondMove = {
//         moveName: 'Quick Attack',
//         moveType: 'Normal',
//         movePower: 8,
//     },
//     hp = 12,
// });

// const Vaporeon = new Pokemon({
//     name = 'Vaporeon',
//     type = 'Water',
//     secondType = '',
//     firstMove = {
//         moveName: 'Aurora Beam',
//         moveType: 'Ice',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Hydro Pump',
//         moveType: 'Water',
//         movePower: 25,
//     },
//     hp = 100,
// });

// const Jolteon = new Pokemon({
//     name = 'Jolteon',
//     type = 'Electric',
//     secondType = '',
//     firstMove = {
//         moveName: 'Thunder Shock',
//         moveType: 'Electric',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Thunder',
//         moveType: 'Electric',
//         movePower: 25,
//     },
//     hp = 90,
// });

// const Flareon = new Pokemon({
//     name = 'Flareon',
//     type = 'Fire',
//     secondType = '',
//     firstMove = {
//         moveName: 'Flamethrower',
//         moveType: 'Fire',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Flare Blitz',
//         moveType: 'Fire',
//         movePower: 25,
//     },
//     hp = 90,
// });

// const Porygon = new Pokemon({
//     name = 'Porygon',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Tri Attack',
//         moveType: 'Normal',
//         movePower: 15,
//     },
//     secondMove = {
//         moveName: 'Hyper Beam',
//         moveType: 'Normal',
//         movePower: 35,
//     },
//     hp = 85,
// });

// const Omanyte = new Pokemon({
//     name = 'Omanyte',
//     type = 'Rock',
//     secondType = 'Water',
//     firstMove = {
//         moveName: 'Water Gun',
//         moveType: 'Water',
//         movePower: 10,
//     },
//     secondMove = {
//         moveName: 'Rock Throw',
//         moveType: 'Rock',
//         movePower: 10,
//     },
//     hp = 12,
// });

// const Omastar = new Pokemon({
//     name = 'Omastar',
//     type = 'Rock',
//     secondType = 'Water',
//     firstMove = {
//         moveName: 'Hyrdo Pump',
//         moveType: 'Water',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Rock Slide',
//         moveType: 'Rock',
//         movePower: 15,
//     },
//     hp = 88,
// });

// const Kabuto = new Pokemon({
//     name = 'Kabuto',
//     type = 'Rock',
//     secondType = 'Water',
//     firstMove = {
//         moveName: 'Scratch',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Rock Throw',
//         moveType: 'Rock',
//         movePower: 10,
//     },
//     hp = 12,
// });

// const Kabutops = new Pokemon({
//     name = 'Kabutops',
//     type = 'Rock',
//     secondType = 'Water',
//     firstMove = {
//         moveName: 'Surf',
//         moveType: 'Water',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Rock Slide',
//         moveType: 'Rock',
//         movePower: 15,
//     },
//     hp = 90,
// });

// const Aerodactyl = new Pokemon({
//     name = 'Aerodactyl',
//     type = 'Rock',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Hyper Beam',
//         moveType: 'Normal',
//         movePower: 35,
//     },
//     secondMove = {
//         moveName: 'Rock Slide',
//         moveType: 'Rock',
//         movePower: 15,
//     },
//     hp = 95,
// });

// const Snorlax = new Pokemon({
//     name = 'Snorlax',
//     type = 'Normal',
//     secondType = '',
//     firstMove = {
//         moveName: 'Hyper Beam',
//         moveType: 'Normal',
//         movePower: 35,
//     },
//     secondMove = {
//         moveName: 'Body Slam',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 110,
// });

// const Articuno = new Pokemon({
//     name = 'Articuno',
//     type = 'Ice',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Blizzard',
//         moveType: 'Ice',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Sky Attack',
//         moveType: 'Flying',
//         movePower: 25,
//     },
//     hp = 130,
// });

// const Zapdos = new Pokemon({
//     name = 'Zapdos',
//     type = 'Electric',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Thunder',
//         moveType: 'Electric',
//         movePower: 25,
//     },
//     secondMove = {
//         moveName: 'Sky Attack',
//         moveType: 'Flying',
//         movePower: 25,
//     },
//     hp = 130,
// });

// const Moltres = new Pokemon({
//     name = 'Moltres',
//     type = 'Fire',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Heat Wave',
//         moveType: 'Fire',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Sky Attack',
//         moveType: 'Flying',
//         movePower: 25,
//     },
//     hp = 130,
// });

// const Dratini = new Pokemon({
//     name = 'Dratini',
//     type = 'Dragon',
//     secondType = '',
//     firstMove = {
//         moveName: 'Wrap',
//         moveType: 'Normal',
//         movePower: 5,
//     },
//     secondMove = {
//         moveName: 'Dragon Tail',
//         moveType: 'Dragon',
//         movePower: 15,
//     },
//     hp = 15,
// });

// const Dragonair = new Pokemon({
//     name = 'Dragonair',
//     type = 'Dragon',
//     secondType = '',
//     firstMove = {
//         moveName: 'Slam',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Dragon Tail',
//         moveType: 'Dragon',
//         movePower: 15,
//     },
//     hp = 60,
// });

// const Dragonite = new Pokemon({
//     name = 'Dragonite',
//     type = 'Dragon',
//     secondType = 'Flying',
//     firstMove = {
//         moveName: 'Hyper Beam',
//         moveType: 'Normal',
//         movePower: 35,
//     },
//     secondMove = {
//         moveName: 'Outrage',
//         moveType: 'Dragon',
//         movePower: 25,
//     },
//     hp = 125,
// });

// const Mewtwo = new Pokemon({
//     name = 'Mewtwo',
//     type = 'Psychic',
//     secondType = '',
//     firstMove = {
//         moveName: 'Psychic',
//         moveType: 'Psychic',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Shadow Ball',
//         moveType: 'Ghost',
//         movePower: 15,
//     },
//     hp = 140,
// });

// const Mew = new Pokemon({
//     name = 'Mew',
//     type = 'Psychic',
//     secondType = '',
//     firstMove = {
//         moveName: 'Psychic',
//         moveType: 'Psychic',
//         movePower: 20,
//     },
//     secondMove = {
//         moveName: 'Mega Punch',
//         moveType: 'Normal',
//         movePower: 20,
//     },
//     hp = 140,
// });
