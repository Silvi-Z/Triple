import styled from "styled-components"
import { Row, Col } from "antd"
export const ParagraphRow = styled(Row)`
  padding: 0 15%;
  margin-bottom: 2.8%;
  @media (min-width: 1600px) {
    padding: 0 0%;
    margin-bottom: 1%;
  }
  @media only screen and (max-width: 1170px) {
    padding: 0 10.5%;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 49px;
    padding: 0 3.5%;
  }
  @media only screen and (max-width: 375px) {
    margin-bottom: 10px;
    padding: 0 3.5%;
  }
  @media only screen and (max-width: 320px) {
    margin-bottom: 10px;
    padding: 0 2.5%;
  }
`
export const H2Styled = styled.h2`
  width: 119px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`
export const PStyled = styled.p`
  width: 768px;
  height: 76px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  @media only screen and (max-width: 1920px) {
    width: 968px;
    height: 76px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 1170px) {
    width: 768px;
    height: 76px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  @media only screen and (max-width: 768px) {
    max-width: 639px;
    max-height: 106px;
    margin-left: 0%;
    margin-bottom: 40px;
  }
  @media only screen and (max-width: 375px) {
    width: 288px;
    height: 226px;
    font-family: ArialAMU;
  }
  @media only screen and (max-width: 320px) {
    width: 288px;
    height: 226px;
    font-family: ArialAMU;
  }
`
export const NumberCol = styled(Col)`
  max-width: 602px;
  max-height: 55px;
  padding-top: 2%;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  margin-top: 1.4%;
  @media (min-width: 1600px) {
    max-width: 618px;
    padding-top: 1.3%;
    margin-left: 18.4%;
  }
  @media only screen and (max-width: 1170px) {
    max-width: 602px;
    max-height: 54px;
    margin-left: 15%;
  }
  @media only screen and (max-width: 768px) {
    max-width: 562px;
    max-height: 54px;
    margin-left: 15%;
  }
  @media (max-width: 375px) {
    max-width: 290px;
    max-height: 54px;
    margin-left: 2%;
    padding-top: 5%;
  }
  @media (max-width: 320px) {
    max-width: 290px;
    max-height: 54px;
    margin-left: -2%;
    padding-top: 5%;
  }
`
export const AdressMapCol = styled(Col)`
  max-width: 602px;
  max-height: 410px;
  padding-top: 1%;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  margin-top: 1.4%;
  padding-bottom: 18px;
  @media (min-width: 1600px) {
    max-width: 618px;
    margin-left: 18.4%;
  }
  @media only screen and (max-width: 1170px) {
    max-width: 602px;
    max-height: 410px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    margin-left: 15%;
    padding-bottom: 18px;
  }
  @media only screen and (max-width: 768px) {
    max-width: 562px;
    max-height: 410px;
    margin-left: 15%;
  }
  @media (max-width: 375px) {
    max-width: 290px;
    max-height: 250px;
    margin-left: 2%;
    padding-top: 5%;
  }
  @media (max-width: 320px) {
    max-width: 290px;
    max-height: 250px;
    margin-left: -2%;
    padding-top: 5%;
  }
`
export const AddressSpan = styled.span`
  width: 142px;
  height: 16px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;

  @media only screen and (max-width: 375px) {
    width: 142px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    width: 235px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
    a {
      font-size: 12px;
      color: #009db8;
      font-family: ArialAMU;
    }
  }
`
export const ContactAdressWrap = styled(Col)`
  height: 40px;
  display: flex;
  justify-content: center;
  padding-top: 2%;
  @media only screen and (max-width: 1170px) {
    height: 40px;
    font-family: ArialAMU;
    font-size: 15px;
    padding-top: 2.5%;
  }
  @media only screen and (max-width: 375px) {
    width: 290px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    width: 290px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
  }
`
export const MapCol = styled(Col)`
  padding: 2% 3%;
`
export const Mapiframe = styled.iframe`
  width: 564px;
  height: 340px;
  border: 0;
  @media only screen and (max-width: 375px) {
    width: 290px;
    height: 180px;
    margin-top: 10px;
  }
  @media only screen and (max-width: 320px) {
    width: 290px;
    height: 180px;
    margin-top: 10px;
  }
`
export const EnvironmentWrapper = styled.img`
  width: 18px;
  height: 18px;
  margin-bottom: 0%;
`
export const HeadingParagrCol = styled(Col)`
  @media only screen and (max-width: 1170px) {
    margin-left: 3.8%;
  }
  @media only screen and (max-width: 375px) {
    margin-left: 0%;
    margin-bottom: 13%;
  }
  @media only screen and (max-width: 320px) {
    margin-left: 0%;
    margin-bottom: 13%;
  }
`
export const CallIconWrapper = styled.img`
  width: 20px;
  height: 20px;
  color: #000000;
  margin-top: 0.4%;
`
export const ContactNumberWrap = styled.div`
  width: 240px;
  height: 15px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  margin-left: 11px;
  color: #000000;
  margin-top: 0.4%;
  @media only screen and (max-width: 375px) {
    width: 235px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    width: 235px;
    height: 15px;
    font-family: ArialAMU;
    font-size: 15px;
    padding: 0 0%;
  }
`

