// "use client";
// import { Box, useMediaQuery, Text, Checkbox } from "@chakra-ui/react";
// import { IShowMenu } from "./page";
// import React from "react";

// const SideCard: React.FC<IShowMenu> = () => {
//   const [isSmallThan1000] = useMediaQuery("(max-width: 1000px)");

//   return (
//     <>
//       <Box
//         display={"flex"}
//         flexDir={"column"}
//         border={"2px solid"}
//         rounded={"sm"}
//         borderColor={"gray.200"}
//         w={"300px"}
//         minW={"250px"}
//         p={"2vh"}
//         h={"120px"}
//         mt={isSmallThan1000 ? "5vh" : 0}
//         ml={isSmallThan1000 ? "5vh" : "0.8vw"}
//       >
//         <Text textTransform={"uppercase"} fontSize={"0.9rem"}>
//           SUBSCRIBE!
//         </Text>
//         <Text fontSize={"0.6rem"} color={"gray.600"}>
//           Want to stay informed about all our latest updates and discounts?
//         </Text>
//         <Box display={"flex"} pt={"1vh"}>
//           <Checkbox size={"sm"}></Checkbox>
//           <Text
//             pl={"1vh"}
//             fontSize={"0.6rem"}
//             color={"gray.600"}
//             fontWeight={"semibold"}
//           >
//             I want to receive updates and discounts
//           </Text>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default SideCard;
