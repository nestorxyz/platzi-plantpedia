import Image from 'next/image'

import { Layout } from '@components/Layout'
import { RichText } from '@components/RichText'
import { AuthorCard } from '@components/AuthorCard'
import { Typography } from '@ui/Typography'
import { Grid } from '@ui/Grid'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getPlant, getPlantList } from '@api'

type PlantEntryProps ={
  plant:Plant
}

type PathType = {
  params: {
    slug: string
  }
}

export const getStaticPaths = async ()=>{
  const entries = await getPlantList({limit: 10})

  const paths: PathType[] = entries.map(plant => {
    return {
      params: {
        slug: plant.slug
      }
    }
  })

  return {
    paths,
    //404 en las entradas no encontradas
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<PlantEntryProps> = async ({params})=>{
  const slug = params?.slug

  if(typeof slug != 'string'){
    return{
      notFound: true
    }
  }

  try{
    const plant = await getPlant(slug)
    return{
      props:{
        plant
      }
    }
  } catch(e){
    return{
      notFound:true
    }
  }
}

const PlantEntryPage = ({plant}: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9} component="article">
          <figure>
            <Image
              width='932'
              height='410'
              src={plant.image.url}
              alt={plant.image.title}
            />
          </figure>
          <div className="px-12 pt-8">
            <Typography variant="h2">{plant.plantName}</Typography>
          </div>
          <div className="p-10">
            <RichText richText={plant.description} />
          </div>
        </Grid>
        {/* <Grid item xs={12} md={4} lg={3} component="aside">
          <section>
            <Typography variant="h5" component="h3" className="mb-4">
              {t('recentPosts')}
            </Typography>
            {otherEntries.map((plantEntry) => (
              <article className="mb-4" key={plantEntry.id}>
                <PlantEntryInline {...plantEntry} />
              </article>
            ))}
          </section>
          <section className="mt-10">
            <Typography variant="h5" component="h3" className="mb-4">
              {t('categories')}
            </Typography>
            <ul className="list">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link passHref href={`/category/${category.slug}`}>
                    <Typography component="a" variant="h6">
                      {category.title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Grid> */}
      </Grid>
      <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
        <AuthorCard {...plant.author} />
      </section>
    </Layout>
  )
}

export default PlantEntryPage
