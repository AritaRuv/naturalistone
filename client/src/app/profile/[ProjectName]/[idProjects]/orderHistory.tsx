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
        w={"75vw"}
        h={"65vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
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
                salesProject.map((sale, index) => {
                  return (
                    <Tr
                      _hover={{
                        color: "logo.orange",
                      }}
                      cursor={"pointer"}
                      onClick={() => handleSubmit(sale)}
                      key={index}
                    >
                      <Td
                        fontWeight={"light"}
                        fontSize={"0.9rem"}
                        textAlign={"center"}
                      >
                        {sale.Naturali_Invoice}
                      </Td>
                      <Td
                        fontWeight={"light"}
                        fontSize={"0.9rem"}
                        textAlign={"center"}
                      >
                        {sale.InvoiceDate &&
                          sale.InvoiceDate.toString().slice(0, 10)}
                      </Td>
                      <Td
                        fontWeight={"light"}
                        fontSize={"0.9rem"}
                        textAlign={"center"}
                      >
                        {sale.EstDelivery_Date &&
                          sale.EstDelivery_Date.toString().slice(0, 10)}
                      </Td>
                      <Td
                        fontWeight={"light"}
                        fontSize={"0.9rem"}
                        textAlign={"center"}
                      >
                        {sale.Status}
                      </Td>
                      <Td
                        fontWeight={"light"}
                        fontSize={"0.9rem"}
                        textAlign={"center"}
                      >
                        $ {sale.Value.toLocaleString("en-US")}
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
