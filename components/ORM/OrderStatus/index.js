import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';


import { List } from 'immutable';


import {
  listField,
  listArgs,
  imageType,
} from '../fields';


export const OrderStatusArgs = {
  id: {
    type: GraphQLInt,
    description: "ID",
  },
};


export const OrderStatusesArgs = Object.assign({
  // order: {
  //   type: GraphQLInt,
  //   description: "ID заказа",
  // },
}, listArgs);

export const OrderStatusFields = {
  id: {
    type: GraphQLInt,
    description: "ID",
  },
  status: {
    type: GraphQLString,
    description: "Статус",
  },
  comment: {
    type: GraphQLString,
    description: "Описание",
  },
  rank: {
    type: GraphQLInt,
    description: "Порядок сортировки",
  },
};


const OrderStatusType = new GraphQLObjectType({
  name: 'OrderStatusType',
  description: 'Статус заказа',
  fields: () => (OrderStatusFields),
});


export default OrderStatusType;