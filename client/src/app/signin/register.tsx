// "use client";
// import {
//   Box,
//   Button,
//   Center,
//   FormControl,
//   FormLabel,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   SimpleGrid,
//   useMediaQuery,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import { FaRegUserCircle } from "react-icons/fa";
// import { PiLockLight } from "react-icons/pi";

// interface RegisterProps {
//   isActive600: boolean;
// }

// const Register: React.FC<RegisterProps> = ({ isActive600 }) => {
//   // const [smallerThan1100] = useMediaQuery("(max-width: 1100px)");
//   // const [smallerThan600] = useMediaQuery("(max-width: 600px)");

//   return (
//     <Box
//       display={"flex"}
//       h={"68vh"}
//       w={"50vw"}
//       // w={"80vw"}
//       bg={"#f2f2f2"}
//       border={"2px solid red"}
//       // position={"relative"}
//       flexDirection={"column"}
//       // mt={"100px"}
//       // bottom={10} //este es con row
//       mb={"80px"} // este es con row
//       justifyContent={"center"}
//       alignItems={"center"}
//     >
//       <Box
//         display={"flex"}
//         h={"40px"}
//         w={"full"}
//         // bg={"yellow"}
//         // mt={"-120px"}
//         justifyContent={"center"}
//         alignItems={"center"}
//         fontSize={"2xl"}
//       >
//         <Center>SIGN UP</Center>
//       </Box>
//       <Box
//         display={"flex"}
//         alignItems={"center"}
//         justifyItems={"center"}
//         // bg={"red"}
//         mt={"20px"}
//         w={"80%"}
//       >
//         <FormControl>
//           <SimpleGrid column={2} spacing={4}>
//             <Box>
//               <FormLabel>
//                 <Input
//                   h={"30px"}
//                   w={"full"}
//                   position={"relative"}
//                   mt={"7px"}
//                   border={"none"}
//                   _hover={{
//                     backgroundColor: "transparent",
//                   }}
//                   _focus={{
//                     backgroundColor: "transparent",
//                     border: "none",
//                   }}
//                   style={{
//                     borderBottom: "2px solid black",
//                     borderRadius: "0", // Ajusta el radio de las esquinas a cero
//                     outline: "none",
//                   }}
//                   placeholder={"USERNAME"}
//                 />
//               </FormLabel>
//             </Box>
//             <Box>
//               <FormLabel>
//                 <Input
//                   h={"30px"}
//                   w={"full"}
//                   position={"relative"}
//                   mt={"7px"}
//                   border={"none"}
//                   _hover={{
//                     backgroundColor: "transparent",
//                   }}
//                   _focus={{
//                     backgroundColor: "transparent",
//                     border: "none",
//                   }}
//                   style={{
//                     borderBottom: "2px solid black",
//                     borderRadius: "0", // Ajusta el radio de las esquinas a cero
//                     outline: "none",
//                   }}
//                   placeholder={"EMAIL"}
//                 />
//               </FormLabel>
//             </Box>
//             <Box>
//               <FormLabel>
//                 <Input
//                   h={"30px"}
//                   w={"full"}
//                   position={"relative"}
//                   mt={"7px"}
//                   border={"none"}
//                   _hover={{
//                     backgroundColor: "transparent",
//                   }}
//                   _focus={{
//                     backgroundColor: "transparent",
//                     border: "none",
//                   }}
//                   style={{
//                     borderBottom: "2px solid black",
//                     borderRadius: "0", // Ajusta el radio de las esquinas a cero
//                     outline: "none",
//                   }}
//                   placeholder={"PASSWORD"}
//                 />
//               </FormLabel>
//             </Box>
//             <Box>
//               <FormLabel>
//                 <Input
//                   h={"30px"}
//                   w={"full"}
//                   position={"relative"}
//                   mt={"7px"}
//                   border={"none"}
//                   _hover={{
//                     backgroundColor: "transparent",
//                   }}
//                   _focus={{
//                     backgroundColor: "transparent",
//                     border: "none",
//                   }}
//                   style={{
//                     borderBottom: "2px solid black",
//                     borderRadius: "0", // Ajusta el radio de las esquinas a cero
//                     outline: "none",
//                   }}
//                   placeholder={"CONFIRM PASSWORD"}
//                 />
//               </FormLabel>
//             </Box>
//           </SimpleGrid>
//         </FormControl>
//       </Box>
//       <Box
//         display={"flex"}
//         h={"15vh"}
//         w={"full"}
//         // bg={"blue"}
//         mt={"20px"}
//         flexDirection={"column"}
//       >
//         <Box>
//           <Center>CREATE ACCOUNT</Center>
//         </Box>
//         <Box
//           display={"flex"}
//           flexDirection={"row"}
//           h={"full"}
//           w={"full"}
//           justifyContent={"center"}
//           alignItems={"center"}
//           position={"relative"}
//           bottom={-5}
//         >
//           <Center>New customer?</Center>
//           <Center ml={"10px"}>
//             <Button
//               border={"none"}
//               backgroundColor={"transparent"}
//               _hover={{
//                 backgroundColor: "transparent",
//               }}
//               _focus={{
//                 backgroundColor: "transparent",
//                 border: "none",
//               }}
//               style={{
//                 borderBottom: "1px solid black",
//                 borderRadius: "0", // Ajusta el radio de las esquinas a cero
//                 outline: "none",
//               }}
//             >
//               START HERE
//             </Button>
//           </Center>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Register;
