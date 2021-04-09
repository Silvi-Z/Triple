import moment from "moment"
import React from "react"
import {
  ContainerNews,
  DataItem,
  ImageWrapper,
  MoreRow,
  NewsItems, NewsPage,
  NewsText,
  SeeMoreSingleNews,
  TextPart,
  Title,
} from "./newsStyle"


const NewsLoad = () =>{
  return (
      <ContainerNews>
        <NewsPage>
    <NewsItems>
      <ImageWrapper style={{background: '#D0D0D0'}}>

      </ImageWrapper>
      <TextPart>
        <Title style={{background: '#D0D0D0', height: '16px'}}/>
        <Title style={{background: '#D0D0D0', height: '16px', width: '40%'}}/>
        <NewsText style={{background: '#D0D0D0', height: '16px'}}/>
        <MoreRow>
          <DataItem style={{background: '#D0D0D0', height: '16px'}}/>
          <SeeMoreSingleNews
            className="see_more_btn"
            style={{background: '#D0D0D0', borderColor: '#D0D0D0'}}
          />
        </MoreRow>
      </TextPart>
    </NewsItems>
      <NewsItems>
      <ImageWrapper style={{background: '#D0D0D0'}}>

      </ImageWrapper>
        <TextPart>
          <Title style={{background: '#D0D0D0', height: '16px'}}/>
          <Title style={{background: '#D0D0D0', height: '16px', width: '40%'}}/>
          <NewsText style={{background: '#D0D0D0', height: '16px'}}/>
          <MoreRow>
            <DataItem style={{background: '#D0D0D0', height: '16px'}}/>
            <SeeMoreSingleNews
              className="see_more_btn"
              style={{background: '#D0D0D0', borderColor: '#D0D0D0'}}
            />
          </MoreRow>
        </TextPart>
    </NewsItems>
      <NewsItems>
      <ImageWrapper style={{background: '#D0D0D0'}}>

      </ImageWrapper>
        <TextPart>
          <Title style={{background: '#D0D0D0', height: '16px'}}/>
          <Title style={{background: '#D0D0D0', height: '16px', width: '40%'}}/>
          <NewsText style={{background: '#D0D0D0', height: '16px'}}/>
          <MoreRow>
            <DataItem style={{background: '#D0D0D0', height: '16px'}}/>
            <SeeMoreSingleNews
              className="see_more_btn"
              style={{background: '#D0D0D0', borderColor: '#D0D0D0'}}
            />
          </MoreRow>
        </TextPart>
    </NewsItems>
        </NewsPage>
      </ContainerNews>

  )
}

export default NewsLoad