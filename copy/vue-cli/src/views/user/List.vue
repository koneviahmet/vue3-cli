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
                font-semibold
                text-left
              "
            >
              Name - Last Name
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
                font-semibold
                text-left
              "
            >
              Email
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
                font-semibold
                text-left
              "
            >
              Password
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
                font-semibold
                text-left
              "
            >
              Options
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in usersData" :key="user.id">
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
              {{ user.name }} {{ user.lastName }}
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
              "
            >
              {{ user.email }}
            </td>
            <td
              class="
                border-t-0
                px-6
                align-center
                border-l-0 border-r-0
                text-xs
                whitespace-nowrap
                p-4
              "
            >
              {{ user.password }}
            </td>
            <td
              class="
                border-t-0
                px-6
                align-middle
                border-l-0 border-r-0
                text-xs
                whitespace-nowrap
                p-4
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
                :to="`/user/detail/${user.id}`"
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
                @click="userDelete(user.id)"
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
import MainMenu from "../../components/content/user/menu/MainMenu.vue";
import { notyfError, notyfSuccess } from "../../utils/notyf.js";

import useUser from "../../compositions/useModelUser";
const { usersLoading, usersData, usersError, getUsers, deleteUser } = useUser();
onMounted(() => getUsers());

import Alert from "../../utils/alert.js";

const userDelete = (id) => {
  Alert.showPrompt("Are you sure you want to delete?").then((res) => {
    !res.isConfirmed && notyfError("you gave up.");
    res.isConfirmed &&
      deleteUser({ id }).then(() => notyfSuccess("delete success."));
  });
};
</script>

