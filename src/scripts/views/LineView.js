import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

class LineView extends Backbone.View {
  get tagName() { return 'li' }

  get template() { return _.template($('#lineViewTemplate').text()); }

  get events() {
    return {
      "click .comments": "goToComments",
      "click .triangle": "upvote"
    }
  }

  upvote(event) {
    event.preventDefault();

    this.model.upvote().done(function(data) {
      console.log(data);
    }).fail();
  }

  goToComments() {
    let path = `#${this.model.get('id')}/comments`;
    window.router.navigate(path, { trigger: true });
  }

  render() {
    this.$el.html(this.template(this.model.serialize()));
    return this.$el;
  }
}

export default LineView;
