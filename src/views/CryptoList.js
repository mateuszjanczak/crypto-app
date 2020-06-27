import React from "react";
import styled from "styled-components";
import List from "../components/Crypto/List/List";

class CryptoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            all: [],
            items: [],
            searchEnabled: false
        }
    }

    componentDidMount() {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        all: result,
                        items: result
                            .filter((item) => item.rank <= 100)
                            .sort((a, b) => a.rank < b.rank ? -1 : 1),
                        searchEnabled: true
                    });
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    doSearch = (e) => {
        const { value } = e.target;

        this.setState({
           ...this.state,
           items: value ?
               this.state.all
                   .filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
                   .slice(0, 55) :
               this.state.all
                   .filter((item) => item.rank <= 100)
                   .sort((a, b) => a.rank < b.rank ? -1 : 1)
        });
    };

    render() {
        return (
            <Wrapper>
                {this.state.searchEnabled && <Search onChange={(e) => this.doSearch(e)} placeholder={"Wyszukaj kryptowaluty..."}/>}
                <List items={this.state.items} />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  padding: 1.5rem;
`;

const Search = styled.input`
  width: 100%;
  height: 5rem;
  margin-bottom: 1.5rem;
  background: #121212;
  border: none;
  border-bottom: 0.5rem solid #332940;
  padding: 2rem;
  color: white;
`;

export default CryptoList;