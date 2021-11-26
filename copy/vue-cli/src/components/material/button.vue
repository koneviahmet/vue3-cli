<template>
  <button type="button" :class="getButton">
    <slot></slot>
  </button>

</template>



<script>
  import {computed} from 'vue';

  export default {
    props: {
      color: {
        type: String,
        default: "gray"
      },
      size: {
        type: String,
        default: "base"
      },
      type: {
        type: String,
        default: "fill"
      }
    },
    setup(props) {

      const colorArr = {
        'gray':{
          "fill":'text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300',
          "outline":'text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300'
        },
        'red':{
          "fill":'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300',
          "outline":'text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300'
        },
        'yellow':{
          "fill":'text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300',
          "outline":'text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300'
        },
        'green':{
          "fill":'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300',
          "outline":'text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300'
        },
        'blue':{
          "fill":'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300',
          "outline":'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
        },
        'indigo':{
          "fill":'text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300',
          "outline":'text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300'
        },
        'purple':{
          "fill":'text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300',
          "outline":'text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300'
        },
        'pink':{
          "fill":'text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300',
          "outline":'text-pink-700 hover:text-white border border-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300'
        }
      }

      const sizeArr = {
        'xs':'font-medium rounded-lg text-xs px-2 py-2 text-center',
        'sm':'font-medium rounded-lg text-sm px-3 py-2 text-center',
        'base':'font-medium rounded-lg text-base px-5 py-2.5 text-center',
        'lg':'font-medium rounded-lg  text-lg px-5 py-3 text-center',
        'xl':'font-medium rounded-lg  text-xl px-6 py-3.5 text-center',
        '2xl':'font-medium rounded-lg text-2xl px-6 py-4 text-center'
      }

      
      const getButton = computed(() => {
        return colorArr[props.color][props.type] + sizeArr[props.size];
      })

      return {
        getButton
      }
    }
  }
</script>