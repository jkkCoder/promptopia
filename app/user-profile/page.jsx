'use client'

import Loading from "@components/Loading"
import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const MyProfile = () => {
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const {data: session} = useSession()
    const searchParams = useSearchParams()
    const userId = searchParams.get("userId")

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/profile`)
            const data = await response.json()

            console.log("data is ", data)

            setPosts(data?.prompts)
            setUsername(data?.userName)
            setIsLoading(false)
        }
        
        fetchPosts()
    }, [])

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && <Profile
                name={`${username?.split(' ')?.[0]}'s`}
                desc="Welcome to your personalized profile page"
                data={posts}
            />}
        
        </>
    )
}

export default MyProfile