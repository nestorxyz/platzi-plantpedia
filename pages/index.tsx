import { useEffect, useState } from 'react'

import { getPlantList } from '@api'

import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'

const Home = () => {
  const [data, setData] = useState<Plant[]>([])

  useEffect(() => {
    getPlantList({ limit: 10 }).then((response) => setData(response))
  }, [])

  return (
    <Layout>
      <PlantCollection plants={data} variant="square" />
    </Layout>
  )
}

export default Home
