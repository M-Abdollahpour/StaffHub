import { useEmployeesStore } from "~/stores/useEmployeesStore";
import { countBy } from "~/utils/countBy";
import CountChart from "~/components/charts/countChart";

const Charts = () => {
  const employees = useEmployeesStore((state) => state.employees);

  return (
    <div className="container mx-auto md:px-4">
      <div className="flex flex-col gap-2">
        <div className="border-gray-400/40 border rounded-lg p-4">
          <CountChart
            type="bar"
            title="Department"
            counts={countBy(employees, (e) => e.department)}
          />
        </div>
        <div className="border-gray-400/40 border rounded-lg p-4">
          <CountChart
            type="bar"
            title="Positions"
            counts={countBy(employees, (e) => e.position)}
          />
        </div>
        <div className="border-gray-400/40 border rounded-lg p-4">
          <CountChart
            showTop={false}
            type="bar"
            title="Status"
            counts={countBy(employees, (e) => e.status)}
          />
        </div>
        <div className="border-gray-400/40 border rounded-lg p-4">
          <CountChart
            showTop={false}
            type="bar"
            title="Role"
            counts={countBy(employees, (e) => e.role)}
          />
        </div>
        <div className="border-gray-400/40 border rounded-lg p-4">
          <CountChart
            showTop={false}
            type="bar"
            title="Married"
            counts={countBy(employees, (e) => e.maritalStatus)}
          />
        </div>
      </div>
    </div>
  );
};
export default Charts;
