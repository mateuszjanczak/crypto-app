import React from "react";
import styled from "styled-components";
import {default as Element} from "./Market";

class MarketList extends React.Component {

    renderElement(item) {
        return (
            <Element key={item.exchange_id} item={item}/>
        );
    };

    render() {
        let { items } = this.props;

        return (
            <>
                {items.length > 0 &&
                    <Wrapper>
                        {items.map(this.renderElement)}
                    </Wrapper>
                }
            </>
        );
    }
}

const Wrapper = styled.div`
  
`;

export default MarketList;