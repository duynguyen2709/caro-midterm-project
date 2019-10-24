import ReactTable from 'react-table';
import 'react-table/react-table.css';
import React, {useMemo} from 'react';
import '../index.css';

const NoDataComponent = (props) => {
  return props.children === '' ?
    null :
    (
      <div className="rt-noData">
        {props.children}
      </div>
    );
};

export default function MoveHistory(props) {
  const MemoizedColumns = useMemo(() => {
    return (
      [{
        Header: () => (
          <span>
                Lượt
                <i className="fa fa-sort" style={{ float: 'right' }}/>
            </span>
        ),
        accessor: 'id'
      }, {
        Header: 'Người chơi',
        accessor: 'symbol',
        Cell: cell => <span className='number' style={{ color: cell.value === 'X' ? 'blue' : 'red' }}>
                            {cell.value}
                        </span>,
        sortable: false,
        filterable: false
      }, {
        Header: () => (
          <span>
                Hàng
                <i className="fa fa-sort" style={{ float: 'right' }}/>
            </span>
        ),
        accessor: 'row'
      }, {
        Header: () => (
          <span>
                Cột
                <i className="fa fa-sort" style={{ float: 'right' }}/>
             </span>
        ),
        accessor: 'column'
      }, {
        Header: 'Reset',
        Cell: (cellInfo) =>
          <button type="button" style={{ width: '60%', height: '105%' }}
                  onClick={() =>  props.resetTable(cellInfo.index)}>
            {'\u21BB'}
          </button>,
        sortable: false,
        filterable: false
      }]
    );
  }, [props]);

  return (
    <div className="move-history">

      <p style={{ margin: '20px auto', fontSize: '32px' }}>
        Danh sách nước đi
      </p>

      <ReactTable style={{ height: '400px', border: '1px solid #c79e71' }}
                  data={props.data}
                  columns={MemoizedColumns}
                  noDataText=""
                  defaultPageSize={400}
                  NoDataComponent={NoDataComponent}
                  showPagination={false}
                  resizable={false}
                  getTrProps={(state, rowInfo) => {

                    if (typeof rowInfo !== 'undefined') {
                      return {
                        onClick: (e, handleOriginal) => {
                          props.setCurrentSelected(rowInfo.index);
                          if (handleOriginal) {
                            handleOriginal();
                          }
                        },
                        style: {
                          background: rowInfo.index === props.currentSelected ? '#eca75b' : '',
                          color: rowInfo.index === props.currentSelected ? 'white' : ''
                        }
                      };
                    }
                    return {
                      onClick: (e, handleOriginal) => {
                        if (handleOriginal) {
                          handleOriginal();
                        }
                      },
                      style: {
                        background: '',
                        color: 'black'
                      }
                    };

                  }}
      />
    </div>
  );
}