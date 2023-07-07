import React, { useState } from 'react';
import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import NextImage from 'next/image';
import logo from '../../assets/NaturalistoneLogo.png';
import { PiShoppingCartThin, PiUserCircleThin, PiHeartStraightThin } from 'react-icons/pi';
import { css } from '@emotion/react';

const NavBar: React.FC = () => {


  const [menuVisible, setMenuVisible] = useState(true)

  const handleMenu =() => {
    setMenuVisible(!menuVisible)
  }

  const handleHome =() => {
    setMenuVisible(true)
  }

  return (
    <Flex
      bg="white"
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
    >
      <Flex w="96vw" ml={'2vw'}mr={'2vw'}>
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
        <Flex w="8vw" justifyContent="space-between">
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
      <Flex w="47vw" ml={'50vw'} mr={'2vw'} justifyContent="space-between" justifySelf={'flex-end'}>
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
    )}
    </Flex>
  );
};

export default NavBar;
