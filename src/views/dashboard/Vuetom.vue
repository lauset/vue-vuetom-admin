<template>
  <div class="vuetom-wrapper">
    <v-row>
      <v-col
        v-for="l in list"
        :key="l.id"
        cols="12"
        md="6"
        lg="4"
        class="align-self-start"
      >
        <v-card color="text-center" class="vuetom-card">
          <v-img :src="l.src" height="150" cover></v-img>
          <v-card-text class="d-flex flex-column justify-center align-center">
            <!-- <v-avatar color="primary" class="mt-10" icon size="50">
              <v-icon size="2rem" color="white">
                {{ icons.mdiHelpCircleOutline }}
              </v-icon>
            </v-avatar> -->
            <h3 class="text-xl mt-4 font-weight-medium">
              {{ l.title }}
            </h3>
          </v-card-text>
          <v-card-text>
            {{ l.desc }}
          </v-card-text>
          <v-card-text class="vuetom-card-bottom">
            <div class="vuetom-card-bottom-btn" @click="toUrl(l.url)">Git</div>
            <!-- <v-btn color="vuetom-card-bottom-btn" class="mt-4"> Git </v-btn> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const icons = {
  mdiChevronUp: 'mdi-chevron-up',
  mdiChevronDown: 'mdi-chevron-down',
  mdiCartPlus: 'mdi-cart-plus',
  mdiHelpCircleOutline: 'mdi-help-circle-outline',
}
const list = [
  {
    id: 1,
    title: 'Vuetom.js',
    desc: 'A JS library supporting plug-in mode',
    src: proxy.getAssetsImg('cover/cover-vuetomjs.jpg'),
    url: 'https://github.com/lauset/vuetom-js',
  },
  {
    id: 2,
    title: 'Vuetom UI',
    desc: 'A flat UI supporting vue3',
    src: proxy.getAssetsImg('cover/cover-vuetomui.jpg'),
    url: 'https://github.com/lauset/vuetom-ui',
  },
  {
    id: 3,
    title: 'Vuetom Cli',
    desc: 'A simple CLI for vitepress-theme-vuetom',
    src: proxy.getAssetsImg('cover/cover-vuetomcli.png'),
    url: 'https://github.com/lauset/vuetom-cli',
  },
  {
    id: 4,
    title: 'Vitepress-theme-vuetom',
    desc: 'A vitepress theme, including document and blog styles',
    src: proxy.getAssetsImg('cover/cover-vuetom.jpeg'),
    url: 'https://github.com/lauset/vuetom-cli',
  },
]
const toUrl = _url => {
  window.open(_url)
}
</script>

<style lang="scss" scoped>
.vuetom-wrapper {
  .vuetom-card {
    border: 3px solid #00000000;
    transition: border 0.5s;
    &:hover {
      border: 3px solid #aeaeae80;
      .vuetom-card-bottom {
        .vuetom-card-bottom-btn {
          color: #aeaeae;
        }
      }
    }
    .vuetom-card-bottom {
      min-height: 30px;
      .vuetom-card-bottom-btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
        display: block;
        width: 20%;
        font-weight: bold;
        text-align: center;
        color: #00000000;
        cursor: pointer;
        transition: color 0.5s;
        transition: border 0.5s;
        border-radius: 10px;
        border: 2px solid #00000000;
        &:hover {
          border: 2px solid #aeaeae;
        }
      }
    }
  }
}
</style>
