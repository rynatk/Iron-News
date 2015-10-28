import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import Router from './router';

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

$(function() {
  window.router = new Router();
  Backbone.history.start();
})
