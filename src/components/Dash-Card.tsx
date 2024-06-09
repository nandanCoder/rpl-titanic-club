import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, LucideIcon } from "lucide-react";

export type DashProps = {
  chunk?: number;
  title: string;
  content: string;
  discription?: string;
  icon?: LucideIcon;
};

function DashCard({
  chunk,
  title,
  content,
  discription,
  icon: Icon,
}: DashProps) {
  return (
    <Card x-chunk={`dashboard-01-chunk-${chunk} `}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
        {discription && (
          <p className="text-sm text-muted-foreground">{discription}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default DashCard;
