<template>
    <div>
      <select name="locale" :value="locale" @change="updateLocale($event.target.value)">
        <option v-for="lang in locales" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

	export default {
		name: "Locale",

    computed: {
      ...mapGetters('lang', [
        'locale',
        'locales',
      ])
    },

    methods: {
      ...mapActions('lang', [
        'setLocale'
      ]),

		  updateLocale(value) {
		    this.setLocale(value)
      }
    }
	}
</script>

<style scoped>

</style>
