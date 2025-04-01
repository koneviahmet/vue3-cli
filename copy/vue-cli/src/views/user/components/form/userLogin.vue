<template>
  <div class="bg-base-100 rounded-lg shadow">
    <div class="card-body p-6">
      <div class="alert alert-error mb-4" v-if="usersError">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ usersError }}</span>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium text-gray-700">Email</span>
        </label> 
        <input type="email" placeholder="Enter your email" v-model="email" class="input input-bordered bg-gray-50">
        <label class="label" v-if="errorEmail">
          <span class="label-text-alt text-error">{{ errorEmail }}</span>
        </label>
      </div> 
      
      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium text-gray-700">Password</span>
        </label> 
        <input type="password" placeholder="Enter your password" v-model="password" class="input input-bordered bg-gray-50"> 
        <label class="label" v-if="errorPassword">
          <span class="label-text-alt text-error">{{ errorPassword }}</span>
        </label>
        
        <div class="flex justify-between items-center mt-2">
          <div class="form-control">
            <label class="cursor-pointer label justify-start gap-2">
              <input type="checkbox" class="checkbox checkbox-sm checkbox-primary">
              <span class="label-text text-sm">Remember me</span>
            </label>
          </div>
          <router-link to="/user/forgot-password" class="text-sm text-primary hover:underline">Forgot password?</router-link>
        </div>
      </div>
      
      <div class="form-control mt-6">
        <button @click="login" class="btn btn-primary w-full" :class="usersLoading && 'loading btn-disabled'">
          Login
        </button>
      </div>
      
      <div class="divider text-gray-400 text-sm">OR</div>
      
      <div class="text-center">
        <p class="text-sm text-gray-600 mb-2">Don't have an account?</p>
        <router-link to="/user/signIn" class="text-primary hover:underline font-medium">
          Create new account
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import useUserLogin from "./userLoginValidate";
import { useRouter, useRoute } from "vue-router";
import useUsers from "../../../../compositions/useModelUsers";

export default {
  setup() {
    const { validate, errors, values, setValues} = useUserLogin();
    const router = useRouter();
    const route = useRoute();

    const { loading: usersLoading, error: usersError, loginItem: loginUser } = useUsers();

    // values.email = "koneviahmet@gmail.com";
    // values.password = "123456";

    const login = () => {


      validate()
        .then((validateSuccess) => {
          !validateSuccess.valid && console.log("Check the form.");

          if (validateSuccess.valid) {
            loginUser({ ...values }).then(
              (response) =>            
                {                  
                  response.id && router.push(`/user/detail/${response.id}`)
                }
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
      usersLoading,
      usersError
    };
  },
};
</script>