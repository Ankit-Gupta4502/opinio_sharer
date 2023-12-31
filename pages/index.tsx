import Head from 'next/head'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import QuestionType from "@/types/TrendingQuestionTypes"
import { FiEye } from "react-icons/fi"
import { BiUpvote } from "react-icons/bi"
import { AiOutlineShareAlt } from "react-icons/ai"
import Link from 'next/link'
import ReactShare from "@/Components/ReactShare/SocialSharer"
import { useState } from 'react'
export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isOpen, setIsOpen] = useState(false)
  const [link, setLink] = useState("")
  return (
    <>
      <Head>
        <title>Opinio Share</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='py-4' >
        <div className="container">
          <div className="bg-light p-3">

            <div className="row gy-4">
              {
                data.map((item) => {
                  return <div className="col-md-4" key={item.question_id}>
                    <div className="card "  >
                      <div className="card-body">
                        <div className=" position-relative  question-wrapper">
                          <div className="position-absolute top-0 d-flex align-items-center start-0 end-0 justify-content-between share-wrapper">
                            <span className='pill' >
                              {item.topic_title}
                            </span>
                            <span role="button" onClick={() => {
                              setIsOpen(true)
                              setLink(item.dynamic_link.question)
                            }}>
                              <AiOutlineShareAlt size={24} />
                            </span>
                          </div>
                          <Link className='question-link' href={`/${item.question_slug}?question-id=${item.question_id}`} >
                            {item.title}
                          </Link>
                        </div>
                        <div className="card-footer d-flex ">
                          <div className="w-50 border-end  d-flex justify-content-center align-items-center">
                            <span className=' d-block me-2 ' >

                              {item.vote_count}
                            </span>

                            <BiUpvote size={14} />
                          </div>

                          <div className="w-50  d-flex justify-content-center align-items-center">
                            <span className=' d-block me-2 ' >

                              {item.view_count}
                            </span>

                            <FiEye size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>

          </div>
        </div>
        <ReactShare isOpen={isOpen} setIsOpen={setIsOpen} link={link} />
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps<{ data: QuestionType[] }> = async () => {
  try {
    const resp = await fetch(`https://api.trenddii.com/question/trending?start=0&limit=16`, {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDkwMzUzOCwianRpIjoiZTc5ZjIyMmUtOGIxOC00YjgwLTk2ZmItMzc2MGNhZDU1Y2RiIiwibmJmIjoxNjkwOTAzNTM4LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjp7ImlkIjoiNjRjOTIzZjJjMTAyNDk4NTQyZGQzMzJiIn19.PuyS-4cl8D5fEKSrxa77rKkxAU5dGzTxsUjMvSbpH14`
      }
    })
    const data = await resp.json()
    return { props: { data: data?.data } }
  } catch (error) {
    console.error(error)
    return { props: { data: [] } }
  }
}
