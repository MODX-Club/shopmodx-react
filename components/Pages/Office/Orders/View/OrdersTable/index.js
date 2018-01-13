import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Row from '../Row';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';

import Pagination from '../../../../../pagination';


const classes = {

};

const columnData = [
  { 
    id: 'id', 
    sortable: true, 
    numeric: true, 
    disablePadding: false, 
    label: 'ID' 
  },
  { 
    id: 'createdon', 
    sortable: true, 
    numeric: false, 
    disablePadding: false, 
    label: 'Дата' 
  },
  { id: 'status_id', sortable: true, numeric: false, disablePadding: false, label: 'Статус' },
  { id: 'sum', numeric: true, disablePadding: false, label: 'Сумма заказа' },
  // { id: 'discount', numeric: true, disablePadding: false, label: 'Скидка' },
  { id: 'contractor_fullname', numeric: false, disablePadding: false, label: 'Клиент' },
  { id: 'positions', numeric: true, disablePadding: false, label: 'Кол-во позиций' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Кол-во товаров' },
];


class EnhancedTableHead extends React.Component {

  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    rowCount: PropTypes.number.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { 
      onSelectAllClick, 
      onRequestSort,
      order, 
      orderBy, 
      numSelected, 
      rowCount 
    } = this.props;

    return (
      <TableHead>
        <TableRow>

          {columnData.map(column => {

            const {
              id,
              sortable,
              numeric,
              label,
              disablePadding,
            } = column;

            return (
              <TableCell
                key={id}
                numeric={numeric}
                disablePadding={disablePadding}
              >
                {sortable && onRequestSort
                  ?
                  <TableSortLabel
                    active={orderBy === id}
                    direction={order}
                    onClick={this.createSortHandler(id)}
                  >
                    {label}
                  </TableSortLabel>
                  :
                  label
                }
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}


export default class OrdersTable extends Component{

  static propTypes = {
    ordersList: PropTypes.object.isRequired,
    orderBy: PropTypes.string,
    orderDir: PropTypes.string,
    setOrder: PropTypes.func,
  };



	handleRequestSort = (event, column, a,b) => {
    // const orderBy = property;
    let order = 'asc';

    console.log("handleRequestSort", column, a,b,event.target);

    const {
      orderBy,
      orderDir,
    } = this.props;

    if (orderBy === column && orderDir === 'asc') {
      order = 'desc';
    }

    // this.setState({ 
    // 	order, 
    // 	orderBy,
    // }, () => this.getOrders());

    this.setOrder(column, order);

  };


	handleSelectAllClick = (event, property) => {

    console.log("onSelectAllClick", event, property);

    // if (this.state.orderBy === property && this.state.order === 'desc') {
    //   order = 'asc';
    // }

    // this.setState({ 
    // 	order, 
    // 	orderBy,
    // }, () => this.getOrders());
  };

  
  setOrder(sortBy, sortDir){

    const {
      setOrder,
    } = this.props;

    setOrder && setOrder(sortBy, sortDir);

  }


  render(){

    const {
      ordersList,
      orderBy,
      orderDir,
      setOrder,
    } = this.props;

    let ordersTable;
    

    const {
      count,
      total,
      limit,
      page,
      object: orders,
    } = ordersList || {};

    if(orders && orders.length){
      
      ordersTable = <Table>

        <EnhancedTableHead
          // numSelected={selected.length}
          numSelected={6}
          orderBy={orderBy}
          order={orderDir}
          onSelectAllClick={this.handleSelectAllClick}
          onRequestSort={setOrder && this.handleRequestSort}
          rowCount={total}
        />

        <TableBody>
          {orders.map(n => {
            // const isSelected = this.isSelected(n.id);

            const {
              id,
            } = n;

            return <Row 
              key={id}
              item={n}
            />;
          })}
        </TableBody> 
      </Table>

      // ordersTable = <div>

      //   {orders.map(n => {

      //     const {
      //       id,
      //       status,
      //       status_str,
      //       sum,
      //     } = n;

      //     return <div
      //       key={id}
      //     >
      //       {id}) {sum}
      //     </div>

      //   })}

      // </div>


    }

    return (<div>

      <Paper
        style={{
          overflow: "auto",
          padding: 10,
        }}
      >

        {ordersTable}

      </Paper>
 
      <Pagination
        limit={limit}
        total={total}
        page={page || 1}
      /> 

    </div>);

  }

}
