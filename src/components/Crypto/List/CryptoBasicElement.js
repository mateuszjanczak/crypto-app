import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #332940;
`;

const Details = styled.div`
  padding: 0.5rem;
  text-align: center;
`;

const Name = styled.h2`
  cursor: pointer;
  font-size: 1.5rem;
  text-align: center;
`;

const Price = styled.h2`
  font-size: 1.2rem;
`;

const CryptoBasicElement = ({ item }) => {
    const { name } = item;
    const { price } = item.quotes.USD;

    return (
        <Wrapper>
            <Details>
                <Name>{name}</Name>
                <Price>{price} USD</Price>
            </Details>
        </Wrapper>
    );
};

export default CryptoBasicElement;