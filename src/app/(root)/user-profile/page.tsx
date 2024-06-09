import DashCard from "@/components/Dash-Card";
import RecentPayment from "@/components/RecentPayment";

import UserpaymentCard from "@/components/UserpaymentCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getBigPayments } from "@/lib/actions/payments.actions";
import { getUserProfile } from "@/lib/actions/user.actions";
import { BanIcon, GiftIcon, IndianRupee } from "lucide-react";
import React from "react";

async function UserProfile() {
  const userData = await getUserProfile();
  //console.log("Userdata", userData._id.toString());
  const bigPayment = await getBigPayments();
  if (!userData) return;
  return (
    <div className="flex mx-auto min-h-screen w-full flex-col">
      <div className=" gap-2 flexEnd p-3 px-2">
        <p className="bold-16 mr-9">
          Welcome, {userData.username} <span className="text-2xl">✌️</span>
        </p>
        {/* <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Button className="mr-3">My Account</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <main className="flex flex-1 flex-col gap-4 p-6 mx-auto md:p-6 lg:p-5 ">
        <div className="grid gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-3">
          <DashCard
            chunk={0}
            icon={IndianRupee}
            title="Total Donate"
            content={"₹" + userData.paymentDetails[0].totalAmount}
            discription={`Total transactions ${userData.paymentDetails[0].count}`}
          />
          <DashCard
            icon={BanIcon}
            chunk={1}
            title="Total faild transactions"
            content={"₹" + userData.paymentDetails[1].totalAmount}
            discription={`Total transactions ${userData.paymentDetails[1].count}`}
          />
          <DashCard
            icon={GiftIcon}
            chunk={2}
            title="Panding payments"
            content={"₹" + userData.paymentDetails[2].totalAmount}
            discription={`Total transactions ${userData.paymentDetails[2].count}`}
          />
          {/* <DashCard chunk={3} title="Total Sales" icon={Activity} content="0" /> */}
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <UserpaymentCard
            userId={userData._id.toString()}
            data={userData.payments as any}
          />
          <RecentPayment data={bigPayment as any} />
        </div>
      </main>
    </div>
  );
}

export default UserProfile;
