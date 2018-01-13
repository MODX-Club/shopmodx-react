import React, {Component} from 'react';

import PropTypes from 'prop-types';

import OfficePage from '../../';

import View from './View';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography/Typography';

import BackIcon from 'material-ui-icons/ArrowBack';


import {Link, browserHistory} from 'react-router';

let {
  ...defaultProps
} = OfficePage.defaultProps;


Object.assign(defaultProps, {
  View,
});


export default class OrderPage extends OfficePage{
  
  
  static defaultProps = defaultProps;


  constructor(props){

    super(props);

    const {
    } = props;

    Object.assign(this.state, {
      inLoading: true,
    });

  }
 
	prepareOptions(options = {}){
 

    options = super.prepareOptions(options);

		// const {
		// 	user,
		// } = this.context;

		// let {
    // } = options;
    
    // // if(user.hasPermission("")){

    // // }

    
    // const {
    //   limit,
    //   orderBy,
    //   orderDir,
    // } = this.state;
    
    // Object.assign(options, {
    //   limit,
    //   ordersSort: orderBy ? {
    //     by: orderBy,
    //     dir: orderDir || "asc"
    //   } : undefined, 
    // });
    
    // console.log("options", options);

		return options;

  }
  

  async loadData(options){

    this.setState({
      inLoading: true,
    });

    let result = await super.loadData(options);

    this.setState({
      inLoading: false,
    });

    return result;

  }


  async loadServerData(provider, options = {}){

    let result = await super.loadServerData(provider, options);
    
    const {
      req,	
      limit = defaultProps.limit,
      page,
      ordersSort,
      params,
    } = options;

    // console.log("options 2", options);
    
    const {
      orderId,
    } = params || {};

    if(!orderId){
      return null;
    }

    // return;

    // Получаем список заказов
    await provider({
      operationName: "OrderById",
      variables: {
        orderId,
        withPagination: true,
        getImageFormats: true,
        orderGetProducts: true,
        orderProductGetProduct: true,
        ordersLimit: limit,
        orderGetContractor: true,
        orderContractorGetOrders: true,
        ordersPage: page,
        ordersSort,
      },
      req,
    })
    .then(r => {
      // console.log("Orders result", r);

      Object.assign(result.data, r.data);

    })
    .catch(e => {
      console.error(e);
    });

    return result;

  }


  render(){

    const {
      order,
      inLoading,
    } = this.state;

    let orderOutput;

    if(!order){
      orderOutput = !inLoading && <Typography
        type="title"
        style={{
          color: "red",
        }}
      >
        Не был получен заказ
      </Typography> || null;
    }
    else{

      const {
        View,
      } = this.props;
      
      const {
        id,
      } = order;

      orderOutput = <View
        key={id}
        order={order}
      />

    }
    
    

    return super.render(<Grid
      item
      xs={12}
    >

      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Link 
          to="/office/orders/"
          href="/office/orders/"
          onClick={e => {
            e.preventDefault();
            browserHistory.goBack();
          }}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <BackIcon /> Назад к списку заказов
        </Link>
      </div>

      {orderOutput}

    </Grid>);

  }

}