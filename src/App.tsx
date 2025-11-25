import Header from './components/Header'
// import API from './components/API'
import PresentProject from './components/PresentProject'
import Footer from './components/Footer'



function App() {

  return (
    <div className='flex flex-col justify-between w-[100vw] h-[100vh]'>
      {/* <API /> */}
      <Header />
      <PresentProject />
      <Footer />
    </div>

  )
}

export default App
