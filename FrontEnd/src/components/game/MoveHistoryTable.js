import $ from "jquery";
import {Button, Table} from 'antd';
import React from "react";
import '../../index.css';

export default class MoveHistoryTable extends React.Component {

    componentDidMount() {
        $('table').attr('id', 'historyTable');
    }

    // eslint-disable-next-line no-unused-vars
    componentDidUpdate(prevProps, prevState, snapshot) {
        const rows = document.getElementsByClassName('ant-table-row');
        if (rows == null || rows.length === 0)
            return;

        if (rows.length >= 9) {
            rows[rows.length - 1].scrollIntoView(({
                behavior: "smooth",
                block: "nearest",
                inline: "nearest"
            }));
        }

        rows[this.props.currentSelected].style.backgroundColor = '#ffb35f';
        for (let i = 0 ; i < rows.length ; i++){
            if (i !== this.props.currentSelected &&
                rows[i].style.backgroundColor.toString() !== 'rgb(252, 205, 142)') {
                rows[i].style.backgroundColor = '#fccd8e';
            }
        }
    }

    render() {
        const columns = [
            {
                title: 'Lượt',
                dataIndex: 'id',
                sorter: (a, b) => a.id - b.id,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Người chơi',
                dataIndex: 'symbol',
                render: (text) => {
                    return (<span className='number'
                                  style={{color: text === 'X' ? 'blue' : 'red'}}>
                               {text}
                        </span>)
                }
            },
            {
                title: 'Hàng',
                dataIndex: 'row',
                sorter: (a, b) => a.row - b.row,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Cột',
                dataIndex: 'column',
                sorter: (a, b) => a.column - b.column,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Reset',
                // eslint-disable-next-line no-unused-vars
                render: (text, record, index) => {
                    return <Button type="primary"
                                   shape="circle"
                                   size="small"
                                   style={{
                                       fontSize: '17px'
                                   }}
                                   onClick={() => this.props.resetTable(record)}
                    >
                        {'\u21BB'}
                    </Button>;
                }
            },
        ];

        return (
            <div className="move-history">
                <p style={{margin: '20px auto', fontSize: '32px'}}>
                    Danh sách nước đi
                </p>

                <Table columns={columns}
                       dataSource={this.props.data}
                       pagination={false}
                       size="small"
                       rowClassName={() => "table-row"}
                       scroll={{y: 355}}
                       style={{
                           height: '400px',
                           border: '2px solid #9a7b59'
                       }}
                       onRow={(record, rowIndex) => {
                           return {
                               // eslint-disable-next-line no-unused-vars
                               onClick: event => {this.props.setCurrentSelected(rowIndex)}
                           };
                       }}
                />
            </div>);
    }
}