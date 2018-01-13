import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Link, browserHistory} from 'react-router';

import ContractorView from './Contractor';
import OrderView from '../../../../../Basket/View/Order/OrderProducts';

export default class OfficeOrderView extends Component{

  
  static propTypes = {
    order: PropTypes.object.isRequired,
    ContractorView: PropTypes.func.isRequired,
  };


  static defaultProps = {
    ContractorView,
  };

  
  render(){
    
    const {
      order,
      ContractorView,
    } = this.props;


    if(!order){
      return null;
    }


    const {
      id,
      Contractor,
    } = order;

    return <div>

      <OrderView
        order={order}
      />
      
      {Contractor && <ContractorView
        contractor={Contractor}
        order={order}
      /> || null}

    </div>;

  }

}

