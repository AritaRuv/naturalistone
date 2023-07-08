import React, { useState } from 'react';
import { Box, Button, Flex, IconButton, useMediaQuery } from '@chakra-ui/react';
import NextImage from 'next/image';
import logo from '../../assets/NaturalistoneLogo.png';
import { PiShoppingCartThin, PiUserCircleThin, PiHeartStraightThin } from 'react-icons/pi';
import { css } from '@emotion/react';

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
      <Flex w="96vw" ml={'2vw'}mr={'2vw'} border={'0.5px solid red'}>
        <Flex h="2.5vh" w="12vw" mt={'1vh'}>
          <NextImage src={logo} alt="Logo" />
        </Flex>
        <Flex w="32vw" justifyContent="space-around" margin="auto" visibility={menuVisible ? 'unset' : 'hidden'}>
          <Button
            fontSize="sm"
            variant="unstyled"
            css={css`
              position: relative;
              font-weight: normal;
              text-decoration: none;
              &:hover {
                &::before {
                  content: '';
                  position: absolute;
                  width: calc(24px);
                  height: 2px;
                  background-color: black;
                  bottom: 0;
                  left: 0;
                  transform-origin: center;
                  animation: underline 0.3s ease forwards;
                }
              }
              @keyframes underline {
                0% {
                  transform: scaleX(0);
                }
                50% {
                  transform: scaleX(1);
                }
                100% {
                  transform: scaleX(1);
                }
              }
            `}
          >
            NEW PRODUCTS
          </Button>
          <Button
            fontSize="sm"
            variant="unstyled"
            css={css`
              position: relative;
              font-weight: normal;
              text-decoration: none;
              display: inline-block;
              &:hover {
                &::before {
                  content: '';
                  position: absolute;
                  width: 100%;
                  height: 2px;
                  background-color: black;
                  bottom: -2px;
                  left: 0;
                  transform: scaleX(0);
                  transform-origin: center;
                  transition: transform 0.3s ease;
                }
                &:hover::before {
                  transform: scaleX(1);
                }
              }
            `}
          >
            PRODUCTS
          </Button>
          <Button
            fontSize="sm"
            variant="unstyled"
            css={css`
              position: relative;
              font-weight: normal;
              text-decoration: none;
              &:hover {
                &::before {
                  content: '';
                  position: absolute;
                  width: calc(100% - 1vh);
                  height: 2px;
                  background-color: black;
                  bottom: 0;
                  left: 0;
                  transform-origin: left;
                  animation: underline 0.3s ease forwards;
                }
              }
              @keyframes underline {
                0% {
                  transform: scaleX(0);
                }
                50% {
                  transform: scaleX(1);
                }
                100% {
                  transform: scaleX(1);
                }
              }
            `}
          >
            SALE
          </Button>
        </Flex>
        <Flex w="8vw" justifyContent="space-between" border={'0.5px solid red'} minW={'12px'}>
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
            <Button 
              fontSize="sm" 
              variant="unstyled" 
              onClick={handleMenu}            
              css={css`
                position: relative;
                font-weight: normal;
                text-decoration: none;
                &:hover {
                  &::before {
                    content: '';
                    position: absolute;
                    width: calc(100% - 1vh);
                    height: 0.5px;
                    background-color: black;
                    bottom: 0;
                    left: 0;
                    transform-origin: center;
                    animation: underline 0.3s ease forwards;
                  }
                }
                @keyframes underline {
                  0% {
                    transform: scaleX(0);
                  }
                  50% {
                    transform: scaleX(1);
                  }
                  100% {
                    transform: scaleX(1);
                  }
                }
                `}>
                MENU
            </Button>
          </Flex>
          )
        }
      </Flex>
      {
      !menuVisible && (
      <Flex w="96vw" ml={'2vw'}mr={'2vw'} border={'0.5px solid red'}>
        <Flex w="47vw" ml={'50vw'}justifyContent="space-between" justifySelf={'flex-end'} border={'0.5px solid red'}>
          <Button
            fontSize="sm"
            variant="unstyled"
            onClick={handleHome}
            css={css`
              position: relative;
              font-weight: normal;
              text-decoration: none;
              &:hover {
                &::before {
                  content: '';
                  position: absolute;
                  width: calc(100% - 1vh);
                  height: 2px;
                  background-color: black;
                  bottom: 0;
                  left: 0;
                  transform-origin: left;
                  animation: underline 0.3s ease forwards;
                }
              }
              @keyframes underline {
                0% {
                  transform: scaleX(0);
                }
                50% {
                  transform: scaleX(1);
                }
                100% {
                  transform: scaleX(1);
                }
              }
            `}
            >
            HOME
          </Button>
          <Button
            fontSize="sm"
            variant="unstyled"
            css={css`
              position: relative;
              font-weight: normal;
              text-decoration: none;
              &:hover {
                &::before {
                  content: '';
                  position: absolute;
                  width: calc(100% - 1vh);
                  height: 2px;
                  background-color: black;
                  bottom: 0;
                  left: 0;
                  transform-origin: left;
                  animation: underline 0.3s ease forwards;
                }
              }
              @keyframes underline {
                0% {
                  transform: scaleX(0);
                }
                50% {
                  transform: scaleX(1);
                }
                100% {
                  transform: scaleX(1);
                }
              }
            `}
            >
              ABOUT US
          </Button>
          <Button
            fontSize="sm"
            variant="unstyled"
            css={css`
              position: relative;
              font-weight: normal;
              text-decoration: none;
              &:hover {
                &::before {
                  content: '';
                  position: absolute;
                  width: calc(100% - 1vh);
                  height: 2px;
                  background-color: black;
                  bottom: 0;
                  left: 0;
                  transform-origin: left;
                  animation: underline 0.3s ease forwards;
                }
              }
              @keyframes underline {
                0% {
                  transform: scaleX(0);
                }
                50% {
                  transform: scaleX(1);
                }
                100% {
                  transform: scaleX(1);
                }
              }
            `}
            >
              PROJECTS
          </Button>
          <Button
            fontSize="sm"
            variant="unstyled"
            css={css`
              position: relative;
              font-weight: normal;
              text-decoration: none;
              &:hover {
                &::before {
                  content: '';
                  position: absolute;
                  width: calc(100% - 1vh);
                  height: 2px;
                  background-color: black;
                  bottom: 0;
                  left: 0;
                  transform-origin: left;
                  animation: underline 0.3s ease forwards;
                }
              }
              @keyframes underline {
                0% {
                  transform: scaleX(0);
                }
                50% {
                  transform: scaleX(1);
                }
                100% {
                  transform: scaleX(1);
                }
              }
            `}
            >
              PRODUCTS
          </Button>
          <Button
            fontSize="sm"
            variant="unstyled"
            css={css`
              position: relative;
              font-weight: normal;
              text-decoration: none;
              &:hover {
                &::before {
                  content: '';
                  position: absolute;
                  width: calc(100% - 1vh);
                  height: 2px;
                  background-color: black;
                  bottom: 0;
                  left: 0;
                  transform-origin: left;
                  animation: underline 0.3s ease forwards;
                }
              }
              @keyframes underline {
                0% {
                  transform: scaleX(0);
                }
                50% {
                  transform: scaleX(1);
                }
                100% {
                  transform: scaleX(1);
                }
              }
            `}
            >
            SHOWS
          </Button>
          <Button
            fontSize="sm"
            variant="unstyled"
            css={css`
              position: relative;
              font-weight: normal;
              text-decoration: none;
              &:hover {
                &::before {
                  content: '';
                  position: absolute;
                  width: calc(100% - 1vh);
                  height: 2px;
                  background-color: black;
                  bottom: 0;
                  left: 0;
                  transform-origin: left;
                  animation: underline 0.3s ease forwards;
                }
              }
              @keyframes underline {
                0% {
                  transform: scaleX(0);
                }
                50% {
                  transform: scaleX(1);
                }
                100% {
                  transform: scaleX(1);
                }
              }
            `}
            >
              OUR TEAM
          </Button>
          <Button
            fontSize="sm"
            variant="unstyled"
            css={css`
              position: relative;
              font-weight: normal;
              text-decoration: none;
              &:hover {
                &::before {
                  content: '';
                  position: absolute;
                  width: calc(100% - 1vh);
                  height: 2px;
                  background-color: black;
                  bottom: 0;
                  left: 0;
                  transform-origin: left;
                  animation: underline 0.3s ease forwards;
                }
              }
              @keyframes underline {
                0% {
                  transform: scaleX(0);
                }
                50% {
                  transform: scaleX(1);
                }
                100% {
                  transform: scaleX(1);
                }
              }
            `}
            >
            CONTACT
          </Button>
        </Flex>
      </Flex>
    )}  
    </Flex> 
  );  
};  

export default NavBar;
