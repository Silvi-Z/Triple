import React, { useEffect, useState } from "react"
import {
  BigImageInfo,
  DataItem,
  FullInfoText,
  FullNewsPage,
  H2,
  ImageWrapper,
  Img,
  MoreRow,
  NewsItems,
  NewsPageWrapper,
  NewsText,
  P,
  SeeMoreSingleNews,
  SharedWrapperCol,
  TextPart,
  Title,
  TitleRow,
} from "../components/news/newsStyle"
import {
  FacebookIcon,
  FacebookShare,
  LinkdinIcon,
  LinkedinShare,
  ShareLabel,
} from "../components/careercomponents/careerForm/formStyle"
import moment from "moment"
import triple from "../api/triple"
import SEO from "../components/seo"

const FullInfo = ({ lang, pageContext: {el, locale, apiUrl, data} }) => {
  const [size, setSize] = useState(3)
  const resize = () => {
    if (window.innerWidth >= 1111) {
      setSize(3)
    } else if (768 < window.innerWidth && window.innerWidth > 1111) {
      setSize(2)
    } else if (window.innerWidth < 768) {
      setSize(1)
    }
  }
  useEffect(() => {
    resize()
  })
  useEffect(() => {
    if (typeof window !== `undefined`) {
      window.addEventListener("resize", resize)
    }
  })
  // const [news, setNews] = useState([])
  //
  // useEffect(() => {
  //   let id = location.hash.substring(1)
  //   triple.get(`/api/news/${id}`)
  //     .then(res => setNews(res.data.data))
  //     .catch(err => console.log(err))
  // }, [location.hash])

  // let urlShared
  // const getSharedUrl = lng => {
  //   if (lng === "en") {
  //     return "http://triple-c.algorithm.am/en/news/"
  //   } else {
  //     return "http://triple-c.algorithm.am/arm/news/"
  //   }
  // }
  // const hookComponent = () => {
  //   urlShared = getSharedUrl(pageContext.locale)
  // }
  // hookComponent()
  console.log(el)
  return (
    <>
      <NewsPageWrapper>
        {/*<SEO*/}
        {/*  // pageContext={pageContext}*/}
        {/*/>*/}
        <BigImageInfo>
          <Img src={el.image && apiUrl + el.image} alt="" />
          {console.log('news && apiUrl + news.image',el.image && apiUrl + el.image)}
        </BigImageInfo>
        <TitleRow>
          <H2> {el && el[`title_${locale}`]} </H2>
          <P>{el && el.date}</P>
        </TitleRow>
        <FullInfoText>{el && el[`description_${locale}`]}</FullInfoText>
        {/*<SharedWrapperCol>*/}
        {/*  <ShareLabel>{pageContext.localeResources.translation.news.share}</ShareLabel>*/}
        {/*  <FacebookShare*/}
        {/*    url={urlShared}*/}
        {/*    children={<FacebookIcon />}*/}
        {/*  />*/}

        {/*  <LinkedinShare*/}
        {/*    url={urlShared}*/}
        {/*    children={<LinkdinIcon />}*/}
        {/*  />*/}
        {/*</SharedWrapperCol>*/}
        <FullNewsPage>
          {data.map((item, index) => (
            (item.id !== el.id && index <= size) ? (
              <NewsItems
                to={`/${locale}/news/${item.id}`}
                key={index}
                margin={item.margin}
              >
                <ImageWrapper>
                  <img style={{ width: "100%" }} src={apiUrl + item.image} alt="" />
                </ImageWrapper>
                <TextPart>
                  <Title>{item[`title_${locale}`]}</Title>
                  <NewsText>{item[`description_${locale}`]}</NewsText>
                  <MoreRow>
                    <DataItem>{moment(item.date).format("DD.MM.YYYY")}</DataItem>
                    <SeeMoreSingleNews
                      className="see_more_btn"
                    > {/*{pageContext.localeResources.translation.news.see_more}*/}
                    </SeeMoreSingleNews>
                  </MoreRow>
                </TextPart>
              </NewsItems>
            ) : ""
          ))}
        </FullNewsPage>
      </NewsPageWrapper>
    </>

  )
}
export default FullInfo