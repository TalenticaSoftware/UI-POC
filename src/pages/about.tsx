import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ABOUT_DATA } from '../data/aboutPageData.ts';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxW='container.lg' as='main' mt={8}>
      <VStack spacing={8} align='start' textAlign='start'>
        <Heading size='2xl'>{ABOUT_DATA.title}</Heading>
        <Text fontSize='lg' color='gray.600'>
          {ABOUT_DATA.subtitle}
        </Text>
        {ABOUT_DATA.content.map((paragraph, index) => (
          <Text key={index} fontSize='md' color='gray.500' maxW='2xl'>
            {paragraph}
          </Text>
        ))}
        <Button
          colorScheme='teal'
          size='lg'
          alignSelf='start'
          onClick={() => navigate(ABOUT_DATA.buttonLink)}
        >
          {ABOUT_DATA.buttonText}
        </Button>
      </VStack>
    </Container>
  );
};

export default About;
