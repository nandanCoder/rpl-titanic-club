import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "./ui/table";
import { Badge } from "./ui/badge";
import dayjs from "dayjs";
type Props = {
  _id: string;
  status: string;
  amount: number;
  createdAt: Date;
  email: string;
  name: string;
};
type UserProps = {
  data: Array<Props>;
  userId: string;
};

function UserpaymentCard({ data, userId }: UserProps) {
  console.log("Props", userId);
  console.log("Props 2", data);

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent transactions from you.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href={`/payments/user/${userId}`}>
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((item: Props) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className="font-medium">
                      {dayjs(item.createdAt).format("MMM D, YYYY h:mm A")}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className="text-xs"
                      variant={
                        (item.status === "success" && "sucssess") ||
                        (item.status === "failed" && "destructive") ||
                        "default"
                      }>
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">₹ {item.amount}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default UserpaymentCard;
