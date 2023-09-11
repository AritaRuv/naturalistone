"use client";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import Link from "next/link";

const DetailMenu = ({ params, focus, setFocus }) => {
  const handleClick = (e) => {
    const { name } = e.target;
    setFocus(name);
  };
  const projectButtonsArray = [
    { name: "details" },
    { name: "products solds" },
    { name: "payments" },
  ];

  return (
    <>
      <Box display={"flex"} flexDir={"column"} h={"60vh"}>
        <Box ml={"5vw"} h={"20vh"}>
          <Link href={`/profile/${params.ProjectName}/${params.idProjects}`}>
            <Button
              h={"3vh"}
              display={"flex"}
              variant={"unstyled"}
              fontWeight={"light"}
              fontSize={"0.7rem"}
              textAlign={"end"}
              _hover={{ fontWeight: "semibold" }}
            >
              ← BACK
            </Button>
          </Link>
          <Text
            _hover={{
              fontWeight: "normal",
            }}
            rounded={0}
            h={"4vh"}
            fontSize="1.5rem"
            variant="unstyled"
            textTransform={"uppercase"}
          >
            Details Invoice {params.Naturali_Invoice}
          </Text>
        </Box>
        <VStack
          spacing={5}
          alignItems={"flex-start"}
          h={"40vh"}
          ml={"5vw"}
          w={"10vw"}
        >
          {projectButtonsArray.map((button, i) => {
            return (
              <Box key={i}>
                {
                  <Button
                    _hover={{
                      color: "logo.orange",
                    }}
                    rounded={0}
                    h={"4vh"}
                    pl={"2vw"}
                    fontSize="1.2rem"
                    variant="unstyled"
                    fontWeight={focus === button.name ? "normal" : "hairline"}
                    name={button.name}
                    textTransform={"uppercase"}
                    onClick={handleClick}
                  >
                    {button.name}
                  </Button>
                }
              </Box>
            );
          })}
        </VStack>
      </Box>
    </>
  );
};

export default DetailMenu;
