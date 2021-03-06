import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import Movies from './Components/Movie';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Movies />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
