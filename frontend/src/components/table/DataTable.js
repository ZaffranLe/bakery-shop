import React, {Component, Fragment, PureComponent} from "react";
import {
    Table,
    Header,
    Segment,
    Dimmer,
    Loader,
    Message,
    Button,
    Form,
    Pagination,
    Grid,
    Icon,
    Input,
    Modal
} from "semantic-ui-react";

import _ from "lodash";

const defaultHeaderStyle = {
    textAlign: 'center'
};

class TableRow extends PureComponent {

    render() {
        const {indexColumn, idx, rowData, columns} = this.props;

        return (
            <Table.Row>
                {
                    indexColumn ? <Table.Cell style={{textAlign: 'center'}} key="index">{idx}</Table.Cell> : null
                }
                {
                    columns.map((column, idx) => {
                        const content = (typeof column.name === 'string') ? rowData[column.name] : column.render(rowData);
                        return <Table.Cell
                            style={typeof column.style == 'function' ? column.style(rowData) : column.style}
                            key={idx}>{column.pre ? (<pre>{content}</pre>) : (<span>{content}</span>)}</Table.Cell>;
                    })
                }
            </Table.Row>
        );
    }
}

export default class DataTable extends PureComponent {

    constructor(props) {
        super(props);

        let itemsPerPage = props.defaultItemsPerPage || 50;
        let currentPage = 0;
        let searchText = '';

        const searchedData = this.getSearchedData(props.data, searchText, props.columns);
        const totalPages = Math.ceil(searchedData.length / itemsPerPage);

        this.state = {
            totalPages,
            itemsPerPage,
            currentPage,
            searchedData,
            searchText
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {data, columns} = nextProps;
        let {searchText, currentPage, itemsPerPage} = this.state;

        const searchedData = this.getSearchedData(data, searchText, columns);
        const totalPages = Math.ceil(searchedData.length / itemsPerPage);

        if (currentPage != 0 && currentPage >= totalPages) {
            currentPage = totalPages - 1;
        }

        this.setState({
            currentPage,
            searchedData,
            totalPages
        })
    }

    handleChangePage = (e, data) => {
        this.setState({
            currentPage: data.activePage - 1,
        })
    };

    handleChangeNumOfItems = (e) => {
        let {currentPage, searchedData} = this.state;
        const number = e.target.value == '' ? 0 : parseInt(e.target.value);

        const totalPages = Math.ceil(searchedData.length / number);

        if (currentPage != 0 && currentPage >= totalPages) {
            currentPage = totalPages - 1;
        }

        this.setState({
            currentPage,
            itemsPerPage: number,
            searchedData,
            totalPages
        });
    };

    handleChangeSeachText = (e) => {
        const {data, columns} = this.props;
        let {currentPage, itemsPerPage} = this.state;
        const searchText = e.target.value;

        const searchedData = this.getSearchedData(data, searchText, columns);
        const totalPages = Math.ceil(searchedData.length / itemsPerPage);

        currentPage = totalPages != 0 ? currentPage : 0;

        if (currentPage != 0 && currentPage >= totalPages) {
            currentPage = totalPages - 1;
        }

        this.setState({
            searchText,
            searchedData,
            currentPage,
            totalPages
        });
    };

    // getSortedData = _.memoize((list, sortFn) => {
    //     return list.sort(sortFn);
    // });

    getSearchedData = (list, searchText, columns) => {
        return list.filter((item) => {
            let result = false;
            let lowerCaseSearchText = searchText.trim().toLowerCase();

            if (lowerCaseSearchText == '') {
                return true;
            }

            for (let column of columns) {
                if (typeof column.name === 'undefined' || !column.searchable) {
                    continue;
                }

                if (column.strictsearch && item[column.name] == searchText) {
                    result = true;
                } else if ((item[column.name] + '').trim().toLowerCase().includes(lowerCaseSearchText)) {
                    result = true;
                }

                if (result) {
                    break;
                }
            }

            return result;
        });
    };


    getPagedData = (list, page, itemsPerPage) => {
        return list.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    };

    render() {

        const {columns, indexColumn, keyField, showItemsPerPage = true, tableClass = ''} = this.props;
        const {currentPage, itemsPerPage, totalPages, searchedData, searchText} = this.state;
        const pagedData = this.getPagedData(searchedData, currentPage, itemsPerPage);

        return (
            <React.Fragment>
                <Input icon='search' placeholder="Search ..."
                       name='searchText'
                       value={searchText}
                       onChange={this.handleChangeSeachText}
                />
                <Input
                    style={{
                        float: 'right',
                        display: showItemsPerPage ? 'block' : 'none'
                    }}
                    name='itemsPerPage'
                    type='number'
                    min={1}
                    value={itemsPerPage}
                    label='Items per page'
                    onChange={this.handleChangeNumOfItems}
                />
                {
                    itemsPerPage && pagedData.length ?
                        <React.Fragment>
                            <Table celled structured className={tableClass}>
                                <Table.Header>
                                    <Table.Row>
                                        {
                                            indexColumn ?
                                                <Table.HeaderCell style={{width: 60, textAlign: 'center'}} key="index">
                                                    Index
                                                </Table.HeaderCell> : null
                                        }
                                        {
                                            columns.map((column, idx) => (
                                                <Table.HeaderCell
                                                    style={column.headerStyle ? column.headerStyle : defaultHeaderStyle}
                                                    key={idx}>
                                                    {column.title}
                                                </Table.HeaderCell>
                                            ))
                                        }
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        pagedData.map((row, idx) =>
                                            (<TableRow
                                                indexColumn={indexColumn}
                                                key={typeof keyField != 'undefined' ? row[keyField] : idx}
                                                idx={indexColumn ? (currentPage * itemsPerPage + idx + 1) : null}
                                                rowData={row}
                                                columns={columns}
                                            />))
                                    }
                                </Table.Body>
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan={100000}>
                                            <Pagination
                                                ellipsisItem={{
                                                    content: <Icon name='ellipsis horizontal'/>,
                                                    icon: true
                                                }}
                                                firstItem={{
                                                    content: <Icon name='angle double left'/>,
                                                    icon: true
                                                }}
                                                lastItem={{
                                                    content: <Icon name='angle double right'/>,
                                                    icon: true
                                                }}
                                                prevItem={{content: <Icon name='angle left'/>, icon: true}}
                                                nextItem={{content: <Icon name='angle right'/>, icon: true}}
                                                activePage={currentPage + 1}
                                                totalPages={totalPages}
                                                onPageChange={this.handleChangePage}
                                            />
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>

                        </React.Fragment>
                        : <Message warning>
                            <Message.Header>
                                Không tồn tại dữ liệu!
                            </Message.Header>
                        </Message>
                }
            </React.Fragment>
        );
    }
};