import { toast } from "sonner";
import { Payment } from "./../model/payment.model";
import { z } from "zod";

export const convertCurrancyToNumber = (value: string) =>
  parseFloat(value.replace(",", "."));
export const isAmountValid = (value: number) => value >= 10 && value <= 10000;

export const paymentSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters long" })
    .optional(),
  email: z.string().email({ message: "Invalid email address" }),
  amount: z.string().refine(
    (value: string): boolean => {
      return isAmountValid(convertCurrancyToNumber(value));
    },
    {
      message: "Amount  must be between 10 and 100000",
    }
  ),
  paymentScreenShot: z.string().optional(),
  paymentId: z.string().length(12, { message: "Invalid paymentId" }).optional(),
});
