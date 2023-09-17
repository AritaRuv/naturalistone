import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { IShowMenu } from "@/interfaces/profile";
import { useAppSelector } from "@/store/hooks";
import { LoginState } from "@/store/login/typeLogin";
import { FavoritesState } from "@/store/favorites/typesFavorites";
import ProductCard from "@/components/productCard/_productCard";

const Favorites: React.FC<IShowMenu> = () => {
  
  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );
  const { favorites } = useAppSelector(
    (state: { favoritesReducer: FavoritesState }) => state.favoritesReducer
  );


  return (
    <>
      <Box pl={"5vw"} w={"75vw"}>
        <Box
          display={"flex"}
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"baseline"}
        >
          <Text textTransform={"uppercase"} fontSize={"1.9rem"}>
            MY FAVORITES
          </Text>

        </Box>
        <SimpleGrid
          mt={"5vh"}
          overflow={"auto"}
          h={"40vh"}
          columns={4}
          gap={3}
        >
          {
            (typeof favorites !== "string" && favorites.length > 0) ? (
              favorites.map((prod, i) => {
                return (
                  <Box key={i}>
                    <ProductCard product={prod} user={user} key={i} />
                  </Box>);
              })) : (
              <Text>No favorites</Text>
            )
          }
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Favorites;
