import { Box, Checkbox, CheckboxGroup, HStack, VStack, Text, Button, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postCart } from "@/store/cart/actionsCart";
import { fetchProductsValuesValidation } from "@/store/products/actionsProducts";
import { ProductState } from "@/store/products/typesProducts";
import sizesCheckboxList from "./sizesCheckboxList";


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

const ProductList: React.FC<ProductListProps> = ({ data, ProdNameID }) => {

  const dispatch = useAppDispatch();
  const { size, thickness, finish, prodNameID } = data[ProdNameID];

  const { productValuesValidation } = useAppSelector((state: { productReducer: ProductState }) => state.productReducer);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedThickness, setSelectedThickness] = useState<string>("");
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [sizes, setSizes] = useState<string>("");

  const { raw_products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );



  const handleCheckboxChange = (value: string, setState: React.Dispatch<React.SetStateAction<string>>, name: string) => {
    //console.log(raw_products);

    const result = raw_products.filter((prod) => prod.ProdNameID === ProdNameID);

    setState(prevState => prevState === value ? "" : value);
    if (name === "finish") {
      const result2 = result.filter((prod) => prod.Finish === value);
      setSizes("");
      const aux = [];
      for (let index = 0; index < result2.length; index++) {
        const element: string = result2[index].Size;
        if (element != null)
          aux.push(element);
        setSizes(aux);

      }
      dispatch(fetchProductsValuesValidation(value, selectedSize, selectedThickness, prodNameID));
    }
    if (name === "size") {
      dispatch(fetchProductsValuesValidation(selectedFinish, value, selectedThickness, prodNameID));
    }
    if (name === "thickness") {
      dispatch(fetchProductsValuesValidation(selectedFinish, selectedSize, value, prodNameID));
    }
  };

  const handleAddToCart = async () => {
    const bodyCust = {
      size: selectedSize,
      thickness: selectedThickness,
      finish: selectedFinish,
      ProdNameID: ProdNameID,
      customerID: 1938
    };

    dispatch(postCart(bodyCust));
    setSelectedSize("");
    setSelectedThickness("");
    setSelectedFinish("");

  };

  return (
    <>
      <HStack align="start" spacing={1} w={"100%"} mb={"4%"}>

        <CheckboxGroup value={[selectedFinish]} colorScheme='whiteAlpha'>
          <VStack align="start" w={"80px"} >
            <Text fontSize='0.7rem' fontWeight={"semibold"}>FINISH</Text>
            {finish.map(finish => (
              <Box key={finish} fontSize={"0.7rem"} display={"flex"} justifyContent={"space-between"} w={"60px"} >
                {finish}
                <Checkbox
                  size={"sm"}
                  value={finish}
                  iconColor="orange"
                  borderColor={"blackAlpha.600"}
                  isChecked={selectedFinish === finish}
                  onChange={() => handleCheckboxChange(finish, setSelectedFinish, "finish")}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>
        <CheckboxGroup colorScheme='whiteAlpha' value={[selectedSize]}>
          <VStack align="start" w={"80px"}>
            <Text fontSize='0.7rem' fontWeight={"semibold"}>SIZE</Text>
            {/* <sizesCheckboxList >

            </sizesCheckboxList> */}
            {size.map(size => (
              <Box key={size} fontSize={"0.7rem"} display={"flex"} justifyContent={"space-between"} w={"60px"}>
                {size}
                <Checkbox
                  size={"sm"}
                  value={size}
                  iconColor="orange"
                  borderColor={"blackAlpha.600"}
                  isChecked={selectedSize === size}
                  isDisabled={!sizes.includes(size)}
                  onChange={() => handleCheckboxChange(size, setSelectedSize, "size")}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>
        <CheckboxGroup colorScheme='whiteAlpha' value={[selectedThickness]}>
          <VStack align="start" w={"80px"}>
            <Text fontSize='0.7rem' fontWeight={"semibold"}>THICKNESS</Text>
            {thickness.map(thickness => (
              <Box key={thickness} fontSize={"0.7rem"} display={"flex"} justifyContent={"space-between"} w={"60px"}>
                {thickness}
                <Checkbox
                  size={"sm"}
                  value={thickness}
                  iconColor="orange"
                  borderColor={"blackAlpha.600"}
                  isChecked={selectedThickness === thickness}
                  onChange={() => handleCheckboxChange(thickness, setSelectedThickness, "thickness")}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>
      </HStack>
      <Button
        fontSize={"0.8rem"}
        fontWeight={"semibold"}
        variant={"unstyled"}
        _hover={{
          fontWeight: "bold",
        }}
        onClick={handleAddToCart}>
        ADD TO CART
      </Button>
    </>
  );
};

export default ProductList;
