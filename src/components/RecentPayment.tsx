import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Balancer from "react-wrap-balancer";
export type Data = {
  _id: string;
  username: string;
  email: string;
  photoUrl: string;
  name: string;
  payments: number;
  amount: number;
  user: object | any;
};
export type BigPaymentProps = {
  data: Data[];
};
function RecentPayment({ data }: BigPaymentProps) {
  // console.log("Props", data);
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Top doations</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {data &&
          data.map((item: Data) => (
            <div key={item._id} className="flex items-center gap-4">
              <Avatar className=" h-9 w-9 flex">
                <AvatarImage src={item.user.photoUrl} alt="Avatar" />
                <AvatarFallback>
                  {item.user.firstName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {item.user.firstName + item.user.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  <Balancer>{item.user.email}</Balancer>
                </p>
              </div>
              <div className="ml-auto font-medium">+₹{item.amount}</div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

export default RecentPayment;
