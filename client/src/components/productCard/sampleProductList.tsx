import { Box, Checkbox, CheckboxGroup, VStack, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { postCart } from "@/store/cart/actionsCart";

interface ProductListProps {
  data: {
    [key: string]: {
      size: string[];
      thickness: string[];
      finish: string[];
      prodNameID: number;
    };
  },
  ProdNameID: number
}

const SampleProductList: React.FC<ProductListProps> = ({ data, ProdNameID }) => {

  const dispatch = useAppDispatch();
  const { thickness, finish, prodNameID } = data[ProdNameID];

  const [selectedThickness, setSelectedThickness] = useState<string[]>([]);
  const [selectedFinish, setSelectedFinish] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    setState(prevState => prevState.includes(value) ? prevState.filter(v => v !== value) : [value]);
  };

  //maneja los checkboxes para controlar que solo 1 este clickeado a la vez

  const handleAddToCart = async () => {

    const bodyCust = {
      size: "",
      thickness: selectedThickness[0],
      finish: selectedFinish[0],
      ProdNameID: ProdNameID,
      customerID: 1938,
      quantity: 0
    };

    dispatch(postCart(bodyCust));
    //ahoramismo estoy intentando que la logica general funcione. Voy a necesitar agregar logica para controlar los chcekcbox
    // ya que en este momento admite convinaciones inexistentes. Al clickear 1 checkbox filtra los demas x resultados existentes 
    //o algo por el estilo. 
  };

  return (
    <>
      <Flex align="start" flexDir={"row"} justifyContent={"space-around"} w={"100%"} mb={"4%"}>

        <CheckboxGroup value={selectedFinish} colorScheme='whiteAlpha'>
          <VStack align="start" w={"80px"}>
            <Text fontSize='0.7rem' fontWeight={"semibold"}>FINISH</Text>
            {finish.map(finish => (
              <Box key={finish} fontSize={"0.7rem"} display={"flex"} justifyContent={"space-between"} w={"100%"}>
                {finish}
                <Checkbox
                  size={"sm"}
                  value={finish}
                  iconColor="orange"
                  borderColor={"blackAlpha.400"}
                  isChecked={selectedFinish.includes(finish)}
                  onChange={() => handleCheckboxChange(finish, setSelectedFinish)}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>

        <CheckboxGroup colorScheme='whiteAlpha' value={selectedThickness}>
          <VStack align="start" w={"80px"}>
            <Text fontSize='0.7rem' fontWeight={"semibold"}>THICKNESS</Text>
            {thickness.map(thickness => (
              <Box key={thickness} fontSize={"0.7rem"} display={"flex"} justifyContent={"space-between"} w={"100%"}>
                {thickness}
                <Checkbox
                  size={"sm"}
                  value={thickness}
                  iconColor="orange"
                  borderColor={"blackAlpha.400"}
                  isChecked={selectedThickness.includes(thickness)}
                  onChange={() => handleCheckboxChange(thickness, setSelectedThickness)}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>
      </Flex>
      <Button
        fontSize={"1rem"}
        fontWeight={"semibold"}
        variant={"unstyled"}
        _hover={{
          fontWeight: "bold",
        }}
        onClick={handleAddToCart}>
        ADD SAMPLE
      </Button>
    </>
  );
};

export default SampleProductList;
