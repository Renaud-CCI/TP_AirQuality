import React from 'react';
import {Box, Center} from 'native-base';

const ScoreContainer = ({aqi, bgColor}) => {
  // Convertir aqi en pourcentage pour la largeur de la div
  // Vous pouvez ajuster cette logique en fonction de vos besoins
  const width = Math.min(100, aqi);

  return (
    <Center w="100%" h="20px" bg="danger.500" style={{borderRadius: 50}}>
      <Box w={`${width}%`} bg={bgColor} h="18px" style={{borderRadius: 50}} />
    </Center>
  );
};

export default ScoreContainer;
