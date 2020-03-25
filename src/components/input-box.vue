<template>
  <div class>
    <div type="text" class="input-box-wrapper">
      <div
        :class="['content',{focused},type]"
        ref="richText"
        v-on="listeners"
        v-bind="$attrs"
        :contenteditable="contenteditable"
      ></div>
      <div class="append-wrapper">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'input-box',
  data() {
    return {
      contenteditable: true
    }
  },
  computed: {
    listeners() {
      return Object.assign(
        {},
        this.$listeners,

        {
          input: function(e) {
            const inputContent =
              this.contentType === 'plain'
                ? e.target.textContent
                : e.target.innerHTML

            this.$emit('input', inputContent)
          }.bind(this)
        }
      )
    }
  },
  props: {
    focused: {
      type: Boolean,
      default: false
    },
    contentType: {
      type: String,
      default: 'plain',
      validator(value) {
        return ['plain', 'rich'].includes(value)
      }
    },

    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'textarea'].includes(value)
      }
    },
    rows: Number
  },
  methods: {
    focus() {
      this.$refs.richText.focus()
    }
  }
}
</script>

<style scoped lang="less">
.input-box-wrapper {
  position: relative;
  
}

.content {
  max-height: 5em;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &.textarea {
    min-height: 2.7em;
  }
  &.text {
    min-height: 1.2em;
  }

  &:empty:before {
    content: attr(placeholder);
    color: #ccc;
    position: absolute;
    left: 10px;
    top: 7px;
  }
  &.focused {
    border: #66b1ff 1px solid;
    cursor: text;
  }
  &:focus {
    outline: none;
  }
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 7px 10px;
  padding-right: 30px;
  position: relative;
}

.append-wrapper {
  position: absolute;
  right: 1px;
  top: 1px;
  bottom: 1px;
  display: flex;
  cursor: pointer;
  align-items: center;
}
</style>

