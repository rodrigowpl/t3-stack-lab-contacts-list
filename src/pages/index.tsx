import { type NextPage } from 'next'
import Head from 'next/head'

import Contacts from '@/components/Contacts'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Santé Coding Task</title>
        <meta name="description" content="Santé Coding Task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-bold">Santé Coding Task</h1>
          <div className="w-2/3">
            <Contacts />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
