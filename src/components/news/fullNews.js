import React, { useState , useEffect } from "react"
import {
  SeeMoreSingleNews,
  SharedWrapperCol,
  ImageWrapper,
  FullInfoText,
  FullNewsPage,
  BigImageInfo,
  NewsItems,
  TextPart,
  TitleRow,
  DataItem,
  NewsText,
  MoreRow,
  Title,
  Img,
  H2,
  P,
} from "./newsStyle"
import {
  FacebookIcon,
  FacebookShare,
  LinkdinIcon,
  LinkedinShare,
  ShareLabel,
} from "../careercomponents/careerForm/formStyle"

const FullInfo = ({ filteredData, data , lang , pageContext}) => {

  const [size, setSize] = useState(3)

  const resize = () =>{
    if(window.innerWidth >= 1111){
      setSize(3)
    }else if(768 < window.innerWidth && window.innerWidth < 1111){
      setSize(2)
    }else if(window.innerWidth <= 768){
      setSize(1)
    }
  }
  useEffect(() => {
    resize()
  });
  if (typeof window !== `undefined`) {
    window.addEventListener("resize", resize);
  }

  let urlShared;

  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/news/"
    } else if (lng === "ru") {
      return "http://triple-c.algorithm.am/ru/news"
    } else {
      return "http://triple-c.algorithm.am/arm/news/"
    }
  }

  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
  }

  hookComponent()
  return (
    <>
        <BigImageInfo>
          <Img src={filteredData[0].src} alt="" />
        </BigImageInfo>
        <TitleRow>
          <H2> {filteredData[0].title} </H2>
          <P>{filteredData[0].date}</P>
        </TitleRow>
        <FullInfoText>{filteredData[0].description}</FullInfoText>
        <SharedWrapperCol>
          <ShareLabel>Կիսվել</ShareLabel>
          <FacebookShare
            url={urlShared}
            children={<FacebookIcon />}
          />

          <LinkedinShare
            url={urlShared}
            children={<LinkdinIcon />}
          />
        </SharedWrapperCol>
        <FullNewsPage>
          {data.map((item, index) => (
            (index < size) ? (
              <NewsItems
                to={`/${lang}/news#${item.id}`}
                onClick={window.scrollTo(0, 0)}
                key={index}
                margin={item.margin}
              >
                <ImageWrapper>
                  <img style={{ width: "100%" }} src={item.src} alt="" />
                </ImageWrapper>
                <TextPart>
                  <Title>{item.title}</Title>
                  <NewsText>{item.description}</NewsText>
                  <MoreRow>
                    <DataItem>{item.date}</DataItem>
                      <SeeMoreSingleNews
                        className="see_more_btn"
                      > ԱՎԵԼԻՆ
                      </SeeMoreSingleNews>
                  </MoreRow>
                </TextPart>
              </NewsItems>
            ) : ""
          ))}
        </FullNewsPage>
    </>
  )
}
export default FullInfo