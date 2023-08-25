import {  Breadcrumb,BreadcrumbItem,BreadcrumbLink, } from "@chakra-ui/react";
import { PiCaretRightLight } from "react-icons/pi";

export const Path = ({params}) => {
  return(
    <Breadcrumb
      mb={'3px'}
      separator={<PiCaretRightLight color={"logo.grey"} />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/home" fontSize={"0.7rem"} fontWeight={"light"}>
            HOME
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="/products" fontSize={"0.7rem"} fontWeight={"light"}>
            COLLECTIONS
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink
          href="#"
          fontSize={"0.7rem"}
          fontWeight={"semibold"}
        >
          {decodeURIComponent(params.Material.toUpperCase())}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};