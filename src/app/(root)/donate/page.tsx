"use client";
import Balancer from "react-wrap-balancer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { paymentSchema } from "@/validation/paymentSchema";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  CheckCheck,
  Copy,
  DownloadIcon,
  Loader2,
  QrCodeIcon,
} from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { UploadDropzone } from "@/utils/uploadthing";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponce";
import { useSearchParams } from "next/navigation";

function DonatePage() {
  const userData = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [formStep, setFormStep] = useState<number>(0);
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: userData.get("name") || "",
      email: userData.get("email") || "",
      amount: "",
      paymentId: "",
      paymentScreenShot: "",
    },
  });

  async function onSubmit(values: z.infer<typeof paymentSchema>) {
    //console.log("VAlue::", values);
    if (
      values.paymentId?.length !== 12 &&
      !values.paymentScreenShot?.includes("https://")
    ) {
      toast.warning(
        "Invalid payment details paymentId or paymentScreenShot are required 😡😡😡"
      );
      return;
    }
    setIsLoading(true);
    try {
      const donation = await axios.post<ApiResponse>(
        "/api/create-donation",
        values
      );

      if (donation.data.success) {
        toast.success(`Amount of ${amount} donated successfully 🤩🤩🤩`);
      }
      return donation.data;
    } catch (error) {
      console.log("Error in Create donation :: ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  const validateformAndNext = async () => {
    const fields = ["email", "name", "amount"];
    const outPut = await form.trigger(fields as []);
    if (!outPut) return;
    setFormStep(1);
    toast.info(
      "Please scan the QR code above to pay and take a screenshoot or copy the transition id  😟😟"
    );
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText("8509736585@JIO");
    toast.success("Copy to clipboard  😎 !");
  };

  // for qr
  const url = `upi://pay?pa=8509736585@JIO%26am=${amount}%26tn=comrade`;
  const qr = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
  //console.log(url);
  interface DowlnloadProps {
    imageSrc: string;
    imageName: string;
    forceDownload?: boolean;
  }
  const downloadQr = async ({
    imageSrc,
    imageName,
    forceDownload,
  }: DowlnloadProps) => {
    if (!forceDownload) {
      const link = document.createElement("a");
      link.href = imageSrc;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    const imageBlod = await fetch(imageSrc).then((res) =>
      res
        .arrayBuffer()
        .then((buffer) => new Blob([buffer], { type: "image/png" }))
    ); // Fetch the image as a blob fetch
    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlod);
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloaded QR code image successfully ☺️😊");
  };
  return (
    <div className="h-screen flexCenter w-full">
      <div className="absolute">
        <Card className="w-[340px]">
          <CardHeader>
            <CardTitle>Donate Now</CardTitle>
            <CardDescription>
              <Balancer>
                How much would you like to donate? As a contributor to Heart we
                make sure your donation goes directly to supporting our cause.
                Thank you for your generosity!
              </Balancer>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="relative space-y-3 overflow-x-hidden">
                <motion.div
                  className={cn("space-y-3", {
                    // hidden: formStep == 1,
                  })}
                  // formStep == 0 -> translateX == 0
                  // formStep == 1 -> translateX == '-100%'
                  animate={{
                    translateX: `-${formStep * 100}%`,
                  }}
                  transition={{
                    ease: "easeInOut",
                  }}>
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name..." {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* student id */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pay amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your amount..."
                            {...field}
                            onChange={(e) => {
                              field.onChange(e), setAmount(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* year */}
                </motion.div>
                <motion.div
                  className={cn("space-y-1 absolute top-0 left-0 right-0", {
                    // hidden: formStep == 0,
                  })}
                  // formStep == 0 -> translateX == 100%
                  // formStep == 1 -> translateX == 0
                  animate={{
                    translateX: `${100 - formStep * 100}%`,
                  }}
                  style={{
                    translateX: `${100 - formStep * 100}%`,
                  }}
                  transition={{
                    ease: "easeInOut",
                  }}>
                  {/* qr */}
                  <div className="w-full flexCenter gap-3 flex-col px-4">
                    <div className="flex flex-col flex-1  gap-2">
                      <Image src={qr + url} alt="QR" width={130} height={130} />

                      <Button
                        variant="btn_blue"
                        type="button"
                        onClick={() =>
                          downloadQr({
                            imageSrc: qr + url,
                            imageName: "qr.png",
                            forceDownload: true,
                          })
                        }>
                        <DownloadIcon />
                      </Button>
                    </div>

                    <Separator />
                    <div className="flex items-center">
                      <Input
                        type="text"
                        value={"8509736585@JIO"}
                        disabled
                        className="input bold-16 text-center w-full p-2 mr-2"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={copyToClipboard}>
                        <Copy />
                      </Button>
                    </div>
                  </div>
                  {/* upi */}
                </motion.div>
                <div className="flex gap-1">
                  {/* dailog box */}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        className={cn({
                          hidden: formStep == 0,
                        })}
                        variant="btn_green">
                        Payment Done <CheckCheck className="w-4 h-4 ml-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        {/* // tab */}
                        <Tabs defaultValue="account" className=" p-4">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="screenshoot">
                              Screenshot
                            </TabsTrigger>
                            <TabsTrigger value="paymentId">
                              Payment ID
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="screenshoot">
                            <Card>
                              <CardHeader>
                                <CardTitle>Screenshot</CardTitle>
                                <CardDescription>
                                  Upload your screenshot here and submit your
                                  payment form .
                                </CardDescription>
                              </CardHeader>
                              <CardContent className=" flexCenter space-y-2">
                                <UploadDropzone
                                  className="md:max-w-full lg:max-w-full max-w-[230px]"
                                  endpoint="imageUploader"
                                  onClientUploadComplete={(res) => {
                                    // Do something with the response
                                    //console.log("Files: ", res);
                                    form.setValue(
                                      "paymentScreenShot",
                                      res[0].url,
                                      {
                                        shouldValidate: true,
                                      }
                                    );
                                    toast.success(
                                      "Screenshot upload successfully now submit your donation form 😊😊 ! "
                                    );
                                  }}
                                  onUploadError={(error: Error) => {
                                    // Do something with the error.
                                    toast.error(`${error.message} 🤦‍♂️😢`);
                                  }}
                                />
                              </CardContent>
                            </Card>
                          </TabsContent>
                          <TabsContent value="paymentId">
                            <Card>
                              <CardHeader>
                                <CardTitle>Payment ID</CardTitle>
                                <CardDescription>
                                  Pliss Enter your payment Id here and submit.
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                <FormField
                                  control={form.control}
                                  name="paymentId"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Payment Id</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Enter your paymentId..."
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </DialogHeader>
                      <DialogFooter className="w-full ">
                        <Button
                          disabled={isLoading}
                          onClick={() => onSubmit(form.getValues())}
                          type="submit">
                          {isLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Submit Donation"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    type="button"
                    variant={"ghost"}
                    className={cn({
                      hidden: formStep == 1,
                    })}
                    onClick={validateformAndNext}>
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => {
                      setFormStep(0);
                    }}
                    className={cn({
                      hidden: formStep == 0,
                    })}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DonatePage;
