import React, { useEffect, useState } from 'react'

import './style.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyload/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

function HeroBanner() {
  
  const navigate = useNavigate()
  //for background image and query

  const [background, setBackground]= useState("");
  const [query,setQuery] = useState("");
  const url = useSelector(state => state.home.url)

  const {data,loading} = useFetch("/movie/upcoming")
  
  useEffect(() => {
    
    const bg=url?.backdrop+data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
    setBackground(bg)

  }, [data])
  

  const searchQueryHandler = (event)=>{
    //Trigger only when key pressed is Enter

    if(event.key === "Enter" && query.length>0){
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className="heroBanner">

     {/* back-ground Image*/}

     {!loading && <div className="backdrop-img">
      <Img src={background}/>
     </div>}

      <div className="opacity-layer"></div>

      <ContentWrapper>
      <div className="heroBannerContent">
       <span className="title">Welcome.</span>
       <span className="subtitle">
         Millions of Movies, TV Shows and People to Discover.
         Explore Now.
       </span>

       {/* Search Bar */}
       <div className="searchInput">
         <input 
           type="text"
           placeholder="Search for a Movie or TV Show..."
           onChange={(e)=>setQuery(e.target.value)}
           onKeyUp={searchQueryHandler}
           />
         <button>Search</button>
       </div>

     </div>
      </ContentWrapper>

    </div>
  )
}

export default HeroBanner