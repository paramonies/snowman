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
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
      <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
      <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
      <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
    </ul>
    <!-- Tab panes -->
    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active" id="home">Home text...</div>
      <div role="tabpanel" class="tab-pane" id="profile">Profile text...</div>
      <div role="tabpanel" class="tab-pane" id="messages">Messages text...</div>
      <div role="tabpanel" class="tab-pane" id="settings">Settings text...</div>
    </div>
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
