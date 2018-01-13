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
  GraphQLNonNull,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';

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
  Mutations,
} = MODXUser;

import OrderType from '../Order';

const ShopModxUserFields = Object.assign({...UserFields}, {

  Order: {
    type: OrderType,
    description: "Текущий заказ пользователя",
    resolve: (source, args, context, info) => {

      const {
        id,
      } = source;

      if(!id){
        return null;
      }

      const {
        rootResolver,
      } = context;

      Object.assign(args, {
        contractor: id,
        ownOrder: true,     // Получить только текущий заказ
      });

      return rootResolver(null, args, context, info);

    },
  },

  Orders: {
    type: new GraphQLList(OrderType),
    description: "Все заказы пользователя",
    resolve: (source, args, context, info) => {

      const {
        id,
      } = source;

      if(!id){
        return null;
      }

      const {
        rootResolver,
      } = context;

      Object.assign(args, {
        contractor: id,
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


// Переопределяем тип пользователя в мутациях

let {
  ...ShopModxUserMutations,
} = Mutations;

let {
  updateUser,
} = ShopModxUserMutations;

Object.assign(updateUser, {
  type: UserType,
});


Object.assign(MODXUser, {
  UserType,
  Mutations: ShopModxUserMutations,
  default: UserType,
});

module.exports = MODXUser;
