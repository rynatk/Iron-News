import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import { Article, ArticleCollection } from './models';
import ArticleList from './views/ArticleList';
import CommentsView from './views/CommentsView';

class Router extends Backbone.Router {

  initialize() {
    this.articles = new ArticleCollection();
  }

  get routes() {
    return {
      '': 'index',
      ':id/comments': 'comments'
    };
  }

  index() {
    const articleList = new ArticleList({
      collection: this.articles
    });

    this.articles.fetch().then(() => {
      $('main').html(articleList.render());
    });
  }

  comments(article_id) {
    const article = new Article({
      id: article_id
    });
    article.fetch().then(() => {
      const commentsView = new CommentsView({
        model: article
      });

      $('main').html(commentsView.render());
    });
  }
}

export default Router;
