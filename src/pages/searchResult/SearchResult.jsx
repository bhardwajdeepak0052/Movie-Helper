import React, { useEffect, useState } from 'react'
import './SearchResult.scss'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../Utils/api'
import Spinner from '../../components/spinner/Spinner'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/movieCard/MovieCard'


function SearchResult() {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()
  const [total, setTotal] = useState(0)
  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then(res => {

        setData(res?.results)
        setLoading(false)
        setTotal(res?.total_pages)
        setPageNum(prev => prev + 1)
      })

  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then(res => {
        const temp = res?.results
        
        if (temp) {
          setData(
            [ ...data, ...temp ])
        }
        else setData(temp)
        setPageNum(prev => prev + 1)
      })
  }
  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.length > 0 ?(
            <>
              <div className="pageTitle">
                {`Search ${data.length>1 ? "results":"result"} of '${query}'`}
              </div>
              <InfiniteScroll
                className='content'
                dataLength={data?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum<=total}
                loader={<Spinner/>}                
              >
                {data?.map((item,index)=>{
                  if(item.media_type==="person") return;
                  return (
                    <MovieCard
                        key={index}
                        data={item}
                        fromSearch={true}
                    />
                  )
                })}
              </InfiniteScroll>
            </>
          ):
          <span className="resultNotFound">Sorry...Result Not Found</span>
          }
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult