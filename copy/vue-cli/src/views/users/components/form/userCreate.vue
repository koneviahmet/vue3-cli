<template>
  <div class="bg-base-100 rounded-lg shadow">
    <div class="card-body p-6">
      <div class="alert alert-error mb-4" v-if="usersError">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ usersError }}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium">First Name</span>
          </label> 
          <input type="text" placeholder="Enter your first name" v-model="name" class="input input-bordered ">
          <label class="label" v-if="errorName">
            <span class="label-text-alt text-error">{{ errorName }}</span>
          </label>
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text font-medium ">Username</span>
          </label> 
          <input type="text" placeholder="Enter your last name" v-model="userName" class="input input-bordered ">
          <label class="label" v-if="errorUserName">
            <span class="label-text-alt text-error">{{ errorUserName }}</span>
          </label>
        </div>
      </div>

      <div class="form-control mt-2">
        <label class="label">
          <span class="label-text font-medium">Email</span>
        </label> 
        <input type="email" placeholder="Enter your email address" v-model="email" class="input input-bordered ">
        <label class="label" v-if="errorEmail">
          <span class="label-text-alt text-error">{{ errorEmail }}</span>
        </label>
      </div>
      
      <div class="form-control mt-2">
        <label class="label">
          <span class="label-text font-medium">Password</span>
        </label> 
        <input type="password" placeholder="Create a strong password" v-model="password" class="input input-bordered ">
        <label class="label" v-if="errorPassword">
          <span class="label-text-alt text-error">{{ errorPassword }}</span>
        </label>
      </div>
      
      <div class="form-control mt-2">
        <label class="cursor-pointer label justify-start gap-2">
          <input type="checkbox" class="checkbox checkbox-sm checkbox-primary">
          <span class="label-text text-sm">I agree to the <router-link to="/tos" class="text-primary hover:underline">Terms of Service</router-link> and <router-link to="/privacy" class="text-primary hover:underline">Privacy Policy</router-link></span>
        </label>
      </div>
      
      <div class="form-control mt-6">
        <button @click="save" class="btn btn-primary w-full" :class="usersLoading && 'loading btn-disabled'">
          Create Account
        </button>
      </div>
      
      <div class="divider  text-sm">OR</div>
      
      <div class="text-center">
        <p class="text-sm  mb-2">Already have an account?</p>
        <router-link to="/users/logIn" class="text-primary hover:underline font-medium">
          Log in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import useUserCreate from "./userCreateValidate";
import { useRouter } from "vue-router";
import useUsers from "../../../../compositions/useModelUsers";

export default {
  setup() {
    const { validate, errors, values, setValues} = useUserCreate();
    const router = useRouter();
    const { loading: usersLoading, error: usersError, addItem: addUser } = useUsers();

    const save = () => {
      validate()
        .then((validateSuccess) => {
          !validateSuccess.valid &&
            console.log("Check the form.", errors.value);
          if (validateSuccess.valid) {
            addUser({ ...values }).then((response) => {
              router.push(`/users/login`);
            });
          }
        })
        .catch((validateError) => {
          console.log(validateError);
        });
    };

    return {
      ...useUserCreate(),
      save,
      usersLoading,
      usersError
    };
  },
};
</script>