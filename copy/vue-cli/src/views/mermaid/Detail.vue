<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Başlık ve Butonlar -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-3xl font-bold" v-if="diagram">{{ diagram.title }}</h1>
        <div v-if="diagram" class="flex items-center mt-2">
          <div class="badge badge-primary mr-2">{{ formatDiagramType(diagram.type) }}</div>
          <span class="text-sm text-gray-500">{{ formatDate(diagram.createdAt) }}</span>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <router-link to="/mermaid/list" class="btn btn-outline">
          <i class="fas fa-arrow-left mr-2"></i> Geri
        </router-link>
        <button @click="downloadSVG" class="btn btn-outline">
          <i class="fas fa-download mr-2"></i> SVG İndir
        </button>
        <button @click="downloadPNG" class="btn btn-outline">
          <i class="fas fa-download mr-2"></i> PNG İndir
        </button>
        <router-link v-if="diagram" :to="`/mermaid/update/${diagram.id}`" class="btn btn-primary">
          <i class="fas fa-edit mr-2"></i> Düzenle
        </router-link>
      </div>
    </div>

    <!-- Yükleniyor -->
    <div v-if="loading" class="flex justify-center items-center py-16">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Diyagram Bulunamadı -->
    <div v-else-if="!diagram" class="card bg-base-100 shadow-xl">
      <div class="card-body text-center py-16">
        <h2 class="card-title justify-center mb-4">Diyagram Bulunamadı</h2>
        <p class="mb-6">İstediğiniz diyagram bulunamadı veya silinmiş olabilir.</p>
        <div class="card-actions justify-center">
          <router-link to="/mermaid/list" class="btn btn-primary">
            Diyagram Listesine Dön
          </router-link>
        </div>
      </div>
    </div>

    <!-- Diyagram Detayı -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sol Panel - Bilgiler -->
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4">Diyagram Bilgileri</h2>
            
            <div class="mb-4" v-if="diagram.description">
              <h3 class="font-bold text-sm mb-1">Açıklama:</h3>
              <p class="text-gray-700">{{ diagram.description }}</p>
            </div>
            
            <div class="mb-4">
              <h3 class="font-bold text-sm mb-1">Tema:</h3>
              <div class="badge">{{ formatTheme(diagram.theme) }}</div>
            </div>

            <div class="mb-4">
              <h3 class="font-bold text-sm mb-1">Oluşturulma Tarihi:</h3>
              <p class="text-sm">{{ formatDate(diagram.createdAt) }}</p>
            </div>

            <div class="mb-4" v-if="diagram.updateAt">
              <h3 class="font-bold text-sm mb-1">Son Güncelleme:</h3>
              <p class="text-sm">{{ formatDate(diagram.updateAt) }}</p>
            </div>

            <div class="divider"></div>

            <h3 class="font-bold text-sm mb-2">Mermaid Kodu:</h3>
            <div class="bg-gray-100 p-3 rounded-lg">
              <pre class="whitespace-pre-wrap text-xs overflow-auto max-h-[200px]">{{ diagram.code }}</pre>
            </div>

            <div class="card-actions justify-end mt-4">
              <button @click="copyCode" class="btn btn-sm btn-outline">
                <i class="fas fa-copy mr-2"></i> Kopyala
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Diyagram Görüntüsü -->
      <div class="lg:col-span-2">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4">Diyagram</h2>
            <div class="bg-white p-4 rounded-lg overflow-auto" style="min-height: 400px;">
              <div ref="diagramContainer" class="flex items-center justify-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import useModelMermaid from '../../compositions/useModelMermaid';
import { initializeMermaid, renderMermaidDiagram } from '../../utils/mermaid-config';
import { notyfError, notyfSuccess } from '../../utils/notyf';

const route = useRoute();
const { loading, getItem } = useModelMermaid();
const diagram = ref(null);
const diagramContainer = ref(null);
const diagramSvg = ref(null);

// Diyagramı yükle
onMounted(async () => {
  const id = route.params.id;
  
  if (!id) {
    notyfError('Diyagram bulunamadı');
    return;
  }
  
  try {
    const response = await getItem({ id });    
    diagram.value = response;
    renderDiagram();
  } catch (err) {
    notyfError('Diyagram yüklenirken bir hata oluştu');
    console.error(err);
  }
});

// Diyagramı çiz
const renderDiagram = async () => {
  if (!diagram.value?.code || !diagramContainer.value) return;
  
  try {
    // Initialize mermaid with the diagram's theme
    initializeMermaid(diagram.value.theme || 'default');
    
    // Render the diagram
    await renderMermaidDiagram('diagram-detail', diagram.value.code, diagramContainer.value);
    
    // Save the SVG for download functionality
    diagramSvg.value = diagramContainer.value.innerHTML;
  } catch (error) {
    notyfError('Diyagram render edilirken bir hata oluştu');
    console.error('Rendering error:', error);
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

// Temayı formatla
const formatTheme = (theme) => {
  const themes = {
    'default': 'Varsayılan',
    'forest': 'Orman',
    'dark': 'Koyu',
    'neutral': 'Nötr'
  };
  
  return themes[theme] || theme;
};

// Tarihi formatla
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Kodu kopyala
const copyCode = () => {
  if (!diagram.value?.code) return;
  
  try {
    navigator.clipboard.writeText(diagram.value.code);
    notyfSuccess('Kod panoya kopyalandı');
  } catch (err) {
    notyfError('Kod kopyalanırken bir hata oluştu');
    console.error(err);
  }
};

// SVG olarak indir
const downloadSVG = () => {
  if (!diagramContainer.value) return;
  
  const svgElement = diagramContainer.value.querySelector('svg');
  if (!svgElement) {
    notyfError('İndirilecek SVG bulunamadı');
    return;
  }
  
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${diagram.value?.title || 'mermaid-diagram'}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// PNG olarak indir
const downloadPNG = () => {
  if (!diagramContainer.value) return;
  
  const svgElement = diagramContainer.value.querySelector('svg');
  if (!svgElement) {
    notyfError('İndirilecek diyagram bulunamadı');
    return;
  }
  
  try {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    
    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = svgElement.width.baseVal.value || img.width;
      canvas.height = svgElement.height.baseVal.value || img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      DOMURL.revokeObjectURL(url);
      
      const imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      
      const a = document.createElement('a');
      a.href = imgURI;
      a.download = `${diagram.value?.title || 'mermaid-diagram'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    
    img.src = url;
  } catch (error) {
    notyfError('PNG indirme işlemi başarısız oldu');
    console.error('PNG export error:', error);
  }
};
</script>

<style scoped>
.container {
  max-width: 1600px;
}
</style> 