<template>
  <div class="welcome-wrapper">
    <v-card>
      <v-card-title class="align-start">
        <span>Card Title</span>
      </v-card-title>
      <v-card-text class="my-7">
        <div class="d-flex align-center">
          <h1 class="text-4xl font-weight-semibold">99,987</h1>
          <div class="d-flex align-center mb-n3">
            <v-icon size="40" color="success"> mdi-menu-up </v-icon>
            <span class="text-base font-weight-medium success--text ms-n2"
              >10%</span
            >
          </div>
        </div>
        <h4 class="mt-2 font-weight-medium">Compared to 1,234 last year</h4>
      </v-card-text>
      <v-card-text>
        <div :class="`d-flex align-start ${1 > 0 ? 'mt-8' : ''}`">
          <div class="d-flex align-center flex-grow-1 flex-wrap">
            <div>
              <h4 class="font-weight-medium">Title</h4>
              <span class="text-xs text-no-wrap">Sub Title</span>
            </div>
            <v-spacer></v-spacer>
            <div class="ms-1">
              <p class="text--primary font-weight-medium mb-1">100</p>
              <v-progress-linear
                model-value="45"
                background-color="success"
                color="error"
              ></v-progress-linear>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
