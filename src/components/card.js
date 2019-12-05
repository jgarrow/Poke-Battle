/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState } from "react";
import Img from "gatsby-image";
import styled from "@emotion/styled";

const Card = styled.div`
    background: ${props => (props.selected ? "#99CDFF" : "#D1E9FF")};
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    margin: 0 auto;
    padding-top: 0.5rem;
    width: 200px;
    cursor: pointer;
`;

export default ({ trainer, image, handleClick, selected, alt=false }) => {
    // const [selected, setSelected] = useState(false);

    return (
        <Card
            onClick={() => {
                const id = alt ? `${trainer.id}alt` : trainer.id;
                selected ? handleClick(null) : handleClick(id);
            }}
            selected={selected}
        >
            <div>
                {image ? (
                    <Img
                        fixed={image.childImageSharp.fixed}
                        alt={trainer.name}
                    />
                ) : null}
            </div>
            <h3>{trainer.name}</h3>
        </Card>
    );
};
