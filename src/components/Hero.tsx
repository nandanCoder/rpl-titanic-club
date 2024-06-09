import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container, Section } from "./ui/craft";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Balancer from "react-wrap-balancer";

const Hero = () => {
  return (
    <Section className="relative backdrop-blur-sm">
      <Container className="flex flex-col gap-8">
        <Badge className="not-prose w-fit" variant="outline">
          <Link
            className="group flex items-center gap-1"
            href="https://9d8.dev">
            Join the revolution! Today is your chance to make a difference.
            <ArrowRight className="w-4 transition-all group-hover:-rotate-45" />
          </Link>
        </Badge>
        <h1 className="!mb-0">
          <Balancer>Every INR counts: invest in a harmonious future</Balancer>
        </h1>
        <h1 className="!mb-0">
          <Balancer>
            {" "}
            Emphasizes the significant effect donations can have on individuals
            or communities.
          </Balancer>
        </h1>

        <h3 className="rounded-md border bg-muted/50 p-4 text-muted-foreground">
          <>
            <Balancer>
              Certainly! "Impactful" emphasizes the significant effect that
              donations can have on individuals or communities. When something
              is described as impactful, it means it has a strong and noticeable
              influence. In the context of donations, it suggests that even a
              small contribution can make a meaningful difference in someone's
              life or in addressing a particular issue. For example, a donation
              to a local food bank might be impactful in providing meals to
              families experiencing hunger, or a donation to a scholarship fund
              could be impactful in enabling students to pursue their education.
              The word "impactful" captures the idea that donations can create
              real and positive change, underscoring the importance and value of
              giving.
            </Balancer>
          </>
        </h3>

        <div className="flex gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
