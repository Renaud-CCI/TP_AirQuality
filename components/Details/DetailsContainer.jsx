import * as React from 'react';
import {Box, Text} from 'native-base';
import CitySearch from './DetailsComponents/CitySearchComponent';

function DetailsContainer() {
  const [data, setData] = React.useState(null);
  const AQICN_TOKEN = '00cf2c57afa2b16119f3a817d55cd49df5c5453c';
  const [city, setCity] = React.useState('');

  const fetchData = async () => {
    const response = await fetch(
      `https://api.waqi.info/feed/${city}/?token=${AQICN_TOKEN}`,
    );
    const datas = await response.json();
    setData(datas);
  };

  React.useEffect(() => {
    fetchData();
  }, [city]);

  return (
    <Box safeArea flex={1} p="2" w="90%" mx="auto">
      <CitySearch onCityChange={setCity} />
      {data && data.data ? (
        <Text>AQI: {data.data.aqi}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
      {data && data.data ? <Text>City: {city}</Text> : <Text>Loading...</Text>}
    </Box>
  );
}

export default DetailsContainer;
