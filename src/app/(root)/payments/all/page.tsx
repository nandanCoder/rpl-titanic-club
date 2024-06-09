"use client";
import DashCard, { DashProps } from "@/components/Dash-Card";
import { DataTable } from "@/components/data-table";
import {
  ActivityIcon,
  IndianRupee,
  MonitorPlay,
  User2Icon,
  Users,
} from "lucide-react";
import { Payment, columnsPayment } from "./columns";
import { ApiResponse } from "@/types/ApiResponce";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { getUsers } from "@/lib/actions/user.actions";
import { Loader } from "@/components/shared/Loader";
import {
  calculatePercentageChange,
  getLastMonthPercentage,
} from "@/helpers/calculation";

export type PaymentRes = {
  totalPayments: number;
  thisMonthPayments: number;
  lastMonthPayments: number;
};

function AllPayments() {
  const [payments, setPayments] = useState<Payment[] | Array<any>>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState<PaymentRes>();
  const [users, setUsers] = useState<number>(0);
  //console.log("this is the data:::", payments);

  const getPayments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<ApiResponse>("/api/get-all-payments");
      if (!res.data.success) {
        toast.error(
          "Something went wrong while fetching data from the server 😡"
        );
      } else {
        setData(res.data.data);
        setPayments(res.data.payments);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ??
          "Something went wrong while fetching data from the server 😡"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const getAlluser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res as number);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);
  //console.log(users);
  useEffect(() => {
    getPayments();
    getAlluser();
  }, []);

  const cardData: DashProps[] = [
    {
      title: "Total Revenue",
      content: "₹" + data?.totalPayments,
      icon: IndianRupee,
    },
    {
      title: "Total Donator",
      content: users.toString(),
      icon: Users,
    },
    {
      title: "This Month",
      content: "₹" + data?.thisMonthPayments,
      icon: ActivityIcon,
      discription:
        calculatePercentageChange(
          Number(data?.lastMonthPayments),
          Number(data?.thisMonthPayments)
        ).toString() + "% from last month",
    },
    {
      title: "Last Month",
      content: "₹" + data?.lastMonthPayments,
      icon: IndianRupee,

      discription:
        getLastMonthPercentage(
          Number(data?.lastMonthPayments),
          Number(data?.totalPayments)
        )
          .toFixed(2)
          .toString() + "% of all time payments.",
    },
  ];

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-9  md:p-6 lg:p-5 ">
        <div className="grid gap-4 mt-3 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {data &&
            cardData.map((card, index) => (
              <DashCard
                key={index}
                chunk={index}
                title={card.title}
                content={card.content}
                discription={card.discription}
                icon={card.icon}
              />
            ))}
        </div>
        <div className="max-w-full">
          {payments && (
            <DataTable input columns={columnsPayment} data={payments} />
          )}
        </div>
      </main>
    </div>
  );
}

export default AllPayments;
