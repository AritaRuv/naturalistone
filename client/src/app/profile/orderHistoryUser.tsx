"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SalesState } from "@/store/sales/typeSales";
import {
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { salesByCustomer } from "@/store/sales/actionsSales";
import { useRouter } from "next/navigation";

export default function OrderHistoryUser({ user }) {
  const { salesCustomer } = useAppSelector(
    (state: { salesReducer: SalesState }) => state.salesReducer
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(salesByCustomer(user.CustomerID)); //user.CustomerID 1703
  }, []);

  const router = useRouter();

  const handleSubmit = (el) => {
    router.push(`/profile/saleDetail/${el.Naturali_Invoice}`);
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
        {salesCustomer && salesCustomer.length ? (
          <TableContainer w={"90%"} h={"80%"} overflowY={"auto"}>
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
                  <Th
                    fontWeight={"hairline"}
                    fontSize={"0.9rem"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                  >
                    Project
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {salesCustomer &&
                  salesCustomer.map((sale, index) => {
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
                          {sale?.Naturali_Invoice}
                        </Td>
                        <Td
                          fontWeight={"light"}
                          fontSize={"0.9rem"}
                          textAlign={"center"}
                        >
                          {sale?.InvoiceDate &&
                            sale?.InvoiceDate.toString().slice(0, 10)}
                        </Td>
                        <Td
                          fontWeight={"light"}
                          fontSize={"0.9rem"}
                          textAlign={"center"}
                        >
                          {sale?.EstDelivery_Date &&
                            sale?.EstDelivery_Date.toString().slice(0, 10)}
                        </Td>
                        <Td
                          fontWeight={"light"}
                          fontSize={"0.9rem"}
                          textAlign={"center"}
                        >
                          {sale?.Status}
                        </Td>
                        <Td
                          fontWeight={"light"}
                          fontSize={"0.9rem"}
                          textAlign={"center"}
                        >
                          $ {sale?.Value.toLocaleString("en-US")}
                        </Td>
                        <Td
                          fontWeight={"light"}
                          fontSize={"0.9rem"}
                          textAlign={"center"}
                        >
                          {sale?.ProjectName}
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Center w={"full"} h={"full"}>
            <Text fontSize={"1.2rem"} fontWeight={"light"}>
              No sales found
            </Text>
          </Center>
        )}
      </Box>
    </>
  );
}
