/*eslint-disable */
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Col } from "antd"
import CareerWrap from "../components/careercomponents/careerDroping/careerdrop"
import {
  CareerParagraphRow,
  H1Styled,
  PStyled,
} from "../components/careercomponents/careerMainStyle"
import {
  ShareLabel,
  SharedWrapperCol,
  FaceLink,
  LinkedinLink,
  FacebookIcon,
  LinkdinIcon,
} from "../components/careercomponents/careerForm/formStyle"
import { Helmet } from "react-helmet"
import { FacebookShareButton, LinkedinShareButton } from "react-share"
const Career = () => {
  const [careerdata, setcareerdata] = useState([])
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        //eslint-disable-line
        appId: "323009385338778",
        cookie: true,
        xfbml: true,
        version: "v6.0",
      })
    }

      ; (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src =
          "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v7.0&appId=323009385338778&autoLogAppEvents=1"
        fjs.parentNode.insertBefore(js, fjs)
      })(document, "script", "facebook-jssdk")
  })
  const Fbinit = () => {
    console.log(FB)
    // FB.init({
    //   appId: '323009385338778',
    //   status: true,
    //   xfbml: true,
    //   version: 'v2.7' // or v2.6, v2.5, v2.4, v2.3
    // });
    FB.ui(
      {
        method: "share",
        href: "http://triple-c.algorithm.am/career",
        title: "your_title",
        caption: 'your_caption',
        description: 'your_description'
      },
      function (response) {
        console.log(response)
      }
    )
  }
  const getCareerData = () => {
    setcareerdata([
      {
        status: true,
        data: {
          id: 0,
          title_arm: "Ավագ Հաշվապահ",
          title_ru: "string",
          title_en: "string",
          description_arm_1:
            "Հաշվապահական կամ ֆինանսական ոլորտում աշխատանքային փորձ (առնվազն 3 տարի)",
          description_arm_2: "Հաշվապահական ստանդարտների իմացություն,",
          description_arm_3:
            "ՀԾ, 1 C, E-invoicing և այլ հարակից հաշվապահական ծրագրերի իմացություն,",
          description_arm_4: "Microsoft Office փաթեթի իմացություն",
          description_arm_5:
            "Հաշվապահական հաշվառման ստանդարտների լավ տիրապետում",
          description_arm_6:
            "Հաշվապահական հաշվառման ստանդարտների լավ տիրապետում",
          description_ru: "string",
          description_en: "string",
        },
        open: true,
      },
    ])
  }

  useEffect(() => {
    getCareerData()
  }, [])

  const toggle = current => {
    const data = careerdata.map(d =>
      d.data.id === current.data.id && d.open === false
        ? { ...d, open: true }
        : d.data.id !== current.data.id && d.open === true
          ? { ...d, open: false }
          : { ...d, open: false }
    )
    setcareerdata(data)
  }
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <CareerParagraphRow>
        <Col lg={{ span: 24 }} xxl={{ span: 8, offset: 4 }}>
          <H1Styled>Միացիր մեր թիմին</H1Styled>
          <PStyled>
            Մենք միշտ ուրախ ենք ընդլայնել մեր թիմը լավագույն մասնագետներով։ Եթե
            ունեք ցանկություն միանալու մեզ, ապա ուղարկեք Ձեր ինքնակենսագրականը,
            մենք ուրախ ենք տեսնել լավագույններին մեր կազմում։Ստորեւ կարող եք
            ծանոթանալ թափուր աշխատատեղերին։
          </PStyled>
        </Col>
      </CareerParagraphRow>
      {careerdata.map((d, id) => (
        <CareerWrap
          // showForm={showdrop}
          showCareerForm={toggle}
          data={d}
          key={id}
        />
      ))}
      <SharedWrapperCol span={10}>
        <ShareLabel>Կիսվել</ShareLabel>
        <FaceLink
          onClick={Fbinit}
        // onClick={() =>
        //   window.open(
        //     "https://www.facebook.com/sharer/sharer.php?u=http://triple-c.algorithm.am/career/",
        //     "Facebook",
        //     "Popup",
        //     "toolbar=yes, location=no, statusbar=no, menubar=yes, scrollbars=1, resizable=0, width=580, height=600, top=30"
        //   )
        // }
        // alt="ssds"
        //target="_blank"
        //rel="noopener"
        >
          sdsdsdsd
          </FaceLink>
        {/* <FacebookShareButton
            url="http://triple-c.algorithm.am/career/"
            children={<FacebookIcon />}
            hashtag={"Avag HAshvapah"}
          /> */}
        {/* <FacebookIcon /> */}

        {/* <LinkedinLink
            href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/TripleCArmenia/"
            target="_blank"
            rel="noopener"
          >
            <LinkdinIcon />
          </LinkedinLink> */}
        <LinkedinShareButton
          title={`Avag HAshvapah`}
          summary={`Avag HAshvapah`}
          source={`Avag hasvapah`}
          children={<LinkdinIcon />}
          url="http://triple-c.algorithm.am/career/"
        ></LinkedinShareButton>
      </SharedWrapperCol>
    </Layout>
  )
}

export default Career
