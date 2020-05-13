import React from "react"
import { Modal, Button } from "antd"
import styled from "styled-components"
import ModalImg from "../../assets/modal/email.png"
import "./modalStyle.css"
const Img = styled.img`
  width: 71px;
  height: 68px;
`
const H2 = styled.h2`
   font-family: ArialAMU;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #010101;
`
const P = styled.p`
 font-family: ArialAMU;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #00a9c1;
`

const CloseButton = styled(Button)`
  width: 180px;
  height: 46px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  background-color: #009db8;
  background: red;
`

const CareerModal = ({ handleOk, modalVisible }) => {

    return (
        <div>
            <Modal
                title={null}
                visible={modalVisible}
                onOk={handleOk}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{
                    style: {
                        width: "180px",
                        height: "46px",
                        backgroundColor: "#009db8"
                    }
                }}
                bodyStyle={{
                    padding: "5%",
                    textAlign: "center",
                }}
                okText="Փակել"
                closable={false}
            // footer={null}
            // onCancel={this.handleCancel}
            >
                <Img src={ModalImg} />
                <H2>Հարգելի օգտատեր, ձեր նամակն ուղարկված է։</H2>
                <P>Շնորհակալություն մեզ հետ կապ հաստատելու համար։</P>
            </Modal>
        </div>
    )
}

export default CareerModal
