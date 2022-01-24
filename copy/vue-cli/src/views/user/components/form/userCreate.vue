<template>

  <div class="hero min-h-screen bg-base-200 rounded-box">
    <div class="flex-col justify-center hero-content lg:flex-row">
      <div class="text-center lg:text-left px-5">
        <h1 class="mb-5 text-5xl font-bold">
              Hello there
        </h1> 
        <p class="mb-5">
              Provident cupiditate voluptatem et in.eleniti eaque aut repudiandae et a id nisi.
        </p>
      </div> 

      <div class="card flex-shrink-0 w-full max-w-sm shadow-lg bg-base-100">
        <div class="card-body">

          <div class="alert alert-error my-4" v-if="usersError">
            <div class="flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">    
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>                      
              </svg> 
              <label>{{usersError}}</label>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label> 
            <input type="text" placeholder="name" v-model="name" class="input input-bordered">
            <label class="label">
              <span class="label-text-alt text-red-400">{{ errorName }}</span>
            </label>
          </div> 
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">Last Name</span>
            </label> 
            <input type="text" placeholder="Last Name" v-model="lastName" class="input input-bordered">
            <label class="label">
              <span class="label-text-alt text-red-400">{{ errorLastName }}</span>
            </label>
          </div> 

          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label> 
            <input type="text" placeholder="email" v-model="email" class="input input-bordered">
            <label class="label">
              <span class="label-text-alt text-red-400">{{ errorEmail }}</span>
            </label>
          </div> 
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label> 
            <input type="password" placeholder="password" v-model="password" class="input input-bordered"> 
            
            <label class="label">
              <span class="label-text-alt text-red-400">{{ errorPassword }}</span>
            </label>

          <label class="label">
            <router-link to="/user/logIn" class="label-text-alt text-red-500">login</router-link>
          </label>
          </div> 
          <div class="form-control mt-6">
            <a @click="save" class="btn btn-primary" :class="usersLoading && 'loading btn-disabled'">Save</a>
          </div>
        </div>
      </div>

    </div>
  </div>



</template>


<script>
import useUserCreate from "./userCreateValidate";
import { useRouter } from "vue-router";
import useUser from "../../../../compositions/useModelUser";

export default {
  setup() {
    const { validate, errors, values } = useUserCreate();
    const router = useRouter();
    const { usersLoading, usersError, addUser } = useUser();

    const save = () => {
      validate()
        .then((validateSuccess) => {
          !validateSuccess.valid &&
            console.log("Check the form.", errors.value);
          if (validateSuccess.valid) {
            addUser({ ...values }).then((response) => {
              router.push(`/user/detail/${response.id}`);
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