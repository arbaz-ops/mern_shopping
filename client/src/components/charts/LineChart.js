import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        datasets: [
          {
            labels: "level of thickness",
            data: [32, 45, 12, 76, 69],
            borderColor: ["rgba(75,192,192,0.6)"],
            borderWidth: 1,
            backgroundColor: "skyblue"
          }
        ]
      }
    };
  }
  render() {
    return (
      <div className="Line-Chart text-dark">
        <Line data={this.state.chartData}></Line>
      </div>
    );
  }
}

export default LineChart;
