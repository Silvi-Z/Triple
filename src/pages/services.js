import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import ServiceDropWrap from '../components/servicecomponents/servicedrop';
import CalcImg from '../assets/homeImages/icons/calculator.svg';
import TaxImg from '../assets/homeImages/icons/tax.svg';
import AuditImg from '../assets/homeImages/icons/audit.svg';
import ClientImg from '../assets/homeImages/icons/client.svg';
import BrowserImg from '../assets/homeImages/icons/browser.svg';
import UserImg from '../assets/homeImages/icons/user.svg';
import LawImg from '../assets/homeImages/icons/law.svg';
import TeamImg from '../assets/homeImages/icons/teamwork.svg';

const HeadingParagraphRow = styled(Row)`
  padding: 0 12%;
  margin-bottom: 2.8%;
  @media (min-width: 1600px) {
    padding: 0 0%;
    margin-bottom: 2.8%;
  }
  @media only screen and (max-width: 1366px) {
    padding: 0 4%;
    margin-bottom: 2.8%;
  }
  @media only screen and (max-width: 1170px) {
    padding: 0 0%;
    margin-bottom: 2.8%;
  }
  @media only screen and (max-width: 768px) {
    padding-top: 49px;
    padding-left: 8.8%;
    padding-right: 0%;
    margin-bottom: 100px;
  }
`;
const H2Styled = styled.h2`
  width: 155px;
  height: 18px;
  font-family: ArialAMU;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000000;
  text-align: left;
`;
const PStyled = styled.p`
  height: 46px;
  font-family: ArialAMU;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 50px;
  @media only screen and (max-width: 375px) {
    width: 289px;
    height: 103px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 200px;
  }
  @media only screen and (max-width: 320px) {
    width: 289px;
    height: 103px;
    font-family: ArialAMU;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 200px;
  }
`;

