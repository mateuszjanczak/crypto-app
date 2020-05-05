import React from "react";
import styled from "styled-components";
import CryptoList from "../components/Crypto/List/CryptoList";

class Crypto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result
                            .filter((item) => item.rank <= 100)
                            .sort((a, b) => a.rank < b.rank ? -1 : 1)
                    });
                },
                (error) => {
                    console.log(error)
                }
            )
    }


    render() {
        return (
            <Wrapper>
                <CryptoList items={this.state.items} />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  padding: 1.5rem;
`;


export default Crypto;