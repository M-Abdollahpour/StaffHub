import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useEmployeesStore } from "~/stores/useEmployeesStore";
import type { Employee } from "~/types/employeeType";

type OnEdit = {
  onEdit: (id: string) => void;
};

type DataIndex = "firstName" | "lastName" | "email" | "department" | "position";

const EmployeeView = ({ onEdit }: OnEdit) => {
  const employees = useEmployeesStore((state) => state.employees);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): TableColumnType<Employee> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex] ?? "")
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<Employee> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      ...getColumnSearchProps("department"),
      sorter: (a, b) => (a.department ?? "").localeCompare(b.department ?? ""),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      ...getColumnSearchProps("position"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
        { text: "On leave", value: "onLeave" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => onEdit(record.id)}>Edit</Button>
      ),
    },
  ];

  return (
    <div className="text-black">
      <Table<Employee>
        rowKey="id"
        columns={columns}
        dataSource={employees}
        scroll={{ x: "max-content" }}
        pagination={{
          placement: ["bottomCenter"],
          responsive: true,
        }}
      />
    </div>
  );
};

export default EmployeeView;
