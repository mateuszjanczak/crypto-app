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
        fetch("https://api.coinpaprika.com/v1/coins")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
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
  padding: 5rem;
`;


export default Crypto;