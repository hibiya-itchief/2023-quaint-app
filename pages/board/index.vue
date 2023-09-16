<template>
  <v-app class="pa-0">
    <v-container>
      <h1 style="text-align: center; font-family: serif; font-weight: bold">
        オンライン整理券の残席状況
      </h1>
      <v-row justify="center">
        <v-col cols="4" class="pa-2.25 pr-0">
          <table border="1" style="margin: auto">
            <thead>
              <tr>
                <th colspan="3" style="font-size: 200%; font-weight: bold">
                  1F
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowspan="2">11R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[0].sell_starts_1st,
                        rooms[0].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[0].taken_tickets_1st / rooms[0].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[0].taken_tickets_1st / rooms[0].stock_1st >= 0.5 &&
                      rooms[0].taken_tickets_1st < rooms[0].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[0].taken_tickets_1st >= rooms[0].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[0].sell_starts_2nd,
                        rooms[0].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[0].taken_tickets_2nd / rooms[0].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[0].taken_tickets_2nd / rooms[0].stock_2nd >= 0.5 &&
                      rooms[0].taken_tickets_2nd < rooms[0].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[0].taken_tickets_2nd >= rooms[0].stock_2nd"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">12R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[1].sell_starts_1st,
                        rooms[1].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[1].taken_tickets_1st / rooms[1].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[1].taken_tickets_1st / rooms[1].stock_1st >= 0.5 &&
                      rooms[1].taken_tickets_1st < rooms[1].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[1].taken_tickets_1st >= rooms[1].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[1].sell_starts_2nd,
                        rooms[1].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[1].taken_tickets_2nd / rooms[1].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[1].taken_tickets_2nd / rooms[1].stock_2nd >= 0.5 &&
                      rooms[1].taken_tickets_2nd < rooms[1].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[1].taken_tickets_2nd >= rooms[1].stock_2nd"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <table class="mt-10" border="1" style="margin: auto">
            <thead>
              <tr>
                <th colspan="3" style="font-size: 200%; font-weight: bold">
                  2F(地上)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowspan="2">21R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[8].sell_starts_1st,
                        rooms[8].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[8].taken_tickets_1st / rooms[8].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[8].taken_tickets_1st / rooms[8].stock_1st >= 0.5 &&
                      rooms[8].taken_tickets_1st < rooms[8].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[8].taken_tickets_1st >= rooms[8].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[8].sell_starts_2nd,
                        rooms[8].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[8].taken_tickets_2nd / rooms[8].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[8].taken_tickets_2nd / rooms[8].stock_2nd >= 0.5 &&
                      rooms[8].taken_tickets_2nd < rooms[8].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[8].taken_tickets_2nd >= rooms[8].stock_2nd"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">22R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[9].sell_starts_1st,
                        rooms[9].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[9].taken_tickets_1st / rooms[9].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[9].taken_tickets_1st / rooms[9].stock_1st >= 0.5 &&
                      rooms[9].taken_tickets_1st < rooms[9].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[9].taken_tickets_1st >= rooms[9].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[9].sell_starts_2nd,
                        rooms[9].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[9].taken_tickets_2nd / rooms[9].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[9].taken_tickets_2nd / rooms[9].stock_2nd >= 0.5 &&
                      rooms[9].taken_tickets_2nd < rooms[9].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[9].taken_tickets_2nd >= rooms[9].stock_2nd"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>

              <tr>
                <th class="g3">31R</th>
                <th class="g3">次</th>
                <td class="g3">
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[16].sell_starts_1st,
                        rooms[16].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[16].taken_tickets_1st / rooms[16].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[16].taken_tickets_1st / rooms[16].stock_1st >=
                        0.5 && rooms[16].taken_tickets_1st < rooms[16].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[16].taken_tickets_1st >= rooms[16].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th class="g3">32R</th>
                <th class="g3">次</th>
                <td class="g3">
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[17].sell_starts_1st,
                        rooms[17].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[17].taken_tickets_1st / rooms[17].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[17].taken_tickets_1st / rooms[17].stock_1st >=
                        0.5 && rooms[17].taken_tickets_1st < rooms[17].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[17].taken_tickets_1st >= rooms[17].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </table>

          <h3 class="mt-10">１分間隔で更新が入ります。</h3>
        </v-col>
        <v-col cols="4" class="pa-2.25 pr-0">
          <table border="1" style="margin: auto">
            <thead>
              <tr>
                <th colspan="3" style="font-size: 200%; font-weight: bold">
                  3F
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowspan="2">13R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[2].sell_starts_1st,
                        rooms[2].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[2].taken_tickets_1st / rooms[2].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[2].taken_tickets_1st / rooms[2].stock_1st >= 0.5 &&
                      rooms[2].taken_tickets_1st < rooms[2].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[2].taken_tickets_1st >= rooms[2].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[2].sell_starts_2nd,
                        rooms[2].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[2].taken_tickets_2nd / rooms[2].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[2].taken_tickets_2nd / rooms[2].stock_2nd >= 0.5 &&
                      rooms[2].taken_tickets_2nd < rooms[2].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[2].taken_tickets_2nd >= rooms[2].stock_2nd"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">14R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[3].sell_starts_1st,
                        rooms[3].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[3].taken_tickets_1st / rooms[3].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[3].taken_tickets_1st / rooms[3].stock_1st >= 0.5 &&
                      rooms[3].taken_tickets_1st < rooms[3].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[3].taken_tickets_1st >= rooms[3].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[3].sell_starts_2nd,
                        rooms[3].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[3].taken_tickets_2nd / rooms[3].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[3].taken_tickets_2nd / rooms[3].stock_2nd >= 0.5 &&
                      rooms[3].taken_tickets_2nd < rooms[3].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[3].taken_tickets_2nd >= rooms[3].stock_2nd"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">15R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[4].sell_starts_1st,
                        rooms[4].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[4].taken_tickets_1st / rooms[4].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[4].taken_tickets_1st / rooms[4].stock_1st >= 0.5 &&
                      rooms[4].taken_tickets_1st < rooms[4].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[4].taken_tickets_1st >= rooms[4].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[4].sell_starts_2nd,
                        rooms[4].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[4].taken_tickets_2nd / rooms[4].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[4].taken_tickets_2nd / rooms[4].stock_2nd >= 0.5 &&
                      rooms[4].taken_tickets_2nd < rooms[4].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[4].taken_tickets_2nd >= rooms[4].stock_2nd"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">23R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[10].sell_starts_1st,
                        rooms[10].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[10].taken_tickets_1st / rooms[10].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[10].taken_tickets_1st / rooms[10].stock_1st >=
                        0.5 && rooms[10].taken_tickets_1st < rooms[10].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[10].taken_tickets_1st >= rooms[10].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[10].sell_starts_2nd,
                        rooms[10].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[10].taken_tickets_2nd / rooms[10].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[10].taken_tickets_2nd / rooms[10].stock_2nd >=
                        0.5 && rooms[10].taken_tickets_2nd < rooms[10].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[10].taken_tickets_2nd >= rooms[10].stock_2nd
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">24R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[11].sell_starts_1st,
                        rooms[11].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[11].taken_tickets_1st / rooms[11].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[11].taken_tickets_1st / rooms[11].stock_1st >=
                        0.5 && rooms[11].taken_tickets_1st < rooms[11].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[11].taken_tickets_1st >= rooms[11].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[11].sell_starts_2nd,
                        rooms[11].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[11].taken_tickets_2nd / rooms[11].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[11].taken_tickets_2nd / rooms[11].stock_2nd >=
                        0.5 && rooms[11].taken_tickets_2nd < rooms[11].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[11].taken_tickets_2nd >= rooms[11].stock_2nd
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">25R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[12].sell_starts_1st,
                        rooms[12].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[12].taken_tickets_1st / rooms[12].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[12].taken_tickets_1st / rooms[12].stock_1st >=
                        0.5 && rooms[12].taken_tickets_1st < rooms[12].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[12].taken_tickets_1st >= rooms[12].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[12].sell_starts_2nd,
                        rooms[12].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[12].taken_tickets_2nd / rooms[12].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[12].taken_tickets_2nd / rooms[12].stock_2nd >=
                        0.5 && rooms[12].taken_tickets_2nd < rooms[12].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[12].taken_tickets_2nd >= rooms[12].stock_2nd
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>

              <tr>
                <th class="g3">33R</th>
                <th class="g3">次</th>
                <td class="g3">
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[18].sell_starts_1st,
                        rooms[18].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[18].taken_tickets_1st / rooms[18].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[18].taken_tickets_1st / rooms[18].stock_1st >=
                        0.5 && rooms[18].taken_tickets_1st < rooms[18].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[18].taken_tickets_1st >= rooms[18].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th class="g3">34R</th>
                <th class="g3">次</th>
                <td class="g3">
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[19].sell_starts_1st,
                        rooms[19].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[19].taken_tickets_1st / rooms[19].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[19].taken_tickets_1st / rooms[19].stock_1st >=
                        0.5 && rooms[19].taken_tickets_1st < rooms[19].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[19].taken_tickets_1st >= rooms[19].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th class="g3">35R</th>
                <th class="g3">次</th>
                <td class="g3">
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[20].sell_starts_1st,
                        rooms[20].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[20].taken_tickets_1st / rooms[20].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[20].taken_tickets_1st / rooms[20].stock_1st >=
                        0.5 && rooms[20].taken_tickets_1st < rooms[20].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[20].taken_tickets_1st >= rooms[20].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
        <v-col cols="4" class="pa-2.25 pr-0">
          <table border="1" style="margin: auto">
            <thead>
              <tr>
                <th colspan="3" style="font-size: 200%; font-weight: bold">
                  4F
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowspan="2">16R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[5].sell_starts_1st,
                        rooms[5].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[5].taken_tickets_1st / rooms[5].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[5].taken_tickets_1st / rooms[5].stock_1st >= 0.5 &&
                      rooms[5].taken_tickets_1st < rooms[5].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[5].taken_tickets_1st >= rooms[5].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[5].sell_starts_2nd,
                        rooms[5].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[5].taken_tickets_2nd / rooms[5].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[5].taken_tickets_2nd / rooms[5].stock_2nd >= 0.5 &&
                      rooms[5].taken_tickets_2nd < rooms[5].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[5].taken_tickets_2nd >= rooms[5].stock_2nd"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">17R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[6].sell_starts_1st,
                        rooms[6].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[6].taken_tickets_1st / rooms[6].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[6].taken_tickets_1st / rooms[6].stock_1st >= 0.5 &&
                      rooms[6].taken_tickets_1st < rooms[6].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[6].taken_tickets_1st >= rooms[6].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[6].sell_starts_2nd,
                        rooms[6].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[6].taken_tickets_2nd / rooms[6].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[6].taken_tickets_2nd / rooms[6].stock_2nd >= 0.5 &&
                      rooms[6].taken_tickets_2nd < rooms[6].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[6].taken_tickets_2nd >= rooms[6].stock_2nd"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">18R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[7].sell_starts_1st,
                        rooms[7].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[7].taken_tickets_1st / rooms[7].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[7].taken_tickets_1st / rooms[7].stock_1st >= 0.5 &&
                      rooms[7].taken_tickets_1st < rooms[7].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[7].taken_tickets_1st >= rooms[7].stock_1st"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[7].sell_starts_2nd,
                        rooms[7].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[7].taken_tickets_2nd / rooms[7].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[7].taken_tickets_2nd / rooms[7].stock_2nd >= 0.5 &&
                      rooms[7].taken_tickets_2nd < rooms[7].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="rooms[7].taken_tickets_2nd >= rooms[7].stock_2nd"
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">26R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[13].sell_starts_1st,
                        rooms[13].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[13].taken_tickets_1st / rooms[13].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[13].taken_tickets_1st / rooms[13].stock_1st >=
                        0.5 && rooms[13].taken_tickets_1st < rooms[13].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[13].taken_tickets_1st >= rooms[13].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[13].sell_starts_2nd,
                        rooms[13].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[13].taken_tickets_2nd / rooms[13].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[13].taken_tickets_2nd / rooms[13].stock_2nd >=
                        0.5 && rooms[13].taken_tickets_2nd < rooms[13].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[13].taken_tickets_2nd >= rooms[13].stock_2nd
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">27R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[14].sell_starts_1st,
                        rooms[14].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[14].taken_tickets_1st / rooms[14].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[14].taken_tickets_1st / rooms[14].stock_1st >=
                        0.5 && rooms[14].taken_tickets_1st < rooms[14].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[14].taken_tickets_1st >= rooms[14].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[14].sell_starts_2nd,
                        rooms[14].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[14].taken_tickets_2nd / rooms[14].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[14].taken_tickets_2nd / rooms[14].stock_2nd >=
                        0.5 && rooms[14].taken_tickets_2nd < rooms[14].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[14].taken_tickets_2nd >= rooms[14].stock_2nd
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th rowspan="2">28R</th>
                <th>次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[15].sell_starts_1st,
                        rooms[15].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[15].taken_tickets_1st / rooms[15].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[15].taken_tickets_1st / rooms[15].stock_1st >=
                        0.5 && rooms[15].taken_tickets_1st < rooms[15].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[15].taken_tickets_1st >= rooms[15].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th>次の次</th>
                <td>
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[15].sell_starts_2nd,
                        rooms[15].sell_ends_2nd
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[15].taken_tickets_2nd / rooms[15].stock_2nd < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[15].taken_tickets_2nd / rooms[15].stock_2nd >=
                        0.5 && rooms[15].taken_tickets_2nd < rooms[15].stock_2nd
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[15].taken_tickets_2nd >= rooms[15].stock_2nd
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>

              <tr>
                <th class="g3">36R</th>
                <th class="g3">次</th>
                <td class="g3">
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[21].sell_starts_1st,
                        rooms[21].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[21].taken_tickets_1st / rooms[21].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[21].taken_tickets_1st / rooms[21].stock_1st >=
                        0.5 && rooms[21].taken_tickets_1st < rooms[21].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[21].taken_tickets_1st >= rooms[21].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th class="g3">37R</th>
                <th class="g3">次</th>
                <td class="g3">
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[22].sell_starts_1st,
                        rooms[22].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[22].taken_tickets_1st / rooms[22].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[22].taken_tickets_1st / rooms[22].stock_1st >=
                        0.5 && rooms[22].taken_tickets_1st < rooms[22].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[22].taken_tickets_1st >= rooms[22].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
              <tr>
                <th class="g3">38R</th>
                <th class="g3">次</th>
                <td class="g3">
                  <v-icon
                    v-if="
                      !isAvailable(
                        rooms[23].sell_starts_1st,
                        rooms[23].sell_ends_1st
                      )
                    "
                    color="grey"
                    >mdi-cancel</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[23].taken_tickets_1st / rooms[23].stock_1st < 0.5
                    "
                    color="green"
                    >mdi-circle-double</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[23].taken_tickets_1st / rooms[23].stock_1st >=
                        0.5 && rooms[23].taken_tickets_1st < rooms[23].stock_1st
                    "
                    color="orange"
                    >mdi-triangle-outline</v-icon
                  >
                  <v-icon
                    v-else-if="
                      rooms[23].taken_tickets_1st >= rooms[23].stock_1st
                    "
                    color="red"
                    >mdi-close</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Group, Event } from 'types/quaint'
