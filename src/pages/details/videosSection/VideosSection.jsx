import React, { useRef, useState } from "react";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyload/Img";
import { PlayIcon } from "../PlayIcon";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const containerRef = useRef()
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

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {data?.results?.length>0 ? (
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
                {!loading ? (
                    <div ref={containerRef} className="videos">
                        {data?.results?.map(video =>(
                            <div 
                            key={video.id}
                             className="videoItem"
                             onClick={()=>{
                                setVideoId(video.key)
                                setShow(true)
                             }}
                             >
                                <div className="videoThumbnail">
                                    <Img src = {`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}/>
                                    <PlayIcon/>
                                </div>
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;