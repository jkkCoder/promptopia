'use client'

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const MyProfile = () => {
    const [posts, setPosts] = useState([])
    const {data: session} = useSession()
    const searchParams = useSearchParams()
    const userId = searchParams.get("userId")

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/profile`)
            const data = await response.json()


            setPosts(data)
        }
        
        fetchPosts()
    }, [])

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <Profile
            name={`${session?.user?.name?.split(' ')?.[0]}'s`}
            desc="Welcome to your personalized profile page"
            data={posts}
        />
    )
}

export default MyProfile