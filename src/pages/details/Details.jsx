import React from 'react'
import './Details.scss'
import DetailsBanner from './detailsBanner/DetailsBanner'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

function Details() {
  const {mediaType,id} = useParams()
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data: credits,loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      {data && <DetailsBanner video={data?.results} crew = {credits?.crew}/>}
      <Cast
        data = {credits?.cast}
        loading = {creditsLoading}
      />

      {data && <VideosSection data = {data} loading = {loading}/>}

      {id && <Similar mediaType={mediaType} id = {id}/>}
      {id && <Recommendation mediaType={mediaType} id = {id}/>}
    </div>
  )
}

export default Details