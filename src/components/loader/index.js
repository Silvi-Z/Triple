import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import logo from "../../images/loader/logo.svg"
import loading from "../../images/loader/loading.svg"

const Loader = () => {
  let [count, setCount] = useState(0)
  let [loadImgWidth, setLoadImgWidth] = useState(false)
  const textRef = useRef()

  const LoaderSection = styled.section`
    height: 90vh;
    background-color: #484b50;
  `
  const Logo = styled.div`
    display: flex;
    height: 75px;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    & > img{
      padding-top:50px;
    }
  `
  const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    & *{
      font-size: 40px;
    }
  `
  const LoadImg = styled.div`
    width: 350px;
    transition: 4s;
    position: relative;
    height: 70px;
    display: inline-flex;
    justify-content: center;
    &:after{
      content: 'the numbers';
      height: 100%;
      position: absolute;
      width: fit-content;
      background: #484b50;
      right: -50%;
      width: 350px;
      display: inline-flex;
      justify-content: flex-start;
    }
    &:before{
      content: 'beyond';
      background: #484b50;
      position: absolute;
      left: -50%;
      width: 350px;
      display: inline-flex;
      justify-content: flex-end;
    }
    
  `

  function typeWriter() {
      setLoadImgWidth(true)
  }

  useEffect(()=>{
    setTimeout(typeWriter, 500)
  })

  return (
    <LoaderSection className={'loader'}>
      <Logo id="logo">
        <img src={logo} alt="" />
      </Logo>
      <LoaderWrapper className="loading">
        <LoadImg className={loadImgWidth ? 'loadImgWidth' : ''}>
          <img src={loading} alt="" />
        </LoadImg>
      </LoaderWrapper>
    </LoaderSection>
  )
}

export default Loader
