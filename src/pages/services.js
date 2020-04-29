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
            'Ճշգրիտ կազմված ֆինանսական հաշվետվությունները, ինչպես նաև հաշվապահական հաշվառման համակարգը կարևոր գործիքներ են, և մեր հաճախորդները մեզնից ակնկալում են իրենց բիզնեսի ըմբռնում, գործող բիզնես պրոցեսներին ներհատուկ ֆինանսական հաշվառման համակարգի ներդրում ու վարում, և բոլոր գործող օրենսդրական փոփոխությունների վերաբերյալ պատշաճ իրազեկում:',
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
          paragraph: 'Հարկային հաշվառում',
          text:
            'Հայաստանի Հանրապետության տարածքում հարկ վճարողները պարտադիր հաշվառվում են հարկային մարմնում Մենք իրականացնում  ենք հարկային մարմինների չհիմնավորված գործողությունների կանխում, ռիսկերի գնահատում, հարկային բեռի օպտիմալացում և հարկային հաշվառման հետ կապված այլ ծառայություններ:',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 2,
          image: AuditImg,
          paragraph: 'Հարկային աուդիտ',
          text:
            'Մեր մոտեցումը կենտրոնանում է հաճախորդների բիզնեսը և դրա կառավարման առանձնահատկությունները հասկանալու վրա:Սա ապահովում է այն, որ մենք իրականացնում ենք Ձեր հարկային աուդիտը` հաշվի առնելով Ձեր բիզնեսի ոլորտը և կարգավորման վերջին ստանդարտները: Մենք հաշվի ենք առնում այն ռիսկերը, որոնց առջև կանգնած է Ձեր ընկերությունը, այն միջոցները որոնցով ղեկավարությունը կառավարում է դրանք, ինչպես նաև հաշվետվությունների թափանցիկությունը:',
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
          image: ClientImg,
          paragraph: 'Խորհրդատվություն',
          text:
            'Մեր բարձրակարգ մասնագետների օգնությամբ կստանաք խորհրդատվություն հետևյալ ոլորտներում՝ ՖՀՄՍ (IFRS)-ներին անցման,հաշվապահական հաշվառման քաղաքականության մշակման, աշխատանքային հաշվային պլանի մշակման,տիպային գործառնությունների ձեռնարկի մշակման, փաստաթղթավորման և փաստաթղթաշրջանառության մշակման, հաշվապահական հաշվառման գործող համակարգի ուսումնասիրության, թերությունների բացահայտման, դրանց վերացման և գործող ընթացակարգերի բարելավման վերաբերյալ առաջարկությունների և գործողությունների պլանի ներկայացման, ինչպես նաև ինքնարժեքի հաշվառման համակարգի ներդրման:',
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
          id: 5,
          image: LawImg,
          paragraph: 'Ֆիզիկական անձանց',
          text:
            '-հաշվապահական հաշվառման քաղաքականության մշակում - հարկային քաղաքականության մշակում',
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
          image: UserImg,
          paragraph: 'Մաքսային գոծարքներ',
          text:
            '-հաշվապահական հաշվառման քաղաքականության մշակում - հարկային քաղաքականության մշակում',
          name_arm: 'string',
          name_ru: 'string',
          name_en: 'string',
        },
        open: false,
      },
      {
        status: true,
        data: {
          id: 7,
          image: TeamImg,
          paragraph: 'Կադրային աշխատանքի վարում',
          text:
            'Մենք կհեշտացնենք Ձեր կազմակերպության աշխատանքը՝  ամբողջությամբ մեզ վրա վերցնելով կադրային աշխատանքի վարումը:  Մեր արհեստավարժ մասնագետները կմատուցեն հետևյալ ծառայությունները ՝ աշխատանքային և ծառայությունների վճարովի մատուցման պայմանագրերի, ինչպես նաև համաձայնագրերի կազմում, գործատուի ներքին և անհատական իրավական ակտերի կազմում, ներքին կարգապահական կանոնների կազմում, աշխատավարձի հաշվարկավճարային, ինչպես նաև աշխատաժամանակի հաշվարկման տեղեկագրերի կազմում, եկամտային հարկի և սոցիալական վճարի անձնավորված հաշվառում իրականացնելուն առնչվող գործառույթների իրականացում:',
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
            Triple Consulting-ն օգնում է հաճախորդներին հեշտությամբ լուծել բիզնեսում առաջացած խնդիրները՝ գտնելով նոր հնարավորություններ, օգնելով նրանց կառավարել իրենց բիզնեսը առանց հավելյալ խնդիրների: Մեր ընկերությունը մատուցում է  հաշվապահական հաշվառման համալիր ծառայություններ: Համագործակցելով մեզ հետ՝ կստանաք նաև խորհրդատվություն հարկային աուդիտի,մաքսային գործարքների և կադրային աշխատանքի ոլորտներում:
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
