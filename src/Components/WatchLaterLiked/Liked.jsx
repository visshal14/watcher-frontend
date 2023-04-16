
import React from 'react'
import { useSelector } from 'react-redux'
import { getLiked } from '../../userSlice'
import Layout from './Layout'
import LoginChecker from '../../LoginChecker'
const Liked = () => {


    LoginChecker()
    const liked = useSelector(getLiked)

    return (
        <Layout data={liked} title={"Liked"} />
    )
}

export default Liked