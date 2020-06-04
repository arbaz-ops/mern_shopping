import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        datasets: [
          {
            data: [50, 40, 30, 20, 10],
            backgroundColor: [
              "rgba(255, 0, 0, 0.6)",
              "rgba(255,255,0,0.5)",
              "rgb(0,0,255,0.6)",
              "rgba(75,192,192,0.6)",
              "rgb(0,128,128)"
            ]
          }
        ],
        labels: ["monday", "tuesday", "wednesday", "thursday", "friday"]
      }
    };
  }
  render() {
    return (
      <div className="text-dark" style={{ width: "440px" }}>
        <Doughnut data={this.state.data}></Doughnut>
      </div>
    );
  }
}

export default PieChart;
