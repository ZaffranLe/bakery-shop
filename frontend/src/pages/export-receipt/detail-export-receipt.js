import React from "react";
import DataTable from "../../components/table/DataTable";
import { ExportReceiptActions } from "../../redux/_actions/export-receipt/exportReceiptA";
import { connect } from "react-redux";
import {
    Segment,
    Header,
    Dimmer,
    Loader,
    Button,
    Grid,
    Modal,
    Form,
    Dropdown,
    Message,
    Table,
    Image,
} from "semantic-ui-react";
import Layout from "../../components/layout/layout";
import _var from "../../utils/_var";
import { ExportReceiptStatusActions } from "../../redux/_actions/export-receipt/statusA";
import moment from "moment";

class InfoModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { open, onClose, receipt } = this.props;
        return (
            <Modal open={open} size="small">
                {receipt ? (
                    <>
                        <Modal.Header>Chi tiết hoá đơn</Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <label>Khách hàng</label>
                                        <span>{receipt["info"]["fullName"]}</span>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>SĐT</label>
                                        <span>{receipt["info"]["phone"]}</span>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <label>Địa chỉ</label>
                                        <span>{receipt["info"]["address"]}</span>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Chú thích</label>
                                        <span>{receipt["info"]["note"]}</span>
                                    </Form.Field>
                                </Form.Group>
                            </Form>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                        <Table.HeaderCell>Sản phẩm</Table.HeaderCell>
                                        <Table.HeaderCell>Số lượng</Table.HeaderCell>
                                        <Table.HeaderCell>Thành tiền</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {receipt["products"].map((product, idx) => {
                                        return (
                                            <Table.Row key={`${receipt["id"]}-${idx}`}>
                                                <Table.Cell>{idx + 1}</Table.Cell>
                                                <Table.Cell>
                                                    <Grid>
                                                        <Grid.Column width={7}>
                                                            <Image
                                                                src={`${_var.domain_server}/public/img/${
                                                                    product["images"].split(";")[0]
                                                                }`}
                                                                size="small"
                                                            />
                                                        </Grid.Column>
                                                        <Grid.Column width={9}>
                                                            <p style={{ fontWeight: "bold" }}>{product["name"]}</p>
                                                            <b>
                                                                <span style={{ color: "red" }}>
                                                                    {product["unitPrice"].toLocaleString("vi-VN", {
                                                                        style: "currency",
                                                                        currency: "VND",
                                                                    })}
                                                                </span>{" "}
                                                                / {product["unit"]}
                                                            </b>
                                                        </Grid.Column>
                                                    </Grid>
                                                </Table.Cell>
                                                <Table.Cell>{product["amount"]}</Table.Cell>
                                                <Table.Cell>
                                                    <span style={{ color: "red", fontWeight: "bold" }}>
                                                        {product["totalPrice"].toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}
                                                    </span>
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell
                                            colSpan={3}
                                            style={{ fontWeight: "bold", textAlign: "right" }}
                                        >
                                            Thành tiền
                                        </Table.HeaderCell>
                                        <Table.HeaderCell style={{ color: "red" }}>
                                            {receipt["info"]["totalPrice"].toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button content="Đóng" onClick={() => onClose("infoModal")} />
                        </Modal.Actions>
                    </>
                ) : (
                    <Dimmer inverted active>
                        <Loader>Loading...</Loader>
                    </Dimmer>
                )}
            </Modal>
        );
    }
}

export default InfoModal;
