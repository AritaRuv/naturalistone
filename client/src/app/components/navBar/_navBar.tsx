import React from 'react';
import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import NextImage from 'next/image';
import logo from '../../assets/NaturalistoneLogo.png';
import { PiShoppingCartThin, PiUserCircleThin, PiHeartStraightThin } from 'react-icons/pi';
import { css } from '@emotion/react';

const NavBar: React.FC = () => {
  return (
    <Flex
      bg="white"
      w="100vw"
      h="8vh"
      alignContent="center"
      pr="2vw"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex h="3vh" w="12vw">
        <NextImage src={logo} alt="Logo" />
      </Flex>
      <Flex w="32vw" justifyContent="space-around" margin="auto">
        <Button
          fontSize="xs"
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
          fontSize="xs"
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
                transform-origin: right;
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
          fontSize="xs"
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
          SALE</Button>
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
      <Flex ml="4vw">
        <Button fontSize="xs" variant="unstyled">
          MENU
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
