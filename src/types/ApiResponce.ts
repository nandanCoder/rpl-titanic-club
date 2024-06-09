import { Payment } from "@/model/payment.model";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAdmin?: boolean;
  payments?: Payment[];
  data?: any;
  error?: any;
}
