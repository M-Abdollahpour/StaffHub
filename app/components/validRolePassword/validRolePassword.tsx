import { Badge, Space } from "antd";

type Props = {
  password: string;
};

const ValidRolePassword = ({ password }: Props) => {
  const pass = password;
  const rules = [
    { valid: pass.length >= 8, text: "8 characters or more" },
    {
      valid: /[a-z]/.test(pass) && /[A-Z]/.test(pass),
      text: "Uppercase and lowercase letters",
    },
    { valid: /\d/.test(pass), text: "At least one number" },
    { valid: /[@$!%*#?&ـ-]/.test(pass), text: "At least one symbol" },
  ];

  return (
    <Space vertical>
      {rules.map(({ valid, text }) => (
        <Badge
          key={text}
          status="default"
          text={
            <span style={{ color: valid ? "#16a34a" : "#000" }}>{text}</span>
          }
        />
      ))}
    </Space>
  );
};
export default ValidRolePassword;