export const FormRow = styled(Row)`
  padding: 0 12%;
  @media (min-width: 1600px) {
    padding: 0 0%;
  }
  @media only screen and (max-width: 1024px) {
    padding: 0 8%;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 0%;
  }
  @media only screen and (max-width: 375px) {
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    padding: 0 0%;
  }
`
export const FormColumn = styled(Col)`
  margin-left: 17%;
  max-width: 602px;
  max-height: 645px;
  box-shadow: 0px 5px 40px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  padding: 1% 5%;
  @media (min-width: 1600px) {
    margin-left: 33%;
    padding: 0.8% 4%;
    max-width: 618px;
  }
  @media only screen and (max-width: 1170px) {
    margin-left: 16.5%;
    padding: 1% 4%;
    /* max-width: 562px;
    max-height: 700px; */
  }
  @media only screen and (max-width: 768px) {
    margin-left: 15%;
    max-width: 562px;
    max-height: 700px;
  }
  @media only screen and (max-width: 375px) {
    max-width: 290px;
    font-size: 15px;
    padding: 0 0%;
    margin-left: 2%;
  }
  @media only screen and (max-width: 320px) {
    max-width: 290px;
    font-size: 15px;
    padding: 0 0%;
    margin-left: -3%;
  }
`
export const ContactNavRow = styled(Row)`
  padding: 0 20%;
  margin-bottom: 3%;
  @media (min-width: 1600px) {
    padding: 0 0%;
    margin-bottom: 3%;
  }
  @media only screen and (max-width: 1170px) {
    padding: 0 13.6%;
  }
  @media only screen and (max-width: 1024px) {
    padding: 0 10.6%;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    padding: 0 0%;
  }
`
export const ContactMapRow = styled(Row)`
  margin-left: 18%;
  margin-bottom: 3%;
  @media only screen and (max-width: 1170px) {
    margin-left: 0%;
    padding: 0 13.6%;
  }
  @media only screen and (max-width: 1024px) {
    margin-left: 0%;
    padding: 0 9.6%;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 0%;
  }
  @media only screen and (max-width: 320px) {
    padding: 0 0%;
  }
`
export const IndividCol = styled(Col)`
  max-width: 294px;
  height: 50px;
  text-align: center;
  padding-top: 1.6%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: ${props => (props.open ? "#009db8" : "#ffffff")};
  > span {
    width: 205px;
    height: 16px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${props => (props.open ? "#ffffff" : "#009db8")};
  }
  &:hover {
    background-color: #009db8;
    cursor: pointer;
    span {
      color: white;
    }
  }
  @media (min-width: 1600px) {
    padding-top: 0.9%;
  }
  @media only screen and (max-width: 1170px) {
    margin-left: 15%;
    max-width: 294px;
  }
  @media only screen and (max-width: 375px) {
    margin-left: 2%;
    max-width: 290px;
    padding-top: 3.6%;
    margin-bottom: 5%;
    > span {
      width: 143px;
      height: 15px;
      font-family: ArialAMU;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: ${props => (props.open ? "#ffffff" : "#009db8")};
    }
  }
  @media only screen and (max-width: 320px) {
    margin-left: 2%;
    max-width: 390px;
    padding-top: 3.6%;
    margin-bottom: 5%;
    > span {
      width: 143px;
      height: 15px;
      font-family: ArialAMU;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: ${props => (props.open ? "#ffffff" : "#009db8")};
    }
  }
`
export const CompanyCol = styled(Col)`
  max-width: 294px;
  height: 50px;
  text-align: center;
  padding-top: 1.4%;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: ${props => (props.open ? "#009db8" : "#ffffff")};
  margin-left: 1.6%;
  > span {
    width: 205px;
    height: 16px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: ${props => (props.open ? "#ffffff" : "#009db8")};
  }
  &:hover {
    background-color: #009db8;
    cursor: pointer;
    span {
      color: white;
    }
  }
  @media (min-width: 1600px) {
    padding-top: 0.9%;
  }
  @media only screen and (max-width: 1170px) {
    margin-left: 1.5%;
    max-width: 294px;
  }
  @media only screen and (max-width: 1024px) {
    margin-left: 1.5%;
    max-width: 294px;
  }
  @media only screen and (max-width: 768px) {
    margin-left: 2%;
    max-width: 294px;
  }
  @media only screen and (max-width: 375px) {
    margin-left: 2%;
    max-width: 290px;
    padding-top: 3.6%;
    margin-bottom: 5%;
    > span {
      width: 143px;
      height: 15px;
      font-family: ArialAMU;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: ${props => (props.open ? "#ffffff" : "#009db8")};
    }
  }
  @media only screen and (max-width: 320px) {
    margin-left: 2%;
    max-width: 290px;
    padding-top: 3.6%;
    margin-bottom: 5%;
    > span {
      width: 143px;
      height: 15px;
      font-family: ArialAMU;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: center;
      color: ${props => (props.open ? "#ffffff" : "#009db8")};
    }
  }
`
