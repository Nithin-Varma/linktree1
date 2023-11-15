// 'use client'

import {
  Box,
  Flex,
  Button,
  //   useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { signIn, signOut, authSubscribe, initJuno } from "@junobuild/core-peer"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isSignedIn, setIsSignedIn] = useState(false)
  //   const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    initJuno({
      satelliteId: "xqne3-5aaaa-aaaal-adcpq-cai"
    })
    authSubscribe(user => {
    //   console.log("User:", user)
      if (user && !isSignedIn) {
        setIsSignedIn(true)
        router.push("/detailspage")
      } else if (!user && isSignedIn) {
        setIsSignedIn(false)
        router.push("/")
      }
    })
  }, [])
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Logo</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {isSignedIn ? (
                <Button
                  onClick={async () => {
                    await signOut()
                    setIsSignedIn(false)
                  }}
                >
                  SignOut
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    await signIn()
                    setIsSignedIn(true)
                  }}
                >
                  SignIn
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
