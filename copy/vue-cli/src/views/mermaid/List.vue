<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Mermaid Diyagramları</h1>
      <div>
        <router-link to="/mermaid/search" class="btn btn-outline mr-2">
          <i class="fas fa-search mr-2"></i> Ara
        </router-link>
        <router-link to="/mermaid/create" class="btn btn-primary">
          <i class="fas fa-plus mr-2"></i> Yeni Diyagram
        </router-link>
      </div>
    </div>

    <!-- Yükleniyor -->
    <div v-if="loading" class="flex justify-center items-center py-16">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Veri Yoksa -->
    <div v-else-if="!data.length" class="card bg-base-100 shadow-xl">
      <div class="card-body text-center py-16">
        <h2 class="card-title justify-center mb-4">Henüz Diyagram Bulunamadı</h2>
        <p class="mb-6">Yeni bir diyagram oluşturarak başlayabilirsiniz.</p>
        <div class="card-actions justify-center">
          <router-link to="/mermaid/create" class="btn btn-primary">
            Yeni Diyagram Oluştur
          </router-link>
        </div>
      </div>
    </div>

    <!-- Diyagram Listesi -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="diagram in data" :key="diagram.id" class="card bg-base-100 shadow-xl overflow-hidden">
        <figure class="h-48 bg-gray-100 relative overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center p-4">
            <div 
              :id="`preview-${diagram.id}`" 
              class="mermaid-preview w-full h-full flex items-center justify-center"
              ref="previewElements"
              :data-code="diagram.code"
              :data-id="diagram.id">
            </div>
          </div>
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {{ diagram.title }}
            <div class="badge badge-primary">{{ formatDiagramType(diagram.type) }}</div>
          </h2>
          <p v-if="diagram.description" class="text-sm text-gray-600 line-clamp-2">
            {{ diagram.description }}
          </p>
          <p class="text-xs text-gray-500 mt-2">
            {{ formatDate(diagram.createdAt) }}
          </p>
          <div class="card-actions justify-end mt-4">
            <button @click="confirmDelete(diagram)" class="btn btn-sm btn-outline btn-error">
              <i class="fas fa-trash"></i>
            </button>
            <router-link :to="`/mermaid/update/${diagram.id}`" class="btn btn-sm btn-outline">
              <i class="fas fa-edit"></i>
            </router-link>
            <router-link :to="`/mermaid/detail/${diagram.id}`" class="btn btn-sm btn-primary">
              Görüntüle
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import useModelMermaid from '../../compositions/useModelMermaid';
import mermaid from 'mermaid';
import { notyfError, notyfSuccess } from '../../utils/notyf';

const { loading, data, error, getItems, confirmDelete: deleteConfirm } = useModelMermaid();
const previewElements = ref([]);

// Verileri yükle
onMounted(async () => {
  try {
    await getItems();
    renderPreviews();
  } catch (err) {
    notyfError('Diyagramlar yüklenirken bir hata oluştu');
    console.error(err);
  }
});

// Diyagramları çiz
const renderPreviews = async () => {
  await nextTick();
  initializeMermaid();
  
  // DOM'daki tüm önizleme elementlerini seç
  const elements = document.querySelectorAll('.mermaid-preview');
  elements.forEach(element => {
    const code = element.getAttribute('data-code');
    const id = element.getAttribute('data-id');
    if (code) {
      try {
        mermaid.render(`diagram-${id}`, code).then(({ svg }) => {
          element.innerHTML = svg;
          // SVG'yi küçültmek ve ortalamak için
          const svgElement = element.querySelector('svg');
          if (svgElement) {
            svgElement.setAttribute('width', '100%');
            svgElement.setAttribute('height', '100%');
            svgElement.style.maxWidth = '100%';
            svgElement.style.maxHeight = '100%';
          }
        }).catch(() => {
          element.innerHTML = '<div class="text-error text-sm">Diyagram yüklenemedi</div>';
        });
      } catch (error) {
        console.error('Rendering error:', error);
        element.innerHTML = '<div class="text-error text-sm">Diyagram yüklenemedi</div>';
      }
    }
  });
};

// Mermaid'i yapılandır
const initializeMermaid = () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
  });
};

// Diyagramı sil
const confirmDelete = async (diagram) => {
  try {
    await deleteConfirm({ id: diagram.id });
    notyfSuccess('Diyagram başarıyla silindi');
    renderPreviews();
  } catch (error) {
    if (error !== false) { // Kullanıcı iptal etmedi
      notyfError('Diyagram silinirken bir hata oluştu');
      console.error(error);
    }
  }
};

// Diyagram tipini formatla
const formatDiagramType = (type) => {
  const types = {
    'flowchart': 'Akış Şeması',
    'sequenceDiagram': 'Sıralı Diyagram',
    'classDiagram': 'Sınıf Diyagramı',
    'stateDiagram': 'Durum Diyagramı',
    'entityRelationshipDiagram': 'ER Diyagramı',
    'gantt': 'Gantt Şeması',
    'pie': 'Pasta Grafik',
    'gitGraph': 'Git Grafı'
  };
  
  return types[type] || type;
};

// Tarihi formatla
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Check for invalid date
    if (isNaN(date.getTime())) {
      return 'Geçersiz tarih';
    }
    
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Geçersiz tarih';
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style> 