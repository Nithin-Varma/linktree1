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
import { signIn, signOut, initJuno } from "@junobuild/core-peer"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
// import { User } from "@junobuild/core"

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isSignedIn, setIsSignedIn] = useState(false)
  // const [user, setUser] = useState<User | null>()
  //   const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    initJuno({
      satelliteId: "xqne3-5aaaa-aaaal-adcpq-cai"
    })

  }, [])
  // authSubscribe(user => {
  //   setUser(user)
  // //   console.log("User:", user)
  // })
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} position="fixed" px={4} w={"100%"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontSize={"28px"} fontWeight={"bold"} fontFamily={"cursive"}>AzadNet</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {isSignedIn ? (
                <Button
                  onClick={async () => {
                    await signOut()
                    router.push("/")
                    setIsSignedIn(false)
                  }}
                >
                  SignOut
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    await signIn()
                    router.push("/detailspage")
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
