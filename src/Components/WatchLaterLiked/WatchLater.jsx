
import React from 'react'
import { useSelector } from 'react-redux'
import { getWatch_later } from '../../userSlice'
import { Helmet } from 'react-helmet'
import Layout from './Layout'
import LoginChecker from '../../LoginChecker'
const WatchLater = () => {

    LoginChecker()

    const watchLater = useSelector(getWatch_later)



    return (<>
        <Helmet>
            <title>Watcher | Watchlater</title>
        </Helmet>
        {watchLater && <Layout data={watchLater} title={"Watch Later"} />}
    </>
    )
}

export default WatchLater