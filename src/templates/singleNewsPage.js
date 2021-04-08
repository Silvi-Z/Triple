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

const FullInfo = ({  pageContext, pageContext: {toPath, fromPath,originalPath,page, el, locale, apiUrl, data } }) => {

  let urlShared
  const getSharedUrl = lng => {
    if (lng === "en") {
      return "http://triple-c.algorithm.am/en/news/"
    } else {
      return "http://triple-c.algorithm.am/arm/news/"
    }
  }
  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
  }
  const [ single, setSingle] = useState({})
  data.findIndex (item=> {
    if(item.id === el.id){
      useEffect(()=>{
        triple.get(`/api/news/${el.id}`)
          .then(res =>{
            setSingle(res.data.data)
          } )
          .catch(err => console.log(err))
      }, [])
    }
  })
  console.log("single", single)

  // const index = data.findIndex(item => item.id === el.id)
  // data.splice(index, 1)
  const finalData = data.slice(0, 3)
  console.log("finalData", finalData)
  console.log("data", data)
  const settings = {
    infinite: true,
    swipe: true,
    slidesToShow:2,
    arrows: false,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      }],
  }
  hookComponent()
  return (
    <>
      <NewsPageWrapper>
        <BigImageInfo>
          <Img src={single.image && apiUrl + single.image} alt="" />
        </BigImageInfo>
        <TitleRow>
          <H2> {single && single[`title_${locale}`]} </H2>
          <P>{single && single.date}</P>
        </TitleRow>
        <FullInfoText>{single && single[`description_${locale}`]}</FullInfoText>
        <SharedWrapperCol>
          <ShareLabel>{pageContext.localeResources.translation.news.share}</ShareLabel>
          <FacebookShare
            url={urlShared}
            children={<FacebookIcon />}
          />

          <LinkedinShare
            url={urlShared}
            children={<LinkdinIcon />}
          />
        </SharedWrapperCol>
        <FullNewsPage {...settings}>
          {finalData.map((item, index) => (
            <NewsItems
              className="singleNews"
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
                  > {pageContext.localeResources.translation.news.see_more}
                  </SeeMoreSingleNews>
                </MoreRow>
              </TextPart>
            </NewsItems>
          ))}
        </FullNewsPage>
      </NewsPageWrapper>
    </>
  )
}
export default FullInfo