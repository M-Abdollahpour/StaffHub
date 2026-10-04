import { addEmployees } from "~/mocks/api/addEmployees";
import { getEmployees } from "~/mocks/api/getEmployees";
import { removeEmployees } from "~/mocks/api/removeEmployees";
import { useAuthStore } from "~/stores/useAuthStore";

const Employees = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const orgInfo = [
    { label: "Department", value: currentUser?.department },
    { label: "Position", value: currentUser?.position },
    { label: "Role", value: currentUser?.role },
    { label: "Status", value: currentUser?.status },
    { label: "Hire Date", value: currentUser?.hireDate },
  ];
  console.log(getEmployees());
  return (
    <div>
      {" "}
      <div className="mt-8 border p-4 rounded-lg border-gray-400/40 relative">
        <div className="absolute left-4 -top-3 bg-white font-bold">
          Organizational Info
        </div>
        <ul className="grid grid-cols-2 gap-8 mt-2">
          {orgInfo.map((item) => (
            <li key={item.label}>
              <div>{item.label}</div>
              <div className="bg-gray-100 rounded px-4 py-2 font-bold mt-2 h-10">
                {item.value}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Employees;
