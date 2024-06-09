"use client";
import { DataTable } from "@/components/data-table";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Payment, payments } from "./columns";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponce";
import { Loader } from "@/components/shared/Loader";

function page() {
  const [data, setData] = useState<Payment[] | Array<any>>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const param = useParams<{ userId: string }>();
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<ApiResponse>(
        `/api/get-user-payments/${param.userId}`
      );
      if (!res.data.success) {
        toast.error(
          "Something went wrong while fetching data from the server 😡"
        );
      }
      setData(res.data?.payments || []);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ??
          "Something went wrong while fetching data from the server 😡"
      );
    } finally {
      setLoading(false);
    }
  }, [param.userId]);
  useEffect(() => {
    getData();
  }, [param.userId]);

  if (loading) {
    return <Loader />;
  }
  if (!param.userId) return;
  if (!data.length) return <p>No data found</p>;
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 ">
        <div className="max-w-full">
          <DataTable input={false} columns={payments} data={data} />
        </div>
      </main>
    </div>
  );
}

export default page;
