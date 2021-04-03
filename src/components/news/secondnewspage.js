import React, { useState } from "react"

import {
  ContainerNews,
  ImageWrapper,
  NewsItems,
  NewsPage,
  TextPart,
  Title,
  NewsText,
  MoreRow,
  DataItem,
  SeeMoreNews,
  SeeMoreSingleNews,
} from "./newsStyle"

import moment from "moment"
import { NavLink } from "../homecomponents/homePartners/homePartStyle"

const UsefulNews = ({news, lang , buttonDisplay, setButtonDisplay, apiUrl,pageContext }) => {

  let [items, setItems] = useState(news.length<6 ? news.length : 6)
  news.length < 6 && setButtonDisplay(false)
  const addNews = () => {
    setItems(items + 6);
    items + news.length%items === news.length ? setButtonDisplay(false) : setButtonDisplay(true)
  }

  return (
    <ContainerNews>
      <NewsPage>
        {news.map((item, index) => (
          (index < items) ? (
            <NewsItems
              to={`/${lang}/news/${item.id}`}
              state={{modal: true}}
              key={index}
              margin={item.margin}
            >
              <ImageWrapper>
                <img style={{ width: "100%" }} src={apiUrl + item.image} alt="" />
              </ImageWrapper>
              <TextPart>
                <Title>{item.title_arm}</Title>
                <NewsText>{item.description_arm}</NewsText>
                <MoreRow>
                  <DataItem>{moment(item.created_at.substring(0, 10)).format("DD.MM.YYYY")}</DataItem>
<<<<<<< HEAD
                  <SeeMoreSingleNews
                    className="see_more_btn"
                  > {pageContext.localeResources.translation.news.see_more}
                  </SeeMoreSingleNews>
=======
                    <SeeMoreSingleNews
                      className="see_more_btn"
                    > {pageContext.localeResources.translation.news.see_more}
                    </SeeMoreSingleNews>
>>>>>>> 6d4240366474c37d19592bae8948e1ab8687dc84
                </MoreRow>
              </TextPart>
            </NewsItems>
          ) : null
        ))}
      </NewsPage>
<<<<<<< HEAD
      <SeeMoreNews
        buttonDisplay ={buttonDisplay}
        onClick={addNews}
        className="see_more_btn"
      > {pageContext.localeResources.translation.news.see_more}
      </SeeMoreNews>
=======
        <SeeMoreNews
          buttonDisplay ={buttonDisplay}
          onClick={addNews}
          className="see_more_btn"
        > {pageContext.localeResources.translation.news.see_more}
        </SeeMoreNews>
>>>>>>> 6d4240366474c37d19592bae8948e1ab8687dc84
    </ContainerNews>
  )
}

export default UsefulNews