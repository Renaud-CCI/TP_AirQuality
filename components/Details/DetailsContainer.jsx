import * as React from 'react';
import {Box} from 'native-base';
import CitySearch from './DetailsComponents/CitySearchComponent';
import AirQualityCard from './DetailsComponents/AirQualityCard';

function DetailsContainer() {
  const [city, setCity] = React.useState('');

  return (
    <Box safeArea flex={1} p="2" w="90%" mx="auto">
      <CitySearch onCityChange={setCity} />
      <AirQualityCard city={city} />
    </Box>
  );
}

export default DetailsContainer;
