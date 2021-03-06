import $ from "jquery";
import {Table} from 'antd';
import React from "react";
import '../../index.css';

export default class OnlineMoveHistoryTable extends React.Component {

    componentDidMount() {
        $('table').attr('id', 'historyTable');
    }

    // eslint-disable-next-line no-unused-vars
    componentDidUpdate(prevProps, prevState, snapshot) {
        const currentRow = this.props.totalChecked - 1;
        const rows = document.getElementsByClassName('ant-table-row');
        if (rows == null || rows.length === 0 || this.props.totalChecked === 400)
            return;

        if (rows.length >= 9) {
            rows[rows.length - 1].scrollIntoView(({
                behavior: "smooth",
                block: "nearest",
                inline: "nearest"
            }));
        }

        if (rows[currentRow] != null)
            rows[currentRow].style.backgroundColor = '#ffb35f';

        for (let i = 0; i < rows.length; i++) {
            if (i !== currentRow &&
                rows[i].style.backgroundColor.toString() !== 'rgb(252, 205, 142)') {
                rows[i].style.backgroundColor = '#fccd8e';
            }
        }
    }

    render() {
        const Xtext = (this.props.mySymbol === 'X') ? "X (Bạn)" : "X (Đối thủ)";
        const Otext = (this.props.mySymbol === 'X') ? "O (Đối thủ)" : "O (Bạn)";

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
                               {(text === 'X') ? Xtext : Otext}
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
            }
        ];

        return (
            <div className="move-history">

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
                />
            </div>);
    }
}