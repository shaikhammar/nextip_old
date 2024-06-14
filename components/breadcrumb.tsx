"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const generateBreadcrumbs = (pathArray: string[]) => {
  let path = "";
  return pathArray.map((segment, index) => {
    if (segment) {
      path += `/${segment}`;
      const link = capitalizeFirstLetter(segment);
      return (
        <Fragment key={index}>
          {index > 0 && <BreadcrumbSeparator />}
          <BreadcrumbItem key={segment}>
            <BreadcrumbLink asChild>
              <Link href={path}>{link}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Fragment>
      );
    }
    return null;
  });
};

export default function BreadcrumbNav() {
  const pathname: string = usePathname();
  const breadcrumbPath: string[] = pathname.split("/");
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {generateBreadcrumbs(breadcrumbPath)}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
