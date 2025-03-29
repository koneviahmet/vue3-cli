<template>
  <div class="calendar-container p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Calendar</h1>
      
      <div class="flex space-x-4">
        <CalendarViewSelector v-model="currentView" />
        
        <button 
          @click="showAddEventModal = true" 
          class="btn btn-primary text-white flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Event
        </button>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <CalendarNavigation 
        :current-date="currentDate"
        @prev="navigateToPrev"
        @next="navigateToNext"
        @today="goToToday"
      />
      
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="loading loading-spinner text-primary"></div>
      </div>
      
      <div v-else>
        <CalendarMonthView 
          v-if="currentView === 'month'" 
          :current-date="currentDate"
          :events="events.items"
          @event-click="handleEventClick"
          @date-click="handleDateClick"
        />
        
        <CalendarWeekView 
          v-else-if="currentView === 'week'" 
          :current-date="currentDate"
          :events="events.items"
          @event-click="handleEventClick"
        />
        
        <CalendarDayView 
          v-else-if="currentView === 'day'" 
          :current-date="currentDate"
          :events="events.items"
          @event-click="handleEventClick"
        />
        
        <CalendarAgendaView 
          v-else-if="currentView === 'agenda'" 
          :current-date="currentDate"
          :events="events.items"
          @event-click="handleEventClick"
        />
      </div>
    </div>
    
    <!-- Add Event Modal -->
    <EventModal 
      v-if="showAddEventModal" 
      :event="activeEvent"
      :is-new="isNewEvent"
      @close="closeEventModal"
      @save="saveEvent"
      @delete="deleteEvent"
    />
    
    <!-- Event Details Modal -->
    <EventDetailsModal
      v-if="showEventDetailsModal"
      :event="activeEvent"
      @close="showEventDetailsModal = false"
      @edit="openEditEventModal"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useCalendar } from '../../compositions/useCalendar';
import CalendarNavigation from './components/CalendarNavigation.vue';
import CalendarViewSelector from './components/CalendarViewSelector.vue';
import CalendarMonthView from './components/CalendarMonthView.vue';
import CalendarWeekView from './components/CalendarWeekView.vue';
import CalendarDayView from './components/CalendarDayView.vue';
import CalendarAgendaView from './components/CalendarAgendaView.vue';
import EventModal from './components/EventModal.vue';
import EventDetailsModal from './components/EventDetailsModal.vue';

const { loading, events, fetchEvents, addEvent, updateEvent, deleteEvent: removeEvent } = useCalendar();

// Calendar view management
const currentView = ref('month');
const currentDate = ref(new Date());

// Modal management
const showAddEventModal = ref(false);
const showEventDetailsModal = ref(false);
const activeEvent = ref(null);
const isNewEvent = ref(true);

// Navigation functions
const navigateToPrev = () => {
  const date = new Date(currentDate.value);
  
  if (currentView.value === 'month') {
    date.setMonth(date.getMonth() - 1);
  } else if (currentView.value === 'week') {
    date.setDate(date.getDate() - 7);
  } else if (currentView.value === 'day') {
    date.setDate(date.getDate() - 1);
  }
  
  currentDate.value = date;
};

const navigateToNext = () => {
  const date = new Date(currentDate.value);
  
  if (currentView.value === 'month') {
    date.setMonth(date.getMonth() + 1);
  } else if (currentView.value === 'week') {
    date.setDate(date.getDate() + 7);
  } else if (currentView.value === 'day') {
    date.setDate(date.getDate() + 1);
  }
  
  currentDate.value = date;
};

const goToToday = () => {
  currentDate.value = new Date();
};

// Event handlers
const handleEventClick = (event) => {
  activeEvent.value = event;
  showEventDetailsModal.value = true;
};

const handleDateClick = (date) => {
  activeEvent.value = {
    title: '',
    description: '',
    start: date,
    end: date,
    allDay: true,
    type: 'task', // default type
    priority: 'medium',
    tags: []
  };
  isNewEvent.value = true;
  showAddEventModal.value = true;
};

const openEditEventModal = (event) => {
  activeEvent.value = event;
  isNewEvent.value = false;
  showEventDetailsModal.value = false;
  showAddEventModal.value = true;
};

const closeEventModal = () => {
  activeEvent.value = null;
  showAddEventModal.value = false;
};

const saveEvent = async (eventData) => {
  if (isNewEvent.value) {
    await addEvent(eventData);
  } else {
    await updateEvent(eventData);
  }
  await fetchEvents();
  closeEventModal();
};

const deleteEvent = async (eventData) => {
  await removeEvent(eventData);
  await fetchEvents();
  closeEventModal();
};

// Load events on mount
onMounted(async () => {
  await fetchEvents();
});
</script>

<style scoped>
.calendar-container {
  min-height: calc(100vh - 80px);
}
</style> 