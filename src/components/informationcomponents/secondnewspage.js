import React from "react"
import styled from "styled-components"
import { Row, Col } from "antd"
import Img1 from "../../assets/informimages/src6821.jpg"
import BottomImg from "../../assets/informimages/newsimage.png"

const ContainerNews = styled.div`
  max-width: 883px;
  height: auto;
  overflow: hidden;
  margin-top: 39px;
  margin-left: 13.5%;
  background-color: #f7f7f7;
  margin: 0 auto;
`

const NewsCol = styled(Col)`
  max-width: 576px;
  height: 955px;
  @media only screen and (max-width: 768px) {
    max-width: 439px;
  }
`
const ImagesCol = styled(Col)`
  max-width: 208px;
  margin-left: 99px;
`
const H2Styled = styled.h2`
  width: 323px;
  height: 33px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-bottom: 8px;
`
const ImagesH2Styled = styled.h2`
  width: 323px;
  height: 33px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-bottom: 19px;
`
const H3Styled = styled.h2`
  width: 137px;
  height: 14px;
  font-family: ArialAMU;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #9d9d9d;
  margin-bottom: 38px;
`
const RowArticle = styled(Row)`
  max-width: 571px;
  max-height: 590px;
  @media only screen and (max-width: 768px) {
    max-width: 439px;
    max-height: 590px;
  }
`
const ArtCol1 = styled(Col)`
  margin-bottom: 2px;
  h2 {
    font-size: 14px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 0px;
  }

  p {
    width: 571px;
    height: 139px;
    font-family: ArialAMU;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 0px;
  }
  @media only screen and (max-width: 768px) {
    max-width: 439px;
  }
`
const ArtCol2 = styled(Col)`
  h2 {
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 0px;
  }

  p {
    width: 571px;
    height: 398px;
    font-family: ArialAMU;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 0px;
  }
  @media only screen and (max-width: 768px) {
    width: 439px;
  }
`
const ArtCol3 = styled(Col)`
  margin-top: 32px;
`
const BottomImgWrapper = styled.img``

const WrapperImg = styled(Col)`
  height: 224px;
  margin-bottom: 15px;
`

const Image = styled.img`
  width: 100%;
  height: 140px;
  margin-bottom: 14px;
`
const RightImgTextH4 = styled.h4`
  width: 207px;
  height: 46px;
  font-family: ArialAMU;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #009db8;
  margin-bottom: 0px;
`
const RightImgTextSpan = styled.span`
  width: 117px;
  height: 12px;
  font-family: ArialAMU;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #9d9d9d;
  margin-bottom: 1%;
  display: block;
`

