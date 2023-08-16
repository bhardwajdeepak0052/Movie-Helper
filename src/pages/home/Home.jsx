import React from 'react'
import './Home.scss'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import Upcoming from './upcoming/Upcoming'


function Home() {
  return (
    <div className='homePage'>
        <HeroBanner/>
        <Trending/>
        <Popular/>
        <TopRated/>
        <Upcoming/>
    </div>
  )
}

export default Home