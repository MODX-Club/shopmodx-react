// PlaceServiceType 

import {
  buildSchema,
  introspectionQuery,
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
} from 'graphql';


import { 
  GraphQLIncludeDirective, 
  GraphQLSkipDirective ,
} from 'graphql/type/directives';

import {
  CommentEditorStateType,
} from './EditorState';


import SiteContentType, {
  SiteContentArgs,
} from 'react-cms/src/app/components/ORM/SiteContent';


import {
  storageDirective,
  ReactCmsStorageStoreType,
} from 'react-cms/src/app/components/ORM/directives';


import MODXResourceType, {
  MODXResourceArgs,
  MODXResourcesArgs,
} from './modResource';

import UserType, {
  UsersArgs,
  Mutations as UserMutations,
} from './modUser';


import OrderType, {
  OrderArgs,
  OrdersArgs,
  OrderMutations,
} from 'modules/Site/components/ORM/Order';


import OrderStatusType, {
  OrderStatusArgs,
  OrderStatusesArgs,
} from './OrderStatus';



import OrderProductType, {
  OrderProductArgs,
  OrdersProductsArgs,
} from 'modules/Site/components/ORM/OrderProduct';



export const rootDirectives = [
  storageDirective,
  GraphQLIncludeDirective,
  GraphQLSkipDirective,
];


import {
  listField,
  listArgs,
  // ObjectsListType,
} from './fields';


const ObjectArgs = {
  id: {
    type: GraphQLInt,
    description: "Идентификатор",
  },
};
 


export default new GraphQLObjectType({
  name: 'RootType',
  fields: () => ({
    
    storages: {
      type: ReactCmsStorageStoreType,
      description: ReactCmsStorageStoreType.description,
    },

    siteContent: {
      type: SiteContentType,
      description: SiteContentType.description,
      args: SiteContentArgs,
    },

    editorState: {
      type: CommentEditorStateType,
      description: "Стейт редактора",
      resolve: source => (null),
    },

    usersList: new listField({
      type: UserType,
      name: "usersList",
      description: "Список пользователей с постраничностью",
      args: UsersArgs,
    }),
    users: {
      type: new GraphQLList(UserType),
      name: "Users",
      description: "Список пользователей",
      args: UsersArgs,
    },
    user: {
      type: UserType,
      name: "User",
      description: UserType.description,
      args: {
        id: {
          type: GraphQLInt,
        },
        username: {
          type: GraphQLString,
          description: "Поиск по юзернейму",
        },
        ownProfile: {
          type: GraphQLBoolean,
          description: "Получить текущего пользователя",
        },
      },
    },

    modxResourcesList: new listField({
      type: MODXResourceType,
      name: "modxResourcesList",
      description: "Список MODX-документов с постраничностью",
      args: Object.assign({}, MODXResourcesArgs),
    }),
    modxResources: {
      type: new GraphQLList(MODXResourceType),
      description: "Список MODX-документов",
      args: Object.assign({}, MODXResourcesArgs),
    },
    modxResource: {
      type: MODXResourceType,
      description: MODXResourceType.description,
      args: MODXResourceArgs,
    },

    ordersList: new listField({
      type: OrderType,
      name: "ordersList",
      description: "Список заказов с постраничностью",
      args: OrdersArgs,
    }),
    orders: {
      type: new GraphQLList(OrderType),
      description: "Список заказов",
      args: OrdersArgs,
    },
    order: {
      type: OrderType,
      description: OrderType.description,
      args: OrderArgs,
    },

    ordersStatusesList: new listField({
      type: OrderStatusType,
      name: "orderStatusesList",
      description: "Список статусов заказов с постраничностью",
      args: OrderStatusesArgs,
    }),
    ordersStatuses: {
      type: new GraphQLList(OrderStatusType),
      description: "Список статусов заказов",
      args: OrderStatusesArgs,
    },
    orderStatus: {
      type: OrderStatusType,
      description: OrderStatusType.description,
      args: OrderStatusArgs,
    },

    ordersProductsList: new listField({
      type: OrderProductType,
      name: "orderProductsList",
      description: "Список позиций заказа с постраничностью",
      args: OrdersProductsArgs,
    }),
    ordersProducts: {
      type: new GraphQLList(OrderProductType),
      description: "Список позиций заказа",
      args: OrdersProductsArgs,
    },
    orderProduct: {
      type: OrderProductType,
      description: OrderProductType.description,
      args: OrderProductArgs,
    },

  }),
});



const mutationFields = Object.assign({
    clearCache: {
      type: GraphQLBoolean,
      description: "Сброс кеша",
    },
  }, {
    ...OrderMutations,
  }, {
    ...UserMutations,
  }
);


export const Mutation = new GraphQLObjectType({ //⚠️ NOT mutiation
  name: 'Mutation',
  fields: () => (mutationFields)
});