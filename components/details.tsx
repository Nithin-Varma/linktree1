// 'use client'

import {
  Button,
  Flex,
  FormControl, 
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { type Doc, initJuno, setDoc } from "@junobuild/core-peer";
import { v4 as uuidv4 } from 'uuid';
import { signIn } from "@junobuild/core-peer";
import {User} from "./types"

type Record = {
  name : string,
  github_url ?: string;
  linkedin_url ?: string;
  twitter_url ?: string;
  medium_url ?: string;
  district_url ?: string;
};

const Details = () => {
    const [record, setRecord] = useState<Doc<Record> | undefined>(undefined);
    const [user, setUser] = useState<User>({} as User);

    // const unsub = authSubscribe((user) => {
    //   console.log("User:", user);
    // });
    const signin = async() => {
      await signIn();
    }
  
    // useEffect(() => {
    //   (async () =>
    //     await initJuno({
    //       satelliteId: "xqne3-5aaaa-aaaal-adcpq-cai",
    //     }))();
    // },[]);

    useEffect(() => {
        initJuno({
            satelliteId: "xqne3-5aaaa-aaaal-adcpq-cai"
        })
    })

    const insert = async () => {
        try {
            const doc = await setDoc({
                collection: "links",
                doc: {
                  key: uuidv4(),
                  data: {
                    name: user.name,
                    github_url : user.github_url,
                    linkedin_url : user.linkedin_url,
                    twitter_url : user.twitter_url,
                    medium_url : user.medium_url,
                    district_url : user.district_url
                  },
                },
          
              });
          
              setRecord(doc);
              console.log(`submitted Successfully ${doc}`)
            
        } catch (error) {
            console.log(`error while submitting the doc.......${error}`)
        }
    };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={user.name}
            onChange={(e) => {
                setUser({
                    ...user,
                    name: e.target.value
                })
            }}
          />
        </FormControl>
        <FormControl id="github" isRequired>
          <FormLabel>Github</FormLabel>
          <Input
            placeholder=""
            _placeholder={{ color: 'gray.500' }}
            value={user.github_url}
            onChange={(e) => {
                setUser({
                    ...user,
                    github_url: e.target.value
                })
            }} 
          />
        </FormControl>
        <FormControl id="linkedin" isRequired>
          <FormLabel>LinkedIn</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            value={user.linkedin_url}
            onChange={(e) => {
                setUser({
                    ...user,
                    linkedin_url: e.target.value
                })
            }} 
          />
        </FormControl>
        <FormControl id="twitter" isRequired>
          <FormLabel>twitter</FormLabel>
          <Input
            placeholder="twitter"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={user.twitter_url}
            onChange={(e) => {
                setUser({
                    ...user,
                    twitter_url: e.target.value
                })
            }}
          />
        </FormControl>
        <FormControl id="medium" isRequired>
          <FormLabel>medium</FormLabel>
          <Input
            placeholder="medium"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={user.medium_url}
            onChange={(e) => {
                setUser({
                    ...user,
                    medium_url: e.target.value
                })
            }}
          />
        </FormControl>
        <FormControl id="district" isRequired>
          <FormLabel>district</FormLabel>
          <Input
            placeholder="district"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={user.district_url}
            onChange={(e) => {
                setUser({
                    ...user,
                    district_url: e.target.value
                })
            }}
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={insert}
            >
            Submit
          </Button>
        </Stack>
      </Stack>
      <Button onClick={signin}>SignIn</Button>
    </Flex>
  )
}

export default Details;