import React, {useState, useEffect} from 'react';
import {Text, Box, Center} from 'native-base';
import ScoreContainer from './ScoreContainer';

const AQICN_TOKEN = '00cf2c57afa2b16119f3a817d55cd49df5c5453c';

const AirQualityCard = ({city}) => {
  const [data, setData] = useState(null);
  const [bgColor, setBgColor] = useState('green.400');
  const [airQuality, setAirQuality] = useState('');
  const date = data?.data?.time?.s ? new Date(data.data.time.s) : null;
  const formattedDate = date
    ? `relevé du ${date.getDate()} ${date.toLocaleString('fr-FR', {
        month: 'long',
      })} à ${String(date.getHours()).padStart(2, '0')}h${String(
        date.getMinutes(),
      ).padStart(2, '0')}`
    : 'Date non disponible';

  useEffect(() => {
    const aqiColor = aqi => {
      if (aqi <= 50) {
        setBgColor('lime.700');
        setAirQuality('Bon');
      } else if (aqi <= 100) {
        setBgColor('yellow.400');
        setAirQuality('Modéré');
      } else if (aqi <= 150) {
        setBgColor('orange.400');
        setAirQuality('Mauvais');
      } else if (aqi <= 200) {
        setBgColor('red.700');
        setAirQuality('Nocif');
      } else if (aqi <= 300) {
        setBgColor('purple.800');
        setAirQuality('Très nocif');
      } else {
        setBgColor('yellow-900');
        setAirQuality('Dangereux');
      }
    };

    if (data && data.data) {
      aqiColor(data.data.aqi);
    }
  }, [data]);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.waqi.info/feed/${city}/?token=${AQICN_TOKEN}`,
    );
    const datas = await response.json();
    setData(datas);
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  return data && data.data ? (
    <>
      <Center>
        <Box
          w="80%"
          h="75%"
          bg="gray.100"
          borderWidth="6"
          borderColor={bgColor}
          borderRadius="md"
          p="4">
          <Center>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {city}
            </Text>
            <Text color="gray.800" fontSize="xs">
              {formattedDate}
            </Text>
            <Text fontSize="xl" color="gray.800" mt="4">
              Qualité de l'air :
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color={bgColor}>
              {airQuality}
            </Text>
          </Center>
          <Text>AQI: {data.data.aqi}</Text>
          <ScoreContainer aqi={data.data.aqi} bgColor={bgColor} />
        </Box>
      </Center>
    </>
  ) : (
    <Text>Loading...</Text>
  );
};

export default AirQualityCard;
