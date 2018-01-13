
import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import {Link} from 'react-router';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import NumberFormat from 'react-number-format';

export default class OrderProductsView extends Component{

  static propTypes = {
    order: PropTypes.object.isRequired,
    addToBasket: PropTypes.func,
  };

  addToBasket(n, quantity){

    const {
      addToBasket,
    } = this.props;

    return addToBasket && addToBasket(n, quantity) || null;

  }


  renderTotal(){

    const {
      order,
    } = this.props;

    const {
      id,
      sum,
      original_sum,
      discount,
    } = order;

    return <div
      style={{
        padding: "10px 0",
      }}
    >
      <b>Итого: </b> {original_sum && original_sum != sum
      ?
      <s><NumberFormat 
          value={original_sum || 0} 
          displayType={'text'} 
          thousandSeparator={" "}
        /></s>
        :
        null
      } <NumberFormat 
        value={sum || 0} 
        displayType={'text'} 
        thousandSeparator={" "} 
        suffix={' р.'} 
      /> {discount && <span style={{color: "red",}}>Скидка: ${discount}%</span> || ""}
    </div>

  }


  render(){

    const {
      order,
      addToBasket,
    } = this.props;

    if(!order){
      return null;
    }
    
    const {
      status_id,
      Products,
      sum,
      original_sum,
      discount,
    } = order;

    return <div>
      <Paper 
        style={{
          padding: 10,
          overflow: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Наименование</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Стоимость</TableCell>
              <TableCell>Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Products && Products.map(n => {

              const {
                id,
                quantity,
                price,
                Product,
              } = n;

              const {
                pagetitle,
                uri,
                imageFormats,
              } = Product;

              const {
                thumb,
              } = imageFormats || {};

              const sum = quantity * price;

              const link = `/${uri}`;

              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link
                      to={link}
                      href={link}
                      title={pagetitle}
                    >
                      {thumb && <img 
                        src={thumb}
                      /> || ""}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={link}
                      href={link}
                      title={pagetitle}
                    >
                      {pagetitle}
                    </Link>
                  </TableCell>
                  <TableCell >
                    
                    <TextField 
                      value={quantity || 0}
                      type="number"
                      name="quantity"
                      disabled={status_id === 1 && addToBasket ? false : true}
                      onChange={event => {

                        let {
                          value: quantity,
                        } = event.target;

                        quantity = quantity > 0 ? quantity : 0;

                        this.addToBasket(n, quantity);

                      }}
                    />

                  </TableCell>
                  <TableCell >
                    <NumberFormat 
                      value={price || 0}
                      thousandSeparator=" "
                      displayType="text"
                    /> руб.
                  </TableCell>
                  <TableCell >
                    <NumberFormat 
                      value={sum || 0}
                      thousandSeparator=" "
                      displayType="text"
                    /> руб.
                  </TableCell>
                </TableRow>
              );
            }) || null}
          </TableBody>
        </Table>


      </Paper>

      {this.renderTotal()}

    </div>;

  }

}