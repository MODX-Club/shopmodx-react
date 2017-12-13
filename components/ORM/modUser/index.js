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


import * as MODXUser from 'modx-react/src/components/ORM/modUser';


import {
  listField,
  listArgs,
  imageType,
  // ObjectsListType,
} from '../fields';


const {
  UserFields,
} = MODXUser;

import OrderType from '../Order';

const ShopModxUserFields = Object.assign({...UserFields}, {

  Order: {
    type: OrderType,
    description: "Текущий заказ пользователя",
    resolve: (source, args, context, info) => {

      const {
        rootResolver,
      } = context;

      Object.assign(args, {
        // id: product_id,
        // _store: "remote",
        ownOrder: true,     // Поулчить только текущий заказ
      });

      return rootResolver(null, args, context, info);

    },
  },

});


export const UserType = new GraphQLObjectType({
  name: 'ShopModxUserType',
  description: 'Пользователь',
  fields: () => (ShopModxUserFields),
});

Object.assign(MODXUser, {
  UserType,
  default: UserType,
});

module.exports = MODXUser;
