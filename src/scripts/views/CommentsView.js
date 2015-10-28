import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import moment from 'moment';

import LineView from './LineView';

class CommentsView extends Backbone.View {
  get template() {
    return _.template($('#commentsViewTemplate').text());
  }

  get events() {
    return {
      "submit form.newComment": "createComment"
    }
  }

  createComment(event) {
    event.preventDefault();
    let form = $(event.target);

    let message = $('[name=message]', form).val();
    let name = $('[name=name]', form).val();

    let $newComment = $('');

    this.model.createComment(message, name).done(function() {
      $newComment = (`<li>
        <div class="message">${message}</div>
        <div class="author">by ${name}</div>
        <time>${moment().fromNow()}</time>
      </li>`);
      $('.comments').prepend($newComment);
      event.target.reset();
    }).fail(function() {
      $newComment.remove();
    });
  }

  render() {
    let self = this;
    let lineView = new LineView({
      model: this.model
    });

    this.$el.html(this.template());

    _.each(this.model.get('comments'), function(comment) {
      $('ul', self.$el).append(`<li>
        <div class="message">${comment.message}</div>
        <div class="author">by ${comment.name}</div>
        <time datetime="${comment.created_at}">
          ${moment(comment.created_at).fromNow()}
        </time>
      </li>`);
    });

    $('.line', this.$el).html(lineView.render());

    return this.$el;
  }
}

export default CommentsView;
