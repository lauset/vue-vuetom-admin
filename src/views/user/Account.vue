<template>
  <v-card id="account-setting-card">
    <v-tabs v-model="tab" background-color="background">
      <v-tab value="one" color="secondary">
        <v-icon>mdi-account-outline</v-icon> Settings</v-tab
      >
      <v-tab value="two" color="secondary"> More </v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <settings :account-data="accountSettingData"></settings>
        </v-window-item>
        <v-window-item value="two">
          {{ stu }}
          <v-btn color="primary" class="me-3 mt-4" @click="resetRouter">
            reset route
          </v-btn>
          <v-btn color="primary" class="me-3 mt-4" @click="go">
            reset route
          </v-btn>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import Settings from './Settings.vue'
import { resetRouter, router } from '@/router'
import { useHautStore } from '@/store/modules/haut'

const haut = useHautStore()
const stu = haut.getStu
const tab = ref('')

const go = () => {
  router.push('/other/demo11')
}

// account settings data
const accountSettingData = {
  account: {
    avatarImg: '',
    username: 'johnDoe',
    name: 'john Doe',
    email: 'johnDoe@example.com',
    role: 'Admin',
    status: 'Active',
    company: 'Google.inc',
  },
  information: {
    bio: 'The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scaLabel 😀, and lightning 😍 fast search and discovery experiences.',
    birthday: 'February 22, 1995',
    phone: '954-006-0844',
    website: 'https://themeselection.com/',
    country: 'USA',
    languages: ['English', 'Spanish'],
    gender: 'male',
  },
}
</script>
