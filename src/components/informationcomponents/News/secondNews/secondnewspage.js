import React from "react"
import { Row, Col } from "antd"
import Img1 from "../../../../assets/informimages/src6821.jpg"
import BottomImg from "../../../../assets/informimages/newsimage.png"
import {
  ContainerNews,
  NewsCol,
  ImagesCol,
  H2Styled,
  ImagesH2Styled,
  H3Styled,
  RowArticle,
  ArtCol1,
  ArtCol2,
  ArtCol3,
  BottomImgWrapper,
  WrapperImg,
  Image,
  RightImgTextH4,
  RightImgTextSpan,
} from "./secondnewsStyle"
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
