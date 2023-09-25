import React, { useEffect } from "react";
import { SimpleGrid, Box, IconButton, useMediaQuery } from "@chakra-ui/react";
import "../../../components/navBar/_navBar.css";
import { IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductState } from "@/store/products/typesProducts";
import { fetchDimension } from "@/store/products/actionsProducts";
import { FilterButtonsProps, FiltersState } from "../../../interfaces/filtersProducts";


const FiltersDropDownMenu: React.FC<FiltersState & FilterButtonsProps> = ({ params, setShowMenu}) => {
  
  
  const dispatch = useAppDispatch();
  const { dimensions } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  useEffect(()=>{
    if(!dimensions) dispatch(fetchDimension(params.Material)); 
  },[dimensions]);

  const [isExtraSmallScreen] = useMediaQuery("(max-width: 480px)");
  const [isSmallScreen] = useMediaQuery("(max-width: 1000px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 1400px)");
  
  let gridColumns = 6;

  if(isMediumScreen) gridColumns = 4;
  if(isSmallScreen) gridColumns = 3;
  if(isExtraSmallScreen) gridColumns = 2;

  const handleClose = ()=>{
    setShowMenu("");
  };

  return (
    <>
      <Box position={"relative"} zIndex={100} bg={"white"} border={"2px solid red"} h={"200px"} >
        <SimpleGrid w={"100vw"} minH={"15vh"} columns={gridColumns} spacingY={4} p={"2%"} >
          {/* {
          showMenu === 'Material' && (
            <>
            
             {
              materials.map(mat => {
                return(
                <Box key={mat} display={'flex'} justifyContent={'flex-end'} alignItems={'flex-start'} w={'170px'}>
                  <Tooltip label={mat} isDisabled={mat.length > 15 ? false : true}>
                  <Text mr={'10px'} textTransform={'uppercase'}  fontSize={'0.9rem'}>{mat.length > 15 ? mat.slice(0,13)+'...' : mat}</Text>
                  </Tooltip>
                <Box display={'flex'} alignItems={'center'} h={'20px'}>
                  <Checkbox
                    colorScheme='whiteAlpha'
                    iconColor="orange"
                    borderColor={'blackAlpha.400'}
                    //isChecked={selectedFinish.includes(finish)}
                    //onChange={() => handleCheckboxChange(finish, setSelectedFinish)}
                  />
                </Box>
                
                </Box>)
              })
              } 
            </>
          )
        } */}
          {/* {
            showMenu === "Finish" && (
              <>
                {
                  finish?.slice(0,15).map(mat => {
                    return(
                      <Box key={mat} display={"flex"} justifyContent={"flex-end"} alignItems={"flex-start"} w={"170px"}>
                        <Tooltip label={mat} isDisabled={mat.length > 13 ? false : true}>
                          <Text mr={"10px"} textTransform={"uppercase"}  fontSize={"0.9rem"}>{mat.length > 13 ? mat.slice(0,10)+"..." : mat}</Text>
                        </Tooltip>
                        <Box display={"flex"} alignItems={"center"} h={"20px"}>
                          <Checkbox
                            colorScheme='whiteAlpha'
                            iconColor="orange"
                            borderColor={"blackAlpha.400"}
                            //isChecked={selectedFinish.includes(finish)}
                            //onChange={() => handleCheckboxChange(finish, setSelectedFinish)}
                          />
                        </Box>
                
                      </Box>);
                  })
                }
              </>
            )
          }
          {
            showMenu === "Size" && (
              <>
                {
                  size?.slice(2,15).map(mat => {
                    return(
                      <Box key={mat} display={"flex"} justifyContent={"flex-end"} alignItems={"flex-start"} w={"170px"}>
                        <Tooltip label={mat} isDisabled={mat.length > 15 ? false : true}>
                          <Text mr={"10px"} textTransform={"uppercase"}  fontSize={"0.9rem"}>{mat.length > 15 ? mat.slice(0,13)+"..." : mat}</Text>
                        </Tooltip>
                        <Box display={"flex"} alignItems={"center"} h={"20px"}>
                          <Checkbox
                            colorScheme='whiteAlpha'
                            iconColor="orange"
                            borderColor={"blackAlpha.400"}
                            //isChecked={selectedFinish.includes(finish)}
                            //onChange={() => handleCheckboxChange(finish, setSelectedFinish)}
                          />
                        </Box>
                
                      </Box>);
                  })
                }
              </>
            )
          }
          {
            showMenu === "Type" && (
              <>
                {
                  type?.map(mat => {
                    return(
                      <Box key={mat} display={"flex"} justifyContent={"flex-end"} alignItems={"flex-start"} w={"170px"}>
                        <Tooltip label={mat} isDisabled={mat.length > 15 ? false : true}>
                          <Text mr={"10px"} textTransform={"uppercase"}  fontSize={"0.9rem"}>{mat.length > 15 ? mat.slice(0,13)+"..." : mat}</Text>
                        </Tooltip>
                        <Box display={"flex"} alignItems={"center"} h={"20px"}>
                          <Checkbox
                            colorScheme='whiteAlpha'
                            iconColor="orange"
                            borderColor={"blackAlpha.400"}
                            //isChecked={selectedFinish.includes(finish)}
                            //onChange={() => handleCheckboxChange(finish, setSelectedFinish)}
                          />
                        </Box>
                
                      </Box>);
                  })
                }
              </>
            )
          }
          {
            showMenu === "Thickness" && (
              <>
                {
                  thickness?.map(mat => {
                    return(
                      <Box key={mat} display={"flex"} justifyContent={"flex-end"} alignItems={"flex-start"} w={"170px"}>
                        <Tooltip label={mat} isDisabled={mat.length > 15 ? false : true}>
                          <Text mr={"10px"} textTransform={"uppercase"}  fontSize={"0.9rem"}>{mat.length > 15 ? mat.slice(0,13)+"..." : mat}</Text>
                        </Tooltip>
                        <Box display={"flex"} alignItems={"center"} h={"20px"}>
                          <Checkbox
                            colorScheme='whiteAlpha'
                            iconColor="orange"
                            borderColor={"blackAlpha.400"}
                            //isChecked={selectedFinish.includes(finish)}
                            //onChange={() => handleCheckboxChange(finish, setSelectedFinish)}
                          />
                        </Box>
                
                      </Box>);
                  })
                }
              </>
            )
          } */}
        </SimpleGrid>
        <IconButton onClick={handleClose} w={"100vw"} display={"flex"} placeItems={"center"} variant={"unstyled"} icon={<IoIosArrowUp/>} aria-label="arrow"/>
      </Box>

    </>
  );
};

export default FiltersDropDownMenu;
