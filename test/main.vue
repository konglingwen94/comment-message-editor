<template>
  <div class>
    <p>默认</p>
    <comment-editor></comment-editor>
    <p>内联模式</p>
    <comment-editor inline></comment-editor>
    <p>定制按钮文案</p>

    <comment-editor button-text="发送" inline></comment-editor>
    <p>激活状态</p>

    <comment-editor @hook:mounted="$refs.inlineActive.focus()" ref="inlineActive" inline></comment-editor>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
 
}
</script>

