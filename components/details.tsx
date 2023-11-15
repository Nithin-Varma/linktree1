// 'use client'

import {
  Button,
  Flex,
  FormControl, 
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'

import { useCallback, useEffect, useState } from "react";
import { type Doc, initJuno, setDoc, getDoc} from "@junobuild/core-peer";
import {User} from "./types"
import {useRouter} from "next/router"

type Record = {
  name : string,
  github_url ?: string;
  linkedin_url ?: string;
  twitter_url ?: string;
  medium_url ?: string;
  district_url ?: string;
};

const Details = () => {
    const [, setRecord] = useState<Doc<Record> | undefined>(undefined);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [alert, setAlert] = useState({
      show: false,
      status: 'success',
      message: ''
     });
    const [user, setUser] = useState<User>({
      username:'',
      name: '',
      github_url: '',
      linkedin_url: '',
      twitter_url: '',
      medium_url: '',
      district_url: ''
    });
    const router = useRouter();

    useEffect(() => {
        initJuno({
            satelliteId: "xqne3-5aaaa-aaaal-adcpq-cai"
        })
        if (alert.show) {
          setTimeout(() => {
            setAlert({ show: false, status: '', message: '' });
          }, 5000); // 5 seconds
        }
    },[alert])

    const checkUsername = useCallback(async (username: string) => {
      try {
          const doc = await getDoc({
              collection: "links",
              key: username
          });
          return doc !== null;
      } catch (error) {
          console.log(`error while checking username.......${error}`);
          return false;
      }
  },[]);

  const handleUsernameChange = async (e: any) => {
      const username = e.target.value;
      setUser({
          ...user,
          username: username
      });
      if (await checkUsername(username)) {
          console.log("username taken")
      }
  };

    const insert = useCallback(async () => {
        try {
            const doc = await setDoc({
                collection: "links",
                doc: {
                  key: user.username,
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
              router.push(`/${user.username}`)
              console.log(`submitted Successfully ${doc}`)
            
        } catch (error) {
          onOpen();
          setAlert({ show: true, status: 'error', message: 'Not submitted try again later...' });
          console.log(`error while submitting the doc.......${error}`)
        }
    },[user, onOpen, router]);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      paddingTop={"12"}
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
        <FormControl id="linktree_username" isRequired>
          <FormLabel>LinkTree username</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={user.username}
            onChange={handleUsernameChange}
          />
        </FormControl>
        <FormControl id="fullName" isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="Full Name"
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
            placeholder="LinkedIn URL"
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
      {/* {alert.show && (
      <Alert status={alert.status as "success" | "error" | "info" | "warning" | "loading"}>
        <AlertIcon />
        <AlertTitle>{alert.message}</AlertTitle>
        <AlertDescription>Please try again.</AlertDescription>
      </Alert>
     )} */}
     <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Alert</AlertDialogHeader>
          <AlertDialogBody>
            {alert.message}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  )
}

export default Details;