import React from 'react';
import NextImage from 'next/image';
import { Box, Text } from '@chakra-ui/react';
import img from '../../../public/surface-of-the-white-stone-texture-rough-gray-white-tone-use-this-for-wallpaper-or-background-image-there-is-a-blank-space-for-text-free-photo.jpg'

export const ContactImage = () => {
  return(
    <Box h={'40vh'} >
      <NextImage fill objectFit={'cover'} src={img} alt='img'/>
      <Text>CONTACT US</Text>
    </Box>
  )
}