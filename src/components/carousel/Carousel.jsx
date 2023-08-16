import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyload/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";
import Genres from "../genres/Genres";

function Carousel({data,loading,endpoint,title}) {
    const containerRef = useRef()
    const {url} = useSelector(state => state.home)
    const navigate = useNavigate()


    const navigation = (dir)=>{
        const container = containerRef.current

        const scrollAmount = dir=="left" ?
          container.scrollLeft - container.offsetWidth +20 : // this line means, this div get scroll to current leftScroll distance + div size + right padding 
                                                             // So container move left side
          container.scrollLeft + container.offsetWidth + 20; // container move right side as we increase the left scroll amount
         
        container.scrollTo({
          left : scrollAmount,
          behavior : "smooth"
        }) 


    }


    const skItem = ()=>{
      return (
        <div className="skeletonItem">
          <div className="posterBlock skeleton"></div>
          <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      )
    }

  return (
    
    <div className="carousel">

        <ContentWrapper>
          {title && <div className="carouselTitle">{title}</div>}
            {data?.length>0 ? (
              <>
              <BsFillArrowLeftCircleFill
             className="carouselLeftNav arrow"
             onClick={()=>navigation("left")}
             />

             <BsFillArrowRightCircleFill
             className="carouselRightNav arrow"
             onClick={()=>navigation("right")}
             /></>
            ) : (!loading && <h3 style={{color:"gray"}}>Sorry...No Data Found</h3>)}

             {!loading ?(
              <div ref={containerRef} className="carouselItems">
                 {data?.map(item =>{


                 const posterUrl = item?.poster_path ? url.poster + item?.poster_path :PosterFallback 


                 return ( <div key={item.id} onClick={()=>navigate(`/${item.media_type || endpoint}/${item.id}`)} className="carouselItem">

                    <div className="posterBlock">
                       <Img src={posterUrl}/>
                       <CircleRating rating = {item.vote_average.toFixed(1)}/>
                       <Genres data = {item.genre_ids.slice(0,2)}/>
                    </div>

                    <div className="textBlock">

                      <span className="title">
                        {item.title || item.name}
                      </span>

                      <span className="date">
                        {dayjs(item.release_date).format("MMM D,YYYY")}
                      </span>

                    </div>


                  </div>)
                })}
              </div>
             ):

             <div className="loadingSkeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
             </div>
             }
        </ContentWrapper>

    </div>
  )
}

export default Carousel