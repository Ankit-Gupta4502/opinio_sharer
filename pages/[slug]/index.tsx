import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import QuestionDetailType from "@/types/QuestionDetailType"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import axios from 'axios'
import { toast } from "react-toastify"
import { useRouter } from 'next/router'
const QuestionDetail = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [choosenAnswer, setChoosenAnswer] = useState("")
    const router = useRouter()
    const handleAnswerSubmit = (id: string) => {
        const answer = {
            "question_id": data.question_id,
            "choice_id": id,
            "country": data.address.country,
            "city": data.address.city,
            "location": {
                "lat": data.loc.coordinates[1],
                "lng": data.loc.coordinates[0]
            },
            "local_time": new Date().getTime().toString(),
            "pin_code": null
        }
        axios.post(`https://api.trenddii.com/vote`, answer, {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDg2NTgyOCwianRpIjoiYjM1ZTA0OWMtZTdiNi00YThmLWIwNmUtNjA1ZjUxYTBiODUxIiwibmJmIjoxNjkwODY1ODI4LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjp7ImlkIjoiNjRjODkwYTQ4M2NmNmM3ZGU4ZGQzMWVmIn19.ZEdRjp5o_UUFhJOBfY2hc7rfCoULDCTrFmhq7cAQUzc`
            }
        })
            .then(({ data }) => {
                setChoosenAnswer(id)
                toast.success("Your answer was selected")
                router.back()
            })
            .catch(err => {
                console.error(err?.response?.data)
                toast.error(err?.response?.data?.message)
            }
            )
    }

    const desc = `${data.title} \n ${data.choices.map(item => item.choice_title).join("\n")}`

    return (
        <>
            <Head>
                <title> {data.title} </title>
                <meta name="description" content={desc} />
                <meta property="og:title" content={data.title} />
                <meta property="og:image" content={data.users_details.image_url} />
                <meta name="viewport" content="width=device-width,
                 initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='p-4' >

                <div className='container' >
                    <div className="row justify-content-center ">
                        <div className="col-md-4  ">

                            <div className='card' >

                                <div className="card-body  ">
                                    <h5 className='text-center mb-4' >{data.title}</h5>

                                    {choosenAnswer ?
                                        <div role='button' className="card border border-success mb-3 px-4 py-2"  >
                                            {data.choices.find((item) => item.id === choosenAnswer)?.choice_title}
                                        </div>
                                        : data.choices.map((item) => {
                                            return <div onClick={() => handleAnswerSubmit(item.id)} role='button' className="card  mb-3 px-4 py-2" key={item.id} >
                                                {item.choice_title}
                                            </div>
                                        })}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default QuestionDetail


export const getServerSideProps: GetServerSideProps<QuestionDetailType> = async (context) => {
    try {
        const resp = await fetch(`https://api.trenddii.com/question?question_slug=${context.params?.slug || ""}`)
        const data = await resp.json()
        return {
            props: {
                data: data?.data
            }
        }
    } catch (error) {
        console.error(error)
        return {
            props: {
                data: []
            }
        }
    }


}