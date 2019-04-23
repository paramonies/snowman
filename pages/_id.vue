<template>
  <section class="container">
    <h1>{{ user.name }}</h1>
    <form method="POST" action="#" @submit.prevent="remove">
      <input type="hidden" name="id" :value="user._id">
      <button type="submit">Удалить</button>
    </form>
    <nuxt-link to="/">Вернуться</nuxt-link>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'id',
  asyncData ({ params, error }) {
    return axios.get('/api/users/' + params.id)
      .then((res) => {
        console.log(res)
        return { user: res.data }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'User not found' })
      })
  },
  methods: {
    async remove (e) {
      await axios.post('/api/users/remove', {
        _id: this.user._id
      }).then((response) => {
        this.$router.replace({ path: '/' })
      })
    }
  },
  head () {
    return {
      title: `User: ${this.user.name}`
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
