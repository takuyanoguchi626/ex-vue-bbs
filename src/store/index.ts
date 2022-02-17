import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  }, //end state

  actions: {}, //end actions

  mutations: {
    /**
     * ステートの0番目にpayloadで受け取った記事を挿入する.
     *
     * @param state - ステート
     * @param payload - 投稿する記事
     */
    addArticle(state, payload) {
      state.articles.unshift(payload.article);
    },

    /**
     * 記事のコメントリストにpayloadで受け取ったコメントを挿入する.
     *
     * @param - state
     * @param - Bbs.vueから受け取った連想配列
     */
    addComment(state, payload) {
      const article = state.articles.filter(
        (article) => article.id === payload.article.id
      )[0];
      article.commentList.push(payload.newComment);
    },

    /**
     *
     * @param state - ステート
     * @param payload - Bbs.vueから受け取った連想配列
     */
    deleteArticle(state, payload) {
      state.articles.splice(payload.articleIndex, 1);
    },
  }, //end mutations

  getters: {
    /**
     * ステートからArticleを取得.
     *
     * @param state - ステート
     * @returns - 記事一覧
     */
    getArticles(state): Array<Article> {
      return state.articles;
    },
  }, //end getters

  modules: {}, //end modules
});
