<template>
  <div>
    <div>
      {{ errorMassageOfCommentName }} <br />
      名前：<br />
      <input type="text" v-model="commentName" /> <br />
      {{ errorMassageOfCommentContent }} <br />
      コメント：<br />
      <textarea cols="30" rows="10" v-model="commentContent"></textarea><br />
      <button type="button" @click="addComment">コメント投稿</button>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Comment } from "@/types/comment";
import { Prop, Component, Vue } from "vue-property-decorator";
@Component
export default class postComment extends Vue {
  @Prop()
  //記事ID
  private articleId!: number;
  //コメント者名
  private commentName = "";
  //コメント内容
  private commentContent = "";
  //コメント者名のエラーメッセージ
  private errorMassageOfCommentName = "";
  //コメント内容のエラーメッセージ
  private errorMassageOfCommentContent = "";

  /**
   * 新しいコメントを投稿する.
   *
   */
  addComment(): void {
    //バリテーション
    let error = false;
    this.errorMassageOfCommentName = "";
    this.errorMassageOfCommentContent = "";
    if (this.commentName === "") {
      this.errorMassageOfCommentName = "コメント者名を入力して下さい";
      error = true;
    }
    if (this.commentContent === "") {
      this.errorMassageOfCommentContent = "コメント内容を入力して下さい";
      error = true;
    }
    if (error === true) {
      return;
    }
    //コメントを投稿
    this.$store.commit("addComment", {
      newComment: new Comment(
        -1,
        this.commentName,
        this.commentContent,
        this.articleId
      ),
    });
    //コメント者名をリセット
    this.commentName = "";
    //コメント内容をリセット
    this.commentContent = "";
  }
}
</script>

<style scoped></style>
