<template>
  <div class="calendar-agenda-view">
    <div class="mb-4">
      <h3 class="text-lg font-medium text-gray-700">
        {{ formatMonth(currentDate) }} Events
      </h3>
    </div>
    
    <div v-if="groupedEvents.length === 0" class="py-8 text-center text-gray-500">
      No events scheduled for this month
    </div>
    
    <div v-else class="space-y-4">
      <div v-for="(group, index) in groupedEvents" :key="index" class="bg-white rounded-lg shadow-sm">
        <div class="px-4 py-2 bg-gray-50 rounded-t-lg flex items-center border border-gray-200">
          <div :class="['w-10 h-10 rounded-full flex items-center justify-center mr-3', isToday(group.date) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700']">
            {{ formatDay(group.date) }}
          </div>
          <div>
            <div class="font-medium">{{ formatDayName(group.date) }}</div>
            <div class="text-xs text-gray-500">{{ formatDate(group.date) }}</div>
          </div>
        </div>
        
        <div class="divide-y divide-gray-100 border-x border-b border-gray-200 rounded-b-lg">
          <div v-for="event in group.events" :key="event.id" 
            class="p-3 flex items-center hover:bg-gray-50 cursor-pointer"
            @click="$emit('event-click', event)"
          >
            <div class="w-2 h-full self-stretch" :style="{ backgroundColor: event.color }"></div>
            <div class="ml-3 flex-grow">
              <div class="font-medium">{{ event.title }}</div>
              <div class="text-xs text-gray-500">{{ formatEventTime(event) }}</div>
            </div>
            <div class="text-xs px-2 py-1 rounded-full" :style="{ backgroundColor: event.color + '20', color: event.color }">
              {{ event.type === 'task' ? 'Task' : 'Kanban' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentDate: { type: Date, required: true },
  events: { type: Array, default: () => [] }
});

defineEmits(['event-click']);

const monthEvents = computed(() => {
  if (!props.events || !props.events.length) return [];
  
  return props.events.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate.getMonth() === props.currentDate.getMonth() && 
           eventDate.getFullYear() === props.currentDate.getFullYear();
  }).sort((a, b) => new Date(a.start) - new Date(b.start));
});

const groupedEvents = computed(() => {
  const groupByDate = {};
  
  monthEvents.value.forEach(event => {
    const eventDate = new Date(event.start);
    const dateKey = eventDate.toISOString().split('T')[0];
    
    if (!groupByDate[dateKey]) {
      groupByDate[dateKey] = {
        date: eventDate,
        events: []
      };
    }
    
    groupByDate[dateKey].events.push(event);
  });
  
  // Convert to array and sort by date
  return Object.values(groupByDate).sort((a, b) => a.date - b.date);
});

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

const formatMonth = (date) => {
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const formatDay = (date) => {
  return date.getDate();
};

const formatDayName = (date) => {
  const options = { weekday: 'long' };
  return date.toLocaleDateString(undefined, options);
};

const formatDate = (date) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const formatEventTime = (event) => {
  const start = new Date(event.start);
  if (event.allDay) {
    return 'All day';
  }
  
  const options = { hour: 'numeric', minute: '2-digit' };
  return start.toLocaleTimeString(undefined, options);
};
</script> 