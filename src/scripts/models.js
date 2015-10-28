import $ from 'jquery';
import Backbone from 'backbone';
import moment from 'moment';

export class Article extends Backbone.Model {
  get url() {
    return `http://iron-news.herokuapp.com/articles/${this.get('id')}`;
  }

  get timeAgo() {
    return moment(this.get('created_at')).fromNow();
  }

  serialize() {
    var json = this.toJSON();
    json.timeAgo = this.timeAgo;
    return json;
  }

  upvote() {
    return $.post(
      this.url + '/vote'
    );
  }

  createComment(message, name) {
    return $.post(
      this.url + '/comments', {
        article_id: this.get('id'),
        message: message,
        name: name
      }
    );
  }
}

export class ArticleCollection extends Backbone.Collection {
  get url() {
    return 'http://iron-news.herokuapp.com/articles'
  }

  get model() {
    return Article
  }
}
