import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #332940;
`;

const Details = styled.div`
  padding: 2rem;
`;

const Heading = styled.h2`
  cursor: pointer;
  font-size: 2rem;
`;

const CryptoBasicElement = ({ item }) => {
    const { name } = item;

    return (
        <Wrapper>
            <Details>
                <Heading>{name}</Heading>
            </Details>
        </Wrapper>
    );
};

export default CryptoBasicElement;