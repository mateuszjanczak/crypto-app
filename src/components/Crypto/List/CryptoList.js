import React from "react";
import styled from "styled-components";
import { default as Element } from "./CryptoBasicElement";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5rem;
`;

const CryptoList = ({ items }) => {

    const list = items.length ? (
        items.map((item) => {
            return (
                <Element key={item.rank} item={item}/>
            )
        })
    ) : (
        <span>Loading...</span>
    );

    return (
        <Wrapper>
            {list}
        </Wrapper>
    );
};

export default CryptoList

