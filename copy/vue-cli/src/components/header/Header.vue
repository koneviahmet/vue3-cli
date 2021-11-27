<template>
    <div class="bg-gray-500 border-b ">
        <div class="container mx-auto flex py-3 justify-between">
            <ul class="flex space-x-2 text-white">
                <li  v-for="(url, i) in urlArr" :key="i" class="bg-gray-600 rounded border-0 h-8">
                    <router-link class="inline-block py-1 px-3" :class='route.fullPath == url.to && "border-0 rounded text-black bg-gray-50"' :to="url.to">{{url.title}}</router-link>
                </li>
            </ul>

     
            
            <ul class="flex space-x-1" v-if="store.getters._isAuthenticated">
                <div class="flex items-center text-gray-900  space-x-1 px-2 hover:bg-gray-600 hover:text-white rounded">
                    <UserCircleIcon class="h-5 w-5"/>
                    <router-link :to="`/user/detail/${user?.id}`">
                        <span class="inline-block align-middle p-1 text-sm">{{user?.name}} {{user?.lastName}}</span>
                    </router-link>
                </div>
                <li class="mr-2" >
                    <a @click="logOut" href="#" class="inline-block text-white bg-gray-600 rounded py-1 px-3">Logout</a>
                </li>
            </ul>
            <ul class="flex space-x-1" v-else>
                <li class="mr-2" >
                    <router-link  to="/user/signIn" class="inline-block text-white bg-gray-600 rounded py-1 px-3 ">Sign In</router-link>
                </li>
                <li class="mr-2" >
                    <router-link  to="/user/login" class="inline-block text-white bg-gray-600 rounded py-1 px-3 ">Login</router-link>
                </li>
            </ul>
        </div>
    </div>



</template>


<script setup>
    import { getCurrentInstance, ref, computed } from "vue";
    const app = getCurrentInstance();
    const store  = app.appContext.config.globalProperties.$store;

    import {useRoute} from "vue-router";
    import { UserCircleIcon } from '@heroicons/vue/solid'

    const logOut = () => {
        store.commit('logoutUser')
    }

    const user = computed(() => {
        return store.getters._getCurrentUser
    })


    const route = useRoute();
    const urlArr = ref([
        {
            to: "/",
            title: "Home Page"
        },
        {
            to: "/user",
            title: "User"
        },
        {
            to: "/schema",
            title: "Schema"
        },
        {
            to: "/error",
            title: "Error"
        }
    ])
</script>
