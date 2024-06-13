import { Company, getCompanies } from "@/actions/company.actions";
import CompaniesSelector from "@/components/companies-selector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default async function CompanyPage() {
  const { companies } = await getCompanies();

  if (!companies) {
    // notFound();
    return;
  }

  return (
    <>
      <Card className={cn("w-[580px] justify-center mx-auto")}>
        <CardHeader>
          <CardTitle>Companies</CardTitle>
          <CardDescription className="flex justify-end">
            <Button className="w-32 mx-2">Add Company</Button>
            <Button variant={"destructive"} className="w-32 mx-2">
              Remove Company
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CompaniesSelector companies={companies} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </>
  );
}
