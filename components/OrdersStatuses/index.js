
import React, {Component} from 'react';

import PropTypes from 'prop-types';

import View from './View';

export default class OrdersStatuses extends Component{

  
  static propTypes = {
    View: PropTypes.func.isRequired,
    onCheck: PropTypes.func,
    checked: PropTypes.array,         // Какие статусы отмечены
  };


  static defaultProps = {
    View,
  };


  static contextTypes = {
    remoteQuery: PropTypes.func.isRequired,
  };


  async componentDidMount(){

    const {
      remoteQuery,
    } = this.context;

    await remoteQuery({
      operationName: "orderStatuses",
    })
    .then(r => {
      // console.log("orderStatuses result", r);

      this.setState(r.data);

    })
    .catch(e => {
      console.error(e);
    });

    return super.componentDidMount && super.componentDidMount();
  }


  render(){

    const {
      View,
      ...other
    } = this.props;

    return <View 
      {...other}
      {...this.state}
    />
  }

}