"use"
import React from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';
import { SocialMediaButtons, SocialMediaButtonsType } from './socialMediaIButtons';
import { PiInstagramLogoThin, PiFacebookLogoThin, PiMapPinThin, PiWhatsappLogoThin } from 'react-icons/pi';


export const SocialMediaContainer = () => {

  const socialMedia = [
    {name: 'HEADQUARTERS', icon: PiMapPinThin, content: '261 NW 71st St, Miami, FL 33150, United States'},
    {name: 'INSTAGRAM', icon: PiInstagramLogoThin, content: ''},
    {name: 'FACEBOOK', icon: PiFacebookLogoThin, content: ''},
    {name: 'CHAT WITH US', icon: PiWhatsappLogoThin, content: ''}
  ]
  return(
    <Grid w={'100vw'} py={'2vh'} px={'5vw'} column={4} display={'flex'} justifyContent={'space-around'} position={'relative'}>
      {
        socialMedia.map((b, i) => {
          return(
            <SocialMediaButtons name={b.name} icon={b.icon} content={b.content} id={i}/>
          )
        })
      }
    </Grid>
  )
}