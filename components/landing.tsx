'use client'
// import Head from 'next/head'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react'
// import { useRouter } from 'next/router';
import { useEffect } from "react";
import { initJuno,} from "@junobuild/core-peer";

export default function Landing() {


    // const signin = async() => {
    //     await signIn();
    //   }
    useEffect(() => {
        initJuno({
            satelliteId: "xqne3-5aaaa-aaaal-adcpq-cai"
        })
    },[])
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Create a your LinkTree Just by <br />
            <Text as={'span'} color={'green.400'}>
              providing links.
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            A linktree using ICP. As this is a basic MVP, we are just providing one template.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Login and Get Started
            </Button>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}