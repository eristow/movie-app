import { Fragment, useEffect, useState } from 'react';
import {
  Text,
  HStack,
  SimpleGrid,
  Input,
  Button,
  Container,
  Flex,
  useColorModeValue,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';

import MovieDetails from './MovieDetails';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const PAGE_VALUES = {
  same: 0,
  next: 1,
  prev: 2,
};

const TEXT_SHADOW =
  '  0.05em 0 black, 0 0.05em black, -0.05em 0 black, 0 -0.05em black, -0.05em -0.05em black, -0.05em 0.05em black, 0.05em -0.05em black, 0.05em 0.05em black;';

function Movie() {
  const borderColor = useColorModeValue('gray.200', 'gray.900');
  const [service, setService] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [response, setResponse] = useState({});
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchService = async whichPage => {
    let newPage = page;

    if (whichPage !== PAGE_VALUES.same) {
      if (whichPage === PAGE_VALUES.next) {
        newPage = page + 1;
        setPage(newPage);
      } else if (whichPage === PAGE_VALUES.prev) {
        newPage = page - 1;
        setPage(newPage);
      }
    }

    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${newPage}`
    );
    const res = await data.json();
    console.log(res);
    console.log(res.results);
    setResponse(res);
    setMovies(res.results);
  };

  const openModal = movie => {
    setSelectedMovie(movie);
    onOpen();
  };

  useEffect(() => {
    searchService(PAGE_VALUES.same);
  }, []);

  return (
    <Fragment>
      <Container>
        <HStack
          align="center"
          justifyContent="center"
          spacing={8}
          marginBottom={10}
        >
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
          {movies && movies.length > 0 ? (
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
                cursor="pointer"
                _hover={{ transform: 'scale(1.1)' }}
                onClick={() => openModal(movie)}
              >
                <Text textShadow={TEXT_SHADOW} color="white" align="center">
                  {movie.title}
                </Text>
              </Flex>
            ))
          ) : (
            <Heading>Loading...</Heading>
          )}
        </SimpleGrid>
        <HStack
          align="center"
          justifyContent="center"
          spacing={8}
          marginTop={5}
        >
          {response.page !== 1 && (
            <Button onClick={() => searchService(PAGE_VALUES.prev)}>
              {'<'}
            </Button>
          )}
          <Text>{response.page}</Text>
          {response.page !== response.total_pages && (
            <Button onClick={() => searchService(PAGE_VALUES.next)}>
              {'>'}
            </Button>
          )}
        </HStack>
      </Container>
      <MovieDetails isOpen={isOpen} onClose={onClose} movie={selectedMovie} />
    </Fragment>
  );
}

export default Movie;
