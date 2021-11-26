<template>
<span v-if="model == 'basic'" :class="getClass" role="alert">
  <slot></slot>
</span>
</template>



<script>
  import {computed, ref, watch} from 'vue';

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
      },
      model: {
        type: String,
        default: "basic"
      }
    },
    setup(props) {
      const aShow = ref(props.show);


      const colorArr = {
          'basic':{        
            'gray':{
              "fill":'bg-blue-100 text-blue-800 rounded-md',
              "outline":'border border-blue-100 text-blue-800 rounded-md'
            },
            'red':{
              "fill":'bg-red-100 text-red-800  rounded-md',
              "outline":'border border-red-100 text-red-800 rounded-md'
            },
            'yellow':{
              "fill":'bg-yellow-100 text-yellow-800  rounded-md',
              "outline":'border border-yellow-100 text-yellow-800 rounded-md'
            },
            'green':{
              "fill":'bg-green-100 text-green-800  rounded-md',
              "outline":'border border-green-100 text-green-800 rounded-md'
            },
            'blue':{
              "fill":'bg-blue-100 text-blue-800  rounded-md',
              "outline":'border border-blue-100 text-blue-800 rounded-md'
            },
            'indigo':{
              "fill":'bg-indigo-100 text-indigo-800  rounded-md',
              "outline":'border border-indigo-100 text-indigo-800 rounded-md'
            },
            'purple':{
              "fill":'bg-purple-100 text-purple-800  rounded-md',
              "outline":'border border-purple-100 text-purple-800 rounded-md'
            },
            'pink':{
              "fill":'bg-pink-100 text-pink-800  rounded-md',
              "outline":'border border-pink-100 text-pink-800 rounded-md'
            }
        },
        'icon':{        
            'gray':{
              "fill":'',
              "outline":''
            },
            'red':{
              "fill":'',
              "outline":''
            },
            'yellow':{
              "fill":'',
              "outline":''
            },
            'green':{
              "fill":'',
              "outline":''
            },
            'blue':{
              "fill":'',
              "outline":''
            },
            'indigo':{
              "fill":'',
              "outline":''
            },
            'purple':{
              "fill":'',
              "outline":''
            },
            'pink':{
              "fill":'',
              "outline":''
            }
        }
      }

      const sizeArr = {
        'xs':'text-xs font-medium mr-2 px-2.5 py-0.5',
        'sm':'text-xs font-medium mr-2 px-2.5 py-0.5',
        'base':'text-xs font-medium mr-2 px-2.5 py-0.5',
        'lg':'text-xs font-medium mr-2 px-2.5 py-0.5',
        'xl':'text-xs font-medium mr-2 px-2.5 py-0.5',
        '2xl':'text-xs font-medium mr-2 px-2.5 py-0.5'
      }

      
      
      const getClass = computed(() => {
        return colorArr[props.model][props.color][props.type] + " " +  sizeArr[props.size];
      })

      const setShow = () => {aShow.value = false}

      return {
        aShow,
        getClass,
        setShow
      }
    }
  }
</script>