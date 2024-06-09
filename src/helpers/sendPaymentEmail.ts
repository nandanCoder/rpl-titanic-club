import { paymentSchema } from "@/validation/paymentSchema";
import { Resend } from "resend";
import { ApiResponse } from "@/types/ApiResponce";
import { resend } from "@/lib/resendEmail";
import PaymentEmail from "../../email/PaymentEmail";

export async function sendPaymentEmail({
  email,
  userName,
  paymentDate,
  amount,
  paymentId,
  paymentScreenShot,
  id,
}: {
  email: string;
  userName: string;
  paymentDate: Date;
  amount: number;
  paymentId?: string;
  paymentScreenShot?: string;
  id?: string;
}): Promise<ApiResponse> {
  try {
    const data = await resend.emails.send({
      from: "no-reply@nandan.in.net",
      to: email,
      subject: "Heartfelt Thanks for Your Generous Donation ",
      react: PaymentEmail({
        userName,
        paymentDate,
        amount,
        paymentId,
        paymentScreenShot,
        id,
      }),
    });
    return {
      success: true,
      message: "Payment  email sent",
      data: data,
    };
  } catch (emailError) {
    console.error("Error sending payment email", emailError);
    return {
      success: false,
      message: "Error sending payment email",
      error: emailError,
    };
  }
}
