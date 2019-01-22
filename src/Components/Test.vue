<template>
  <div id="app">
    <input v-model="latex"/><br>
    <div :key="latex">{{latex}}</div>
    <p>{{mgs}}</p>
    <h2>$$\\frac{1}{2}$</h2>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      latex: '$$\\frac{a}{b}$$',
      mgs: '$\\frac{1}{2}$',
    }
  },
  methods: {
    reRender() {
      if(window.MathJax) {
        console.log('rendering mathjax');
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub], () => console.log('done'));
      }
    }
  },
  mounted() {
    this.reRender();
  },
  watch: {
    latex: function() {
      console.log('data changed');
      this.$nextTick().then(()=>{
        this.reRender();
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
