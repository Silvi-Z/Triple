import React from "react"
import { Modal } from "antd"
import "./modalStyle.css"
import { Img, H2, P } from "./modalStyle"
import ModalImg from "../../../assets/modal/email.png"

const CareerModal = ({langtext, handleOk, modalVisible }) => {
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
                <H2>{langtext.message}</H2>
                <P>{langtext.description}</P>
            </Modal>
        </div>
    )
}

export default CareerModal
