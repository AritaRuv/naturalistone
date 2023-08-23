"use client";
import { useAppSelector } from "@/store/hooks";
import { ProjectsState } from "@/store/projects/typeProjects";
import { Box, Button, Text, VStack, InputGroup, Input } from "@chakra-ui/react";
import Link from "next/link";
import { UpdateProject } from "./modalUpdateProject";
import { DeleteProject } from "./modalDeleteProject";

const ProjecteInfo = ({ params }) => {
  const { idProjects } = params;
  const { project } = useAppSelector(
    (state: { projectsReducer: ProjectsState }) => state.projectsReducer
  );

  const {
    CustomerID,
    ProjectName,
    Shipping_Address,
    Shipping_City,
    Shipping_State,
    Shipping_ZipCode,
  } = project;

  // return (
  //   <>
  //     <Box  w={"70vw"} h={"65vh"} overflow={"auto"} p={"20px"} border={"2px solid red"}>
  //       <VStack pl={"2vw"} pt={"4vh"} alignItems={"flex-start"} >
  //         <Box>
  //           <Text
  //             //borderLeft={"2px solid black"}
  //             pl={"1vh"}
  //             fontSize={"0.9rem"}
  //             fontWeight={"semibold"}
  //           >
  //             PROYECT INFORMATION
  //           </Text>
  //         </Box>
  //         <VStack pl={"1vw"} alignItems={"flex-start"}>
  //           <Box>
  //             <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
  //               COMPANY
  //             </Text>
  //             <Text fontSize={"0.9rem"} fontWeight={"thin"}>
  //               NOMBRE DE LA COMPANY
  //             </Text>
  //           </Box>
  //           <Box>
  //             <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
  //               EMAIL
  //             </Text>
  //             <Text fontSize={"0.9rem"} fontWeight={"thin"}>
  //               COMPANYEMAIL@HOT.COM
  //             </Text>
  //           </Box>
  //           <Box>
  //             <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
  //               PHONE
  //             </Text>
  //             <Text fontSize={"0.9rem"} fontWeight={"thin"}>
  //               123 2344 5443
  //             </Text>
  //           </Box>
  //         </VStack>
  //       </VStack>
  //       <VStack pl={"2vw"} pt={"2vh"} alignItems={"flex-start"}>
  //         <Box>
  //           <Text
  //             borderLeft={"2px solid black"}
  //             pl={"1vh"}
  //             fontSize={"0.9rem"}
  //             fontWeight={"semibold"}
  //           >
  //             SHIPPING ADDRESS
  //           </Text>
  //         </Box>
  //         <VStack pl={"1vw"} alignItems={"flex-start"}>
  //           <Box>
  //             <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
  //               ADDRESS
  //             </Text>
  //             <Text fontSize={"0.9rem"} fontWeight={"thin"}>
  //               {Shipping_Address ? Shipping_Address.toUpperCase() : "-"}
  //             </Text>
  //           </Box>
  //           <Box>
  //             <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
  //               CITY
  //             </Text>
  //             <Text fontSize={"0.9rem"} fontWeight={"thin"}>
  //               {Shipping_City ? Shipping_City.toUpperCase() : "-"}
  //             </Text>
  //           </Box>
  //           <Box>
  //             <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
  //               ZIP CODE
  //             </Text>
  //             <Text fontSize={"0.9rem"} fontWeight={"thin"}>
  //               {Shipping_ZipCode ? Shipping_ZipCode.toUpperCase() : "-"}
  //             </Text>
  //           </Box>
  //           <Box>
  //             <Text fontSize={"0.6rem"} fontWeight={"semibold"}>
  //               STATE
  //             </Text>
  //             <Text fontSize={"0.9rem"} fontWeight={"thin"}>
  //               {Shipping_State ? Shipping_State.toUpperCase() : "-"}
  //             </Text>
  //           </Box>
  //         </VStack>
  //         <UpdateProject idProjects={idProjects} project={project} />
  //         <DeleteProject idProjects={idProjects} project={project} />
  //       </VStack>
  //     </Box>
  //   </>
  // );

  return (
    <>
      <Box  w={"70vw"} h={"65vh"} overflow={"auto"} p={"20px"}
      >
        <Box
          justifyContent={"flex-start"}
          h={"40vh"}
          mt={"5vh"}
          display={"flex"}
          flexDir={"column"}
        >
          <Box
            mr={"6vw"}
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            flexDirection={"column"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
            >
              <Text fontSize={"1rem"}>PROJECT SETTINGS</Text>
              <Box  
                mt={"2vh"}
                display={"flex"}
                flexDirection={"row"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  mr={"3vw"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      PROJECT NAME
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"70px"}
                  >
                    <Input
                      h={"30px"}
                      w={"230px"}
                      position={"relative"}
                      id={"fullName"}
                      name={"fullName"}
                      fontSize={"0.9rem"}
                      value={ProjectName}
                      border={"none"}
                      isReadOnly={true}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      CONTACT NUMBER
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"70px"}
                  >
                    <Input
                      h={"30px"}
                      w={"230px"}
                      position={"relative"}
                      id={"phone"}
                      name={"phone"}
                      fontSize={"0.9rem"}
                      value={"123 123 123"}
                      border={"none"}
                      isReadOnly={true}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                  </InputGroup>
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"row"}
                mt={"2vh"}
              >
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  mr={"3vw"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                      COMPANY
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"70px"}
                  >
                    <Input
                      h={"30px"}
                      w={"230px"}
                      position={"relative"}
                      id={"company"}
                      name={"company"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={"Company Name"}
                      border={"none"}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", 
                        outline: "none",
                      }}
                    />
                  </InputGroup>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Text fontSize={"0.75rem"} color={"#646464"}>
                   EMAIL
                  </Text>
                  <InputGroup
                    display={"flex"}
                    flexDirection={"column"}
                    h={"70px"}
                  >
                    <Input
                      h={"30px"}
                      w={"230px"}
                      position={"relative"}
                      id={"companyPosition"}
                      name={"companyPosition"}
                      fontSize={"0.9rem"}
                      isReadOnly={true}
                      value={"email@company.com"}
                      border={"none"}
                      _focus={{
                        boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                      }}
                      style={{
                        borderBottom: "1px solid black",
                        borderRadius: "0", // Ajusta el radio de las esquinas a cero
                        outline: "none",
                      }}
                    />
                  </InputGroup>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            mt={"3vh"}
          >
            <Text fontSize={"1rem"}>SHIPPING ADDRESS</Text>
            <Box  
              mt={"2vh"}
              display={"flex"}
              flexDirection={"row"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                mr={"3vw"}
              >
                <Text fontSize={"0.75rem"} color={"#646464"}>
                  ADDRESS
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"70px"}
                >
                  <Input
                    h={"30px"}
                    w={"230px"}
                    position={"relative"}
                    id={"fullName"}
                    name={"fullName"}
                    fontSize={"0.9rem"}
                    value={Shipping_Address}
                    border={"none"}
                    isReadOnly={true}
                    _focus={{
                      boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                  />
                </InputGroup>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
              >
                <Text fontSize={"0.75rem"} color={"#646464"}>
                    CITY
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"70px"}
                >
                  <Input
                    h={"30px"}
                    w={"230px"}
                    position={"relative"}
                    id={"phone"}
                    name={"phone"}
                    fontSize={"0.9rem"}
                    value={Shipping_City}
                    border={"none"}
                    isReadOnly={true}
                    _focus={{
                      boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                  />
                </InputGroup>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              mt={"2vh"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                mr={"3vw"}
              >
                <Text fontSize={"0.75rem"} color={"#646464"}>
                  STATE
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"70px"}
                >
                  <Input
                    h={"30px"}
                    w={"230px"}
                    position={"relative"}
                    id={"company"}
                    name={"company"}
                    fontSize={"0.9rem"}
                    isReadOnly={true}
                    value={Shipping_State}
                    border={"none"}
                    _focus={{
                      boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", 
                      outline: "none",
                    }}
                  />
                </InputGroup>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
              >
                <Text fontSize={"0.75rem"} color={"#646464"}>
                  ZIP CODE
                </Text>
                <InputGroup
                  display={"flex"}
                  flexDirection={"column"}
                  h={"70px"}
                >
                  <Input
                    h={"30px"}
                    w={"230px"}
                    position={"relative"}
                    id={"companyPosition"}
                    name={"companyPosition"}
                    fontSize={"0.9rem"}
                    isReadOnly={true}
                    value={Shipping_ZipCode}
                    border={"none"}
                    _focus={{
                      boxShadow:
                          "0 0.5px 0.5px #f2f2f2 inset, 0 0 5px #f2f2f2",
                    }}
                    style={{
                      borderBottom: "1px solid black",
                      borderRadius: "0", // Ajusta el radio de las esquinas a cero
                      outline: "none",
                    }}
                  />
                </InputGroup>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          mr={"6vw"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          flexDirection={"column"}>

        </Box>
      </Box>
    </>
  );
};

export default ProjecteInfo;
