import Header from '../components/Header'
import TeamPresentation from '../components/TeamPresentation'
import Footer from '../components/Footer'



export default function AppAbout() {

  return (
    <div className='flex flex-col justify-between w-[100vw] h-[100vh]'>
      <Header />
      <TeamPresentation />
      <Footer />
    </div>

  )
}