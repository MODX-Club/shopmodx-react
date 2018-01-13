
import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';
import CheckedIcon from 'material-ui-icons/Done';

export default class OrdersStatusesView extends Component{

  static propTypes = {
    ordersStatuses: PropTypes.array,
    onCheck: PropTypes.func,
    checked: PropTypes.array,         // Какие статусы отмечены
  };


  onClick(event, orderStatus){

    const {
      onCheck,
    } = this.props;

    onCheck && onCheck(event, orderStatus);

  }


  renderOrderStatus(orderStatus){

    const {
      id,
      status,
      comment,
      rank,
    } = orderStatus;

    const {
      onCheck,
      checked,
    } = this.props;
    
    let checkedLabel = onCheck && checked && checked.indexOf(id) !== -1 && <CheckedIcon /> || null 

    return <Chip
      key={id}
      label={<span
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {checkedLabel} {status}
      </span>}
      style={this.getChipStyles(orderStatus)}
      onClick={event => {
        this.onClick(event, orderStatus);
      }}
    />
    
  }
  
  getChipStyles(orderStatus){

    let backgroundColor;
    let color;

    const {
      onCheck,
    } = this.props;

    const {
      id,
    } = orderStatus;

    switch(id){

      case 2:

        backgroundColor = "#FFCC99";

        break;

      case 3:

        backgroundColor = "#FF99CC";

        break;

      case 4:

        backgroundColor = "#CCFFFF";

        break;

      case 5:

        backgroundColor = "#CCFFCC";

        break;

      case 6:

        backgroundColor = "#00FF00";

        break;

      case 7:

        backgroundColor = "#FF0000";
        color = "white";

        break;

      case 8:

        backgroundColor = "#99CC00";

        break;

    }

    return {
      margin: 3,
      padding: "4px 0",
      height: "auto",
      backgroundColor,
      color,
      cursor: onCheck ? "pointer" : undefined,
    };

  }


  render(){

    const {
      ordersStatuses,
    } = this.props;

    if(!ordersStatuses || !ordersStatuses.length){
      return null;
    }

    let output;

    output = ordersStatuses.map(n => {

      return this.renderOrderStatus(n);

    });

    return <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {output}
    </div>
  }

}