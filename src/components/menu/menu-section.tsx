import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import Link from "next/link";
  import { ROUTE } from "@/constants/route";
  import Image from "next/image";

  type MenuSectionProps = {
    showCards: boolean;
  };
  
  export default function MenuSection({ showCards }: MenuSectionProps) {
    return (
      <div
        className={`fade ${showCards ? "opacity-100" : "opacity-0"} mt-4 text-center`}
      >
        <div className="flex flex-wrap p-4 mt-4 justify-between">
          <Card className="p-4 w-[48%]">
            <CardHeader className="card-title">
              <CardTitle>I am a builder and entrepreneur at heart</CardTitle>
              <CardDescription className="card-description">Check out some of my projects!</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <Link href={ROUTE.whale}>
                <Image
                  src="/project-images/whale.png"
                  alt="Whale"
                  width={500}
                  height={500}
                />
              </Link>
              <Link href={ROUTE.stillHuman}>
                <Image
                  src="/project-images/still-human.png"
                  alt="Still Human"
                  width={500}
                  height={500}
                />
              </Link>
              <Link href={ROUTE.tripFlow}>
                <Image
                  src="/project-images/tripflow.png"
                  alt="TripFlow"
                  width={500}
                  height={500}
                />
              </Link>
            </CardContent>
          </Card>
          <Card className="p-4 w-[48%]">
            <CardHeader className="card-title">
              <CardTitle>I have many strong opinions loosely held</CardTitle>
              <CardDescription className="card-description">Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  