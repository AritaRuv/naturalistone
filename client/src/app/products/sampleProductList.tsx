import {
  Box,
  Checkbox,
  CheckboxGroup,
  HStack,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postCart } from "@/store/cart/actionsCart";
import { LoginState } from "@/store/login/typeLogin";
import { ProductListProps } from "@/interfaces/product";



const SampleProductList: React.FC<ProductListProps> = ({
  data,
  ProdNameID,
}) => {
  const dispatch = useAppDispatch();

  const { thickness, finish } = data[ProdNameID];

  const [selectedThickness, setSelectedThickness] = useState<string[]>([]);
  const [selectedFinish, setSelectedFinish] = useState<string[]>([]);

  const handleCheckboxChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prevState) =>
      prevState.includes(value) ? prevState.filter((v) => v !== value) : [value]
    );
  };

  //maneja los checkboxes para controlar que solo 1 este clickeado a la vez

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  const handleAddToCart = async () => {
    const bodyCust = {
      size: null,
      thickness: selectedThickness[0],
      finish: selectedFinish[0],
      ProdNameID: ProdNameID,
      customerID: user?.CustomerID,
    };
    dispatch(postCart(bodyCust));

  };

  return (
    <>
      <HStack align="start" spacing={4} w={"100%"} mb={"4%"}>
        <CheckboxGroup value={selectedFinish} colorScheme="whiteAlpha">
          <VStack align="start" w={"50%"}>
            <Text fontSize="0.8rem">FINISH</Text>
            {finish.map((finish) => (
              <Box
                key={finish}
                fontSize={"0.75rem"}
                display={"flex"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                {finish}
                <Checkbox
                  value={finish}
                  iconColor="orange"
                  borderColor={"blackAlpha.400"}
                  isChecked={selectedFinish.includes(finish)}
                  onChange={() =>
                    handleCheckboxChange(finish, setSelectedFinish)
                  }
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>

        <CheckboxGroup colorScheme="whiteAlpha" value={selectedThickness}>
          <VStack align="start" w={"50%"}>
            <Text fontSize="0.8rem">THICKNESS</Text>
            {thickness.map((thickness) => (
              <Box
                key={thickness}
                fontSize={"0.75rem"}
                display={"flex"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                {thickness}
                <Checkbox
                  value={thickness}
                  iconColor="orange"
                  borderColor={"blackAlpha.400"}
                  isChecked={selectedThickness.includes(thickness)}
                  onChange={() =>
                    handleCheckboxChange(thickness, setSelectedThickness)
                  }
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>
      </HStack>
      <Button
        fontSize={"1rem"}
        fontWeight={"semibold"}
        variant={"unstyled"}
        _hover={{
          fontWeight: "bold",
        }}
        onClick={handleAddToCart}
      >
        ADD SAMPLE
      </Button>
    </>
  );
};

export default SampleProductList;
