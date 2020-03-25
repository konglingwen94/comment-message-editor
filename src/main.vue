<template>
  <div class="comment-editor" ref="container">
    <div class="input-wrapper" :class="{inline}">
      <input-box
        ref="inputBox"
        :type="inline?'text':'textarea'"
        content-type="rich"
        :rows="2"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @keyup.enter.ctrl.exact.native="handlerSubmit"
        v-model="inputContent"
        :placeholder="'placeholder'"
        :focused="showInlineButton"
        class="input-box"
      >
        <div v-if="inline" :class="['input-append',{hasbg:!showInlineButton}]" slot="append">
          <emoji-picker
            ref="emojiPicker"
            trigger-pick="click"
            @activated="inputBoxFocused=true"
            @selected="handlerEmojiSelected"
            picker-position="left"
            :button-text-visible="false"
          ></emoji-picker>
        </div>
      </input-box>
      <transition name="button" >
        <div
          @click="handlerSubmit"
          class="submit-button inline"
          :disabled="!inputContent"
          ref="button"
          v-show="showInlineButton && inline"
        >{{buttonText}}</div>
      </transition>
    </div>
    <div class="footer-action" v-if="!inline">
      <emoji-picker
        trigger-pick="click"
        @activated="$refs.inputBox.focus()"
        @selected="handlerEmojiSelected"
      ></emoji-picker>
      <span class="submit-tiptext">Ctrl + Enter</span>
      <div @click="handlerSubmit" class="submit-button" :disabled="!inputContent">{{buttonText}}</div>
    </div>
  </div>
</template>
<script>
import InputBox from './components/input-box'
import EmojiPicker from './components/emoji-picker'
export default {
  name: 'comment-editor',
  components: { InputBox, EmojiPicker },
  data() {
    return {
      active: false,
      inputContent: '',
      inputBoxFocused: false
    }
  },

  props: {
    buttonText: {
      type: String,
      default: '提交'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showInlineButton() {
      return !!(this.inputBoxFocused || this.inputContent)
    }
  },
  destroyed() {
    document.removeEventListener('click', this.hideButton)
  },
  mounted() {
    document.addEventListener('click', this.hideButton)
  },
  methods: {
    focus(){
      this.$refs.inputBox.focus()
    },
    hideButton(e) {
      if (this.$refs.container.contains(e.target)) {
        return
      }

      if (!this.$refs.container.contains(e.target)) {
        this.inputBoxFocused = false
      }
    },
    onInputFocus(e) {
      this.inputBoxFocused = true
    },
    onInputBlur(e) {
      if (this.$refs.container.contains(e.target)) {
        return
      }

      this.inputBoxFocused = false
    },
    handlerSubmit(e) {
      if (e.target.hasAttribute('disabled')) {
        return
      }

      this.$emit('submit', this.inputContent)
    },

    handlerEmojiSelected(e) {
      this.$refs.inputBox.focus()
      const clonedNode = e.target.cloneNode(true)
      clonedNode.style.verticalAlign = 'text-top'
      document.execCommand('insertHTML', false, clonedNode.outerHTML)
    }
  }
}
</script>

<style scoped lang="less">
.input-wrapper {
  &.inline {
    display: flex;
    .input-box {
      flex: 1;
      margin-right: 14px;
    }
  }
  .input-append {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    &.hasbg {
      background: #eee;
    }
  }
}

.footer-action {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.submit-tiptext {
  margin-left: auto;
  margin-right: 4px;
  font-size: 14px;
  color: #ccc;
}
.submit-button {
  align-self:flex-end;
  transition:all 0.2s;
  background: #409eff;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  padding: 6px 10px;
  color: white;
  user-select: none;
&.button-enter,&.button-leave-to{
  // zoom:0;
  margin-left:-40px;
  transform:scale(0,0)
}
  &[disabled] {
    cursor: not-allowed;
    background: #66b1ff;
  }
  &:hover {
    background: #66b1ff;
  }
  &:not([disabled]):active {
    background: #3a8ee6;
  }
}
</style>
