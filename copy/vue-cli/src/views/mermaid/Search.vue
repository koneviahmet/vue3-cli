<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Diyagram Ara</h1>
      <router-link to="/mermaid/list" class="btn btn-outline">
        <i class="fas fa-arrow-left mr-2"></i> Listeye Dön
      </router-link>
    </div>

    <!-- Arama Formu -->
    <div class="card bg-base-100 shadow-xl mb-8">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Başlık</span>
            </label>
            <input 
              type="text" 
              v-model="searchTitle" 
              placeholder="Diyagram başlığı" 
              class="input input-bordered w-full" 
              @keyup.enter="searchDiagrams"
            />
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">Diyagram Tipi</span>
            </label>
            <select v-model="searchType" class="select select-bordered w-full">
              <option value="">Tümü</option>
              <option value="flowchart">Akış Şeması</option>
              <option value="sequenceDiagram">Sıralı Diyagram</option>
              <option value="classDiagram">Sınıf Diyagramı</option>
              <option value="stateDiagram">Durum Diyagramı</option>
              <option value="entityRelationshipDiagram">ER Diyagramı</option>
              <option value="gantt">Gantt Şeması</option>
              <option value="pie">Pasta Grafik</option>
              <option value="gitGraph">Git Diyagramı</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">İçerik</span>
            </label>
            <input 
              type="text" 
              v-model="searchContent" 
              placeholder="Diyagram içeriği" 
              class="input input-bordered w-full" 
              @keyup.enter="searchDiagrams"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Tema</span>
            </label>
            <select v-model="searchTheme" class="select select-bordered w-full">
              <option value="">Tümü</option>
              <option value="default">Varsayılan</option>
              <option value="forest">Orman</option>
              <option value="dark">Koyu</option>
              <option value="neutral">Nötr</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button @click="clearSearch" class="btn btn-outline mr-2">Temizle</button>
          <button 
            @click="searchDiagrams" 
            class="btn btn-primary"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
            <i v-else class="fas fa-search mr-2"></i> Ara
          </button>
        </div>
      </div>
    </div>

    <!-- Yükleniyor -->
    <div v-if="loading" class="flex justify-center items-center py-16">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Sonuç Bulunamadı -->
    <div v-else-if="searched && !data.length" class="card bg-base-100 shadow-xl">
      <div class="card-body text-center py-12">
        <h2 class="card-title justify-center mb-4">Sonuç Bulunamadı</h2>
        <p class="mb-4">Arama kriterlerinize uygun diyagram bulunamadı.</p>
        <div class="card-actions justify-center">
          <button @click="clearSearch" class="btn btn-outline">Aramayı Temizle</button>
        </div>
      </div>
    </div>

    <!-- Arama Sonuçları -->
    <div v-else-if="searched && data.length" class="mt-2">
      <h2 class="text-2xl font-bold mb-4">Arama Sonuçları ({{ data.length }})</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

    <!-- Henüz Arama Yapılmadı -->
    <div v-else class="card bg-base-100 shadow-xl">
      <div class="card-body text-center py-12">
        <h2 class="card-title justify-center mb-4">Diyagram Arama</h2>
        <p class="mb-4">Arama kriterlerini kullanarak diyagram arayabilirsiniz.</p>
        <p class="text-sm text-gray-500">Arama yapmak için yukarıdaki formu doldurun ve "Ara" butonuna tıklayın.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import useModelMermaid from '../../compositions/useModelMermaid';
import mermaid from 'mermaid';
import { notyfError, notyfSuccess } from '../../utils/notyf';

const { loading, data, error, searchItems, confirmDelete: deleteConfirm } = useModelMermaid();
const previewElements = ref([]);

// Arama state
const searchTitle = ref('');
const searchType = ref('');
const searchContent = ref('');
const searchTheme = ref('');
const searched = ref(false);

// Diyagramları ara
const searchDiagrams = async () => {
  if (!searchTitle.value && !searchType.value && !searchContent.value && !searchTheme.value) {
    notyfError('En az bir arama kriteri girmelisiniz');
    return;
  }
  
  const searchParams = {};
  
  if (searchTitle.value) searchParams.title_like = searchTitle.value;
  if (searchType.value) searchParams.type = searchType.value;
  if (searchContent.value) searchParams.code_like = searchContent.value;
  if (searchTheme.value) searchParams.theme = searchTheme.value;
  
  try {
    await searchItems(searchParams);
    searched.value = true;
    renderPreviews();
  } catch (err) {
    notyfError('Arama yapılırken bir hata oluştu');
    console.error(err);
  }
};

// Aramayı temizle
const clearSearch = () => {
  searchTitle.value = '';
  searchType.value = '';
  searchContent.value = '';
  searchTheme.value = '';
  searched.value = false;
  data.value = [];
};

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
        mermaid.render(`diagram-search-${id}`, code).then(({ svg }) => {
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
    
    // Silinen diyagramı sonuçlardan kaldır
    const index = data.value.findIndex(item => item.id === diagram.id);
    if (index !== -1) {
      data.value.splice(index, 1);
    }
    
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
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
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