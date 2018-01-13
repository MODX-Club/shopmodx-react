import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import OrdersTable from './OrdersTable';

import OrdersStatuses from '../../../../OrdersStatuses';

export default class OrdersView extends Component{


  static propTypes = {
    ordersList: PropTypes.object,
    OrdersTable: PropTypes.func.isRequired,
    setOrder: PropTypes.func,
    statuses: PropTypes.array,
    onOrderStatusCheck: PropTypes.func,
    renderStatuses: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    OrdersTable,
    title: "Заказы",
    renderStatuses: true,
  }


  constructor(props){

    super(props);

    const {
    } = props;

    this.state = {
    };
  }


  renderStatuses(){

    const {
      statuses,
      onOrderStatusCheck,
      renderStatuses,
    } = this.props;

    return renderStatuses && <div
      style={{
        marginBottom: 20,
      }}
    >
      
      <OrdersStatuses
        checked={statuses}
        onCheck={onOrderStatusCheck}
      />
        
    </div> || null;

  }


  render(){

    const {
      OrdersTable,
      ordersList,
      title,
      ...other
    } = this.props;

    const {
    } = this.state;

    
    let ordersTable;


    return (<div>

      {title && <Typography
        type="title"
        style={{
          marginBottom: 20,
        }}
      >
        {title}
      </Typography> || null}

      
      {this.renderStatuses()}


      {ordersList && <OrdersTable
        ordersList={ordersList}
        // orderBy={orderBy}
        // orderDir={orderDir}
        {...other}
      /> || null}

    </div>);

  }

}
