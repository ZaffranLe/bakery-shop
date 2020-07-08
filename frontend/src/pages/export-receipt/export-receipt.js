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
} from "semantic-ui-react";
import Layout from "../../components/layout/layout";
import _var from "../../utils/_var";
import { ExportReceiptStatusActions } from "../../redux/_actions/export-receipt/statusA";
import moment from "moment";
import InfoModal from "./detail-export-receipt";

class ExportReceipt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoModal: false,
            exportReceipts: [],
            exportReceiptsFiltered: [],
            statusOptions: [],
            statusFilter: _var.export_receipt_status.pending,
        };
    }

    componentDidMount() {
        this.props.dispatch(ExportReceiptActions.getAllExportReceipt());
        this.props.dispatch(ExportReceiptStatusActions.getStatusList());
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { statusList, reload, exportReceipts } = nextProps;
        if (statusList.length > 0) {
            const options = [];
            for (let status of statusList) {
                options.push({
                    key: status["id"],
                    value: status["id"],
                    text: status["description"],
                });
            }
            this.setState({
                statusOptions: options,
            });
        }

        if (reload) {
            this.props.dispatch(ExportReceiptActions.getAllExportReceipt());
        }
        if (exportReceipts.length > 0) {
            this.setState({
                exportReceipts,
                exportReceiptsFiltered: exportReceipts.filter(
                    (receipt) => receipt["status"] == _var.export_receipt_status.pending
                ),
                statusFilter: _var.export_receipt_status.pending,
            });
        }
    }

    handleChangeStatusFilter = (e, data) => {
        const { exportReceipts } = this.props;
        this.setState({
            statusFilter: data.value,
            exportReceiptsFiltered: exportReceipts.filter((receipt) => receipt["status"] == data.value),
        });
    };

    handleOpenModal = (name) => {
        this.setState({
            [name]: true,
        });
    };

    handleCloseModal = (name) => {
        this.setState({
            [name]: false,
        });
    };

    handleChangeStatus = (id) => (e, data) => {
        this.props.dispatch(ExportReceiptActions.updateExportReceipt(id, data.value));
    };

    handleViewDetailReceipt = (id) => {
        this.props.dispatch(ExportReceiptActions.getDetailExportReceipt(id));
        this.handleOpenModal("infoModal");
    };

    render() {
        const { pageLoading, exportReceipt } = this.props;
        const { infoModal, statusOptions, statusFilter, exportReceiptsFiltered } = this.state;
        return (
            <Layout permission={_var.permission.admin}>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Dimmer inverted active={pageLoading}>
                            <Loader>Loading...</Loader>
                        </Dimmer>
                        <Segment>
                            <Header>Danh sách hoá đơn bán hàng</Header>
                        </Segment>
                        <Segment>
                            <Form>
                                <Form.Field width={4}>
                                    <label>Trạng thái đơn hàng</label>
                                    <Dropdown
                                        options={statusOptions}
                                        value={statusFilter}
                                        selection
                                        onChange={this.handleChangeStatusFilter}
                                    />
                                </Form.Field>
                            </Form>
                            {exportReceiptsFiltered.length > 0 ? (
                                <Table celled structured>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>#</Table.HeaderCell>
                                            <Table.HeaderCell>Khách hàng</Table.HeaderCell>
                                            <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
                                            <Table.HeaderCell>Địa chỉ</Table.HeaderCell>
                                            <Table.HeaderCell>Ngày lập HĐ</Table.HeaderCell>
                                            <Table.HeaderCell>Trạng thái</Table.HeaderCell>
                                            <Table.HeaderCell>Tổng tiền</Table.HeaderCell>
                                            <Table.HeaderCell></Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {exportReceiptsFiltered.map((receipt, idx) => {
                                            return (
                                                <Table.Row key={receipt["id"]}>
                                                    <Table.Cell>{idx + 1}</Table.Cell>
                                                    <Table.Cell>{receipt["fullName"]}</Table.Cell>
                                                    <Table.Cell>{receipt["phone"]}</Table.Cell>
                                                    <Table.Cell>{receipt["address"]}</Table.Cell>
                                                    <Table.Cell>
                                                        {moment(receipt["date"]).format("YYYY-MM-DD HH:mm:ss")}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Dropdown
                                                            defaultValue={receipt["status"]}
                                                            options={statusOptions}
                                                            selection
                                                            onChange={this.handleChangeStatus(receipt["id"])}
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell style={{ color: "red", fontWeight: "bold" }}>
                                                        {receipt["totalPrice"].toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Button
                                                            icon="eye"
                                                            size="small"
                                                            color="teal"
                                                            onClick={() => this.handleViewDetailReceipt(receipt["id"])}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>
                                </Table>
                            ) : (
                                <Message warning>
                                    <Message.Header>Không có dữ liệu để hiển thị.</Message.Header>
                                </Message>
                            )}
                        </Segment>
                    </Grid.Column>
                    <InfoModal open={infoModal} onClose={this.handleCloseModal} receipt={exportReceipt} />
                </Grid.Row>
            </Layout>
        );
    }
}

const mapStateToProps = ({ ExportReceiptReducer }) => ExportReceiptReducer;

export default connect(mapStateToProps, null)(ExportReceipt);
