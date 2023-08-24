import { Box, Checkbox, CheckboxGroup, VStack, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postCart } from "@/store/cart/actionsCart";
import { ProductState } from "@/store/products/typesProducts";

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

  const [selectedThickness, setSelectedThickness] = useState<string>("");
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [thicknesses, setThicknesses] = useState<string[]>([]);
  const [finishes, setFinishes] = useState<string[]>([]);
  const [cantFiltros, setCantFiltros] = useState<number>(0);

  const { raw_products } = useAppSelector(
    (state: { productReducer: ProductState }) => state.productReducer
  );

  const handleCheckboxChange = (value: string, setState: React.Dispatch<React.SetStateAction<string>>, name: string) => {

    //filtro raw_products por ProdNameID
    const result = raw_products.filter((prod) => prod.ProdNameID === ProdNameID);
    setState(prevState => prevState === value ? "" : value);

    // //creo un array igual que result 
    let resultadoFiltrado = result;

    if (name === "finish") {
      //si se selecciono (checkeo) un finish filtro por el finish seleccionado
      if (selectedFinish.length === 0) {
        setCantFiltros(cantFiltros + 1);
        setSelectedFinish(value);
        resultadoFiltrado = result.filter((prod) => prod.Finish === value);
      }
      else {
        setSelectedFinish("");
        setCantFiltros(cantFiltros - 1);
      }

      //si previamente se selecciono un thickness, el array filtrado o no por finish, se filtra por thickness

      if (selectedThickness) {
        resultadoFiltrado = resultadoFiltrado.filter((prod) => prod.Thickness === selectedThickness);
      }

      //recorro los  productos filtrados y si los thickness no son null
      // los agrego a la coleccion de thickness disponibles(thicknessMatches)
      //terminado el recorrido los seteo en el estado seTthickness

      const thicknessMatches: string[] = [];
      for (let index = 0; index < resultadoFiltrado.length; index++) {
        const element: string = resultadoFiltrado[index].Thickness;
        if (element != null)
          thicknessMatches.push(element);
        setThicknesses(thicknessMatches);
      }

    }

    if (name === "thickness") {

      if (selectedThickness.length === 0) {
        setSelectedThickness(value);
        setCantFiltros(cantFiltros + 1);
        resultadoFiltrado = result.filter((prod) => prod.Thickness === value);
      }
      else {
        setCantFiltros(cantFiltros - 1);
        setSelectedThickness("");
      }

      if (selectedFinish) {
        resultadoFiltrado = resultadoFiltrado.filter((prod) => prod.Finish === selectedFinish);
      }

      const aux: string[] = [];
      for (let index = 0; index < resultadoFiltrado.length; index++) {
        const element: string = resultadoFiltrado[index].Finish;
        if (element != null)
          aux.push(element);
        setFinishes(aux);
      }

    }


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

        <CheckboxGroup value={[selectedFinish]} colorScheme='whiteAlpha'>
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
                  isDisabled={finishes.length > 0 && !finishes.includes(finish) && cantFiltros > 0}
                  onChange={() => handleCheckboxChange(finish, setSelectedFinish, "finish")}
                />
              </Box>
            ))}
          </VStack>
        </CheckboxGroup>

        <CheckboxGroup colorScheme='whiteAlpha' value={[selectedThickness]}>
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
                  onChange={() => handleCheckboxChange(thickness, setSelectedThickness, "thickness")}
                  isDisabled={thicknesses.length > 0 && !thicknesses.includes(thickness) && cantFiltros > 0}
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
