<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <v-img
            :src="getAssetsImg('logos/logo01.png')"
            max-height="50px"
            max-width="50px"
            alt="logo"
            contain
            class="me-3"
          ></v-img>
          <router-link to="/" class="d-flex align-center">
            <h2 class="text-2xl font-weight-semibold">Vuetom</h2>
          </router-link>
          <v-switch
            v-model="theme"
            style="max-width: 2rem; margin-left: 2rem"
            label="Night"
            color="primary"
            value="dark"
            hide-details
          ></v-switch>
        </v-card-title>
        <!-- title -->
        <v-card-text>
          <p class="mb-2">
            Please sign-in to your account and start the adventure
          </p>
        </v-card-text>
        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="num"
              outlined
              label="Account"
              placeholder="admin"
              hide-details
              class="mb-3"
            ></v-text-field>
            <br />
            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>
            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox label="Remember Me" hide-details class="me-3 mt-1">
              </v-checkbox>
              <!-- forgot link -->
              <a href="javascript:void(0)" class="mt-1"> Forgot Password? </a>
            </div>
            <v-btn block color="primary" class="mt-6" @click="handleSubmit">
              Login
            </v-btn>
          </v-form>
        </v-card-text>
        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2"> Skip Login </span>
          <router-link :to="{ path: '/index' }">
            Enter the home page
          </router-link>
        </v-card-text>
        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider><span class="mx-5">or</span
          ><v-divider></v-divider>
        </v-card-text>
        <!-- social links -->
        <v-card-actions class="d-flex justify-center">
          <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1">
            <v-icon
              :color="
                $vuetify.theme.current === 'dark'
                  ? link.colorInDark
                  : link.color
              "
            >
              {{ link.icon }}
            </v-icon>
            <!-- <span :class="'mdi ' + link.icon"></span> -->
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      :src="
        getAssetsImg(
          `cover/bg-${$vuetify.theme.current == 'dark' ? 'dark' : 'light'}.png`,
        )
      "
    />
    <!-- tree -->
    <!-- <v-img
      class="auth-tree"
      width="247"
      height="185"
      :src="getAssetsImg('other/tree.png')"
    ></v-img> -->
    <!-- tree  -->
    <!-- <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      :src="getAssetsImg('other/tree-3.png')"
    ></v-img> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingStore } from '@/store/modules/settings'
import { useHautStore } from '@/store/modules/haut'
const settings = useSettingStore()
const router = useRouter()
const route = useRoute()
const isPasswordVisible = ref(false)
const num = ref('admin')
const password = ref('admin')
const theme = ref('')
const { proxy } = getCurrentInstance()
const m = proxy.$msg
const haut = useHautStore()
const socialLink = [
  {
    icon: 'mdi-facebook',
    color: '#4267b2',
    colorInDark: '#4267b2',
  },
  {
    icon: 'mdi-github',
    color: '#272727',
    colorInDark: '#ffffff',
  },
]
theme.value = settings.getBlankTheme
watch(
  () => theme.value,
  (newVal, oldVal) => {
    settings.setBlankTheme(newVal === 'dark' ? 'dark' : 'light')
  },
)
const handleSubmit = async () => {
  if (num.value.trim() == '' || password.value.trim() == '') {
    return m.warning('-.-', { details: 'Please fill in the form' })
  }
  m.loading('Loading', { details: 'Login...' })
  const data = {
    num: num.value,
    password: password.value,
  }
  if (data.num == 'admin' && data.password == 'admin') {
    router.replace((route.query.redirect as string) ?? '/index')
    m.closeAll()
    m.success('Success', { details: 'Login Success!' })
    return
  }
  try {
    await haut.login(data).finally(() => m.closeAll())
    m.success('Success', { details: 'Login Success!' })
    setTimeout(() =>
      router.replace((route.query.redirect as string) ?? '/index'),
    )
  } catch (error: any) {
    m.error('Error', { details: error.message })
  }
}
</script>
