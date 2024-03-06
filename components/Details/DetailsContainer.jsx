import * as React from 'react';
import {Box, Text, Input} from 'native-base';
import {Icon} from '@rneui/themed';

function DetailsContainer() {
  const [data, setData] = React.useState(null);
  const AQICN_TOKEN = '00cf2c57afa2b16119f3a817d55cd49df5c5453c';
  const [city, setCity] = React.useState('');
  const [inputedCity, setInputedCity] = React.useState('Roanne, France');
  const [errorMessage, setErrorMessage] = React.useState(''); // Ajoutez cet état

  const fetchData = async () => {
    const response = await fetch(
      `https://api.waqi.info/feed/${city}/?token=${AQICN_TOKEN}`,
    );
    const datas = await response.json();
    setData(datas);
    console.log(datas);
  };

  React.useEffect(() => {
    fetchData();
  }, [city]);

  React.useEffect(() => {
    if (inputedCity) {
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `https://api.waqi.info/search/?token=${AQICN_TOKEN}&keyword=${inputedCity}`,
          );
          const result = await response.json();
          setCity(result.data[0].station.name);
          setErrorMessage(null);
        } catch (error) {
          setCity('Roanne, France');
          setErrorMessage('pas de données pour la ville saisie.');
        }
      };

      fetchCities();
    }
  }, [inputedCity]);

  return (
    <Box safeArea flex={1} p="2" w="90%" mx="auto">
      <Box>
        <Input
          value={inputedCity}
          onChangeText={setInputedCity}
          placeholder="Enter city"
        />
        <Icon name="rowing" />
        {errorMessage && <Text color="danger.800">{errorMessage}</Text>}{' '}
        {/* Affichez le message d'erreur ici */}
      </Box>
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
