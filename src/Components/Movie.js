import { useEffect, useState } from 'react';
import {
  Text,
  HStack,
  SimpleGrid,
  Input,
  Button,
  Container,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const TEXT_SHADOW =
  '  0.05em 0 black, 0 0.05em black, -0.05em 0 black, 0 -0.05em black, -0.05em -0.05em black, -0.05em 0.05em black, 0.05em -0.05em black, 0.05em 0.05em black;';

const Movie = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.900');
  const [service, setService] = useState('');
  const [movies, setMovies] = useState([]);
  const [response, setResponse] = useState({});

  const searchService = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    const response = await data.json();
    console.log(response);
    console.log(response.results);
    setResponse(response);
    setMovies(response.results);
  };

  useEffect(() => {
    searchService();
  }, []);

  return (
    <Container>
      <HStack spacing={8} marginBottom={10}>
        <Text>Search</Text>
        <Input
          size="md"
          maxWidth="50%"
          value={service}
          onChange={e => setService(e.target.value)}
        />
        <Button onClick={searchService}>Submit</Button>
      </HStack>
      <SimpleGrid minChildWidth="120px" spacing={10}>
        {movies &&
          movies.length > 0 &&
          movies.map(movie => (
            <Flex
              key={movie.id}
              justifyContent="center"
              alignItems="center"
              borderRadius="5px"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="xl"
              padding={2}
              bgImage={`url(https://image.tmdb.org/t/p/w185${movie.poster_path})`}
              bgPosition="center"
              bgRepeat="no-repeat"
              _hover={{ transform: 'scale(1.1)' }}
            >
              <Text textShadow={TEXT_SHADOW} color="white" align="center">
                {movie.title}
              </Text>
            </Flex>
          ))}
      </SimpleGrid>
    </Container>
  );
};

export default Movie;
