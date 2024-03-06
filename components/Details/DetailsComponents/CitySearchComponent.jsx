import React, {useState, useEffect} from 'react';
import {Box, Input, Text, SearchIcon, HStack} from 'native-base';

const CitySearch = ({onCityChange}) => {
  const [inputedCity, setInputedCity] = useState('Roanne, France');
  const [city, setCity] = React.useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const AQICN_TOKEN = '00cf2c57afa2b16119f3a817d55cd49df5c5453c';

  useEffect(() => {
    let timeoutId;

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

      // Clear the previous timeout if there is one
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout
      timeoutId = setTimeout(fetchCities, 500);
    }

    // Clean up function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [inputedCity]);

  useEffect(() => {
    onCityChange(city);
  }, [city, onCityChange]);

  return (
    <Box my="6">
      <HStack space={2} alignItems="center">
        <Box w="10%">
          <SearchIcon size="5" color="emerald.500" />
        </Box>
        <Input
          w="90%"
          value={inputedCity}
          onChangeText={setInputedCity}
          placeholder="Enter city"
        />
      </HStack>
      {errorMessage && <Text color="danger.800">{errorMessage}</Text>}
    </Box>
  );
};

export default CitySearch;
