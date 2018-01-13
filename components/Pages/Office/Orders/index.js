import React, {Component} from 'react';

import PropTypes from 'prop-types';

import OfficePage from '../';

import View from './View';

import Grid from 'material-ui/Grid';
import { browserHistory } from 'react-router/lib';
import Typography from 'material-ui/Typography/Typography';


let {
  ...propTypes
} = OfficePage.propTypes;


Object.assign(propTypes, {
  statuses: PropTypes.array,
});


let {
  ...defaultProps
} = OfficePage.defaultProps;


Object.assign(defaultProps, {
  View,
  orderBy: "id",
  orderDir: "desc",
  limit: 10,
  statuses: [2,3,4,5],
});


export default class OrdersPage extends OfficePage{
  
  
  static propTypes = propTypes;

  static defaultProps = defaultProps;


  constructor(props){

    super(props);

    const {
      orderBy,
      orderDir,
      limit,
      statuses,
    } = props;

    Object.assign(this.state, {
      orderBy,
      orderDir,
      limit,
      statuses,
    });

  }


  setOrder(orderBy, orderDir = "asc"){

    this.setState({
      orderBy,
      orderDir,
    }, ::this.reloadData);

  }

	
	// loadData(options = {}){
 

	// 	const {
	// 		user,
	// 	} = this.context;

	// 	let {
  //   } = options;
    
  //   // if(user.hasPermission("")){

  //   // }

  //   console.log("options", options);
    
  //   const {
  //     limit,
  //   } = this.state;

  //   Object.assign(options, {
  //     limit,
  //     ordersSort, 
  //   });

	// 	return super.loadData(options);

	// }

	
	prepareOptions(options = {}){
 

    options = super.prepareOptions(options);

		const {
			user,
		} = this.context;

		let {
    } = options;
    
    // if(user.hasPermission("")){

    // }

    
    const {
      limit,
      orderBy,
      orderDir,
      statuses: ordersStatuses,
    } = this.state;
    
    Object.assign(options, {
      limit,
      ordersSort: orderBy ? {
        by: orderBy,
        dir: orderDir || "asc"
      } : undefined,
      ordersStatuses,
    });
    
    // console.log("options", options);

		return options;

	}

  async loadServerData(provider, options = {}){

    let result = await super.loadServerData(provider, options);
    
    const {
      req,	
      limit = defaultProps.limit,
      ordersSort,
      ordersStatuses,
      params,
      location,
    } = options;


		const {
			pathname,
			query,
		} = location || {};

		const {
			page,
		} = query || {};

    
    const {
      user,
    } = result && result.data || {};
    
    // console.log("options", options);
    // console.log("OfficeOrdersPage result", result);

    if(user){

      // Получаем список заказов
      await provider({
        operationName: "Orders",
        variables: {
          withPagination: true,
          orderGetProducts: true,
          orderProductGetProduct: true,
          ordersLimit: limit,
          orderGetContractor: true,
          ordersPage: page,
          ordersSort,
          ordersStatuses,
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
      
    }



    return result;

  }


  onOrderStatusCheck(event, orderStatus){
    
    const {
      id,
    } = orderStatus;

    const {
      statuses: checked = [],
    } = this.state;

    const index = checked.indexOf(id);

    if(index === -1){
      checked.push(id);
    }
    else{
      checked.splice(index, 1);
    }

    this.cleanUriFilters();

    this.setState({
      statuses: checked,
    }, ::this.reloadData);

  }


  render(){

    const {
      ordersList,
      orderBy,
      orderDir,
      statuses,
    } = this.state;

    const {
      View,
    } = this.props;

    const {
      user: {
        user: currentUser,
      },
    } = this.context;

    return super.render(<Grid
      item
      xs={12}
    >

      {currentUser 
        ? 
        <View
          ordersList={ordersList}
          orderBy={orderBy}
          orderDir={orderDir}
          setOrder={::this.setOrder}
          statuses={statuses}
          onOrderStatusCheck={::this.onOrderStatusCheck}
        />
        :
        <Typography
          type="subheading"
          style={{
            color: "red",
          }}
        >
          Для просмотра заказов необходимо <a
            href="javascript:;"
            onClick={e => {
              e.preventDefault();

              const {
                userActions,
              } = this.context;

              userActions.loginClicked();

            }}
          >
          авторизоваться
          </a>
        </Typography>
      }

    </Grid>);

  }

}