import Vue from 'vue'
type RoomData = {
  group_id: string
  event_id_1st: string
  event_id_2nd: string
  starts_at_1st: string
  starts_at_2nd: string
  ends_at_1st: string
  ends_at_2nd: string
  sell_starts_1st: string
  sell_starts_2nd: string
  sell_ends_1st: string
  sell_ends_2nd: string
  taken_tickets_1st: number
  taken_tickets_2nd: number
  stock_1st: number
  stock_2nd: number
}
type Data = {
  hebes: Group[]
  events: Event[]
  rooms: RoomData[]
}

export default Vue.extend({
  name: 'InformationBoardPage',
  auth: false,
  async asyncData({ $axios }): Promise<Partial<Data>> {
    // 公演がある前提なので、ないと必ずエラーが出る

    // ここでクラス劇オンリーのgroupsを作成(R_groups)
    const rooms_promises = []
    for (let i = 0; i < 24; i++) {
      const room_num =
        ((i + 1) % 8 === 0 ? 8 : (i + 1) % 8) + 10 * (((i / 8) | 0) + 1)
      // 11~38までの24個
      rooms_promises.push($axios.$get(`/groups/${room_num}r`))
    }
    const R_groups: Group[] = await Promise.all(rooms_promises)

    // 完成品の受け皿を作成
    // templateで使う際は、rooms[i]のiにあたる数字は11Rから38Rまでを順番に並べたときをイメージ
    const rooms: RoomData[] = []

    // 全クラスの必要な内容をroomsに詰める
    for (let i = 0; i < R_groups.length; i++) {
      // ここで各クラスのsort済みeventsを作成、使うのは１つ目と２つ目だけ
      const events: Event[] = await $axios.$get(
        `/groups/${R_groups[i].id}/events`
      )
      events.sort((i: Event) => {
        return i.target === 'paper' ? 1 : -1
      })
      events.sort((x: Event, y: Event) => {
        return new Date(x.starts_at) > new Date(y.starts_at) ? 1 : -1
      })
      events.sort((i: Event) => {
        return new Date() > new Date(i.sell_starts) &&
          new Date(i.sell_ends) > new Date()
          ? -1
          : 1
      })

      // １つ目と２つ目の公演の残席状況を入手
      const tickets_info: any[] = await Promise.all([
        $axios.$get(`/groups/${R_groups[i].id}/events/${events[0].id}/tickets`),
        $axios.$get(`/groups/${R_groups[i].id}/events/${events[1].id}/tickets`),
      ])
      rooms.push({
        group_id: R_groups[i].id,
        event_id_1st: events[0].id,
        event_id_2nd: events[1].id,
        starts_at_1st: events[0].starts_at,
        starts_at_2nd: events[1].starts_at,
        ends_at_1st: events[0].ends_at,
        ends_at_2nd: events[1].ends_at,
        sell_starts_1st: events[0].sell_starts,
        sell_starts_2nd: events[1].sell_starts,
        sell_ends_1st: events[0].sell_ends,
        sell_ends_2nd: events[1].sell_ends,
        taken_tickets_1st: tickets_info[0].taken_tickets,
        taken_tickets_2nd: tickets_info[1].taken_tickets,
        stock_1st: tickets_info[0].stock,
        stock_2nd: tickets_info[1].stock,
      })
    }
    return { rooms }
  },
  data(): Data {
    return {
      hebes: [],
      events: [],
      rooms: [],
    }
  },
  head: {
    title: 'インフォメーションボード',
  },
  created() {
    setInterval(() => {
      this.DataRefresh()
    }, 60000)
  },

  methods: {
    async DataRefresh() {
      // asyncData と内容は全く同じ。

      // 公演がある前提なので、ないと必ずエラーが出る

      // ここでクラス劇オンリーのgroupsを作成(R_groups)
      const rooms_promises = []
      for (let i = 0; i < 24; i++) {
        const room_num =
          ((i + 1) % 8 === 0 ? 8 : (i + 1) % 8) + 10 * (((i / 8) | 0) + 1)
        // 11~38までの24個
        rooms_promises.push(this.$axios.$get(`/groups/${room_num}r`))
      }
      const R_groups: Group[] = await Promise.all(rooms_promises)

      // 完成品の受け皿を作成
      // templateで使う際は、rooms[i]のiにあたる数字は11Rから38Rまでを順番に並べたときをイメージ
      const rooms: RoomData[] = []

      // 全クラスの必要な内容をroomsに詰める
      for (let i = 0; i < R_groups.length; i++) {
        // ここで各クラスのsort済みeventsを作成、使うのは１つ目と２つ目だけ
        const events: Event[] = await this.$axios.$get(
          `/groups/${R_groups[i].id}/events`
        )
        events.sort((i: Event) => {
          return i.target === 'paper' ? 1 : -1
        })
        events.sort((x: Event, y: Event) => {
          return new Date(x.starts_at) > new Date(y.starts_at) ? 1 : -1
        })
        events.sort((i: Event) => {
          return new Date() > new Date(i.sell_starts) &&
            new Date(i.sell_ends) > new Date()
            ? -1
            : 1
        })

        // １つ目と２つ目の公演の残席状況を入手
        const tickets_info: any[] = await Promise.all([
          this.$axios.$get(
            `/groups/${R_groups[i].id}/events/${events[0].id}/tickets`
          ),
          this.$axios.$get(
            `/groups/${R_groups[i].id}/events/${events[1].id}/tickets`
          ),
        ])
        rooms.push({
          group_id: R_groups[i].id,
          event_id_1st: events[0].id,
          event_id_2nd: events[1].id,
          starts_at_1st: events[0].starts_at,
          starts_at_2nd: events[1].starts_at,
          ends_at_1st: events[0].ends_at,
          ends_at_2nd: events[1].ends_at,
          sell_starts_1st: events[0].sell_starts,
          sell_starts_2nd: events[1].sell_starts,
          sell_ends_1st: events[0].sell_ends,
          sell_ends_2nd: events[1].sell_ends,
          taken_tickets_1st: tickets_info[0].taken_tickets,
          taken_tickets_2nd: tickets_info[1].taken_tickets,
          stock_1st: tickets_info[0].stock,
          stock_2nd: tickets_info[1].stock,
        })
      }
      this.rooms = rooms
    },
    // isAvailable: 整理券が配布時間内であればtrue，それ以外はfalseを返すmethod
    isAvailable(sell_starts: string, sell_ends: string) {
      if (
        new Date() > new Date(sell_starts) &&
        new Date(sell_ends) > new Date()
      ) {
        return true
      } else {
        return false
      }
    },
  },
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-weight: normal;
}

h3 {
  text-align: center;
  font-weight: bold;
}

table {
  background-color: #fff;
  border-collapse: collapse;
  text-align: center;
  align-content: center;
  font-weight: normal;
}

th {
  font-weight: normal;
  width: 60px;
  height: 30px;
}

td {
  width: 80px;
  height: 30px;
}

#title {
  display: inline-block;
  padding: 0.5rem 3rem 0.5rem 0;
  margin-bottom: 5rem;
  border-bottom: 3px solid #b49656;
  font-family: serif;
  font-weight: bold;
}

.g3 {
  height: 60px;
}
</style>
