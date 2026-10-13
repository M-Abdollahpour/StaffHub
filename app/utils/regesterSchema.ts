import * as yup from "yup";
import type {
  Gender,
  Language,
  MaritalStatus,
  Role,
  Status,
} from "~/types/employeeType";

export const registerSchema = yup.object({
  id: yup.string(),
  avatar: yup.string(),
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  phone: yup.string().required().trim(),
  email: yup
    .string()
    .trim()
    .email("invalid email format")
    .lowercase()
    .required()
    .matches(
      /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    ),
  department: yup.string().required().trim(),
  role: yup.mixed<Role>().oneOf(["admin", "user"]).required(),
  status: yup
    .mixed<Status>()
    .oneOf(["active", "inactive", "onLeave"])
    .required(),
  position: yup.string().required().trim(),
  birthDate: yup.number().required(),
  gender: yup.mixed<Gender>().oneOf(["male", "female"]).required(),
  skills: yup.array().of(yup.string().required()),
  language: yup
    .array()
    .of(
      yup
        .mixed<Language>()
        .oneOf(["persian", "english", "french", "spanish", "italian"])
        .required(),
    ),
  education: yup.array().of(
    yup.object({
      id: yup.string().required(),
      degree: yup.string().required().min(3).trim(),
      field: yup.string().required().min(3).trim(),
      university: yup.string().required().min(3).trim(),
      startYear: yup.number().required().min(4),
      endYear: yup.number().min(4),
    }),
  ),
  workExperience: yup.array().of(
    yup.object({
      id: yup.string().required(),
      title: yup.string().required().trim(),
      company: yup.string().required().trim(),
      startDate: yup.number().required(),
      endDate: yup.number(),
      description: yup.string().required().trim(),
    }),
  ),
  maritalStatus: yup
    .mixed<MaritalStatus>()
    .oneOf(["single", "married"])
    .required(),
  city: yup.string().required().trim(),
  address: yup.string().required().trim(),
  hireDate: yup.number().required(),
  password: yup
    .string()
    .trim()
    .required()
    .min(8, "at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
});
