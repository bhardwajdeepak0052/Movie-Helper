import React, { useState } from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'
function Upcoming() {

  const [endpoint, setendpoint] = useState("movie")
  const [lastpoint,setlastpoint] = useState("upcoming")
  const [sorting,setsorting] = useState("release_date")  
  const {data,loading} = useFetch(`/${endpoint}/${lastpoint}`)
  
  

  const onTabChange = (tab)=>{
    setendpoint(tab==="Movies"?"movie":"tv")
    setlastpoint(tab==="Movies" ? "upcoming":"on_the_air")
    setsorting(tab==="Movies"?"release_date":"first_air_date")
    
  }


  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">What's coming next</span>
            <SwitchTabs data = {["Movies","TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results?.sort((a,b)=>a[sorting]<b[sorting]?1:-1)} endpoint={endpoint} loading={loading}/>
    </div>
  )
}

export default Upcoming