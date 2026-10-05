import { Button, Avatar } from "antd";
import { useAuthStore } from "~/stores/useAuthStore";

type OnEdit = {
  onEdit: () => void;
};

const ProfileView = ({ onEdit }: OnEdit) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const orgInfo = [
    { label: "Department", value: currentUser?.department },
    { label: "Position", value: currentUser?.position },
    { label: "Role", value: currentUser?.role },
    { label: "Status", value: currentUser?.status },
    { label: "Hire Date", value: currentUser?.hireDate },
  ];
  const personalInfo = [
    { label: "Name", value: currentUser?.firstName },
    { label: "Last Name", value: currentUser?.lastName },
    { label: "Phone", value: currentUser?.phone },
    { label: "Email", value: currentUser?.email },
    { label: "Gender", value: currentUser?.gender },
    { label: "Birthday", value: currentUser?.birthDate },
    { label: "Married", value: currentUser?.maritalStatus },
    { label: "Language", value: currentUser?.language.join(" | ") },
    { label: "City", value: currentUser?.city },
    { label: "Address", value: currentUser?.address },
  ];
  return (
    <div className="container mx-auto">
      <div>
        <div className="flex flex-col p-2 items-center gap-2  md:gap-4 md:flex-row">
          <span>
            <Avatar size={100}>{currentUser?.firstName?.charAt(0)}</Avatar>
          </span>
          <div className="flex justify-center items-center flex-col gap-1 md:justify-center md:items-start">
            <span className="font-bold">
              {currentUser?.firstName} {currentUser?.lastName}
            </span>
            <span className="text-sm opacity-50">{currentUser?.email}</span>
          </div>
        </div>
        <div className="border rounded-lg border-gray-400/40 p-4 mt-4 relative">
          <div className="absolute left-4 -top-3 bg-white font-bold">
            Personal Information
          </div>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {personalInfo.map((item) => (
              <li key={item.label}>
                <div>{item.label}</div>
                <div className="bg-gray-100 rounded px-4 py-2 font-bold mt-2 h-10">
                  {item.value}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border p-4 rounded-lg border-gray-400/40 relative">
          <div className="absolute left-4 -top-3 bg-white font-bold">
            Professional Background
          </div>
          <div>
            <div>Education</div>
            <ul className="grid gap-4 mt-2">
              {currentUser?.education.map((Item) => (
                <li
                  key={Item.id}
                  className="bg-gray-100 rounded px-4 py-4 md:py-2"
                >
                  <div className="font-bold">
                    {Item.degree} - {Item.field}
                  </div>
                  <div className="text-sm italic opacity-50">
                    {Item.university} <span className="not-italic">|</span>{" "}
                    {Item.startYear} - {Item.endYear ?? "now"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>Work Experience</div>
            <ul className="grid gap-4 mt-2">
              {currentUser?.workExperience.map((Item) => (
                <li
                  key={Item.id}
                  className="bg-gray-100 rounded px-4 py-4 md:py-2"
                >
                  <div className="font-bold">
                    {Item.title} - {Item.company}
                  </div>
                  <div className="text-sm italic opacity-50">
                    {Item.description} <span className="not-italic">|</span>{" "}
                    {Item.startDate} - {Item.endDate ?? "now"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="grid gap-4 mt-2">
              <li>
                <div>Skills</div>
                <div className="bg-gray-100 rounded px-4 py-4 md:py-2 font-bold">
                  {currentUser?.skills.join(" | ")}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border p-4 rounded-lg border-gray-400/40 relative">
          <div className="absolute left-4 -top-3 bg-white font-bold">
            Organizational Info
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
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
      <div className="py-7">
        <Button type="primary" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
};
export default ProfileView;
