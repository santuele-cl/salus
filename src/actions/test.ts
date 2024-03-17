// "use server";

// import { db } from "@/app/_lib/db";
// // import { TextSchema } from "@/app/_schemas/zod/schema";
// import { time } from "console";
// import { z } from "zod";

// export const addTime = async (values: any) => {
//   console.log(values, "add time");

//   const parse = TextSchema.safeParse(values);

//   if (!parse.success) return console.log("parse error");
//   else console.log(parse.data);

//   try {
//     const time = await db.test.create({
//       data: { time: values },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
