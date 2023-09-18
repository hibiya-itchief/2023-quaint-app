<template>
  <v-app>
    <v-container>
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" sm="8" md="6" class="ma-0 pa-0">
          <v-card class="mx-1 my-2 px-2 py-2" elevation="1">
            <!-- cf https://qiita.com/teracy164/items/34831d83094cdb6cb3dd -->
            <quill-editor v-model="editor" height="500px" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