const Services = ({ location, ...props }) => {
  const [servicedata, setservicedata] = useState([]);

  const getServiceData = () => {
    setservicedata([
      {
        status: true,
        data: {
          id: 0,
          image: CalcImg,
          paragraph: 'Հաշվապահական հաշվառում',
          text:
            'Հաշվապահական հաշվառման ճշգրիտ վարումը բիզնեսի կարեւորագույն գործառույթներից է, որը օգնում է զերծ մնալ տարատեսակ ֆինանսական կորուստներից։ Հաշվապահական հաշվառումը իրականացվում է միջազգային ստանդարտներին համապատասխան՝ ՀԾ եւ 1C հաշվապահական ծրագրերի միջոցով։',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 1,
          image: TaxImg,
          paragraph: 'Հարկային աուդիտ եւ հաշվառում',
          text:
            'Իրականացնելով հարկային աուդիտ, կստուգենք կազմված հարկային հաշվետվությունների ճշտությունը, կհայտնաբերենբք հարկային ռիսկեր պարունակող գործարքները, կօգնենք ընտրել Ձեր ընկերության համար ամենաշահեկան հարկման դաշտը եւ ճիշտ պլանավորել հարկերը՝ խուսափելով հավելյալ հարկային պարտավորություններից, տարատեսակ տույժերից եւ տուգանքներից։',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      // {
      //   status: true,
      //   data: {
      //     id: 2,
      //     image: AuditImg,
      //     paragraph: 'Հարկային աուդիտ',
      //     text:
      //       'Իրականացնելով հարկային աուդիտ, կստուգենք կազմված հարկային հաշվետվությունների ճշտությունը, կհայտնաբերենբք հարկային ռիսկեր պարունակող գործարքները, կօգնենք ընտրել Ձեր ընկերության համար ամենաշահեկան հարկման դաշտը եւ ճիշտ պլանավորել հարկերը՝ խուսափելով հավելյալ հարկային պարտավորություններից, տարատեսակ տույժերից եւ տուգանքներից։',
      //     name_arm: 'string',
      //     name_ru: 'string',
      //     name_en: 'string',
      //   },
      //   open: false,
      // },
      {
        status: true,
        data: {
          id: 2,
          image: ClientImg,
          paragraph: 'Խորհրդատվություն',
          text:
            'Ձեզ հետաքրքրող հարցերի շուրջ խորհրդատվություն ստանալու համար կարողեք դիմել մեզ, եւ մենք կտրամադրենք բարձրակարգ մասնագիտական խորհրդատվություն։',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 3,
          image: BrowserImg,
          paragraph: 'Կազմակերպության գրանցում',
          text:
            'Բիզնես գործունություն ծավալելու ամենատարածված եղանակը կազմակերպության, հիմնականում, ՍՊԸ գրանցումն է: ՍՊԸ գրանցման միջոցով բիզնես գործունություն ծավալելու նպատակահարմարությունը պայմանավորված է առաջին հերթին սահմանափակ պատասխանատվություն կրելու օրենսդրական հնարավորությամբ: Մեր մասնագետները կօգնեն Ձեր կազմակերությանը հանդես գալ իր անունից, ունենալ սեփականության իրավունքով իրեն ամրակցված գույք և պատասխանատվություն  կրել միայն այդ գույքի համար: Պետական գրանցում ստանալու պահից  Ձեր  կազմակերությունը ձեռք  կբերի իրավունքներ և կստանձնի պարտականություններ:',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 4,
          image: LawImg,
          paragraph: 'Ֆիզիկական անձինք',
          text:
            'Ըստ հարկային օրենսգրքի՝ ֆիզիկական անձանց կողմից կատարված որոշակի գործարքների արդյունքում առաջանում են հարկային պարտավորություններ, որոնց համար պետք է ներկայացվեն համապատասխան հաշվետվություններ։ Առաջարկում ենք հաշվետվությունների կազմման եւ հարկային մարմին ներկայացման ծառայություններ։',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 5,
          image: UserImg,
          paragraph: 'Մաքսային գործարքներ',
          text:
            'Դիմեք մեզ ապրանքների ներմուծման եւ արտահանման գործարքների համար անհրաժեշտ հարկային եւ մաքսային փաստաթղթերի կազմման եւ համապատասխան պետական մարմիններ ներկայացման համար։',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 6,
          image: TeamImg,
          paragraph: 'Կադրային Աշխատանք',
          text:
            'Մենք կհեշտացնենք Ձեր կազմակերպության աշխատանքը՝ ամբողջությամբ մեզվրա վերցնելով կադրային աշխատանքի վարումը: Մենք առաջարկում ենք հետեւյալ ծառայությունները ՝ աշխատանքային եւ ծառայությունների մատուցման պայմանագրերի, ինչպես նաեւ համաձայնագրերի կազմում, գործատուի ներքին եւ անհատական իրավական ակտերի կազմում, աշխատաժամանակի եւ աշխատավարձի հաշվարկում, տեղեկագրերի կազմում,եկամտային հարկի եւ սոցիալական վճարի անձնավորված հաշվառում։',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
    ]);
  };

  useEffect(() => {
    getServiceData();
  }, []);

  const toggle = current => {
    const data = servicedata.map(d =>
      d.data.id === current.data.id && d.open === false
        ? { ...d, open: true }
        : d.data.id !== current.data.id && d.open === true
          ? { ...d, open: false }
          : { ...d, open: false }
    );
    setservicedata(data);
  };

  return (
    <Layout>
      <HeadingParagraphRow>
        <Col lg={{ span: 22, offset: 2 }} xl={{ span: 24, offset: 2 }} xxl={{ span: 18, offset: 4 }}>
          <H2Styled>Ծառայություններ</H2Styled>
          <PStyled>
            Թրիփլ Քոնսալթինգի կողմից մատոցվող հաշվապահական համալիր ծառայությունների միջոցով մոռացեք հաշվապահական հաշվառման հետկապած խնդիրների մասին, խուսափեք հավելյալ հարկային բեռից, խնայեք ժամանակ՝ նվիրելով այն Ձեր բիզնեսի առաջխաղացմանը։ Մեր ընկերության մատուցվող ծառայություններին կարող եք ծանոթանալ ստորև:
          </PStyled>
        </Col>
      </HeadingParagraphRow>
      {servicedata.map((d, id) => (
        <ServiceDropWrap showServiceForm={toggle} data={d} key={id} />
      ))}
    </Layout>
  );
};
export default Services;
