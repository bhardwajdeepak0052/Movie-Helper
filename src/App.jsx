
import { useEffect } from 'react'
import './App.css'

import {BrowserRouter,Routes,Route} from 'react-router-dom'

import { fetchDataFromApi } from './Utils/api'

import { useDispatch, useSelector } from 'react-redux'

// Importing our actions from redux slice
import { getApiConfig, getGenres } from './store/homeSlice'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import SearchResult from './pages/searchResult/SearchResult'
import Details from './pages/details/Details'
import PageNotFound from './pages/404/PageNotFound'
import Explore from './pages/explore/Explore'


function App() {

  const dispatch = useDispatch() // Use to Send actions to redux store
  // useSelector to select the particular state from store
  const {url}=useSelector((state)=>state.home)


  useEffect(() => {
    fetchDataFromApi('/configuration')
    .then(res=>{
      // actions send to store
      const url = {
        backdrop: res?.images?.secure_base_url+"original",
        poster  : res?.images?.secure_base_url+"original",
        profile : res?.images?.secure_base_url+"original"
      }
      dispatch(getApiConfig(url))
    })
    genresCall()
  }, [])
  

  const genresCall = async ()=>{
    let promises = []
    let endPoints = ["tv","movie"]
    let allGenres = {}
    endPoints.forEach(url =>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
  })

    const data =await Promise.all(promises)
    
    data.map(genre =>{
      return (
        genre.genres.map(item =>(
          allGenres[item.id]=item
        ))
      )
    })
    dispatch(getGenres(allGenres))
  }
  

    

    return (
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path ="/:mediaType/:id" element={<Details/>}/>
          <Route path = "/explore/:mediaType" element={<Explore/>}/>
          <Route path = "/search/:query" element={<SearchResult/>}/>
          <Route path ="*" element={<PageNotFound/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    )
}

export default App
