import React from "react";
import styled from "styled-components";
import {default as Element} from "./Market";

class MarketList extends React.Component {

    renderElement(item) {
        return (
            <Element key={item.rank} item={item}/>
        );
    };

    render() {
        let { items } = this.props;

        return (
            <>
                {items.length > 0 &&
                    <Wrapper>
                        <List>
                            <Box>
                                <Name>
                                    Giełda
                                </Name>
                                <Price>
                                    Cena
                                </Price>
                            </Box>
                            {items.length > 1 && <Box>
                                <Name>
                                    Giełda
                                </Name>
                                <Price>
                                    Cena
                                </Price>
                            </Box>}
                        </List>
                        <List>
                            {items.map(this.renderElement)}
                        </List>
                    </Wrapper>
                }
            </>
        );
    }
}

const Wrapper = styled.div`
  background: #1F1B24;
  padding: 2rem;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem;
  background: #1F1B24;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Name = styled.h3`
  margin-top: 0;
`;

const Price = styled.h3`
  margin-top: 0;
  text-align: right;
`;

export default MarketList;