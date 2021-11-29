<template>
  <MainMenu v-can="'isAuth'" />

  <div class="container bg-white shadow-md min-h-screen rounded p-4">
    <div class="block w-full overflow-x-auto">
      <table class="items-center bg-transparent w-full border-collapse">
        <thead>
          <tr>
            <th
              class="
                px-6
                bg-blueGray-50
                text-blueGray-500
                align-middle
                border border-solid border-blueGray-100
                py-3
                text-xs
                uppercase
                border-l-0 border-r-0
                whitespace-nowrap
                text-left
              "
            >
              Item
            </th>

            <th
              class="
                px-6
                bg-blueGray-50
                text-blueGray-500
                align-middle
                border border-solid border-blueGray-100
                py-3
                text-xs
                uppercase
                border-l-0 border-r-0
                whitespace-nowrap
                text-right
              "
            >
              Options
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in schemaData" :key="item.id">
            <th
              class="
                border-t-0
                px-6
                align-middle
                border-l-0 border-r-0
                text-xs
                whitespace-nowrap
                p-4
                text-left text-blueGray-700
              "
            >
              {{ item.id }}
            </th>

            <td
              class="
                border-t-0
                px-6
                align-middle
                border-l-0 border-r-0
                text-xs
                whitespace-nowrap
                p-4
                text-right
              "
            >
              <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
              <router-link
                class="
                  inline-block
                  border
                  rounded
                  py-1
                  px-3
                  mr-2
                  cursor-pointer
                "
                :to="`/schema/detail/${item.id}`"
                >Select</router-link
              >
              <a
                class="
                  inline-block
                  border
                  rounded
                  py-1
                  px-3
                  mr-2
                  cursor-pointer
                "
                @click="itemDelete(item.id)"
                >Delete</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, onMounted } from "vue";
const app = getCurrentInstance();
import MainMenu from "../../components/content/schema/menu/MainMenu.vue";
import { notyfError, notyfSuccess } from "../../utils/notyf.js";

import useSchema from "../../compositions/useModelSchema";
const { schemaLoading, schemaData, schemaError, getSchemas, deleteSchema } =
  useSchema();
onMounted(() => getSchemas());

import Alert from "../../utils/alert.js";

const itemDelete = (id) => {
  Alert.showPrompt("Are you sure you want to delete?").then((res) => {
    !res.isConfirmed && notyfError("you gave up");
    res.isConfirmed &&
      deleteSchema({ id }).then(() => notyfSuccess("delete success"));
  });
};
</script>

