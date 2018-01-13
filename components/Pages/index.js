
import React, {Component} from 'react';

import PropTypes from 'prop-types';

import PageLayout from 'react-cms/src/app/components/Page';


let {
	...contextTypes
} = PageLayout.contextTypes;


Object.assign(contextTypes, {
	userActions: PropTypes.object.isRequired,
});


export default class ShopmodxPage extends PageLayout{


	static contextTypes = contextTypes;


	async loadServerData(provider, options = {}){

		// Для всех страниц по умолчанию
	  let result = {
	  	data: {
	  		title: "ShopModxBox",
	  	},
		};
		

		const {
      params,
      location,
			
			/*
      	Серверный объект запроса, содержащий заголовки.
      	Важно передавать этот объект в запрос, чтобы на сервере передавались и кукисы пользователя
      */
      req,		
		} = options;
		
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
		else{

			const {
				user,
			} = this.context;

			Object.assign(result.data, {
				user: user && user.user || undefined,
			});

		}

		return result;

	}


	render(childContent){

		return super.render(<div
			style={{
		    display: "flex",
		    flexDirection: "row",
		    flexGrow: 1,
		    height: "100%",
			}}
		>
 
			{childContent}

		</div>);

	}


}