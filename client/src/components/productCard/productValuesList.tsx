import {
  Box,
  Checkbox,
  CheckboxGroup,
  HStack,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postCart } from "@/store/cart/actionsCart";
import { ProductState } from "@/store/products/typesProducts";
import { LoginState } from "@/store/login/typeLogin";
import CartButton from "../navBar/cartButton";
import { AppContext } from "@/app/appContext";
import { IProductCart } from "../../utils/types";
import axios from "axios";

interface ProductListProps {
  data: {
    [key: string]: {
      size: string[];
      thickness: string[];
      finish: string[];
      prodNameID: number;
    };
  };
  ProdNameID: number;
}

const ProductList: React.FC<ProductListProps> = ({ data, ProdNameID }) => {
  const dispatch = useAppDispatch();
  const { size, thickness, finish } = data[ProdNameID];

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedThickness, setSelectedThickness] = useState<string>("");
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [thicknesses, setThicknesses] = useState<string[]>([]);
  const [finishes, setFinishes] = useState<string[]>([]);
  const [cantFiltros, setCantFiltros] = useState<number>(0);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const appContext = useContext(AppContext);

  const { raw_products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );

  const handleCheckboxChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
    name: string
  ) => {
    //filtro raw_products por ProdNameID
    const result = raw_products.filter(
      (prod) => prod.ProdNameID === ProdNameID
    );
    setState((prevState) => (prevState === value ? "" : value));

    //creo un array igual que result
    let resultadoFiltrado = result;

    if (name === "finish") {
      //si se selecciono (checkeo) un finish filtro por el finish seleccionado
      if (selectedFinish.length === 0) {
        setCantFiltros(cantFiltros + 1);
        setSelectedFinish(value);
        resultadoFiltrado = result.filter((prod) => prod.Finish === value);
      } else {
        setSelectedFinish("");
        setCantFiltros(cantFiltros - 1);
      }
      //si previamente se selecciono un size, el array filtrado o no por finish, se filtra por size
      if (selectedSize) {
        resultadoFiltrado = resultadoFiltrado.filter(
          (prod) => prod.Size === selectedSize
        );
      }
      //si previamente se selecciono un thickness, el array filtrado o no por finish, se filtra por thickness

      if (selectedThickness) {
        resultadoFiltrado = resultadoFiltrado.filter(
          (prod) => prod.Thickness === selectedThickness
        );
      }

      //recorro los  productos filtrados y si los sizes no son null
      // los agrego a la coleccion de sizes disponibles(sizesMatches)
      //terminado el recorrido los seteo en el estado setSizes

      const sizesMatches: string[] = [];
      for (let index = 0; index < resultadoFiltrado.length; index++) {
        const element: string = resultadoFiltrado[index].Size;
        if (element != null) sizesMatches.push(element);
        setSizes(sizesMatches);
      }
      //lo mismo hago con thickness

      const thicknessMatches: string[] = [];
      for (let index = 0; index < resultadoFiltrado.length; index++) {
        const element: string = resultadoFiltrado[index].Thickness;
        if (element != null) thicknessMatches.push(element);
        setThicknesses(thicknessMatches);
      }
    }
    if (name === "size") {
      if (selectedSize.length === 0) {
        setSelectedSize(value);
        setCantFiltros(cantFiltros + 1);
        resultadoFiltrado = result.filter((prod) => prod.Size === value);
      } else {
        setSelectedSize("");
        setCantFiltros(cantFiltros - 1);
      }
      if (selectedFinish) {
        resultadoFiltrado = resultadoFiltrado.filter(
          (prod) => prod.Finish === selectedFinish
        );
      }
      if (selectedThickness) {
        resultadoFiltrado = resultadoFiltrado.filter(
          (prod) => prod.Thickness === selectedThickness
        );
      }
      setFinishes([]);
      const aux: string[] = [];
      for (let index = 0; index < resultadoFiltrado.length; index++) {
        const element: string = resultadoFiltrado[index].Finish;
        if (element != null) aux.push(element);
        setFinishes(aux);
      }
      const aux2: string[] = [];

      for (let index = 0; index < resultadoFiltrado.length; index++) {
        const element: string = resultadoFiltrado[index].Thickness;
        if (element != null) aux2.push(element);
        setThicknesses(aux2);
      }
    }
    if (name === "thickness") {
      if (selectedThickness.length === 0) {
        setSelectedThickness(value);
        setCantFiltros(cantFiltros + 1);
        resultadoFiltrado = result.filter((prod) => prod.Thickness === value);
      } else {
        setCantFiltros(cantFiltros - 1);
        setSelectedThickness("");
      }

      if (selectedFinish) {
        resultadoFiltrado = resultadoFiltrado.filter(
          (prod) => prod.Finish === selectedFinish
        );
      }
      if (selectedSize) {
        resultadoFiltrado = resultadoFiltrado.filter(
          (prod) => prod.Size === selectedSize
        );
      }
      const aux: string[] = [];
      for (let index = 0; index < resultadoFiltrado.length; index++) {
        const element: string = resultadoFiltrado[index].Finish;
        if (element != null) aux.push(element);
        setFinishes(aux);
      }
      const aux2: string[] = [];

      for (let index = 0; index < resultadoFiltrado.length; index++) {
        const element: string = resultadoFiltrado[index].Size;
        if (element != null) aux2.push(element);
        setSizes(aux2);
      }
    }
  };

  const [array, setArray] = useState([]);

  const handleAddToCart = async () => {
    if (appContext && appContext.userLog) {
      const bodyCust = {
        size: selectedSize,
        thickness: selectedThickness,
        finish: selectedFinish,
        ProdNameID: ProdNameID,
        customerID: user?.CustomerID,
      };
      dispatch(postCart(bodyCust));
    } else {
      const product = raw_products.find((product) => {
        return (
          product.ProdNameID === ProdNameID &&
          product.Size === selectedSize &&
          product.Thickness === selectedThickness &&
          product.Finish === selectedFinish
        );
      });
      const productNotLogin = {
        ...product,
        CustomerID: 0,
        idCartEntry: 0,
        Quantity: 1,
      };
      const arrayProducts = JSON.parse(
        localStorage.getItem("cartProducts") || "[]"
      );
      const newArray: any = [...arrayProducts];
      newArray.push(productNotLogin);
      setArray(newArray);
      arrayProducts.push(productNotLogin);
      localStorage.setItem("cartProducts", JSON.stringify(arrayProducts));
    }
    setSelectedSize("");
    setSelectedThickness("");
    setSelectedFinish("");
    setTimeout(() => {
      setIsCartModalOpen(true);
    }, 1000);
  };

  return (
    <>
      <HStack align="start" spacing={1} w={"100%"} mb={"4%"}>
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
                w={"60px"}
              >
                {finish}
                <Checkbox
                  size={"sm"}
                  value={finish}
                  iconColor="orange"
                  borderColor={"blackAlpha.600"}
                  isChecked={selectedFinish === finish}
                  isDisabled={
                    finishes.length > 0 &&
                    !finishes.includes(finish) &&
                    cantFiltros > 0
                  }
                  onChange={() =>
                    handleCheckboxChange(finish, setSelectedFinish, "finish")
                  }
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>
        <CheckboxGroup colorScheme="whiteAlpha" value={[selectedSize]}>
          <VStack align="start" w={"80px"}>
            <Text fontSize="0.7rem" fontWeight={"semibold"}>
              SIZE
            </Text>
            {size.map((size) => (
              <Box
                key={size}
                fontSize={"0.7rem"}
                display={"flex"}
                justifyContent={"space-between"}
                w={"60px"}
              >
                {size}
                <Checkbox
                  size={"sm"}
                  value={size}
                  iconColor="orange"
                  borderColor={"blackAlpha.600"}
                  isChecked={selectedSize === size}
                  isDisabled={
                    sizes.length > 0 && !sizes.includes(size) && cantFiltros > 0
                  }
                  onChange={() =>
                    handleCheckboxChange(size, setSelectedSize, "size")
                  }
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>
        <CheckboxGroup colorScheme="whiteAlpha" value={[selectedThickness]}>
          <VStack align="start" w={"80px"}>
            <Text fontSize="0.7rem" fontWeight={"semibold"}>
              THICKNESS
            </Text>
            {thickness.map((thickness) => (
              <Box
                key={thickness}
                fontSize={"0.7rem"}
                display={"flex"}
                justifyContent={"space-between"}
                w={"60px"}
              >
                {thickness}
                <Checkbox
                  size={"sm"}
                  value={thickness}
                  iconColor="orange"
                  borderColor={"blackAlpha.600"}
                  isChecked={selectedThickness === thickness}
                  onChange={() =>
                    handleCheckboxChange(
                      thickness,
                      setSelectedThickness,
                      "thickness"
                    )
                  }
                  isDisabled={
                    thicknesses.length > 0 &&
                    !thicknesses.includes(thickness) &&
                    cantFiltros > 0
                  }
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
        onClick={handleAddToCart}
      >
        ADD TO CART
      </Button>
      <CartButton
        icon={false}
        isCartModalOpen={isCartModalOpen}
        setIsCartModalOpen={setIsCartModalOpen}
        sample={false}
        array={array}
      />
    </>
  );
};

export default ProductList;
