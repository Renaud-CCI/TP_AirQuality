import * as React from 'react';
import {Box, Text} from 'native-base';

function DetailsContainer() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.waqi.info/feed/shanghai/?token=${process.env.AQICN_TOKEN}`,
      );
      setData(await response.json());
    };

    fetchData();
  }, []);

  return (
    <Box safeArea flex={1} p="2" w="90%" mx="auto">
      {data ? <Text>AQI: {data.data.aqi}</Text> : <Text>Loading...</Text>}
    </Box>
  );
}

export default DetailsContainer;
