import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import logo from "../../images/loader/logo.svg"
import loading from "../../images/loader/loading.svg"
import { CopyrightOutlined } from "@ant-design/icons"

const Loader = () => {
  let [count, setCount] = useState(0)
  let [loadImgWidth, setLoadImgWidth] = useState(false)
  const textRef = useRef()

  const LoaderSection = styled.section`
  height: 90vh;
  background-color: #484b50;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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
    @media only screen and (max-width:768px){
      width: 50px;
      margin: auto;
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
      @media only screen and (max-width:768px){
        & *{
          font-size: 16px;
          font-weight: bold;
        }    
      }
  `
  const LoadImg = styled.div`
  width: 350px;
  transition: 4s;
  position: relative;
  height: 70px;
  display: inline-flex;
  align-items: center;
  &:after{
    content: ' the numbers';
    height: 100%;
    position: absolute;
    width: fit-content;
    background: #484b50;
    right: 0;
    width: 70%;
    display: inline-flex;
    justify-content: flex-start;
    padding-left: 15px;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    @media only screen and (max-width:400px){
      padding-left: 5px;
    }
  }
  &:before{
    content: 'beyond ';
    z-index: 1;
    background: #484b50;
    position: absolute;
    left: 0;
    width: 30%;
    display: inline-flex;
    justify-content: flex-end;
    height: 100%;
    padding-right: 15px;
    display: flex;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    @media only screen and (max-width:400px){
       padding-right: 5px;
    }
  }
  @media only screen and (max-width:768px){
    
    & img{
    position: absolute;
     width:30%;
     left:30%
    }
  }

`
  const CopyrightWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 30px;
    & *{
      width: fit-content;
      margin-bottom: 0;
    }
    @media only screen and (max-width:400px){
      font-size: 10px;
    }
  `
  const Copyright = styled.p`
  `
  const PoweredText = styled.p`
    text-decoration: underline;
  `

  function typeWriter() {
    setLoadImgWidth(true)
  }

  useEffect(() => {
    setTimeout(typeWriter, 500)
  })

  return (
    <LoaderSection className={"loader"}>
      <Logo id="logo">
        <img src={logo} alt="" />
      </Logo>
      <LoaderWrapper className="loading">
        <LoadImg className={loadImgWidth ? "loadImgWidth" : ""}>
          <img src={loading} alt="" />
        </LoadImg>
      </LoaderWrapper>
      <CopyrightWrapper>
        <Copyright>COPYRIGHT <CopyrightOutlined /> 2021</Copyright>
        <PoweredText>POWEREDBTALGORITHMSOLUTION</PoweredText>
      </CopyrightWrapper>
    </LoaderSection>
  )
}

export default Loader
