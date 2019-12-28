import React from "react";
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
    white-space: normal;

    @media (max-width: 750px) {
        margin: 0;
        width: 140px;
        border-radius: 30px;
    }

    @media (max-width: 370px) {
        width: 125px;
    }
`;

const Name = styled.h3`
    text-align: center;
    @media (max-width: 750px) {
        font-size: 1.25rem;
    }
`;

// const Image = styled(Img)`
//     @media (max-width: 750px) {
//         width: 150px;
//         height: 150px;
//     }
// `;

export default ({
    trainer,
    image,
    handleTrainerSelect,
    selected,
    alt = false,
}) => {
    return (
        <Card
            onClick={() => {
                const id = alt ? `${trainer.id}alt` : trainer.id;
                if (handleTrainerSelect) {
                    selected
                        ? handleTrainerSelect(null)
                        : handleTrainerSelect(id, trainer, alt);
                }
            }}
            selected={selected}
        >
            <div>
                {image ? (
                    <Img
                        fluid={image.childImageSharp.fluid}
                        alt={trainer.name}
                    />
                ) : null}
            </div>
            <Name>{trainer.name}</Name>
        </Card>
    );
};
