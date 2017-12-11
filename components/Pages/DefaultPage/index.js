/*
	Базовая страница.

	Задача этого компонента - решить, есть такая страница или нет, и если есть, 
	то какой компонент выдать под ее рендеринг
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Page from '../';

import DefaultView from './View';
import MainPageView from 'shopmodx-react/components/Pages/MainPage/View';
import ProductView from 'shopmodx-react/components/Pages/Catalog/Products/Product/View';
import CatalogView from 'shopmodx-react/components/Pages/Catalog/View';
import NewsView from 'shopmodx-react/components/Pages/News/View';
import BasketView from 'shopmodx-react/components/Basket/View/Order';

let {
	...defaultProps = {}
} = Page.defaultProps || {};

Object.assign(defaultProps, {
	DefaultView,
	MainPageView,
	ProductView,
	CatalogView,
	NewsView,
	BasketView,
});

export default class DefaultPage extends Page{


	static defaultProps = defaultProps;


	loadData(options = {}){

		const {
      params,
      location,
		} = this.props;

		Object.assign(options, {
      params,
      location,
		});

		return super.loadData(options);

	}

	
	async loadServerData(provider, options = {}){

		let {
			req: nullReq,
			...debugOptions
		} = options;

		const {
      params,
      location,
			
			/*
      	Серверный объект запроса, содержащий заголовки.
      	Важно передавать этот объект в запрос, чтобы на сервере передавались и кукисы пользователя
      */
      req,		
		} = options;

		const {
			pathname,
			query,
		} = location || {};

		const {
			page,
		} = query || {};

		let result = await provider({
			operationName: "MODXResourceByUri",
			variables: {
				modxResourceUri: pathname,
				modxResourcesStorage: "local",
				modxResourcesShowHidden: true,
				getImageFormats: true,
			},
			req,
		})
		.then(r => r)
		.catch(e => {
			throw(e);
		});


		if(!result){
			return null;
		}



		/*
			На стороне сервера получаем данные текущего пользователя 
			и прочие данные, которые получить надо только один раз
		*/
		if(typeof window === "undefined"){
			
			// Получаем текущего пользователя
			await provider({
				operationName: "CurrentUser",
				variables: {
					// userGetOrder: true,
					// orderGetProducts: true,
					// orderProductGetProduct: true,
					getImageFormats: true,
				},
				req,
			})
			.then(r => {

				const {
					user,
				} = r.data;

				Object.assign(result.data, {
					user,
				});

				// console.log("DefaultPage CurrentUser", r);

			})
			.catch(e => {
				throw(e);
			});


			// Получаем текущий заказ
			await provider({
				operationName: "OwnOrder",
				variables: {
					orderGetProducts: true,
					orderProductGetProduct: true,
					getImageFormats: true,
				},
				req,
			})
			.then(r => {

				const {
					order,
				} = r.data;

				Object.assign(result.data, {
					order,
				});

				// console.log("DefaultPage CurrentUser", r);

			})
			.catch(e => {
				console.error(e);
			});

			/*
				Здесь получаем только данные, необходымые для инициализации на стороне сервера
			*/

			// Получаем донные для основного меню
			await provider({
				operationName: "MainMenuData",
				variables: {
				},
				req,
			})
			.then(r => {

				const {
					menuItems,
				} = r.data;

				Object.assign(result.data, {
					menuItems,
				});

			})
			.catch(e => {
				throw(e);
			});

		}


		// console.log("DefaultPage result", result);

		const {
			modxResource,
		} = result.data || {};


		if(!modxResource){

			return null;

		}
		else{

			let title;

			const {
				id,
				pagetitle,
				longtitle,
				description,
			} = modxResource;

			title = longtitle || pagetitle;

			Object.assign(result.data, {
				title,
				description,
			});

		}


		// Получаем дополнительные данные в зависимости от шаблона документа

		const {
			id,
			template,
		} = modxResource;

		switch(template){

			// Главная страница
			case 11:

				// Полчаем товары без постраничности
				await provider({
					operationName: "CatalogProducts",
					variables: {
						modxResourcesLimit: 6,
						withPagination: false,
						getImageFormats: true,
					},
					req,
				})
				.then(r => {

					const {
						modxResources: products,
					} = r.data;

					Object.assign(result.data, {
						products,
					});

				})
				.catch(e => {
					throw(e);
				});

				break;

			// Товар
			case 3:

				break;

			// Корневой раздел каталога
			case 17:

				// Все товары с постраничностью
				await provider({
					operationName: "CatalogProducts",
					variables: {
						modxResourcesLimit: 6,
						modxResourcesPage: page,
						withPagination: true,
						getImageFormats: true,
					},
					req,
				})
				.then(r => {

					const {
						modxResourcesList: productsList,
					} = r.data;

					Object.assign(result.data, {
						productsList,
					});

				})
				.catch(e => {
					throw(e);
				});


				// Три случайных категории
				await provider({
					operationName: "CatalogCategories",
					variables: {
						modxResourcesLimit: 3,
						withPagination: false,
						getImageFormats: true,
					},
					req,
				})
				.then(r => {

					const {
						modxResources: categories,
					} = r.data;

					Object.assign(result.data, {
						categories,
					});

				})
				.catch(e => {
					throw(e);
				});


				break;

			// Корневой раздел новостей
			case 18:

				// Все товары с постраничностью
				await provider({
					operationName: "MODXResources",
					variables: {
						modxResourcesParent: id,
						modxResourcesLimit: 5,
						modxResourcesPage: page,
						withPagination: true,
						getImageFormats: true,
					},
					req,
				})
				.then(r => {

					const {
						modxResourcesList: newsList,
					} = r.data;

					Object.assign(result.data, {
						newsList,
					});

				})
				.catch(e => {
					throw(e);
				});

				break;


			default:;

		}


		// console.log("DefaultPage result.data", result.data);
 
	  return result;

	}




  async onLocationChanged(){

    // console.log("Page onLocationChanged");


    await super.onLocationChanged();

    console.log("onLocationChanged", this.state);

    const {
    	title,
    } = this.state;

    console.log("onLocationChanged title", title);

    title && this.setPageTitle(title);

  }


	renderComponent(){

		// const {
		// 	ProductView,
		// 	CatalogView,
		// } = this.props;

		const {
			...componentState
		} = this.state;

		const {
			modxResource,
		} = componentState;

		if(!modxResource){
			return null;
		}


		/*
			Определяем какой компонент будем рендерить
		*/
		const {
			DefaultView,
			ProductView,
			CatalogView,
		} = this.props;

		// const {
		// 	...componentState
		// } = this.state;

		// const {
		// 	modxResource,
		// } = componentState;

		// if(!modxResource){
		// 	return null;
		// }

		const {
			id,
			template,
		} = modxResource;


		// Этот компонент отвечает за отображение
		let View;

		switch(template){

			case 11:

				View = MainPageView;

				break;

			case 3:

				View = ProductView;

				break;

			case 17:

				View = CatalogView;

				break;

			case 18:

				View = NewsView;

				break;

			case 19:

				View = BasketView;

				break;

			default: View = DefaultView;

		}

		// let content;

		// switch(template){

		// 	case 3:

		// 		content = <ProductView
		// 			key={id}
		// 			{...componentState}
		// 		/>

		// 	case 17:

		// 		content = <CatalogView
		// 			key={id}
		// 			{...componentState}
		// 		/>

		// 		break;

		// }

		return View && <View
			key={id}
			{...componentState}
		/> || null;

	}


	render(){

		// console.log("DefaultPage render");

		let content = this.renderComponent();

		return super.render(<div
			style={{
				flexBasis: "100%",
			}}
		>
			
			{content}

      <div
      	className="footer"
      >
        
      	<a 
      		href="https://modxclub.ru/" 
      		target="_blank"
      	>
      		<div 
	      		className="copy"
	      	/>
      	</a>

      </div>

		</div>);

	}

}
