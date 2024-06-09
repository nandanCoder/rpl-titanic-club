import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Balancer from "react-wrap-balancer";
import { GiftIcon } from "lucide-react";

function Features() {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image
          src="/camp.svg"
          alt="camp"
          width={50}
          height={50}
          className="absolute left-[90px] top-[-20px] w-10 lg:w-[50px]"
        />
        <h1 className="bold-52 mt-3 lg:bold-64">
          <Balancer>"Share your light, ignite hope through donation."</Balancer>
        </h1>
        <p className="regular-16 mt-6 dark:text-white text-gray-30 xl:max-w-[520px]">
          <Balancer>
            1. "Empower Lives, Donate Today!"
            <br />
            2. "Join Hands, Make a Difference"
            <br />
            3. "Give Hope, Change Lives"
            <br /> 4. "Every Donation Counts"
            <br /> 5. "Together, We Can Transform Lives" <br />
            6. "Be the Change, Donate Now" <br />
            7. "Spread Kindness Through Giving"
            <br /> 8. "Supporting Dreams, One Donation at a Time"
            <br /> 9. "Your Generosity Changes Everything"
            <br /> 10. "Giving Back:It's What Humanity Needs"
          </Balancer>
        </p>

        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  src="/star.svg"
                  key={index}
                  alt="star"
                  width={24}
                  height={24}
                />
              ))}
          </div>

          <p className="bold-16 lg:bold-20 dark:text-white text-blue-70">
            198k
            <span className="regular-16 lg:regular-20 ml-1">
              Excellent Reviews
            </span>
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row">
          <Button type="button" variant="btn_green">
            <span className="mr-2">Donate now</span> <GiftIcon />
          </Button>
          <Button type="button" variant="default">
            How we work?
          </Button>
        </div>
      </div>

      <div className="relative flex flex-1 items-start">
        <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8">
          <div className="flex flex-col">
            <div className="flexBetween">
              <p className="regular-16 text-gray-20"> Your works </p>
              <Image src="/close.svg" alt="close" width={24} height={24} />
            </div>
            <p className="bold-20 text-white">"Supporting Humanity"</p>
          </div>

          <div className="flexBetween">
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Help people</p>
              <p className="bold-20 text-white">59</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Planting trees</p>
              <p className="bold-20 text-white">2.040 km</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
