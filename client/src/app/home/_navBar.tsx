"use client";
import React, { useState } from 'react';
import { Box, Button, Flex, IconButton, useMediaQuery } from '@chakra-ui/react';
import NextImage from 'next/image';
import logo from "../assets/NaturalistoneLogo.png";
import { PiShoppingCartThin, PiUserCircleThin, PiHeartStraightThin } from 'react-icons/pi';
import { css } from '@emotion/react';
import './_navBar.css'

const NavBar: React.FC = () => {

  const [menuVisible, setMenuVisible] = useState(true)
  const [hover, setHover] = useState(false)

  const handleMenu =() => {
    setMenuVisible(!menuVisible)
  }

  const handleHome =() => {
    setMenuVisible(true)
    setHover(false)
  }

  const handleMouseEnter = () => {
    setHover(true);

  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const [smallerThan1400] = useMediaQuery("(max-width: 1400px)");
  const [smallerThan1120] = useMediaQuery("(max-width: 1120px)");
  const [smallerThan450] = useMediaQuery("(max-width: 450px)");
  // const [isMobile] = useMediaQuery("(max-width: 768px)");
  // const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      bg={menuVisible ? (hover ? 'white' : 'none') : 'white'}
      h={menuVisible ? '8vh' : '16vh'}
      alignContent="center"
      pr={'2vw'}
      pl={'2vw'}
      pt={'2vh'}
      pb={'2vh'}
      alignItems="center"
      justifyContent="space-between"
      flexDir={'column'}
      w="100vw"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Flex w="96vw" ml={'2vw'}mr={'2vw'} border={'0.5px solid red'} flexDir={smallerThan450 ? 'column' : 'row'}>
        <Flex h="2.5vh" w="12vw" mt={'1vh'} minW={'200px'} >
          <NextImage src={logo} alt="Logo" />
        </Flex>
        <Flex justifyContent="space-around" margin="auto" visibility={menuVisible ? 'unset' : 'hidden'} minW={'300px'}>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> NEW PRODUCTS </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> PRODUCTS </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> SALE </Button>
        </Flex>
        <Flex justifyContent="space-between" border={'0.5px solid yellow'} minW={'10px'}>
          <IconButton
            aria-label="Cart-icon"
            variant="unstyled"
            fontSize="3xl"
            icon={<PiShoppingCartThin />}
          />
          <IconButton
            aria-label="User-icon"
            variant="unstyled"
            fontSize="3xl"
            icon={<PiUserCircleThin />}
          />
          <IconButton
            aria-label="Heart-icon"
            variant="unstyled"
            fontSize="3xl"
            icon={<PiHeartStraightThin />}
          />
        </Flex>
        {
          menuVisible && (  
          <Flex ml="4vw">
            <Button fontSize="0.9rem" variant="unstyled" className="customButton" onClick={handleMenu}> MENU </Button>
          </Flex>
          )
        }
      </Flex>
      {
      !menuVisible && (
      <Flex w="96vw" ml={'2vw'}mr={'2vw'} border={'0.5px solid red'} justifyContent={'flex-end'}>
        <Flex w={'48vw'} justifyContent="space-between"  border={'0.5px solid blue'} minW={'500px'}>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton" onClick={handleHome}> HOME </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> ABOUT US </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> PROJECTS </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> PRODUCTS </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> SHOWS </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> OUR TEAM </Button>
          <Button fontSize="0.9rem" variant="unstyled" className="customButton"> CONTACT </Button>
        </Flex>
      </Flex>
    )}  
    </Flex> 
  );  
};  

