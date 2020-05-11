import React from "react";
import Chart from "chart.js";
import dayjs from "dayjs";

class LineChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidUpdate() {
        this.myChart.data.labels = [...this.props.data.map(item => dayjs(item.timestamp).format('YY-MM-DD HH:mm:ss'))];
        this.myChart.data.datasets[0].data = [...this.props.data.map(item => item.price)];
        this.myChart.update();
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'line',
            options: {
                animation: false,
                legend: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        },
                        gridLines: {
                            display: true,
                            color: "#1F1B24"
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            color: "#1F1B24"
                        }
                    }]
                }
            },
            data: {
                labels: [...this.props.data.map(item => dayjs(item.timestamp).format('YY-MM-DD HH:mm:ss'))],
                datasets: [{
                    label: this.props.name,
                    backgroundColor: '#1F1B24',
                    borderColor: '#514463',
                    data: [...this.props.data.map(item => item.price)],
                }]
            }
        });
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}

export default LineChart;