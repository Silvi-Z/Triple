import React, { useEffect, useState } from "react"
import SEO from "../../components/seo"
import UsefulNews from "../../components/news/secondnewspage"
import { Select } from "antd"
import newsDatas from "../../components/news/newsDatas"
import moment from "moment"
import "moment/locale/zh-cn"
import {
  NewsPageWrapper,
  NewsDatePicker,
  SearchInput,
  StyledForm,
  H1Element,
  SearchRow,
  SelectBox,
  NoResult,
  NoResultTitle,
  NoResultText, NewsItems,
} from "../../components/news/newsStyle"
import { useLocation } from "@reach/router"
import FullInfo from "../../components/news/fullNews"


const { Option } = Select

const Index = ({ pageContext }) => {
  const [buttonDisplay, setButtonDisplay] = useState(true)
  const location = useLocation()
  let urlShared
  const [data, setData] = useState(newsDatas)
  const [selectedDate, setSelectedDate] = useState(newsDatas)

  const getSharedUrl = lng => {
    if (lng) {
      return `http://triple-c.algorithm.am/${lng}/news${location.hash}`
    }
  }

  const hookComponent = () => {
    urlShared = getSharedUrl(pageContext.locale)
  }

  let setlocationHash = false
  if (location.hash.length > 0) {
    setlocationHash = true
  }

  hookComponent()

  const showInput = e => e.target.classList.add("focus_input")

  const noneInput = e => e.target.value.length === 0 ? e.target.classList.remove("focus_input") : ""

  const handleChange = date => {
    if(date){
      const selectedData = date.format("DD-MM-YYYY").replaceAll("-", ".")
      const data = newsDatas.filter(item => item.date.includes(selectedData))
      setData(data)
      const shownNewses = document.querySelectorAll(NewsItems).length
      data.length <= 6
        ? setButtonDisplay(false) :
        data.length > 6 && data.length % 6 < 6 && shownNewses === data.length
          ? setButtonDisplay(false)
          : setButtonDisplay(true);

    (data.length < 1) ? setDisplay(true) : setDisplay(false)
  }
  }
  const filteredDate = selectedDate.filter(item => item.id.includes(location.hash.substring(1)))

  const [display, setDisplay] = useState(false)

  const onChange = (e) => {
    const data = newsDatas.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setData(data)
    // (data.length < 1) ? setDisplay(true) : setDisplay(false)
  }
  return (
    <NewsPageWrapper>
      <SEO
        pageContext={pageContext}
      />
      {!setlocationHash ? (
          <>
            <H1Element>Նորություններ</H1Element>
            <SearchRow>
              <StyledForm>
                <StyledForm.Item>
            <span className="search_row">
            <SearchInput
              type="text"
              onChange={onChange}
              onFocus={showInput}
              onBlur={noneInput}
              placeholder="Փնտրել"
            />
            </span>
                </StyledForm.Item>
              </StyledForm>
              <NewsDatePicker
                format={"DD-MM-YYYY"}
                defaultValue={moment()}
                onChange={handleChange}
                suffixIcon={
                  <span>
                    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 9.5H4V11.5H14V9.5ZM16 2.5H15V0.5H13V2.5H5V0.5H3V2.5H2C0.89 2.5 0.00999999 3.4 0.00999999 4.5L0 18.5C0 19.6 0.89 20.5 2 20.5H16C17.1 20.5 18 19.6 18 18.5V4.5C18 3.4 17.1 2.5 16 2.5ZM16 18.5H2V7.5H16V18.5ZM11 13.5H4V15.5H11V13.5Z"
                        fill="#555555" />
                    </svg>
                  </span>
                }
              > </NewsDatePicker>
              <SelectBox>
                <Select defaultValue="Վերջին նորություններ" name="" id="">
                  <Option value="Վերջին նորություններ">Վերջին նորություններ</Option>
                  <Option value="Շատ ընթերցված">Շատ ընթերցված</Option>
                </Select>
              </SelectBox>
            </SearchRow>
            {data.length ?
              <UsefulNews
                news={data}
                lang={pageContext.locale}
                buttonDisplay={buttonDisplay}
                setButtonDisplay={setButtonDisplay}
              />
              : <NoResult>
                <NoResultTitle>Ներողություն, ոչ մի հոդված չի գտնվել</NoResultTitle>
                <NoResultText>Փորձեք որոնել նորից </NoResultText>
              </NoResult>
            }
          </>
        ) :
        <FullInfo filteredData={filteredDate} data={selectedDate} lang={pageContext.locale} pageContext={pageContext}/>

      }
    </NewsPageWrapper>
  )
}

export default Index