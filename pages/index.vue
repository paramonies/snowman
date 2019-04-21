<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
      <li v-for="(user, index) in users" :key="index" class="user">
        <nuxt-link :to="{ name: 'id', params: { id: user._id }}">
          {{ user.name }}
        </nuxt-link>
      </li>
    </ul>
    <form action="/users/add" method="POST" @submit.prevent="add">
        <label>
          <input type="text" v-model="newUserName">
        </label>
        <button type="submit">+</button>
    </form>
    <pre>{{ users }}</pre>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data (context) {
    return {
      users: [],
      newUserName: null
    }
  },
  async asyncData () {
    let { data } = await axios.get('/api/users')
    return { users: data }
  },
  methods: {
    async add (e) {
      await axios.post('/api/users/add', {
        name: this.newUserName
      }).then((response) => {
        console.log(response.data)
        // return { users: response.data }
        // var test = [
        //   {
        //     name: 'testtest'
        //   }
        // ]
        // return { users: test }
        console.log(this)
        this.users = response.data
      })
      // this.$set(post, 'edit', true)
      // Vue.set(this, 'users', users)
      // let { data } = await axios.get(process.env.API_SERVER + `/v1/projects`)
      // this.items = data
    }
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
