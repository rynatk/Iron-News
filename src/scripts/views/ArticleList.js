import Backbone from 'backbone';

import LineView from './LineView';

class ArticleList extends Backbone.View {
  get tagName() { return 'ol' }

  render() {
    const self = this;
    this.collection.each((article) => {
      let view = new LineView({model: article});
      self.$el.append(view.render());
    });
    return this.$el;
  }
}

export default ArticleList;
