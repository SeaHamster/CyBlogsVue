<template>
  <div>
    <svg-icon icon-class="github" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'RuoYiGit',
  data() {
    return {
      // url: 'https://gitee.com/y_project/RuoYi-Vue'
      url: 'https://github.com/SeaHamster/copying-blogs'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
