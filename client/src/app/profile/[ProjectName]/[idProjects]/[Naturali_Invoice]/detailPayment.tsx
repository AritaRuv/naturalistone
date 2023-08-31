"use client";
import { Payments } from "@/utils/types";
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

export default function DetailPayment({ salesDetail }) {
  return (
    <>
      <Box
        w={"75vw"}
        h={"65vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {salesDetail?.payments.length ? (
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
                    Amount
                  </Th>
                  <Th
                    fontWeight={"hairline"}
                    fontSize={"0.9rem"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                  >
                    Method
                  </Th>
                  <Th
                    fontWeight={"hairline"}
                    fontSize={"0.9rem"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                  >
                    Date
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {salesDetail.payments &&
                  salesDetail.payments.map(
                    (payment: Payments, index: number) => {
                      return (
                        <Tr
                          _hover={{
                            color: "logo.orange",
                          }}
                          cursor={"pointer"}
                          key={index}
                        >
                          <Td
                            fontWeight={"light"}
                            fontSize={"0.9rem"}
                            textAlign={"center"}
                          >
                            {payment.InvoiceID}
                          </Td>
                          <Td
                            fontWeight={"light"}
                            fontSize={"0.9rem"}
                            textAlign={"center"}
                          >
                            $ {payment.Amount.toLocaleString("en-US")}
                          </Td>
                          <Td
                            fontWeight={"light"}
                            fontSize={"0.9rem"}
                            textAlign={"center"}
                          >
                            {payment.Method}
                          </Td>
                          <Td
                            fontWeight={"light"}
                            fontSize={"0.9rem"}
                            textAlign={"center"}
                          >
                            {payment.Date &&
                              payment.Date.toString().slice(0, 10)}
                          </Td>
                        </Tr>
                      );
                    }
                  )}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Center>
            <Text fontSize={"1.2rem"} fontWeight={"light"}>
              No payments found
            </Text>
          </Center>
        )}
      </Box>
    </>
  );
}
