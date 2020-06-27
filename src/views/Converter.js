import React from "react";
import styled from "styled-components";
import AuthenticationService from "../service/AuthenticationService";
import swapSVG from "../assets/swap.svg";

class Converter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: '',
            loaded: false,
            from: '',
            to: '',
            fromAmount: '',
            toAmount: ''
        };
    }

    renderElement(item) {
        return (
            <option key={item.id}>{item.name}</option>
        );
    };

    componentDidMount() {
        fetch("http://localhost:3001/api/list?all", {
            headers: {
                'auth-token': AuthenticationService.getHeaders()
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    ...this.state,
                    items: result,
                    loaded: true
                });
                console.log(this.state.items)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                    :event.target.value
            }, () => {
                this.convert();
            }
        );
    };

    swap = () => {
        let { from, to } = this.state;
        let temp = from;
        from = to;
        to = temp;

        this.setState({
            ...this.state,
            from,
            to
        }, () => {
            this.convert();
        });
    };

    convert = () => {
        const { from, to, fromAmount } = this.state;
        const fromObj = this.state.items.find((item) => item.name === from);
        const toObj = this.state.items.find((item) => item.name === to);
        if(fromObj && toObj && fromAmount !== ''){
            fetch('http://localhost:3001/api/converter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': AuthenticationService.getHeaders()
                },
                body: JSON.stringify({
                    from: fromObj.id,
                    to: toObj.id,
                    amount: fromAmount
                }),
            })
            .then((response) => {
                if(response.ok) {
                    return response.json()
                }
                return response.text().then(text => {throw new Error(text)})
            })
            .then((result) => {
                this.setState({
                    ...this.state,
                    toAmount: result.value
                })
            })
            .catch((e) => {
                this.setState({
                    ...this.state,
                    hasRegisterFailed: true,
                    error: e.message
                });
            })
        }
    };

    render() {

        let { items } = this.state;

        return (
            <Wrapper>
                <Box>
                    <datalist id="crypto">
                        {this.state.loaded && items.map(this.renderElement)}
                    </datalist>

                    <Column>
                        <Heading>Waluta wejściowa</Heading>
                        <Input type="text" list="crypto" placeholder="Wybierz kryptowalutę" onChange={this.handleChange} name="from" value={this.state.from}/>
                        <Input type="number" placeholder="Ilość" onChange={this.handleChange} name="fromAmount" value={this.state.fromAmount} />
                    </Column>
                    <Swap>
                        <Image src={swapSVG} alt={"Loading"} onClick={this.swap}/>
                    </Swap>
                    <Column>
                        <Heading>Waluta wyjściowa</Heading>
                        <Input type="text" list="crypto" placeholder="Wybierz kryptowalutę" onChange={this.handleChange} name="to" value={this.state.to}/>
                        <Input disabled type="number" placeholder="Wynik" onChange={this.handleChange} name="toAmount" value={this.state.toAmount}/>
                    </Column>
                </Box>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Heading = styled.h1`
  margin: 0 0 2rem;
`;

const Box = styled.div`
  background: #1F1B24;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 8rem 1fr;
  grid-gap: 2rem;
`;

const Column = styled.div`
  text-align: center;
`;

const Swap = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 5rem;
  margin-bottom: 1.5rem;
  background: #121212;
  border: none;
  border-bottom: 0.5rem solid #332940;
  padding: 2rem;
  color: white;
`;

const Image = styled.img`
  grid-row: 2 / 5;
  align-self: center;
  justify-self: center;
  cursor: pointer;
`;

export default Converter;