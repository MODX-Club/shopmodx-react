
import OrderStatusType from 'shopmodx-react/components/ORM/OrderStatus';

export {
  OrderStatusType,
}

import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';


export const prepareData = function(object){

  if(object){

  }

  return object;

}


export const getList = (object, args, context, info) => {

  const {
    SendMODXRequest,
  } = context;

  return new Promise((resolve, reject) => {
    let {
    } = args || {};

    let action = 'orders/statuses/getdata';


    const url = `/assets/components/modxsite/connectors/connector.php?pub_action=${action}`;

    let params = Object.assign({...args}, {
    });

    let request = SendMODXRequest(action, params);

    request
    .then((data) => {

      // console.log("OrdersStatuses result", data);

      if(!data.success){

        // Если запрашивали личный объект заказа пользователя, то отсутствие объекта пока не рассчитывается как ошибка


        return !ownOrder ? reject(data.message || "Ошибка выполнения запроса") : resolve(null);

      }

      if(data.object){

        if(!Array.isArray(data.object)){
          data.object = [data.object];
        }

        data.object.map(n => {

          return prepareData(n);

        });

      }

      return resolve(data);
    })
    .catch((e) => {
      return reject(e);
    })
    ;
  });
}

