import Header from '../components/Header'
// import API from './components/API'
import Footer from '../components/Footer'

// import React, { use } from 'react'
// import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient();

export default function AppGraphics() {

const { isPending, error, data, isFetching } = useQuery({
  queryKey: ['repoData'],
  queryFn: async () => {
    const response = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records');
    return await response.json();
  }
})

  if (isPending) return "Loading...";
  
  if (error) return "Error:" + error.message;

  return (
    <QueryClientProvider client={client}>
      <div className='flex flex-col justify-between w-[100vw] h-[100vh]'>
        <ReactQueryDevtools />
        <Header />
        {/* <div>
          <h1>Données des lieux de tournage à Paris</h1>
          <p>{data.results.nom_tournage}</p>
        </div> */}
        <Footer />
      </div>
    </QueryClientProvider>
  )
}
