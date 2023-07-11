import HomeProductContainer from "@/app/home/_homeProductContainer";
import NavBar from "@/app/home/_navBar";
import Carousel from "./_carousel";

const cards = [
  "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1582913130063-8318329a94a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  // "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
];

const cards1 = [
  "https://media3.giphy.com/media/MUDBH3wJIOnHAtE3xM/giphy.gif?cid=ecf05e47asx5sp9gszouug0hy3nuavahme3lup8yrlf6pm8v&ep=v1_gifs_related&rid=giphy.gif&ct=g",
];

export default function Home() {
  return (
    <>
      <NavBar />
      <Carousel h={"800px"} mt={"-60px"} items={cards} hidden={false} />
      <Carousel h={"400px"} mt={"0px"} items={cards1} hidden={true} />
      <HomeProductContainer />
    </>
  );
}
