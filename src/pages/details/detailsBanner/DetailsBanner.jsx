import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyload/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {

    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const { url } = useSelector(state => state.home)
    const _genres = data?.genres?.map((g) => g.id)
    const [VideoId, setVideoId] = useState(null)
    const [show, setShow] = useState(false)

    const temp = video?.filter(item => item.type === "Trailer" || item.type === "Official Trailer")
    const trailer = temp?.[0]

    const director = crew?.filter(f => f.job === "Director")
    const writer = crew?.filter(f => f.job === "Writer" || f.job === "Story")

    const {data:watchProvider,loading:watchLoading} = useFetch(`/${mediaType}/${id}/watch/providers`)
    const [platform,setPlatForm] = useState([])
    
    useEffect(()=>{
        if(watchProvider?.results?.IN?.flatrate){
            setPlatForm(watchProvider?.results?.IN?.flatrate)
        }
    },[watchProvider])

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data?.poster_path ? (
                                            <Img className="posterImg" src={url.backdrop + data?.poster_path} />
                                        ) :
                                            (
                                                <Img className="posterImg" src={PosterFallback} />
                                            )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {data?.name || data?.title + ` (${dayjs(data?.release_date).format("YYYY")})`}
                                        </div>

                                        <div className="subtitle">
                                            {data?.tagline}
                                        </div>

                                        <Genres data={_genres} />

                                        <div className="row">
                                            <CircleRating rating={data?.vote_average.toFixed(1)} />
                                            <div className="playbtn" onClick={() => {
                                                setShow(true)
                                                setVideoId(trailer?.key)
                                            }}>
                                                <PlayIcon />
                                                <span className="text">Watch Trailer</span>
                                            </div>
                                        </div>

                                        <div className="watchOn">
                                            {platform?.length>0 && <div className="heading">Watch it on: </div>}
                                            {platform?.map((item,index)=>{
                                                const watchLogo = item?.logo_path ? url.profile + item?.logo_path : PosterFallback
                                               return (
                                                <div className="providers" key = {index}>
                                                    <Img src = {watchLogo}/>
                                                    <div className="provider_name">{item?.provider_name}</div>
                                                </div>
                                               )
                                            })}
                                        </div>

                                        {/* Overview Section    */}

                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">{data.overview}</div>
                                        </div>

                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">Status:</span>
                                                    <span className="text">{data.status}</span>
                                                </div>
                                            )}

                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">Release Date:</span>
                                                    <span className="text">{dayjs(data.release_date).format("D MMM YYYY")}</span>
                                                </div>
                                            )}

                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">Duration:</span>
                                                    <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                                </div>
                                            )}

                                        </div>

                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Director{director.length > 1 && "s"}:  </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name + (director.length - 1 != i ? ", ":"")}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Writer{writer.length > 1 && "s"}:  </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d?.name + (i!=writer.length-1 ? ", ":"")}
                                                            
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Creater{data?.created_by.length > 1 && "s"}:  </span>
                                                <span className="text">
                                                    {data?.created_by?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name + (data?.created_by.length - 1 != i ? ", ":"")}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ContentWrapper>
                            <VideoPopup
                                show={show}
                                setShow={setShow}
                                videoId={VideoId}
                                setVideoId={setVideoId}
                            />
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;