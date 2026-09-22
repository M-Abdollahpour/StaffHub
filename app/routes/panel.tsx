// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useEffect, useState } from "react";

// const Panel = () => {
//   const schema = yup.object({
//     name: yup.string().required().min(3),
//   });
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });
//   const [input, setInput] = useState<string[]>([]);
//   const onSubmit = (data: Record<string, string>) => {
//     setInput((prev) => {
//       return [...prev, data.name];
//     });
//     reset();
//   };

//   useEffect(() => {}, []);

//   return (
//     <div className="container mx-auto">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="flex gap-2">
//           <input
//             {...register("name")}
//             type="text"
//             className="border rounded-lg"
//           />
//           {errors.name?.message}
//           <button type="submit" className="border rounded-lg px-4 py-1">
//             add
//           </button>
//           <ul>
//             {input.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default Panel;
