// import { FormProvider } from "react-hook-form";
// import { useValidateFrom } from "~/hooks/useValidateFrom";
// import { registerSchema } from "~/utils/regesterSchema";
// import * as yup from "yup";
// import { Button } from "antd";
// import { nanoid } from "nanoid";
// import ProfileEdit from "../profile/profileEdit";
// const FromProviders = () => {
//   const methods = useValidateFrom(registerSchema, {});
//   type FormData = yup.InferType<typeof registerSchema>;
//   const onSubmit = (data: FormData) => {
//     console.log(data);
//   };
//   return (
//     <>
//       <FormProvider {...methods}>
//         <form onSubmit={methods.handleSubmit(onSubmit)}>
//           <ProfileEdit />
//           <Button htmlType="submit" type="primary">
//             add
//           </Button>
//         </form>
//       </FormProvider>
//     </>
//   );
// };
// export default FromProviders;
