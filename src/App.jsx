import { BrowserRouter } from 'react-router-dom'
import CronContextProvider from './context/CronContext'
import MainContainer from './containers/MainContainer'

function App() { 
   
  return (
    <> 
      <CronContextProvider>          
          <BrowserRouter> 
            <MainContainer/>           
          </BrowserRouter>        
      </CronContextProvider>
    </>
  )
}

export default App
