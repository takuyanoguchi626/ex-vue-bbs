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
    <!-- ここから記事一覧 -->
    <div v-for="(article, index) of currentArticleList" :key="article.id">
      投稿者名：{{ article.name }} <br />
      投稿内容：{{ article.content }} <br />
      <button type="button" @click="deleteArticle(index)">記事削除</button>
      <!-- ここからコメント一覧 -->
      <div v-for="comment of article.commentList" :key="comment.id">
        コメント者名：{{ comment.name }} <br />
        コメント内容：{{ comment.content }}
      </div>
      <!-- ここからコメント投稿 -->
      <div>
        名前：<br />
        <input type="text" v-model="commentName" /> <br />
        コメント：<br />
        <textarea cols="30" rows="10" v-model="commentContent"></textarea><br />
        <button type="button" @click="addComment(article)">コメント投稿</button>
        <hr />
      </div>
    </div>
    <!-- end div -->
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  //投稿者名
  private articleName = "";
  //投稿内容
  private articleContent = "";
  //記事一覧
  private currentArticleList = new Array<Article>();
  //コメント者名
  private commentName = "";
  //コメント内容
  private commentContent = "";

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
    let articles = this.$store.getters.getArticles;
    let newId = 0;
    if (this.currentArticleList.length >= 1) {
      newId = articles[0].id + 1;
    }
    this.$store.commit("addArticle", {
      article: new Article(newId, this.articleName, this.articleContent, []),
    });
    this.articleName = "";
    this.articleContent = "";
  }

  /**
   * 新しいコメントを投稿する.
   *
   * @params - 記事
   */
  addComment(article: Article): void {
    this.$store.commit("addComment", {
      article: article,
      newComment: new Comment(
        -1,
        this.commentName,
        this.commentContent,
        article.id
      ),
    });
    this.commentName = "";
    this.commentContent = "";
  }

  /**
   * 記事を削除する.
   *
   *@params - インデックス番号
   */
  deleteArticle(index: number): void {
    this.$store.commit("deleteArticle", {
      articleIndex: index,
    });
  }
}
</script>

<style scoped></style>
