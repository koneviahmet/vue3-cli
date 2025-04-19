<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Diyagram Düzenle</h1>
      <div class="flex gap-2">
        <router-link :to="`/mermaid/detail/${$route.params.id}`" class="btn btn-outline">İptal</router-link>
        <router-link to="/mermaid/list" class="btn btn-outline">Listeye Dön</router-link>
      </div>
    </div>

    <!-- Yükleniyor -->
    <div v-if="initialLoading" class="flex justify-center items-center py-16">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Diyagram Düzenleme Formu -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sol Panel - Diyagram Türü ve Ayarlar -->
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title mb-4">Diyagram Türü</h2>
            <select v-model="diagramType" class="select select-bordered w-full mb-4">
              <option value="" disabled>Seçiniz</option>
              <option value="flowchart">Akış Şeması</option>
              <option value="sequenceDiagram">Sıralı Diyagram</option>
              <option value="classDiagram">Sınıf Diyagramı</option>
              <option value="stateDiagram">Durum Diyagramı</option>
              <option value="entityRelationshipDiagram">ER Diyagramı</option>
              <option value="gantt">Gantt Şeması</option>
              <option value="pie">Pasta Grafik</option>
              <option value="gitGraph">Git Diyagramı</option>
            </select>

            <h2 class="card-title mt-6 mb-4">Temel Ayarlar</h2>
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">Diyagram Başlığı</span>
              </label>
              <input type="text" v-model="diagramTitle" placeholder="Başlık" class="input input-bordered w-full" />
            </div>

            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">Tema</span>
              </label>
              <select v-model="theme" class="select select-bordered w-full">
                <option value="default">Varsayılan</option>
                <option value="forest">Orman</option>
                <option value="dark">Koyu</option>
                <option value="neutral">Nötr</option>
              </select>
            </div>

            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text">Açıklama</span>
              </label>
              <textarea v-model="description" placeholder="Diyagram açıklaması" class="textarea textarea-bordered w-full"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Orta ve Sağ Panel - Kod ve Önizleme -->
      <div class="lg:col-span-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Kod Editörü -->
          <div class="card bg-base-100 shadow-xl h-[calc(100vh-200px)]">
            <div class="card-body p-4 flex flex-col h-full">
              <h2 class="card-title">Mermaid Kodu</h2>
              <div class="flex-grow relative">
                <textarea 
                  ref="codeEditor"
                  v-model="mermaidCode" 
                  class="absolute inset-0 w-full h-full p-4 font-mono text-sm resize-none"
                  @input="updatePreview"
                  placeholder="Mermaid kodunuzu girin..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Önizleme -->
          <div class="card bg-base-100 shadow-xl h-[calc(100vh-200px)]">
            <div class="card-body p-4 flex flex-col h-full">
              <div class="flex justify-between items-center mb-2">
                <h2 class="card-title">Önizleme</h2>
                <span v-if="previewError" class="text-error text-sm">Hata: {{ previewError }}</span>
              </div>
              <div class="flex-grow overflow-auto bg-white p-4 rounded-lg">
                <div ref="previewElement" class="w-full h-full flex items-center justify-center">
                  <div v-if="!mermaidCode" class="text-gray-400 text-center">
                    Önizleme için kod girin
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Eylemler -->
        <div class="flex justify-between mt-6">
          <div>
            <button @click="insertSnippet" class="btn btn-outline mr-2">Kod Ekle</button>
            <button @click="resetChanges" class="btn btn-outline btn-warning mr-2">Değişiklikleri Sıfırla</button>
          </div>
          <div>
            <button 
              @click="updateDiagram" 
              class="btn btn-primary" 
              :disabled="!isValid || loading">
              <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
              Güncelle
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Kod Ekleme Modal -->
    <div v-if="showSnippetModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Kod Parçacığı Ekle</h3>
          <button @click="showSnippetModal = false" class="btn btn-sm btn-circle">✕</button>
        </div>
        <div class="mb-4">
          <select v-model="selectedSnippet" class="select select-bordered w-full">
            <option value="" disabled>Seçiniz</option>
            <optgroup v-for="(group, groupName) in snippets" :key="groupName" :label="groupName">
              <option v-for="(snippet, index) in group" :key="index" :value="snippet">{{ snippet.name }}</option>
            </optgroup>
          </select>
        </div>
        <div v-if="selectedSnippet" class="mb-4 bg-gray-100 p-3 rounded font-mono text-xs overflow-auto max-h-[200px]">
          <pre>{{ selectedSnippet.code }}</pre>
        </div>
        <div class="flex justify-end">
          <button 
            @click="applySnippet" 
            class="btn btn-primary" 
            :disabled="!selectedSnippet"
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import mermaid from 'mermaid';
import useModelMermaid from '../../compositions/useModelMermaid';
import { notyfError, notyfSuccess } from '../../utils/notyf';

const route = useRoute();
const router = useRouter();
const { loading, getItem, updateItem } = useModelMermaid();
const initialLoading = ref(true);

// Referanslar
const codeEditor = ref(null);
const previewElement = ref(null);

// Form state
const originalDiagram = ref(null);
const diagramId = ref(null);
const diagramType = ref('');
const diagramTitle = ref('');
const description = ref('');
const mermaidCode = ref('');
const theme = ref('default');
const previewError = ref('');

