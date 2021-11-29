<template>
  <div class="container bg-white shadow-md min-h-screen rounded p-4">
    <div class="m-4">
      <form class="w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="
                block
                text-gray-500
                font-bold
                md:text-right
                mb-1
                md:mb-0
                pr-4
              "
              for="inline-full-name3"
            >
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              autocomplete="nope"
              class="
                appearance-none
                border-2
                rounded
                w-full
                py-2
                px-4
                text-gray-700
                leading-tight
                focus:outline-none focus:bg-white focus:border-purple-500
              "
              id="inline-full-name3"
              type="text"
              placeholder="Email"
              v-model="email"
            />
            <p class="text-red-500 text-xs">{{ errorEmail }}</p>
          </div>
        </div>

        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="
                block
                text-gray-500
                font-bold
                md:text-right
                mb-1
                md:mb-0
                pr-4
              "
              for="inline-password"
            >
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              autocomplete="nope"
              class="
                appearance-none
                border-2
                rounded
                w-full
                py-2
                px-4
                text-gray-700
                leading-tight
                focus:outline-none focus:bg-white focus:border-purple-500
              "
              id="inline-password"
              type="password"
              placeholder="******************"
              v-model="password"
            />
            <p class="text-red-500 text-xs">{{ errorPassword }}</p>
          </div>
        </div>

        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button
              @click="login"
              class="
                shadow
                mr-3
                bg-purple-500
                hover:bg-purple-400
                focus:shadow-outline focus:outline-none
                text-white
                font-bold
                py-2
                px-4
                rounded
              "
              type="button"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import useUserLogin from "./userLoginValidate";
import { useRouter, useRoute } from "vue-router";
import useUser from "../../../../compositions/useModelUser";

export default {
  setup() {
    const { validate, errors, values } = useUserLogin();
    const router = useRouter();
    const route = useRoute();

    const { usersLoading, usersError, loginUser } = useUser();

    values.email = "koneviahmet@gmail.com";
    values.password = "123456";

    const login = () => {
      const newData = {
        email: values.email,
        password: values.password,
      };

      validate()
        .then((validateSuccess) => {
          !validateSuccess.valid && console.log("Check the form.");

          if (validateSuccess.valid) {
            loginUser({ id: 1 }).then(
              (response) =>
                response.id && router.push(`/user/detail/${response.id}`)
            );
          }
        })
        .catch((validateError) => {
          console.log(validateError);
        });
    };

    return {
      ...useUserLogin(),
      login,
    };
  },
};
</script>