import { useState } from "react";
import EmployeeEdit from "~/components/employees/employeeEdit";
import EmployeeView from "~/components/employees/employeeView";

const Employees = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  return (
    <div>
      {editingId !== null ? (
        <EmployeeEdit
          id={editingId}
          onSave={() => setEditingId(null)}
          onCancel={() => setEditingId(null)}
        />
      ) : (
        <EmployeeView onEdit={(id: string) => setEditingId(id)} />
      )}
    </div>
  );
};
export default Employees;
