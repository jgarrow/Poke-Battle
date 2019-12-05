import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const CardWrapper = styled.div`
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//     grid-gap: 30px;
//     text-align: center;
// `;

// const Header = styled.header`
//     display: flex;
//     flex-flow: row nowrap;
//     justify-content: space-between;
//     align-items: center;
//     margin: 1rem auto;
// `;

const Card = styled.div`
    background: ${props => (props.selected ? "#99CDFF" : "#D1E9FF")};
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    margin: 0 auto;
    padding-top: 0.5rem;
    width: 200px;
    cursor: pointer;
    position: relative;
`;

const HiddenInfo = styled.div`
    display: ${props => (props.hidden ? "none" : "block")};
`;

// when pokemon is clicked on, change bg color and add that pokemon to the party cards at the top of the page

export default ({ pokemon, handleClick, selected }) => {
    return (
        <Card
            onClick={() => {
                selected ? handleClick(null) : handleClick(pokemon.id);
            }}
            selected={selected}
        >
            {/* Info icon Image Name Types */}
            <h2>{pokemon.pokemon.name}</h2>
            <HiddenInfo hidden={true}>
                HP --> "HP ##" Move 1 --> "Name ## Type" Move 2 --> "Name ##
                Type"
            </HiddenInfo>
        </Card>
    );
};
