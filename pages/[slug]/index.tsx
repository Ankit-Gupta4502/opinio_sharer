import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import QuestionDetailType from "@/types/QuestionDetailType"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import axios from 'axios'
const index = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const handleAnswerSubmit = (id:string) =>{
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
        axios.post(`https://api.trenddii.com/vote`,answer,{
            headers:{
                Authorization:`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDgxNDA0OCwianRpIjoiMzhlMWIzMzQtMjAyMS00ZDIxLWIxYWUtNDlkMjk1ZTgzMDA0IiwibmJmIjoxNjkwODE0MDQ4LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjp7ImlkIjoiNjRjN2M2NjBjMTAyNDk4NTQyZGQzMmJlIn19.gAo3I6jJPPPdXkbVSlvgVzWlIdvX0Yl2w0B41TvV`
            }
        })
        .then(({data})=>{
            console.log(data);
        })
        .catch(err=>console.error(err)
        )
    }

    return (
        <>
            <Head>
                <title> {data.title} </title>
                {/* <meta name="description" content={     } /> */}
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
                                    
                                 {data.choices.map((item)=>{
                                    return <div  onClick={()=>handleAnswerSubmit(item.id)} role='button' className="card  mb-3 px-4 py-2" key={item.id} >
                                       {item.choice_title}
                                    </div>
                                 })   }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default index


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