import { useEmployeesStore } from "~/stores/useEmployeesStore";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";

const Charts = () => {
  const empolyees = useEmployeesStore((state) => state.employees);
  const allDepartments = empolyees.map((item) => item.department);
  const filterDepartments = allDepartments.filter(
    (item, index, array) => item && array.indexOf(item) === index,
  );
  const countDepartments = allDepartments
    .filter((item, index, array) => item && array.indexOf(item) === index)
    .map((department) => ({
      department,
      count: allDepartments.filter((item) => item === department).length,
    }));
  const top = countDepartments.reduce(
    (max, cur) => (cur.count > max.count ? cur : max),
    countDepartments[0],
  );
  const allPostion = empolyees.map((positionItem) => positionItem.position);
  const filterPosition = allPostion.filter(
    (item, index, array) => item && array.indexOf(item) === index,
  );
  const countPosition = allPostion
    .filter((item, index, array) => item && array.indexOf(item) === index)
    .map((position) => ({
      position,
      count: allPostion.filter((item) => item === position).length,
    }));
  const topPosition = countPosition.reduce(
    (max, cur) => (cur.count > max.count ? cur : max),
    countPosition[0],
  );
  const [state, setState] = useState({
    series: [
      {
        name: "Units",
        data: countDepartments.map((item) => item.count),
      },
    ],
    options: {
      annotations: {
        points: top
          ? [
              {
                x: top.department,
                y: top.count,
                seriesIndex: 0,
                label: {
                  borderColor: "#775DD0",
                  offsetY: 0,
                  style: {
                    color: "#fff",
                    background: "#775DD0",
                  },
                  text: "Most hire",
                },
              },
            ]
          : [],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      title: {
        text: "Department",
        align: "left",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: filterDepartments.map((item) => item),
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Units",
        },
      },
    },
  });
  const [newState, setNewState] = useState({
    series: [
      {
        name: "Units",
        data: countPosition.map((item) => item.count),
      },
    ],
    options: {
      annotations: {
        points: topPosition
          ? [
              {
                x: topPosition.position,
                y: topPosition.count,
                seriesIndex: 0,
                label: {
                  borderColor: "#775DD0",
                  offsetY: 0,
                  style: {
                    color: "#fff",
                    background: "#775DD0",
                  },
                  text: "Most hire",
                },
              },
            ]
          : [],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      title: {
        text: "Position",
        align: "left",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: filterPosition.map((item) => item),
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Units",
        },
      },
    },
  });
  return (
    <div className="container mx-auto md:px-4">
      <div className="flex flex-col gap-2">
        <div className="border-gray-400/40 border rounded-lg p-4">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />

          {/* <ReactApexChart
          options={newState.options}
          series={newState.series}
          type="donut"
          width={480}
        /> */}
        </div>
        <div className="border-gray-400/40 border rounded-lg p-4">
          <ReactApexChart
            options={newState.options}
            series={newState.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};
export default Charts;
