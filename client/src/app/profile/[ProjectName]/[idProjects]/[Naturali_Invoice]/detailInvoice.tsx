"use client";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function DetailInvoice({ salesDetail }) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (salesDetail?.sale?.Naturali_Invoice !== 0) {
      setLoader(false);
    }
  }, [salesDetail]);

  return (
    <>
      <Box
        w={"75vw"}
        h={"65vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {loader ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
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
                <Tr
                  _hover={{
                    color: "logo.orange",
                  }}
                  cursor={"pointer"}
                >
                  <Td
                    fontWeight={"light"}
                    fontSize={"0.9rem"}
                    textAlign={"center"}
                  >
                    {salesDetail?.sale?.Naturali_Invoice}
                  </Td>
                  <Td
                    fontWeight={"light"}
                    fontSize={"0.9rem"}
                    textAlign={"center"}
                  >
                    {salesDetail?.sale?.InvoiceDate &&
                      salesDetail?.sale?.InvoiceDate.toString().slice(0, 10)}
                  </Td>
                  <Td
                    fontWeight={"light"}
                    fontSize={"0.9rem"}
                    textAlign={"center"}
                  >
                    {salesDetail?.sale?.EstDelivery_Date &&
                      salesDetail?.sale?.EstDelivery_Date.toString().slice(
                        0,
                        10
                      )}
                  </Td>
                  <Td
                    fontWeight={"light"}
                    fontSize={"0.9rem"}
                    textAlign={"center"}
                  >
                    {salesDetail?.sale?.ShippingMethod}
                  </Td>
                  <Td
                    fontWeight={"light"}
                    fontSize={"0.9rem"}
                    textAlign={"center"}
                  >
                    {salesDetail?.sale?.ShipTo}
                  </Td>
                  <Td
                    fontWeight={"light"}
                    fontSize={"0.9rem"}
                    textAlign={"center"}
                  >
                    {salesDetail?.sale?.Status}
                  </Td>
                  <Td
                    fontWeight={"light"}
                    fontSize={"0.9rem"}
                    textAlign={"center"}
                  >
                    $ {salesDetail?.sale?.Value.toLocaleString("en-US")}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}