const UsefulNews = () => {
  return (
    <ContainerNews>
      <Row>
        <NewsCol xxl={15} xl={16} lg={16} md={16}>
          <H2Styled>
            ՀԱՅԱՍՏԱՆԻ ՀԱՆՐԱՊԵՏՈՒԹՅԱՆ ՕՐԵՆՔԸ ՀԱՇՎԱՊԱՀԱԿԱՆ ՀԱՇՎԱՌՄԱՆ ՄԱՍԻՆ
          </H2Styled>
          <hr width="76px" style={{ marginBottom: "7px" }} />
          <H3Styled>25 Փետրվարի 2020թ</H3Styled>
          <RowArticle>
            <ArtCol1 xl={24} lg={24} md={24}>
              <h2>Հոդված 1. Օրենքի նպատակը</h2>
              <p>
                Սույն օրենքը սահմանում է Հայաստանի Հանրապետությունում
                հաշվապահական հաշվառում կազմակերպելու և վարելու, ընդհանուր
                նշանակության ֆինանսական հաշվետվություններ (այսուհետ` ֆինանսական
                հաշվետվություններ) կազմելու և ներկայացնելու միասնական
                հիմունքները, կարգավորում է հաշվապահական հաշվառմանը վերաբերող այլ
                հարաբերություններ:
              </p>
            </ArtCol1>
            <ArtCol2 xl={24} lg={24} md={24}>
              <h2>Հոդված 2. Օրենքի գործողության ոլորտը</h2>
              <p>
                Սույն օրենքը տարածվում է Հայաստանի Հանրապետությունում սահմանված
                կարգով պետական գրանցում ստացած իրավաբանական անձանց (ներառյալ`
                նրանց ստեղծած հիմնարկների), օտարերկրյա կազմակերպությունների
                մասնաճյուղերի և ներկայացուցչությունների (այսուհետ`
                կազմակերպություններ) վրա: Բանկերի, ներդրումային
                ընկերությունների, ապահովագրական ընկերությունների, կարգավորվող
                շուկայի օպերատորի, ինչպես նաև Կենտրոնական դեպոզիտարիայի
                կառավարման մարմինների և գլխավոր հաշվապահի կամ նման
                պարտականություններ իրականացնող անձի միջև այդպիսի իրավունքների ու
                պարտականությունների բաշխման առանձնահատկությունները սահմանվում են
                համապատասխանաբար «Բանկերի և բանկային գործունեության մասին»,
                «Ապահովագրության և ապահովագրական գործունեության մասին» և
                «Արժեթղթերի շուկայի մասին» Հայաստանի Հանրապետության օրենքներով:
                Կառավարությունը սահմանում է նախորդ օրացուցային տարում ստացման
                ենթակա հասույթի 100 միլիոն դրամ մեծությունը չգերազանցող հարկ
                վճարողների համար հարկային հաշվառման հատուկ կանոնակարգ: Սույն
                հոդվածի երրորդ պարբերությամբ սահմանված սուբյեկտները կարող են
                հաշվապահական հաշվառման միջազգային ստանդարտների և միջազգային
                ստանդարտների ուղեցույցների փոխարեն կիրառել հարկային հաշվառման
                հատուկ կանոնակարգը:
              </p>
            </ArtCol2>
            <ArtCol3 span={24}>
              <BottomImgWrapper src={BottomImg} />
            </ArtCol3>
          </RowArticle>
        </NewsCol>
        <ImagesCol xl={6} lg={6} md={6}>
          <ImagesH2Styled>
            Ամենաընթերցված <br /> նորություններ
          </ImagesH2Styled>
          <Row>
            <WrapperImg span={24}>
              <Row>
                <Col span={24}>
                  <Image src={Img1} />
                </Col>
                <Col span={24}>
                  <RightImgTextH4>
                    Հ Հ ՕՐԵՆՔԸ ՀԱՇՎԱՊԱՀԱԿԱՆ ՀԱՇՎԱՌՄԱՆ ՄԱՍԻՆ{" "}
                  </RightImgTextH4>
                </Col>
                <hr width="76px" style={{ marginBottom: "7px" }} />
                <Col span={24}>
                  <RightImgTextSpan>11 Փետրվարի 2020թ</RightImgTextSpan>
                </Col>
              </Row>
            </WrapperImg>
            <WrapperImg span={24}>
              <Col span={24}>
                <Image src={Img1} />
              </Col>
              <Col span={24}>
                <RightImgTextH4 style={{ color: "black" }}>
                  Հ Հ ՕՐԵՆՔԸ ՀԱՇՎԱՊԱՀԱԿԱՆ ՀԱՇՎԱՌՄԱՆ ՄԱՍԻՆ{" "}
                </RightImgTextH4>
              </Col>
              <hr width="76px" style={{ marginBottom: "7px" }} />
              <Col span={24}>
                <RightImgTextSpan>11 Փետրվարի 2020թ</RightImgTextSpan>
              </Col>
            </WrapperImg>
            <WrapperImg span={24}>
              <Col span={24}>
                <Image src={Img1} />
              </Col>
              <Col span={24}>
                <RightImgTextH4 style={{ color: "black" }}>
                  Հ Հ ՕՐԵՆՔԸ ՀԱՇՎԱՊԱՀԱԿԱՆ ՀԱՇՎԱՌՄԱՆ ՄԱՍԻՆ{" "}
                </RightImgTextH4>
              </Col>
              <hr width="76px" style={{ marginBottom: "7px" }} />
              <Col span={24}>
                <RightImgTextSpan>11 Փետրվարի 2020թ</RightImgTextSpan>
              </Col>
            </WrapperImg>
          </Row>
        </ImagesCol>
      </Row>
    </ContainerNews>
  )
}

export default UsefulNews
