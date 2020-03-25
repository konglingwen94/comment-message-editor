import Vue from 'vue'
import App from './main.vue'
import Comment from '../src/index.js'
// import Comment from '../dist/comment-message-editor.umd.min.js'


Vue.component(Comment.name,Comment)

new Vue({
  el: '#app',
  render(h) {
    return h(App)
  },
})
