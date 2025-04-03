<template>
  <div class="bg-base-100 rounded-lg  p-0">
    <div class="p-6">
      <div class="alert alert-error mb-6" v-if="usersError">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ usersError }}</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div class="grid grid-cols-1 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium ">First Name</span>
              </label> 
              <input type="text" placeholder="First name" v-model="name" class="input input-bordered ">
              <label class="label" v-if="errorName">
                <span class="label-text-alt text-error">{{ errorName }}</span>
              </label>
            </div>       
            
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium ">Username</span>
              </label> 
              <input type="text" placeholder="Username" v-model="userName" class="input input-bordered ">
              <label class="label" v-if="errorUserName">
                <span class="label-text-alt text-error">{{ errorUserName }}</span>
              </label>
            </div>       

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium ">Email</span>
              </label> 
              <input type="email" placeholder="Email address" v-model="email" class="input input-bordered ">
              <label class="label" v-if="errorEmail">
                <span class="label-text-alt text-error">{{ errorEmail }}</span>
              </label>
            </div>     

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium ">Current Password</span>
                <span class="label-text-alt opacity-70" v-if="password">Required when changing password</span>
              </label> 
              <input type="password" placeholder="Enter current password" v-model="currentPassword" class="input input-bordered " :class="{'input-error': password && !currentPassword}">
              <label class="label" v-if="errorCurrentPassword">
                <span class="label-text-alt text-error">{{ errorCurrentPassword }}</span>
              </label>
              <label class="label" v-if="password && !currentPassword && !errorCurrentPassword">
                <span class="label-text-alt text-error">Current password is required when changing password</span>
              </label>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium ">Password</span>
              </label> 
              <input type="password" placeholder="Change password (leave empty to keep current)" v-model="password" class="input input-bordered ">
              <label class="label" v-if="errorPassword">
                <span class="label-text-alt text-error">{{ errorPassword }}</span>
              </label>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium ">Confirm Password</span>
              </label> 
              <input type="password" placeholder="Confirm new password" v-model="confirmPassword" class="input input-bordered ">
              <label class="label" v-if="errorConfirmPassword">
                <span class="label-text-alt text-error">{{ errorConfirmPassword }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class=" p-6 rounded-lg">
          <h3 class="text-lg font-medium  mb-4">Account Information</h3>
          <div class="flex items-start mb-6">
            <div class="flex-shrink-0 h-16 w-16  rounded-full flex items-center justify-center  text-xl font-bold">
              {{ name ? name.charAt(0).toUpperCase() : '' }}{{ userName ? userName.charAt(0).toUpperCase() : '' }}
            </div>
            <div class="ml-4">
              <p class=" text-sm mb-1">Profile photo</p>
              <button class="btn btn-sm btn-outline">Change photo</button>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="form-control">
            <label class="cursor-pointer label justify-start gap-2">
              <input type="checkbox" checked class="checkbox checkbox-sm checkbox-primary">
              <span class="label-text">Receive email notifications</span>
            </label>
          </div>
          <div class="form-control mt-2">
            <label class="cursor-pointer label justify-start gap-2">
              <input type="checkbox" checked class="checkbox checkbox-sm checkbox-primary">
              <span class="label-text">Two-factor authentication</span>
            </label>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button class="btn btn-outline">Cancel</button>
        <button @click="update" class="btn btn-primary" :class="usersLoading && 'loading btn-disabled'">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useUserUpdate from "./userUpdateValidate";
import { useRouter, useRoute } from "vue-router";
import useUsers from "../../../../compositions/useModelUsers";

export default {
  setup() {
    const { validate, errors, values, setValues } = useUserUpdate();
    const router = useRouter();
    const route = useRoute();

    const { loading: usersLoading, error: usersError, updateItem: updateUser, getItem: getUser } = useUsers();

    getUser({ id: route.params.id }).then((response) => {
      setValues({
        email: response.email,
        name: response.name,
        userName: response.userName,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });
    });

    const update = () => {
      validate()
        .then((validateSuccess) => {
          !validateSuccess.valid &&
            console.log("Check the form.", errors.value);
          if (validateSuccess.valid) {
            const userData = {
              email: values.email,
              name: values.name,
              userName: values.userName,
            };
            
            // Only include password if it's provided
            if (values.password) {
              userData.password = values.password;
            }
            
            updateUser(route.params.id, userData).then((response) => {              
              router.push(`/users/detail/${response.id}`);
            }).catch((error) => {
              console.log(error);
            });
          }
        })
        .catch((validateError) => {
          console.log(validateError);
        });
    };

    return {
      ...useUserUpdate(),
      update,
      usersLoading,
      usersError
    };
  },
};
</script>