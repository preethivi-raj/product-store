import { Button, Container, Flex  , HStack, Text, useColorMode} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";


const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode()
  return (
    <Container maxW={"1140px"} px={4} >
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={
                {
                base :"column",
                sm :"row"
                }
            }
        >
            <Text
                fontSize={{base :"22", sm :"28"}}
                bgClip='text'
                textAlign={"center"}
                textTransform={"uppercase"}
                bgGradient={"linear(to-l, #7928CA,#FF0080)"}
                fontWeight='bold'
            >
               <Link to={"/"}>Product Store</Link>
            </Text>
            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"}>
                   <Button>
                     <CiSquarePlus />
                   </Button>
                </Link>
                  <Button  onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon/> : <LuSun size={"20"}/>}
                  </Button>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar