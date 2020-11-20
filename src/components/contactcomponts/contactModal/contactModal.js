import React from "react"
import { Modal } from "antd"
import ModalImg from "../../../assets/modal/email.png"
import "./modalStyle.css"
import { Img, H2, P } from "./modalStyle"
const CareerModal = ({ handleOk, modalVisible }) => {
    return (
        <div>
            <Modal
                title={null}
                visible={modalVisible}
                onOk={handleOk}
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{
                  className:'submit_button',
                }}
                bodyStyle={{
                    padding: "5%",
                    textAlign: "center",
                }}
                okText="Փակել"
                closable={false}
            >
                <Img src={ModalImg} />
                <H2>Հարգելի օգտատեր, ձեր նամակն ուղարկված է։</H2>
                <P>Շնորհակալություն մեզ հետ կապ հաստատելու համար։</P>
            </Modal>
        </div>
    )
}

export default CareerModal
