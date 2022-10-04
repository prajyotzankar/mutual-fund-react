import React, { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";

import "./navGraphStyle.css";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const navGraph = () => {
  const [axiosData, setAxiosData] = useState([]);

  useMemo(() => {
    axios
      .get("https://api.mfapi.in/mf/125497")
      .then((response) => {
        setAxiosData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const labels = [];
  const values = [];
  Object.values(axiosData)
    .reverse()
    .forEach((key) => {
      labels.push(key["date"]);
      values.push(key["nav"]);
    });
  const data = {
    labels,
    datasets: [
      {
        label: "NAV",
        data: values,
        borderColor: "rgba(255, 99, 132, 0.9)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totalDuration = 1000;
  const delayBetweenPoints = totalDuration / labels.length;
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(["y"], true).y;

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    layout: {
      padding: 20,
    },
    scales: {
      x: {},
    },
    elements: {
      line: {
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 1,
      },
      point: {
        hoverRadius: 10,
        radius: 0,
      },
    },
    animation: {
      x: {
        type: "number",
        easing: "linear",
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
          if (ctx.type !== "data" || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return ctx.index * delayBetweenPoints;
        },
      },
      y: {
        type: "number",
        easing: "linear",
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
          if (ctx.type !== "data" || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return ctx.index * delayBetweenPoints;
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Daily NAV",
        font: { size: 30 },
        family: "sans-serif",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        titleFont: { size: 20 },
        bodyFont: { size: 20 },
        displayColors: false,
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },

    maintainAspectRatio: false,
    line: {
      backgroundColor: "white",
    },
  };

  return (
    <div className="graph">
      <Line options={options} data={data} />
    </div>
  );
};

export default navGraph;
