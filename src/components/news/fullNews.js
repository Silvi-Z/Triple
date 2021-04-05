// import React, { useEffect, useState } from "react"
// import {
//   BigImageInfo,
//   DataItem,
//   FullInfoText,
//   FullNewsPage,
//   H2,
//   ImageWrapper,
//   Img,
//   MoreRow,
//   NewsItems,
//   NewsText,
//   P,
//   SeeMoreSingleNews,
//   SharedWrapperCol,
//   TextPart,
//   Title,
//   TitleRow,
// } from "./newsStyle"
// import {
//   FacebookIcon,
//   FacebookShare,
//   LinkdinIcon,
//   LinkedinShare,
//   ShareLabel,
// } from "../careercomponents/careerForm/formStyle"
// import moment from "moment"
// import triple from "../../api/triple"
//
// const FullInfo = ({ apiUrl, data, lang, pageContext }) => {
//   const [size, setSize] = useState(3)
// // test
//   const resize = () => {
//     if (window.innerWidth >= 1111) {
//       setSize(3)
//     } else if (768 < window.innerWidth && window.innerWidth < 1111) {
//       setSize(2)
//     } else if (window.innerWidth <= 768) {
//       setSize(1)
//     }
//   }
//   useEffect(() => {
//     resize()
//   })
//   useEffect(() => {
//     if (typeof window !== `undefined`) {
//       window.addEventListener("resize", resize)
//     }
//   })
//   const [news, setNews] = useState([])
//
//   useEffect(() => {
//     let id = location.hash.substring(1)
//     triple.get(`/api/news/${id}`)
//       .then(res => setNews(res.data.data))
//       .catch(err => console.log(err))
//   }, [location.hash])
//
//   let urlShared
//   const getSharedUrl = lng => {
//     if (lng === "en") {
//       return "http://triple-c.algorithm.am/en/news/"
//     } else {
//       return "http://triple-c.algorithm.am/arm/news/"
//     }
//   }
//   const hookComponent = () => {
//     urlShared = getSharedUrl(pageContext.locale)
//   }
//   hookComponent()
//   return (
//     <>
//       <BigImageInfo>
//         <Img src={news.image && apiUrl + news.image} alt="" />
//         {console.log('news && apiUrl + news.image',news.image && apiUrl + news.image)}
//       </BigImageInfo>
//       <TitleRow>
//         <H2> {news && news[`title_${lang}`]} </H2>
//         <P>{news && news.date}</P>
//       </TitleRow>
//       <FullInfoText>{news && news[`description_${lang}`]}</FullInfoText>
//       <SharedWrapperCol>
//         <ShareLabel>{pageContext.localeResources.translation.news.share}</ShareLabel>
//         <FacebookShare
//           url={urlShared}
//           children={<FacebookIcon />}
//         />
//
//         <LinkedinShare
//           url={urlShared}
//           children={<LinkdinIcon />}
//         />
//       </SharedWrapperCol>
//       <FullNewsPage>
//         {data.map((item, index) => (
//           (index < size) ? (
//             <NewsItems
//               to={`/${lang}/news#${item.id}`}
//               onClick={window.scrollTo(0, 0)}
//               key={index}
//               margin={item.margin}
//             >
//               <ImageWrapper>
//                 <img style={{ width: "100%" }} src={apiUrl + item.image} alt="" />
//               </ImageWrapper>
//               <TextPart>
//                 <Title>{item[`title_${lang}`]}</Title>
//                 <NewsText>{item[`description_${lang}`]}</NewsText>
//                 <MoreRow>
//                   <DataItem>{moment(item.date).format("DD.MM.YYYY")}</DataItem>
//                   <SeeMoreSingleNews
//                     className="see_more_btn"
//                   > {pageContext.localeResources.translation.news.see_more}
//                   </SeeMoreSingleNews>
//                 </MoreRow>
//               </TextPart>
//             </NewsItems>
//           ) : ""
//         ))}
//       </FullNewsPage>
//     </>
//
//   )
// }
// export default FullInfo