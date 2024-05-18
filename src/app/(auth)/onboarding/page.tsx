import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const user = await currentUser();

  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default page;
