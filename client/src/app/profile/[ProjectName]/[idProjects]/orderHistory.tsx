"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SalesState } from "@/store/sales/typeSales";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { salesByProject } from "@/store/sales/actionsSales";
import { useRouter } from "next/navigation";

export default function OrderHistory({ params }) {
  const { salesProject } = useAppSelector(
    (state: { salesReducer: SalesState }) => state.salesReducer
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(salesByProject(423)); //params.idProjects
  }, []);

  const router = useRouter();

  const handleSubmit = (el) => {
    router.push(
      `/profile/${params.ProjectName}/${params.idProjects}/${el.Naturali_Invoice}`
    );
  };

  return (
    <>
      <Box
        w={"70vw"}
        h={"65vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        // bg={"green"}
      >
        <TableContainer w={"90%"} h={"80%"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th
                  fontWeight={"hairline"}
                  fontSize={"0.9rem"}
                  textTransform={"uppercase"}
                  textAlign={"center"}
                >
                  Invoice
                </Th>
                <Th
                  fontWeight={"hairline"}
                  fontSize={"0.9rem"}
                  textTransform={"uppercase"}
                  textAlign={"center"}
                >
                  Invoice Date
                </Th>
                <Th
                  fontWeight={"hairline"}
                  fontSize={"0.9rem"}
                  textTransform={"uppercase"}
                  textAlign={"center"}
                >
                  Delivery Date
                </Th>
                <Th
                  fontWeight={"hairline"}
                  fontSize={"0.9rem"}
                  textTransform={"uppercase"}
                  textAlign={"center"}
                >
                  Shipping Method
                </Th>
                <Th
                  fontWeight={"hairline"}
                  fontSize={"0.9rem"}
                  textTransform={"uppercase"}
                  textAlign={"center"}
                >
                  Ship to
                </Th>
                <Th
                  fontWeight={"hairline"}
                  fontSize={"0.9rem"}
                  textAlign={"center"}
                  textTransform={"uppercase"}
                >
                  Status
                </Th>
                <Th
                  fontWeight={"hairline"}
                  fontSize={"0.9rem"}
                  textTransform={"uppercase"}
                  textAlign={"center"}
                >
                  Value
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {salesProject &&
                salesProject.map((el) => {
                  return (
                    <Tr
                      _hover={{
                        color: "logo.orange",
                      }}
                      cursor={"pointer"}
                      onClick={() => handleSubmit(el)}
                    >
                      <Td fontWeight={"light"} fontSize={"0.9rem"}>
                        {el.Naturali_Invoice}
                      </Td>
                      <Td fontWeight={"light"} fontSize={"0.9rem"}>
                        {el.InvoiceDate &&
                          el.InvoiceDate.toString().slice(0, 10)}
                      </Td>
                      <Td fontWeight={"light"} fontSize={"0.9rem"}>
                        {el.EstDelivery_Date &&
                          el.EstDelivery_Date.toString().slice(0, 10)}
                      </Td>
                      <Td fontWeight={"light"} fontSize={"0.9rem"}>
                        {el.ShippingMethod}
                      </Td>
                      <Td fontWeight={"light"} fontSize={"0.9rem"}>
                        {el.ShipTo}
                      </Td>
                      <Td fontWeight={"light"} fontSize={"0.9rem"}>
                        {el.Status}
                      </Td>
                      <Td fontWeight={"light"} fontSize={"0.9rem"}>
                        $ {el.Value.toLocaleString("en-US")}
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
