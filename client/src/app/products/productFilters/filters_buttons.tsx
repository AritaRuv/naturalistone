import React from "react";
import { SimpleGrid, Button, Text, useMediaQuery, grid, Divider, Box } from "@chakra-ui/react";
import "../../_navBar/_navBar.css";
import { FilterButtonsProps } from "./types";

const FilterButtons: React.FC<FilterButtonsProps> = ({filters, setFilters, setShowMenu, showMenu }) => {

  const [is550Screen] = useMediaQuery("(max-width: 550px)");
  
  let gridColumns= 4
  if(is550Screen) gridColumns = 1

  const handleButton = (name: string) => {
    if(showMenu !== name){
      setShowMenu(name);
    } else {
      setShowMenu('')
    }
    
  };

  const filters_buttons = [
    {name: 'Type'},
    {name: 'Thickness'},
    {name: 'Finish'},
    {name: 'Size'},
  ]
  return (
    <>
      <SimpleGrid p="15px" w={'100vw'} bg={'white'} columns={gridColumns} position={'relative'} zIndex={100}>
        {
          filters_buttons.map((button, i) => {
            return(
              <Box key={i} display={'flex'} flexDir={'column'}>
              <Button
                className="customButton"
                variant="unstyled"
                onClick={() => handleButton(button.name)}
                >
                <Text textTransform={'uppercase'} fontWeight={showMenu===button.name ? 'bold' : 'normal'}>{button.name}</Text>
              </Button>
              <Divider mb={filters_buttons.length-1 === i ? 0 : 2} mt={2}/>
              </Box>
            )
          })
        }
      </SimpleGrid>
    </>
  );
};

export default FilterButtons;
