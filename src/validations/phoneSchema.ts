import {z} from "zod"

export const phoneSchema = z
  .string({message: "شماره تماس الزامی است."})
  .length(11, "شماره تماس باید شامل 11 عدد باشد.")
  .startsWith("09", "شماره تماس باید با 09 شروع شود.")
  .regex(/^\d*$/, "شماره تماس صحیح نیست.")
