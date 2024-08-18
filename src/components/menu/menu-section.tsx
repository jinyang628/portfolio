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
  
  type MenuSectionProps = {
    showCards: boolean;
  };
  
  export default function MenuSection({ showCards }: MenuSectionProps) {
    return (
      <div
        className={`fade ${showCards ? "opacity-100" : "opacity-0"} mt-4 text-center`}
      >
        <div className="flex space-x-16 p-4 mt-4">
          <Link href={ROUTE.projects} className="flex-1">
            <Card className="p-4 cursor-pointer">
              <CardHeader className="card-title">
                <CardTitle>I am an entrepreneur at heart</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </Link>
          <Link href={ROUTE.reflections} className="flex-1">
            <Card className="p-4 cursor-pointer">
              <CardHeader className="card-title">
                <CardTitle>I have many strong opinions loosely held</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    );
  }
  