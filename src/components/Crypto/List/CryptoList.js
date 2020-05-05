import React from "react";
import styled from "styled-components";
import { default as Element } from "./CryptoBasicElement";
import loadingSVG from '../../../assets/loading.svg'

const Wrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
`;

const Loading = styled.div`
  min-height: 100%;
  grid-column: 1 / 5;
  display: grid;
`;

const Image = styled.img`
  align-self: center;
  justify-self: center;
`;

const CryptoList = ({ items }) => {

    console.log(items);

    const list = items.length ? (
        items.map((item) => {
            return (
                <Element key={item.rank} item={item}/>
            )
        })
    ) : (
        <Loading>
            <Image src={loadingSVG} alt={"Loading"} />
        </Loading>
    );

    return (
        <Wrapper>
            {list}
        </Wrapper>
    );
};

export default CryptoList

