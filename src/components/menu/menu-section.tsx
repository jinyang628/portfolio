import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MenuSectionProps = {
  showContent: boolean;
};

export default function MenuSection({ showContent }: MenuSectionProps) {
  return (
    <Card>
      <CardHeader>
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
  );
}
