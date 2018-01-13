
import ReactCmsUserPage from 'react-cms/src/app/components/Page/Users/User';

import Page from '../../';

export default class ShopModxUserPage extends ReactCmsUserPage{

	async loadServerData(provider, options = {}){

    let result;
    
    if(typeof window !== "undefined"){

      result = await Page.prototype.loadServerData.call(this, provider, options);
      
    }
    else{

      result = await Page.prototype.loadServerData(provider, options);

    }

    let result2 = await super.loadServerData(provider, options);

    if(result && result2){
      result.data = Object.assign(result.data || {}, result2.data);
    }

    // console.log("result", result);


    // console.log("result2", result2);
    // console.log("result2", Page);

    return result;

  }
}