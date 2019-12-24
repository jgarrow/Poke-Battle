import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
`;

const ImgWrapper = styled.div`
    margin: 0 auto;
    width: 80%;
    max-width: 600px;
    max-height: 600px;
    text-align: center;

    img {
        width: 600px;
        height: 600px;
    }
`;

export default ({ image }) => {
    return (
        <Container>
            <ImgWrapper>
                <img src={image} alt="Blue pokeball image" />
            </ImgWrapper>
        </Container>
    );
};
