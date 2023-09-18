"use client";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DetailMenu from "./detailMenu";
import DetailInvoice from "./detailInvoice";
import { cleanSaleDetails, salesDetails } from "@/store/sales/actionsSales";
import { SalesState } from "@/store/sales/typeSales";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ProductsSaleContainer from "./productSaleContainer";
import DetailPayment from "./detailPayment";

export default function SaleDetailUser({ params }) {
  const [focus, setFocus] = useState("details");

  const { salesDetail } = useAppSelector(
    (state: { salesReducer: SalesState }) => state.salesReducer
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(salesDetails(params.Invoice));
    return () => {
      dispatch(cleanSaleDetails());
    };
  }, []);

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"row"}
        mb={"5vh"}
        alignItems={"flex-end"}
        justifyContent={"space-between"}
      >
        <DetailMenu params={params} focus={focus} setFocus={setFocus} />
        {focus === "details" && <DetailInvoice salesDetail={salesDetail} />}
        {focus === "products solds" && (
          <ProductsSaleContainer salesDetail={salesDetail} />
        )}
        {focus === "payments" && <DetailPayment salesDetail={salesDetail} />}
      </Box>
    </>
  );
}
