import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import dayjs from "dayjs";
import LineChart from "../components/Crypto/Single/LineChart";
import MarketList from "../components/Crypto/Single/MarketList";

class CryptoSingle extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            id: null,
            name: null,
            item: null,
            description: null,
            markets: [],
            range: '7',
            interval: '2h',
            chartHidden: true,
            marketsHidden: true
        };
    }

    componentDidMount() {
        const { params } = this.props.match;
        const { id } = params;

        this.setState({
            ...this.state,
            id
        }, () => {
            this.fetchName(id);
            this.init();
        });
    }

    init = () => {
        const { id, range, interval } = this.state;
        const start = this.getStart(range);
        this.fetchItem(id, start, interval).then(r => this.showChart(r));
        this.fetchMarkets(id).then(r => this.showMarkets(r));
    };

    showChart = () => {
        this.setState({
            ...this.state,
            chartHidden: false
        })
    };

    showMarkets = () => {
        this.setState({
            ...this.state,
            marketsHidden: false
        })
    };

    getStart = (range) => {
        return dayjs().subtract(range, 'day').toISOString()
    };

    setRange = (range) => {
        this.setState({
            ...this.state,
            range
        }, () => {
            this.setInterval(range);
        });
    };

    setInterval = (range) => {
        let interval;
        switch (range) {
            case 1:
                interval = '15m';
                break;
            case 7:
                interval = '2h';
                break;
            case 31:
                interval = '6h';
                break;
            case 365:
                interval = '7d';
                break;
            default:
                interval = '2h';
                break;
        }

        this.setState({
            ...this.state,
            interval
        }, () => {
            const { id, range, interval } = this.state;
            const start = this.getStart(range);
            this.fetchItem(id, start, interval);
        })
    };

    fetchName = (id) => {
        fetch(`https://api.coinpaprika.com/v1/coins/${id}`)
            .then(res => res.json())
            .then(
                ({name, description}) => {
                    this.setState({
                        ...this.state,
                        name,
                        description
                    });
                },
                (error) => {
                    console.log(error)
                }
            );
    };

    fetchItem = (id, start, interval) => {
        return fetch(`https://api.coinpaprika.com/v1/tickers/${id}/historical?start=${start}&interval=${interval}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        ...this.state,
                        item: result
                    });
                },
                (error) => {
                    console.log(error)
                }
            );
    };

    fetchMarkets = (id) => {
        return fetch(`https://api.coinpaprika.com/v1/coins/${id}/markets`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        ...this.state,
                        markets: result
                            .filter((item) => item.base_currency_id === id && item.quote_currency_id === "usd-us-dollars" && item.trust_score === "high")
                    });
                },
                (error) => {
                    console.log(error)
                }
            );
    };

    render() {
        return (
            <Wrapper>
                <Top>
                    <h1>{this.state.name}</h1>
                    <Switches>
                        <Button onClick={() => this.setRange(1)}>24h</Button>
                        <Button onClick={() => this.setRange(7)}>7d</Button>
                        <Button onClick={() => this.setRange(31)}>31d</Button>
                        <Button onClick={() => this.setRange(365)}>365d</Button>
                    </Switches>
                </Top>
                {this.state.item && <LineChart data={this.state.item} title={this.state.name} />}
                <p>{this.state.description}</p>
                <MarketList items={this.state.markets} />
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  padding: 1.5rem;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1fr 25rem;
`;

const Switches = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5rem;
`;

const Button = styled.div`
  background: none;
  border: 1px solid #332940;
  display: grid;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default withRouter(CryptoSingle);