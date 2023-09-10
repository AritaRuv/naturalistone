"use client";
import { AbsoluteCenter, Box, Center, Flex, Icon, IconButton, Text, useMediaQuery } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export default function CheckoutResult() {
    const searchParams = useSearchParams();
    const status = searchParams.get("redirect_status");
    const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");

    function postPayment() {

    }

    return (
        <>

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
                                    icon={<AiFillCheckCircle />}
                                ></IconButton> Success
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
                                    ></IconButton> Aborted
                                </Text>
                            )
                    }
                </Center>
            </Flex >

        </>
    );
}


