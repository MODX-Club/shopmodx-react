import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';


import UserView from 'react-cms/src/app/components/Page/Users/User/View';

import OrdersView from '../../../View';

export default class OfficeOrderContractorView extends Component{

  
  static propTypes = {
    contractor: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
  };

  
  render(){
    
    const {
      contractor,
      order,
    } = this.props;


    if(!contractor || !order){
      return null;
    }


    const {
      id,
      username,
      fullname,
      email,
      Orders,
    } = contractor;

    const {
      id: order_id,
    } = order;

    let orders;  // Другие заказы пользователя

    if(Orders && Orders.length){

      orders = Orders.filter(n => n && n.id !== order_id).map(n => {

        const {
          ...order
        } = n;

        const {
          // Orders,
          ...Contractor
        } = contractor;
        
        Object.assign(order, {
          Contractor,
        });

        return order;

      });

    }
    

    return <div>
      
      <UserView
        user={contractor}
      />

      {orders && orders.length && <OrdersView
        title="Другие заказы пользователя"
        renderStatuses={false}
        ordersList={{
          object: orders,
          total: orders.length,
          count: orders.length,
          limit: 0,
        }}
      /> || null}

    </div>;

  }

}

