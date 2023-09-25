"use client";
import { confirmCheckout } from "@/api/apiCheckout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Center, Flex, IconButton, Text } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { LoginState } from "@/store/login/typeLogin";
import Cookies from "js-cookie";
import { userInfo } from "@/store/login/actionsLogin";

export default function CheckoutResult() {
  const searchParams = useSearchParams();
  const status = searchParams.get("redirect_status");
  const paymentIntentClientSecret: string = searchParams.get("payment_intent_client_secret");
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  useEffect(() => {

    if (user.CustomerID === 0) {
      dispatch(userInfo());
    }
    else{
      if (status === "succeeded") {
        const projectId: number = +Cookies.get("projectId");
        const res  = confirmCheckout(user.CustomerID, projectId, paymentIntentClientSecret,"",100);
        
      }
    }

  },[user]);
  
  return (<>
    <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Center>
        {
          status === "succeeded" ? (
            <Text>
              <IconButton
                aria-label="User-icon"
                variant="unstyled"
                fontSize="xl"
                border={"none"}
                title={"Clear filters"}
                icon={<AiFillCheckCircle />}/> Success
            </Text>
          )
            :
            (
              <Text>
                <IconButton
                  aria-label="User-icon"
                  variant="unstyled"
                  fontSize="xl"
                  border={"none"}
                  title={"Clear filters"}
                  icon={<AiFillCloseCircle />}
                /> Aborted
              </Text>
            )
        }
      </Center>
    </Flex >
  </>
  );
}


