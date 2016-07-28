import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';

import Header from '../components/Header';
import { Menu } from '/imports/api/menu/menu';

export default createContainer(() => {
  const cartItems = Session.get('cart') || {};

  if (_.keys(cartItems).length === 0) {
    Session.set('cart', {});
  }

  const ids = _.keys(cartItems);

  const subscription = Meteor.subscribe('menu.byIds', ids);

  const menuItems = Menu.find({ _id: { $in: ids } }).map(menuItem => {
    menuItem.count = cartItems[menuItem._id] || 0;
    return menuItem;
  });

  return {
    ready: subscription.ready(),
    cartItems: menuItems,
  };
}, Header);