// Modal state
const showSnippetModal = ref(false);
const selectedSnippet = ref(null);

// Hesaplanmış özellikler
const isValid = computed(() => {
  return diagramTitle.value && mermaidCode.value && diagramType.value;
});

// Değerleri yükle
onMounted(async () => {
  const id = route.params.id;
  
  if (!id) {
    notyfError('Diyagram bulunamadı');
    router.push('/mermaid/list');
    return;
  }
  
  try {
    const response = await getItem({ id });
    originalDiagram.value = { ...response };
    
    // Form verilerini doldur
    diagramId.value = response.id;
    diagramType.value = response.type || '';
    diagramTitle.value = response.title || '';
    description.value = response.description || '';
    mermaidCode.value = response.code || '';
    theme.value = response.theme || 'default';
    
    initializeMermaid();
    updatePreview();
    initialLoading.value = false;
  } catch (err) {
    notyfError('Diyagram yüklenirken bir hata oluştu');
    console.error(err);
    router.push('/mermaid/list');
  }
});

// Mermaid'i yapılandır
const initializeMermaid = () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: theme.value,
    securityLevel: 'loose',
  });
};

// Önizlemeyi güncelle
const updatePreview = () => {
  if (!mermaidCode.value || !previewElement.value) return;
  
  previewError.value = '';
  
  try {
    mermaid.render('mermaid-preview-update', mermaidCode.value).then(({ svg }) => {
      previewElement.value.innerHTML = svg;
    }).catch(err => {
      previewError.value = err.message;
    });
  } catch (err) {
    previewError.value = err.message;
  }
};

// Tema değiştiğinde Mermaid'i yeniden yapılandır
watch(theme, () => {
  initializeMermaid();
  updatePreview();
});

// Kod parçacıkları
const snippets = {
  'Akış Şeması': [
    {
      name: 'Temel Akış',
      code: `flowchart TD
    A[Başlangıç] --> B{Karar Noktası}
    B -->|Evet| C[Sonuç 1]
    B -->|Hayır| D[Sonuç 2]
    C --> E[Bitiş]
    D --> E`
    },
    {
      name: 'Alt Grafik',
      code: `flowchart TD
    subgraph Ana Süreç
      A[Başla] --> B{Kontrol}
      B -->|Evet| C[İşlem]
    end
    subgraph Alt Süreç
      C --> D[Alt İşlem]
      D --> E[Bitir]
    end`
    }
  ],
  'Sıralı Diyagram': [
    {
      name: 'Temel Etkileşim',
      code: `sequenceDiagram
    participant K as Kullanıcı
    participant S as Sistem
    K->>S: İstek Gönder
    S->>S: İsteği İşle
    S-->>K: Cevap Döndür`
    }
  ],
  'Gantt': [
    {
      name: 'Proje Planı',
      code: `gantt
    title Proje Planı
    dateFormat YYYY-MM-DD
    section Analiz
    Gereksinim Toplama :a1, 2023-01-01, 10d
    section Geliştirme
    Kodlama             :a2, after a1, 15d
    Test                :a3, after a2, 7d`
    }
  ]
};

// Kod parçacığı eklemek için modal aç
const insertSnippet = () => {
  showSnippetModal.value = true;
};

// Seçilen kod parçacığını editöre ekle
const applySnippet = () => {
  if (selectedSnippet.value) {
    mermaidCode.value = selectedSnippet.value.code;
    
    // Diyagram tipini güncelle
    if (selectedSnippet.value.code.startsWith('flowchart') || selectedSnippet.value.code.startsWith('graph')) {
      diagramType.value = 'flowchart';
    } else if (selectedSnippet.value.code.startsWith('sequenceDiagram')) {
      diagramType.value = 'sequenceDiagram';
    } else if (selectedSnippet.value.code.startsWith('gantt')) {
      diagramType.value = 'gantt';
    }
    
    updatePreview();
    showSnippetModal.value = false;
    selectedSnippet.value = null;
  }
};

// Değişiklikleri sıfırla
const resetChanges = () => {
  if (originalDiagram.value) {
    diagramType.value = originalDiagram.value.type || '';
    diagramTitle.value = originalDiagram.value.title || '';
    description.value = originalDiagram.value.description || '';
    mermaidCode.value = originalDiagram.value.code || '';
    theme.value = originalDiagram.value.theme || 'default';
    
    updatePreview();
  }
};

// Diyagramı güncelle
const updateDiagram = async () => {
  if (!isValid.value) return;
  
  try {
    const diagramData = {
      id: diagramId.value,
      title: diagramTitle.value,
      type: diagramType.value,
      description: description.value,
      code: mermaidCode.value,
      theme: theme.value,
      updateAt: new Date().toISOString()
    };
    
    await updateItem(diagramData);
    notyfSuccess('Diyagram başarıyla güncellendi');
    router.push(`/mermaid/detail/${diagramId.value}`);
  } catch (error) {
    notyfError('Diyagram güncellenirken bir hata oluştu');
    console.error('Güncelleme hatası:', error);
  }
};
</script>

<style scoped>
.container {
  max-width: 1600px;
}
</style> 