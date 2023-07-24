"use client"
import React from 'react';
import NextImage from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import img from '../../../public/surface-of-the-white-stone-texture-rough-gray-white-tone-use-this-for-wallpaper-or-background-image-there-is-a-blank-space-for-text-free-photo.jpg'

export const ContactImage = () => {
  return(
    <Box h={'40vh'} position={'relative'} top={'-8vh'}>
      <NextImage fill objectFit={'cover'} src={img} alt='img'/>
      <Text position={'relative'} textAlign={'center'} top={'25vh'} w={'20vw'} left={'40vw'} fontSize={'2rem'} fontWeight={'thin'}>CONTACT US</Text>
    </Box>
  )
}