

import ReactCmsQuery from 'react-cms/src/app/components/ORM/query';

import mergeQuery from 'react-cms-graphql-utils/src/mergeQuery';


let shopModxQuery = `

## Custom

query apiData(
  $modxResourcesLimit:Int = 0
  $modxResourcesPage:Int
  $withPagination:Boolean = false
  $modxResourcesContextKey:String
  $modxResourcesShowHidden:Boolean = true
  $modxResourcesShowUnpublished:Boolean = true
  $modxResourcesStorage:ReactCmsStorageStoreType = remote
  $modxResourcesSort:[MODXResourceSortBy]
  $modxResourcesParent:Int
  $apiGetResources:Boolean = true
  $modxResourcesTemplates:[Int]
  $modxResourcesOptions:JSON
  $modxResourcesUri:String
  $getImageFormats:Boolean = false
){
  
  ...RootMODXResources @include(if: $apiGetResources)
  
}

query CurrentUser(
  $currentUser:Boolean = true
  $userId:Int
  $userUsername:String
  $getImageFormats:Boolean = true
  $orderGetProducts:Boolean = false
  $orderProductGetProduct:Boolean = false
  $userGetOrder:Boolean = false
  $userGetOrders:Boolean = false
  $orderGetContractor:Boolean = false
  $orderContractorGetOrders:Boolean = false
)
{
  ...RootUser
}

query UserById(
  $currentUser:Boolean
  $userId:Int!
  $userUsername:String
  $getImageFormats:Boolean = true
  $orderGetProducts:Boolean = false
  $orderProductGetProduct:Boolean = false
  $userGetOrder:Boolean = false
  $userGetOrders:Boolean = false
  $orderGetContractor:Boolean = false
  $orderContractorGetOrders:Boolean = false
)
{
  ...RootUser
}

query UserByUsername(
  $currentUser:Boolean
  $userId:Int
  $userUsername:String!
  $getImageFormats:Boolean = true
  $orderGetProducts:Boolean = false
  $orderProductGetProduct:Boolean = false
  $userGetOrder:Boolean = false
  $userGetOrders:Boolean = false
  $orderGetContractor:Boolean = false
  $orderContractorGetOrders:Boolean = false
)
{
  ...RootUser
}

fragment RootUser on RootType{
  
  user(
    ownProfile:$currentUser
    id:$userId
    username:$userUsername
  ) @storage(store:remote)
  {
    ...User
    
    Order
    @include(if:$userGetOrder)
    @storage(store:remote)
    {
      ...Order
    }
  }
  
}


query MainMenuData(
  $modxResourcesLimit:Int = 10
  $modxResourcesPage:Int
  $modxResourcesContextKey:String = "web"
  $modxResourcesShowHidden:Boolean = false
  $modxResourcesShowUnpublished:Boolean = false
  $modxResourcesStorage:ReactCmsStorageStoreType
  $modxResourcesSort:[MODXResourceSortBy] = {
    by: menuindex
    dir: asc
  }
  $modxResourcesParent:Int = 0
  $modxResourcesTemplates:[Int]
  $modxResourcesOptions:JSON
  $modxResourcesUri:String
  $getImageFormats:Boolean = false
)
{
  
  menuItems:modxResources(
    limit: $modxResourcesLimit
    page: $modxResourcesPage
    context_key: $modxResourcesContextKey
    showhidden:$modxResourcesShowHidden
    showunpublished:$modxResourcesShowUnpublished
    parent:$modxResourcesParent
    templates:$modxResourcesTemplates
    uri:$modxResourcesUri
    sort:$modxResourcesSort
    options:$modxResourcesOptions
  )
    @storage(store:$modxResourcesStorage)
  {
    id
    pagetitle
    longtitle
    menutitle
    hidemenu
    published
    deleted
    alias
    uri
    context_key
    image
    imageFormats @include(if:$getImageFormats)
    {
      thumb
      slider_thumb
      slider_dot_thumb
      small
      middle
      big
    }
  }
  
}





# Все товары
query CatalogProducts(
  $modxResourcesLimit:Int = 10
  $modxResourcesPage:Int
  $withPagination:Boolean = false
  $modxResourcesContextKey:String = "web"
  $modxResourcesShowHidden:Boolean
  $modxResourcesShowUnpublished:Boolean
  $modxResourcesStorage:ReactCmsStorageStoreType
  $modxResourcesSort:[MODXResourceSortBy]
  $modxResourcesParent:Int
  $modxResourcesTemplates:[Int] = [3]
  $modxResourcesOptions:JSON
  $modxResourcesUri:String
  $getImageFormats:Boolean = false
)
{
  
  ...RootMODXResources
  
}


# Все категории
query CatalogCategories(
  $modxResourcesLimit:Int = 10
  $modxResourcesPage:Int
  $withPagination:Boolean = false
  $modxResourcesContextKey:String = "web"
  $modxResourcesShowHidden:Boolean
  $modxResourcesShowUnpublished:Boolean
  $modxResourcesStorage:ReactCmsStorageStoreType
  $modxResourcesSort:[MODXResourceSortBy]
  $modxResourcesParent:Int
  $modxResourcesTemplates:[Int] = [2]
  $modxResourcesOptions:JSON
  $modxResourcesUri:String
  $getImageFormats:Boolean = false
)
{
  
  ...RootMODXResources
  
}

query CatalogCategory(
  $categoryId:Int!
  $modxResourcesLimit:Int = 10
  $modxResourcesPage:Int
  $withPagination:Boolean = false
  $modxResourcesContextKey:String = "web"
  $modxResourcesShowHidden:Boolean
  $modxResourcesShowUnpublished:Boolean
  $modxResourcesStorage:ReactCmsStorageStoreType
  $modxResourcesSort:[MODXResourceSortBy]
  $modxResourcesCategoryTemplates:[Int] = [2]
  $modxResourcesProductTemplates:[Int] = [3]
  $modxResourcesOptions:JSON
  $modxResourcesUri:String
  $getImageFormats:Boolean = false
  $categoryGetSubCategories:Boolean = true
  $categoryGetProducts:Boolean = true
)
{
   
  ...CategorySubCategories @include(if:$categoryGetSubCategories)
  
  
  ...CategoryProducts @include(if:$categoryGetProducts)
  
}


fragment CategorySubCategories on RootType{
  # дочерние категории
  subCategoriesList: modxResourcesList(
    limit: $modxResourcesLimit
    page: $modxResourcesPage
    context_key: $modxResourcesContextKey
    showhidden:$modxResourcesShowHidden
    showunpublished:$modxResourcesShowUnpublished
    parent:$categoryId
    templates:$modxResourcesCategoryTemplates
    uri:$modxResourcesUri
    sort:$modxResourcesSort
    options:$modxResourcesOptions
  ) 
    @include(if:$withPagination)
    @storage(store:$modxResourcesStorage)
  {
    count
    total
    limit
    page
    object{
      ...MODXResource
    }
  }
  
  subCategories: modxResources(
    limit: $modxResourcesLimit
    page: $modxResourcesPage
    context_key: $modxResourcesContextKey
    showhidden:$modxResourcesShowHidden
    showunpublished:$modxResourcesShowUnpublished
    parent:$categoryId
    templates:$modxResourcesCategoryTemplates
    uri:$modxResourcesUri
    sort:$modxResourcesSort
    options:$modxResourcesOptions
  ) 
    @skip(if:$withPagination)
    @storage(store:$modxResourcesStorage)
  {
    ...MODXResource
  }
}

fragment CategoryProducts on RootType{
  
  #дочерние товары
  productsList: modxResourcesList(
    limit: $modxResourcesLimit
    page: $modxResourcesPage
    context_key: $modxResourcesContextKey
    showhidden:$modxResourcesShowHidden
    showunpublished:$modxResourcesShowUnpublished
    parent:$categoryId
    templates:$modxResourcesProductTemplates
    uri:$modxResourcesUri
    sort:$modxResourcesSort
    options:$modxResourcesOptions
  ) 
    @include(if:$withPagination)
    @storage(store:$modxResourcesStorage)
  {
    count
    total
    limit
    page
    object{
      ...MODXResource
    }
  }
  
  products: modxResources(
    limit: $modxResourcesLimit
    page: $modxResourcesPage
    context_key: $modxResourcesContextKey
    showhidden:$modxResourcesShowHidden
    showunpublished:$modxResourcesShowUnpublished
    parent:$categoryId
    templates:$modxResourcesProductTemplates
    uri:$modxResourcesUri
    sort:$modxResourcesSort
    options:$modxResourcesOptions
  ) 
    @skip(if:$withPagination)
    @storage(store:$modxResourcesStorage)
  {
    ...MODXResource
  }
}


query Orders(
  $ordersLimit: Int = 10
  $withPagination: Boolean = false
  $orderGetProducts: Boolean = false
  $orderProductGetProduct: Boolean = false
  $getImageFormats: Boolean = false
  $orderGetContractor: Boolean = false
  $ordersSort: [OrdersSortBy]
  $ordersContractorId: Int
  $ordersStatuses:[Int]
  $ordersPage:Int
  $orderContractorGetOrders:Boolean = false
) {
  ...RootOrders
}


# Заказ текущего пользователя
query OwnOrder(
  $orderGetProducts:Boolean = false
  $orderProductGetProduct:Boolean = false
  $getImageFormats:Boolean = false
  $orderGetContractor:Boolean = false
  $orderGetOwn:Boolean = true
  $orderId:Int
  $orderContractorGetOrders:Boolean = false
){
  ...RootOrder
}


query OrderById(
  $orderGetProducts:Boolean = false
  $orderProductGetProduct:Boolean = false
  $getImageFormats:Boolean = false
  $orderGetContractor:Boolean = false
  $orderGetOwn:Boolean
  $orderId:Int!
  $orderContractorGetOrders:Boolean = false
){
  ...RootOrder
}


fragment RootOrder on RootType{
  
  order(
    ownOrder: $orderGetOwn
    id:$orderId
  )
  @storage(store:remote)
  {
    ...Order
  }
  
}


fragment RootOrders on RootType{
  
  ordersList(
    contractor:$ordersContractorId
    statuses:$ordersStatuses
    sort: $ordersSort
    limit:$ordersLimit
    page:$ordersPage
  ) 
  @include(if:$withPagination)
  @storage(store:remote)
  {
    count
    total
    limit
    page
    object{
      ...Order
    }
  }
  
  orders(
    contractor:$ordersContractorId
    statuses:$ordersStatuses
    sort: $ordersSort
    limit:$ordersLimit
    page:$ordersPage
  ) 
  @skip(if:$withPagination)
  @storage(store:remote)
  {
    ...Order
  }
  
}

fragment Order on OrderType {
  
  ...OrderFields
  
  Products 
  @include(if: $orderGetProducts) 
  @storage(store: remote) 
  {
    ...OrderProduct
  }
  
  Contractor 
  @include(if: $orderGetContractor) 
  @storage(store: remote) 
  {
    ...UserFields

    Orders
    @include(if: $orderContractorGetOrders)
    @storage(store:remote)
    {
      ...OrderFields
    }

  }
  
}

fragment OrderFields on OrderType{
  id
  number_history
  status_id
  status_str
  contractor
  createdby
  createdon
  editedby
  editedon
  manager
  address
  comments
  discount
  positions
  total
  sum
  original_sum
  pay_id
  paysys_invoice_id
  pay_date
  pay_sum
  paysystem_name
}


query OrdersProducts(
  $withPagination:Boolean = false
  $ordersProductsLimit:Int = 10
  $getImageFormats:Boolean = false
  $orderProductGetProduct:Boolean = false
  $orderProductsOrder:Int
){
  
  ...RootOrdersProducts
  
}

fragment RootOrdersProducts on RootType{
  
  ordersProductsList(
    limit:$ordersProductsLimit
    order:$orderProductsOrder
  )
  @include(if:$withPagination)
  @storage(store:remote)
  {
    count
    total
    limit
    page
    object{
      ...OrderProduct
    }
  }
  
  ordersProducts(
    limit:$ordersProductsLimit
    order:$orderProductsOrder
  )
  @skip(if:$withPagination)
  @storage(store:remote)
  {
    ...OrderProduct
  }
  
}

fragment OrderProduct on OrderProductType{
  
  ...OrderProductFields
  
  Product 
  @include(if:$orderProductGetProduct)
  @storage(store:remote)
  {
    ...ProductFields
  }
  
}

fragment ProductFields on MODXResourceType{
  ...MODXResourceFields
}

fragment OrderProductFields on OrderProductType{
  id
  order_id
  product_id
  quantity
  price
}

# Добавление товара в корзину
mutation OrderAddProduct(
  $orderProductId:Int!
  $orderProductsQuantity:Int!
  $orderGetProducts:Boolean = false
  $orderProductGetProduct:Boolean = false
  $getImageFormats:Boolean = false
  $orderGetContractor:Boolean = false
  $orderContractorGetOrders:Boolean = false
){
  
  orderAddProduct(
    product_id:$orderProductId
    quantity:$orderProductsQuantity
  )
  @storage(store:remote)
  {
    ...Order
  }
  
}

# Обновление товара в корзине
mutation OrderUpdateProduct(
  $orderPositionId:Int!
  $orderProductsQuantity:Int!
  $orderGetProducts:Boolean = false
  $orderProductGetProduct:Boolean = false
  $getImageFormats:Boolean = false
  $orderGetContractor:Boolean = false
  $orderContractorGetOrders:Boolean = false
){
  
  orderUpdateProduct(
    position_id:$orderPositionId
    quantity:$orderProductsQuantity
  )
  @storage(store:remote)
  {
    ...Order
  }
  
}

query Users(
  $usersLimit: Int = 10
  $getImageFormats: Boolean = false
  $withPagination: Boolean = false
  $usersSearchQuery: String
  $usersStorage: ReactCmsStorageStoreType = remote
  $orderGetProducts:Boolean = false
  $orderProductGetProduct:Boolean = false
  $userGetOrder:Boolean = false
  $userGetOrders:Boolean = false
  $orderGetContractor:Boolean = false
  $orderContractorGetOrders:Boolean = false
) {
  ...RootUsers
}

fragment User on ShopModxUserType {
  
  ...UserFields
  
  Order
  @include(if:$userGetOrder)
  @storage(store:remote)
  {
    ...Order
  }
  
  Orders
  @include(if:$userGetOrders)
  @storage(store:remote)
  {
    ...Order
  }
  
}


# Оформление заказа
mutation OrderSubmit(
  $orderGetProducts:Boolean = false
  $orderProductGetProduct:Boolean = false
  $getImageFormats:Boolean = false
  $orderParams:JSON
  $orderGetContractor:Boolean = false
  $orderContractorGetOrders: Boolean = false
){
  
  orderSubmit(
    params: $orderParams
  )
  @storage(store:remote)
  {
    ...Order
  }
  
}

mutation updateUser(
  $userId:Int!
  $userData:JSON!
  $userGetOrder:Boolean = false
  $userGetOrders:Boolean = false
  $getImageFormats:Boolean = false
  $orderGetProducts:Boolean = false
  $orderProductGetProduct:Boolean = false
  $orderGetContractor:Boolean = false
  $orderContractorGetOrders:Boolean = false
){
  
  updateUser(
    id:$userId
    data:$userData
  )
  @storage(store:remote)
  {
    ...User
  }
  
}


query orderStatuses(
  $ordersStatuses:Int = 0
  $withPagination:Boolean = false
){
  
  ...RootOrdersStatuses
  
}


fragment RootOrdersStatuses on RootType{
  
  ordersStatusesList(
    limit:$ordersStatuses
  )
  @include(if: $withPagination)
  @storage(store:remote)
  {
    count
    total
    page
    object{
      ...OrderStatus
    }
  }
  
  
  ordersStatuses(
    limit:$ordersStatuses
  )
  @skip(if: $withPagination)
  @storage(store:remote)
  {
    ...OrderStatus
  }
  
}


fragment OrderStatus on OrderStatusType{
  ...OrderStatusFields
}

fragment OrderStatusFields on OrderStatusType{
  id
  status
  comment
  rank
}


`;

// shopModxQuery = ``;

const defaultQuery = mergeQuery(ReactCmsQuery, shopModxQuery);


export default defaultQuery;
