import React, { useState } from "react";
import ApexCharts from "react-apexcharts";

const DailyAttendanceChart = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const options = {
    chart: {
      type: "bar",
      height: 350,
      zoom: {
        enabled: true,
        type: "x",
      },
      toolbar: {
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "HH:mm",
      },
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const employee = w.config.series[seriesIndex].data[dataPointIndex];
        return `<div class="arrow_box">
          <span>${employee.name}</span><br/>
          <span>Entrance: ${employee.entranceTime}</span><br/>
          <span>Leave: ${employee.leaveTime}</span>
        </div>`;
      },
    },
  };

  const series = paginatedData.map((employee) => ({
    name: employee.name,
    data: [
      {
        x: employee.name,
        y: [
          new Date(`2023-07-02T${employee.entranceTime}`).getTime(),
          new Date(`2023-07-02T${employee.leaveTime}`).getTime(),
        ],
      },
    ],
  }));

  return (
    <div>
      <ApexCharts
        options={options}
        series={series}
        type="rangeBar"
        height={350}
      />
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              (prev + 1) * itemsPerPage < data.length ? prev + 1 : prev
            )
          }
          disabled={(currentPage + 1) * itemsPerPage >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DailyAttendanceChart;
