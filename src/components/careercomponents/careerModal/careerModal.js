import React from "react"
import { Modal, Button } from "antd"
import styled from "styled-components"
import ModalImg from "../../../assets/modal/email.png"
import "./modalStyle.css"
import {
    Img,
    H2,
    P
} from "./ModalStyle"

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
