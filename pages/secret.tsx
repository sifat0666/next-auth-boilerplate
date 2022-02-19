import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Secret(){
    const {data: session, status}= useSession()
    const [content, setContent] = useState()

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await fetch('/api/secret')
            const json = await res.json()
            if(json.content){
                setContent(json.content)
            }
        }
        fetchData()
    }, [session])

    if(!session){
        return(
            <main>
                <div>
                    <h1>you arnt signed in</h1>
                </div>
            </main>
        )


    }

    return(
        <>{content}</>
    )
}