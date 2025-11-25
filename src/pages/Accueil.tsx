import Header from '../components/Header'
import PresentProject from '../components/PresentProject'
import Footer from '../components/Footer'



export default function AppAccueil() {

  return (
    <div className='flex flex-col justify-between w-[100vw] h-[100vh]'>
      <Header />
      <PresentProject />
      <Footer />
    </div>

  )
}

