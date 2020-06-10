import React from "react";
import styled from "styled-components";

class Market extends React.Component {
    render() {
        let {item} = this.props;
        const {exchange_name} = item;
        const {price} = item.quotes.USD;

        return (
            <Wrapper>
                <Name>{exchange_name}</Name>
                <Price>{price}</Price>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Price = styled.div`
  text-align: right;
`;

const Name = styled.div`

`;

export default Market;