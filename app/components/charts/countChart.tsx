import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { getTopPoints } from "~/utils/getTopPoints";
type ChartType = NonNullable<ApexOptions["chart"]>["type"];
type Props = {
  title: string;
  counts: Record<string, number>;
  type?: ChartType;
  showTop?: boolean;
};
const CountChart = ({ title, counts, type = "bar", showTop = true }: Props) => {
  const options: ApexOptions = {
    title: { text: title, align: "left" },
    chart: { height: 350, type },
    annotations: { points: showTop ? getTopPoints(counts) : [] },
    plotOptions: { bar: { borderRadius: 10, columnWidth: "50%" } },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    xaxis: {
      categories: Object.keys(counts),
      tickPlacement: "on",
      labels: { rotate: -45 },
    },
    yaxis: { title: { text: "Units" } },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 280,
          },
          plotOptions: {
            bar: { horizontal: false },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const series = [{ name: "Units", data: Object.values(counts) }];
  return (
    <div className="border-gray-400/40 border rounded-lg p-4">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};
export default CountChart;
