<template>
  <v-app>
    <v-container name="vote-container">
      <v-row justify="center" align-content="center">
        <v-col cols="12" sm="6" lg="6">
          <!--再読み込みボタン-->
          <div class="text-center pa-1">
            <v-btn class="mx-1 my-1" color="primary" @click="fetchTicket()"
              ><v-icon>mdi-reload</v-icon>再読み込み</v-btn
            >
          </div>

          
          
