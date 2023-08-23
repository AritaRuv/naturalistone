import { Box, Text, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import { IShowMenu } from "./page";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userInfo } from "@/store/login/actionsLogin";
import { LoginState } from "@/store/login/typeLogin";
import { fetchFavorites } from "@/store/favorites/actionsFavorites";
import { FavoritesState } from "@/store/favorites/typesFavorites";
import ProductCard from "@/components/productCard/_productCard";

const Favorites: React.FC<IShowMenu> = () => {
  
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(
    (state: { loginReducer: LoginState }) => state.loginReducer
  );
  const { favorites } = useAppSelector(
    (state: { favoritesReducer: FavoritesState }) => state.favoritesReducer
  );

  useEffect(() => {
    if(user && !favorites)dispatch(userInfo());
    if(user && !favorites.length)dispatch(fetchFavorites(user.CustomerID));
  }, [user, favorites]);

  const [isSmallerThan1520] = useMediaQuery("(max-width: 1520px)");

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
          {favorites.length != 0 &&
            favorites.map((prod, i) => {
              return (
                <Box key={i}>
                  <ProductCard product={prod} user={user} key={i} />
                </Box>);
            })}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Favorites;
