import Header from '../components/Header'
import ProjectPresentation from '../components/ProjectPresentation'
import Footer from '../components/Footer'



export default function AppHome() {

  return (
    <div className='flex flex-col justify-between w-[100vw] h-[100vh]'>
      <Header />
      <ProjectPresentation />
      <Footer />
    </div>

  )
}

