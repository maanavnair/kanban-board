"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("User");

    if(!user){
      router.push("/login");
    }
  }, [router])

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default page