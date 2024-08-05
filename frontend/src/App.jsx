import { Box ,useColorModeValue} from '@chakra-ui/react'
import {Routes , Route} from 'react-router-dom' 
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'

function App() {


  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100" , "gray.900")}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
      </Routes>
    </Box>
  )
}

export default App
