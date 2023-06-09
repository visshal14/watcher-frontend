
import React from 'react'
import { useSelector } from 'react-redux'
import { getLiked } from '../../userSlice'
import { Helmet } from 'react-helmet'
import Layout from './Layout'
import LoginChecker from '../../LoginChecker'
const Liked = () => {


    LoginChecker()
    const liked = useSelector(getLiked)


    return (<>
        <Helmet>
            <title>Watcher | Liked</title>
        </Helmet>
        {liked && <Layout data={liked} title={"Liked"} />}
    </>
    )
}

export default Liked