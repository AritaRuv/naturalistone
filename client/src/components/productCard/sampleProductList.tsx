import {
  Box,
  Checkbox,
  CheckboxGroup,
  VStack,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart, postCart } from "@/store/cart/actionsCart";
import { ProductState } from "@/store/products/typesProducts";
import CartButton from "../navBar/cartButton";
import { LoginState } from "@/store/login/typeLogin";
import { AppContext } from "@/app/appContext";
import { ProductListProps } from "@/interfaces/product";


const SampleProductList: React.FC<ProductListProps> = ({
  data,
  ProdNameID
}) => {
  const dispatch = useAppDispatch();
  const { finish } = data[ProdNameID];
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [finishes, setFinishes] = useState<string[]>([]);
  const [cantFiltros, setCantFiltros] = useState<number>(0);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );
  const appContext = useContext(AppContext);

  const { raw_products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const handleCheckboxChange = (
    // value: string,
    // setState: React.Dispatch<React.SetStateAction<string>>,
    // name: string
  ) => {
    // //filtro raw_products por ProdNameID
    // const result = raw_products.filter(
    //   (prod) => prod.ProdNameID === ProdNameID
    // );
    // setState((prevState) => (prevState === value ? "" : value));

    // // //creo un array igual que result
    // let resultadoFiltrado = result;

    // if (name === "finish") {
    //   //si se selecciono (checkeo) un finish filtro por el finish seleccionado
    //   if (selectedFinish.length === 0) {
    //     setCantFiltros(cantFiltros + 1);
    //     setSelectedFinish(value);
    //     resultadoFiltrado = result.filter((prod) => prod.Finish === value);
    //   } else {
    //     setSelectedFinish("");
    //     setCantFiltros(cantFiltros - 1);
    //   }
    //   //recorro los  productos filtrados y si los thickness no son null
    // }
  };

  //maneja los checkboxes para controlar que solo 1 este clickeado a la vez

  const [array, setArray] = useState([]);

  const handleAddToCart = async () => {
    const bodyCust = {
      size: "",
      thickness: "",
      finish: selectedFinish,
      ProdNameID: ProdNameID,
      customerID: user?.CustomerID,
      quantity: 0,
    };
    await dispatch(postCart(bodyCust, raw_products));
    await dispatch(fetchCart());
    if(appContext) appContext.setIsCartModalOpen(true);
  };

  return (
    <>
      <Flex
        align="start"
        flexDir={"row"}
        justifyContent={"space-around"}
        w={"100%"}
        mb={"4%"}
      >
        <CheckboxGroup value={[selectedFinish]} colorScheme="whiteAlpha">
          <VStack align="start" w={"80px"}>
            <Text fontSize="0.7rem" fontWeight={"semibold"}>
              FINISH
            </Text>
            {finish.map((finish) => (
              <Box
                key={finish}
                fontSize={"0.7rem"}
                display={"flex"}
                justifyContent={"space-between"}
                w={"100%"}
              >
                {finish}
                <Checkbox
                  size={"sm"}
                  value={finish}
                  iconColor="orange"
                  borderColor={"blackAlpha.400"}
                  isChecked={selectedFinish.includes(finish)}
                  isDisabled={
                    finishes.length > 0 &&
                    !finishes.includes(finish) &&
                    cantFiltros > 0
                  }
                  // onChange={() =>
                  //   handleCheckboxChange(finish, setSelectedFinish, "finish")
                  // }
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
        onClick={handleAddToCart}
      >
        ADD SAMPLE
      </Button>
    </>
  );
};

export default SampleProductList;
