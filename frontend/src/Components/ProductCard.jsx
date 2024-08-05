import { Box, Heading , Text , Image, HStack, IconButton, useColorModeValue, useToast, useDisclosure , Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,ModalBody, VStack, Input, ModalFooter, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from '../Store/product'


const ProductCard = ({product}) => {
  console.log(product)
  const textColor = useColorModeValue("gray.600" , "gray.200")
  const bg = useColorModeValue("white" , "gray.800")

  const {deleteProduct , updateProduct} = useProductStore();

  const toast = useToast(); 

  const handleDelete = async (pid)=>{
    const {success , message} = await deleteProduct(pid);
    if(success){
      toast({
        title: "Product Deleted",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }else{
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const {isOpen , onOpen , onClose} = useDisclosure();
  const [updatedProduct , setUpdatedProduct] = useState(product)
  const handleUpdate = async (pid , updatedProduct)=>{
     const {success , message}=await updateProduct(pid , updatedProduct);
     onClose();
      if(success){
        toast({
          title: "Product Updated",
          description: message,
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      }
      else{
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
  }
  return (
    <Box
     shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl",
      }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"}/>
       <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2} >
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4} >
          {product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme="blue" />
          <IconButton icon={<DeleteIcon/>} onClick={()=>handleDelete(product._id)} colorScheme="red" />
        </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
             <ModalHeader>Update Product</ModalHeader>
             <ModalCloseButton/>
             <ModalBody>
                <VStack spacing={4}>
                   <Input
                   placeholder="Product Name"
                   name="name"
                  value={updatedProduct.name}
                    onChange={(e)=>setUpdatedProduct({...updatedProduct , name : e.target.value})}                  
                   />
                   <Input
                   placeholder="Price"
                   name="price"
                    value={updatedProduct.price}
                    onChange={(e)=>setUpdatedProduct({...updatedProduct , price : e.target.value})}
                   />
                   <Input
                   placeholder="Image Url"
                   name="image"
                    value={updatedProduct.image}
                    onChange={(e)=>setUpdatedProduct({...updatedProduct , image : e.target.value})}
                   />
                </VStack>
             </ModalBody>
             <ModalFooter>
                <Button colorScheme='blue' mr="3" onClick={()=>handleUpdate(product._id , updatedProduct)}> 
                  update
                </Button >
                <Button variant={"ghost"} onClick={onClose} >
                     Cancel
                  </Button> 
             </ModalFooter>
          </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProductCard