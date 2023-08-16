import React, { useEffect, useState } from 'react'
import './Header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import logo from '../../assets/moviez-logo.png'
import {HiOutlineSearch } from 'react-icons/hi'
import {VscChromeClose} from  'react-icons/vsc'
import {SlMenu} from 'react-icons/sl'

function Header() {

  const [show,setShow] = useState("top")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenu,setMobileMenu] = useState(false)
  const [query, setQuery] = useState("")
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const controlNavbar = ()=>{
    if(window.scrollY>200){
      if(window.scrollY>lastScrollY && !mobileMenu){
        setShow("hide")
      }
      else setShow("show")
    }
    else{
      setShow("top")
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(()=>{
    window.addEventListener("scroll",controlNavbar);
    return ()=> window.removeEventListener("scroll",controlNavbar)
  },[lastScrollY]);
  

  useEffect(()=>{
   window.scrollTo(0,0);
  },[location])

  const openSearch = ()=>{ 
    setSearch(true)
    setMobileMenu(false)
  }

  const openMobileMenu = ()=>{
    setMobileMenu(true)
    setSearch(false)
  }

  const navigationHandler = ( type)=>{
    if(type==="movie"){
      navigate("/explore/movie")
    }
    else{
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }

  const searchQueryHandler = (event)=>{
    //Trigger only when key pressed is Enter

    if(event.key === "Enter" && query.length>0){
      navigate(`/search/${query}`)
      setTimeout(() => {
        setSearch(false);
      }, 1000);
    }
  }

  return (
    <header className={`header ${mobileMenu && 'mobileView'} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={()=>navigate('/')}>
          <img src={logo} alt=""/>
          <h2>Moviez</h2>
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={()=> navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={()=>navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}/>
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch}/>
          {mobileMenu ? <VscChromeClose onClick={()=>setMobileMenu(false)}/> : <SlMenu onClick={openMobileMenu}/>}
        </div>

      </ContentWrapper>
      {search && <div className="searchBar">
        <ContentWrapper>
        <div className="searchInput">
        <input 
           type="text"
           placeholder="Search for a Movie or TV Show..."
           onChange={(e)=>setQuery(e.target.value)}
           onKeyUp={searchQueryHandler}
           />
          <VscChromeClose onClick={()=>setSearch(false)}/></div> 
        </ContentWrapper>
      </div>}
    </header>

  )
}

export default Header