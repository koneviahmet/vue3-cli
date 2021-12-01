<template>
    <div class="p-3">
        <ul class="flex">
        <li class="mr-2" v-for="url in urlArr" :key="url.id">
            <router-link   class="inline-block border  rounded py-1 px-3 " :class='route.fullPath == url.to && "bg-blue-500 text-white"' :to="url.to">{{url.title}}</router-link>
        </li>
    </ul>
    </div>
</template>

<script setup>
    import {useRoute} from "vue-router";
    import {ref} from 'vue';
    const route = useRoute();
    const urlArr = ref([
        {
            id: 1,
            to: "/schema",
            title: "Schema Home Page"
        },
        {
            id: 2,
            to: "/schema/create",
            title: "Schema Create"
        },
        {
            id: 3,
            to: "/schema/update/1",
            title: "Schema Update"
        },
        {
            id: 4,
            to: "/schema/list",
            title: "Schema List"
        },
        {
            id: 5,
            to: "/schema/detail/1",
            title: "Schema Detail"
        },
        {
            id: 6,
            to: "/schema/search",
            title: "schema Search"
        }
    ])
</script>

