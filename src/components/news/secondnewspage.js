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
import img from "../../assets/newsImages/news_img1.png"
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
                  {/*<NavLink>*/}
                    <SeeMoreSingleNews
                      className="see_more_btn"
                    > ԱՎԵԼԻՆ
                    </SeeMoreSingleNews>
                  {/*</NavLink>*/}
                </MoreRow>
              </TextPart>
            </NewsItems>
          ) : null
        ))}
      </NewsPage>
      <NavLink
        to={`/${lang}/news#`}
      >
        <SeeMoreNews
          buttonDisplay ={buttonDisplay}
          onClick={addNews}
          className="see_more_btn"
        > ՏԵՍՆԵԼ ԱՎԵԼԻՆ
        </SeeMoreNews>
      </NavLink>
    </ContainerNews>
  )
}

export default UsefulNews