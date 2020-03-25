# comment-message-editor

A refined, customizable comment editor based on Vue

## Install

> npm install comment-message-editor

## How to use

> Register component

```javascript
import Vue from 'vue'
import CommentEditor from 'comment-message-editor'

Vue.component(CommentEditor.name, CommentEditor)
```

> Component render

```HTML
<template>
  <comment-editor></comment-editor>

</template>

```

## Screenshots

![comment-editor](/screenshots/1.gif)
![comment-editor](/screenshots/2.gif)

## Props

|    Name    | Description  |  Type   | Default |
| :--------: | :----------: | :-----: | :-----: |
|   inline   | 是否横向显示 | Boolean |  false  |
| buttonText | 提交按钮文案 | String  |  发送   |


## Methods

| Name  | Description | Parameter |
| :---: | :---------: | :-------: |
| focus | 激活输入框  |     -     |

## Events

|  Name  |     Description      |    Parameter     |
| :----: | :------------------: | :--------------: |
| submit | 输入框内容提交后触发 | 输入框写入的内容 |


