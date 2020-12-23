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

const UsefulNews = ({news, lang , buttonDisplay, setButtonDisplay }) => {

  let [items, setItems] = useState(6)

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
              to={`/${lang}/news#${item.id}`}
              state={{modal: true}}
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
                  <DataItem>{moment(item.date).format("DD.MM.YYYY")}</DataItem>
                    <SeeMoreSingleNews
                      className="see_more_btn"
                    > տեսնել ավելին
                    </SeeMoreSingleNews>
                </MoreRow>
              </TextPart>
            </NewsItems>
          ) : null
        ))}
      </NewsPage>
        <SeeMoreNews
          buttonDisplay ={buttonDisplay}
          onClick={addNews}
          className="see_more_btn"
        > ՏԵՍՆԵԼ ԱՎԵԼԻՆ
        </SeeMoreNews>
    </ContainerNews>
  )
}

export default UsefulNews