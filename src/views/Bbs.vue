<template>
  <div>
    <div v-for="article of currentArticleList" :key="article.id">
      投稿者名：{{ article.name }} <br />
      投稿内容：{{ article.content }}
      <div v-for="comment of article.commentList" :key="comment.id">
        コメント者名：{{ comment.name }} <br />
        コメント内容：{{ comment.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  //記事一覧
  private currentArticleList = new Array<Article>();

  /**
   *Vuexストアから記事一覧を取得し、currentArticleListに格納.
   *
   */
  created(): void {
    this.currentArticleList = this.$store.getters.getArticle;
  }
}
</script>

<style scoped></style>
