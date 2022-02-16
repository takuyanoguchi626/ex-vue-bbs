<template>
  <div>
    <!-- start div -->
    <div>
      投稿者名：<input type="text" v-model="articleName" /><br />
      投稿内容：<textarea
        cols="30"
        rows="10"
        v-model="articleContent"
      ></textarea
      ><br />
      <button type="button" @click="addArticle">記事投稿</button>
      <hr />
    </div>
    <div v-for="article of currentArticleList" :key="article.id">
      投稿者名：{{ article.name }} <br />
      投稿内容：{{ article.content }}
      <div v-for="comment of article.commentList" :key="comment.id">
        コメント者名：{{ comment.name }} <br />
        コメント内容：{{ comment.content }}
      </div>
    </div>
    <!-- end div -->
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  //投稿者名
  private articleName = "";
  //投稿内容
  private articleContent = "";
  //記事一覧
  private currentArticleList = new Array<Article>();

  /**
   *Vuexストアから記事一覧を取得し、currentArticleListに格納.
   *
   */
  created(): void {
    this.currentArticleList = this.$store.getters.getArticles;
  }

  /**
   * 新しい記事を投稿する.
   *
   */
  addArticle(): void {
    let articlesLength = this.$store.getters.getArticleLength;
    this.$store.commit(
      "addArticle",
      new Article(articlesLength + 1, this.articleName, this.articleContent, [])
    );
  }
}
</script>

<style scoped></style>
