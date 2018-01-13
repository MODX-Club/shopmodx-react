
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';

// import Toolbar from 'material-ui/Toolbar';
// import Typography from 'material-ui/Typography';
// import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
// import FilterListIcon from 'material-ui-icons/FilterList';

import {Link, browserHistory} from 'react-router';

import NumberFormat from 'react-number-format';

export default class OrderRow extends Component{

	static propTypes = {
		item: PropTypes.object.isRequired,
	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		this.state = {

		};
	}

	render(){

		const {
			item,
		} = this.props;

		const {
			id,
			sum,
			original_sum,
			contractor,
			positions,
			createdon,
      total,
			status,
			status_str,
			discount,
      Contractor,
    } = item;
    
    const {
      id: contractor_id,
      username: contractor_username,
      fullname: contractor_fullname,
      email: contractor_email,
      phone: contractor_phone,
    } = Contractor || {};
                
    const isSelected = true;

		return <TableRow
      // hover
      // onClick={event => this.handleClick(event, n.id)}
      // onKeyDown={event => this.handleKeyDown(event, n.id)}
      // role="checkbox"
      // aria-checked={isSelected}
      // tabIndex={-1}
      // key={n.id}
      // selected={isSelected}
      style={{
      	cursor: "pointer",
      }}
      onClick={event => {
      	browserHistory.push(`/office/orders/${id}/`);
      }}
    >
    	{/*
      <TableCell checkbox>
        <Checkbox 
        // checked={isSelected} 
       />
      </TableCell>
    	*/}
      <TableCell numeric>{id}</TableCell>
      <TableCell >{createdon || ""}</TableCell>
      <TableCell >{status_str}</TableCell>
      <TableCell numeric>

      	{original_sum && original_sum != sum
      		?
          <s><NumberFormat 
		      		value={original_sum} 
		      		displayType={'text'} 
		      		thousandSeparator={" "}
		      	/></s>
            :
            null
          } <NumberFormat 
	      		value={sum} 
	      		displayType={'text'} 
	      		thousandSeparator={" "} 
	      		suffix={' р.'} 
	      	/> {discount && <span style={{color: "red",}}>-${discount}%</span> || ""}
      </TableCell>
      {/* <TableCell numeric>{discount && `${discount}%` || ""}</TableCell> */}
      <TableCell >{contractor_fullname || contractor_username || ""}</TableCell>
      <TableCell numeric>{positions}</TableCell>
      <TableCell numeric>{total}</TableCell>
    </TableRow>
	}
}
