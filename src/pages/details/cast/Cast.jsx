import React, { useRef } from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyload/Img";
import avatar from "../../../assets/avatar.png";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const containerRef = useRef();

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

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                    <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={()=>navigation("left")}
                    />

                    <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow"
                    onClick={()=>navigation("right")}
                    />
                {!loading ? (
                    <div ref={containerRef} className="listItems">


                        {data?.map(item => {
                            let imgUrl = item?.profile_path ? (url.profile + item?.profile_path ): avatar
                            return (
                                <div key = {item.id} className="listItem">
                                    <div className="profileImg">
                                    <Img src = {imgUrl}/>
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">{item.character}</div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;