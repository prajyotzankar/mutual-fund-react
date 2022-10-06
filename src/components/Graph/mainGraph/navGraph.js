import React, { useState, useMemo, useRef, useEffect } from "react";
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
  const [labelMin, setLabelMin] = useState(1);
  const [labelMax, setLabelMax] = useState(1000);
  const [mfData, setMfData] = useState({
    dates: [],
    nav: [],
  });

  var graphData = {
    labels: [],
    datasets: [
      {
        label: "NAV",
        data: [],
        borderColor: "rgba(255, 99, 132, 0.9)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const chartRef = useRef(null);
  const rangeChartRef = useRef(null);

  //get MF data and set it as state
  useEffect(() => {
    const getMFData = async () => {
      try {
        var axiosData = await axios.get("https://api.mfapi.in/mf/125497");
        var dates = [],
          nav = [];
        axiosData = axiosData.data.data.slice(0, 300);
        Object.values(axiosData)
          .reverse()
          .forEach((key) => {
            dates.push(key["date"]);
            nav.push(key["nav"]);
          });
        setMfData({
          dates: dates,
          nav: nav,
        });
        setLabelMax(nav.length);
      } catch (error) {
        console.log(error);
      }
    };
    getMFData();
  }, []);

  //update chart on change in range
  const updateChart = () => {
    const chartObj = chartRef.current;
    chartObj.data.datasets[0].data = mfData.nav.slice(labelMin - 1, labelMax);
    chartObj.data.labels = mfData.dates.slice(labelMin - 1, labelMax);

    const rangeChartObj = rangeChartRef.current;
    rangeChartObj.data.datasets[0].data = mfData.nav;
    rangeChartObj.data.labels = mfData.dates;

    //update
    rangeChartObj.update();
    chartObj.update();
  };
  useEffect(() => {
    updateChart();
  }, [labelMin, labelMax, mfData]);

  const drawLineAnimations = () => {
    const totalDuration = 1000;
    const delayBetweenPoints = totalDuration / 10;
    const previousY = (ctx) =>
      ctx.index === 0
        ? ctx.chart.scales.y.getPixelForValue(100)
        : ctx.chart
            .getDatasetMeta(ctx.datasetIndex)
            .data[ctx.index - 1].getProps(["y"], true).y;

    return {
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
    };
  };

  const options = {
    responsive: true,
    // style: {
    //   height: '10px'
    // },
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
      drawLineAnimations,
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

  const rangeChartOptions = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    layout: {
      padding: 20,
    },
    elements: {
      line: {
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 1,
      },
      point: {
        hoverRadius: 0,
        radius: 0,
      },
    },
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },

    maintainAspectRatio: false,
    line: {
      backgroundColor: "white",
    },
  };

  const onChangeLabelMin = (e) => {
    var value = parseInt(e.target.value);
    if (labelMax - value > 10) {
      setLabelMin(value);
    } else {
      if (labelMax < mfData.nav.length) {
        setLabelMin(value);
        setLabelMax(labelMax + 1);
      }
    }
    console.log(
      labelMax,
      e.target.value,
      labelMax - e.target.value,
      e.target.value
    );
  };

  const onChangeLabelMax = (e) => {
    var value = parseInt(e.target.value);
    if (value - labelMin > 10) {
      setLabelMax(value);
    } else {
      if (labelMin > 1) {
        setLabelMin(labelMin - 1)
        setLabelMax(value)
      }
    }
    console.log(labelMin, labelMax, value);
  };

  return (
    <div className="graph">
      <div className="NavChart">
        <Line options={options} data={graphData} ref={chartRef} />
      </div>
      <div className="info">
        <div className="RangeChart">
          <Line
            options={rangeChartOptions}
            data={graphData}
            ref={rangeChartRef}
          />
        </div>
        <div className="rangeSliders">
          <input
            type="range"
            className="rangeSlider"
            id="start"
            min="1"
            max={mfData.nav.length ? mfData.nav.length : "4000"}
            value={labelMin}
            onChange={onChangeLabelMin}
          />
          <input
            type="range"
            className="rangeSlider"
            id="end"
            min="1"
            max={mfData.nav.length ? mfData.nav.length : "4000"}
            value={labelMax}
            onChange={onChangeLabelMax}
          />
        </div>
      </div>
    </div>
  );
};

export default navGraph;
