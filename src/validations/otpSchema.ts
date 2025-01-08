import { z } from "zod";

export const otpSchema = z.string().length(5,'کد یکبار مصرف باید 5 رقم باشد .')