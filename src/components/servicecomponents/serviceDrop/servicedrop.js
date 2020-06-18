/*eslint-disable */
import React from "react"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
import {
  ServiceDropRow,
  ToggleH2Styled,
  HeadIcon,
  ToggleButton,
  SubParagStyled,
  DropHeadingIconCol,
  DropHeadingParagraphCol,
  DropButtonCol,
  DropTextCol,
  SharedWrapperCol,
  FaceLink,
  ShareLabel,
  LinkedinLink,
  FacebookIcon,
  LinkdinIcon
} from "./servicedropStyle.js"
import {
  FacebookShareButton,
  LinkedinShareButton,
} from "react-share"
import { Helmet } from "react-helmet"

const Servicedrop = ({ data, showServiceForm }) => {

  return (
    <ServiceDropRow align="middle" gutter={[10, 30]}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.data.paragraph}</title>
        <meta property="og:title" content={data.data.paragraph} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="http://triple-c.algorithm.am/services/" />
      </Helmet>
      <DropHeadingIconCol
        xxl={{ span: 2, offset: 4 }}
        xl={{ span: 2, offset: 2 }}
        lg={{ span: 2, offset: 1 }}
        xs={{ span: 3, offset: 0 }}
      >
        <HeadIcon src={data.data.image} alt={"icon"} />
      </DropHeadingIconCol>
      <DropHeadingParagraphCol xxl={13} xl={18} lg={18} xs={16}>
        <ToggleH2Styled>{data.data.paragraph}</ToggleH2Styled>
      </DropHeadingParagraphCol>
      <DropButtonCol lg={2} xl={2} xxl={2} md={2} xs={4}>
        <ToggleButton block onClick={() => showServiceForm(data)}>
          {data.open ? (
            <MinusOutlined style={{ fontSize: "20px" }} />
          ) : (
              <PlusOutlined style={{ fontSize: "20px" }} />
            )}
        </ToggleButton>
      </DropButtonCol>
      {data.open ? (
        <DropTextCol span={24}>
          <SubParagStyled>{data.data.text}</SubParagStyled>
          <SharedWrapperCol span={5} offset={4}>
            <ShareLabel>Կիսվել</ShareLabel>
            {/* <FaceLink
            onClick={Fbinit}
            onClick={() =>
              window.open(
                "https://www.facebook.com/sharer/sharer.php?u=http://triple-c.algorithm.am/career/",
                "Facebook",
                "Popup",
                "toolbar=yes, location=no, statusbar=no, menubar=yes, scrollbars=1, resizable=0, width=580, height=600, top=30"
              )
            }
            alt="ssds"
            target="_blank"
            rel="noopener"
          >
            <FacebookIcon />
          </FaceLink> */}
            <FacebookShareButton
              url="http://triple-c.algorithm.am/services/"
              children={<FacebookIcon />}
              hashtag={"Avag HAshvapah"}
            />
            {/* <FacebookIcon />

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
              url="http://triple-c.algorithm.am/services/"
            ></LinkedinShareButton>
          </SharedWrapperCol>
        </DropTextCol>
      ) : null}
    </ServiceDropRow>
  )
}

export default Servicedrop
