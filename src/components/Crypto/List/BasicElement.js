import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {routes} from "../../../routes";

const Wrapper = styled.div`
  background: #332940;
`;

const Details = styled.div`
  padding: 0.5rem;
  text-align: center;
  
  div, h2 {
    margin-top: 1rem;
  }
`;

const Name = styled.h2`
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-size: 1.5rem;
  text-align: center;
  color: white;
  text-decoration: none;
  font-weight: 700;
`;

const Price = styled.h2`
  font-size: 1.3rem;
`;

const Times = styled.div`
 display: grid;
 grid-template-columns: repeat(4, 1fr);
`;

const Time = styled.div`
  font-size: 1.2rem;
`;

const Interval = styled.div`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const Percent = styled.div`
  color: ${props => (props.color ? props.color : 'white')};
  font-weight: 700;
`;


class BasicElement extends React.Component {

    renderPercent(item) {
        const color = item > 0 ? '#5BFF62' : item < 0 ? '#FE634E' : '#BCBEC0';
        const sign = item > 0 ? '+' : '';
        return (
            <Percent color={color}>{sign}{item}%</Percent>
        );
    };

    render() {
        let {item} = this.props;
        const {id, name} = item;
        const {price, percent_change_24h, percent_change_7d, percent_change_30d, percent_change_1y} = item.quotes.USD;

        return (
            <Wrapper>
                <Details>
                    <Name as={NavLink} to={routes.crypto + id}>
                        {name}
                    </Name>
                    <Price>{price} USD</Price>
                    <Times>
                        <Time>
                            <Interval>
                                24h
                            </Interval>
                            {this.renderPercent(percent_change_24h)}
                        </Time>
                        <Time>
                            <Interval>
                                7d
                            </Interval>
                            {this.renderPercent(percent_change_7d)}
                        </Time>

                        <Time>
                            <Interval>
                                30d
                            </Interval>
                            <div>
                                {this.renderPercent(percent_change_30d)}
                            </div>
                        </Time>

                        <Time>
                            <Interval>
                                1y
                            </Interval>
                            <div>
                                {this.renderPercent(percent_change_1y)}
                            </div>
                        </Time>
                    </Times>
                </Details>
            </Wrapper>
        );
    }
}

export default BasicElement;