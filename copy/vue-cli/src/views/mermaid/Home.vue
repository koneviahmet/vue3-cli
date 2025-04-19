<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-primary mb-2">Mermaid Görselleştirme Sistemi</h1>
      <p class="text-lg text-gray-600">Diyagramlar oluşturun, düzenleyin ve paylaşın</p>
      <p class="text-lg  text-red-500">diagramın önizlemesi görünmüyor. düzenle kısmında enter basınca görünüyor. gerekli düzenlemeyi yapınız.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Hızlı Diyagram Oluşturma -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Hızlı Başlangıç</h2>
          <p>Yeni bir diyagram oluşturmak için diagramınızın tipini seçin ve başlayın.</p>
          <div class="card-actions justify-end mt-4">
            <router-link to="/mermaid/create" class="btn btn-primary">Yeni Diyagram</router-link>
          </div>
        </div>
      </div>

      <!-- Kayıtlı Diyagramlar -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Kayıtlı Diyagramlar</h2>
          <p>Önceden oluşturduğunuz diyagramları görüntüleyin ve düzenleyin.</p>
          <div class="card-actions justify-end mt-4">
            <router-link to="/mermaid/list" class="btn btn-primary">Diyagramları Görüntüle</router-link>
          </div>
        </div>
      </div>

      <!-- Şablonlar -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Şablonlar</h2>
          <p>Hazır şablonlar kullanarak hızlıca diyagram oluşturun.</p>
          <div class="card-actions justify-end mt-4">
            <button @click="showTemplates = true" class="btn btn-primary">Şablonları Görüntüle</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mermaid Örneği -->
    <div class="mt-12 bg-base-100 shadow-xl rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4">Örnek Diyagram</h2>
      <div ref="exampleChart" class="p-4 bg-white rounded-lg"></div>
    </div>

    <!-- Desteklenen Diyagram Tipleri -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-6">Desteklenen Diyagram Tipleri</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="(chart, index) in diagramTypes" :key="index" class="p-4 bg-base-100 rounded-lg shadow">
          <div class="font-bold">{{ chart.name }}</div>
          <p class="text-sm text-gray-600 mt-1">{{ chart.description }}</p>
        </div>
      </div>
    </div>

    <!-- Şablonlar Modal -->
    <div v-if="showTemplates" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Diyagram Şablonları</h3>
          <button @click="showTemplates = false" class="btn btn-sm btn-circle">✕</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(template, index) in templates" :key="index" class="border p-4 rounded-lg">
            <h4 class="font-bold">{{ template.name }}</h4>
            <p class="text-sm my-2">{{ template.description }}</p>
            <div class="flex justify-end">
              <button @click="useTemplate(template)" class="btn btn-sm btn-primary">Kullan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import mermaid from 'mermaid';

const router = useRouter();
const exampleChart = ref(null);
const showTemplates = ref(false);

const diagramTypes = [
  { name: 'Akış Şeması', description: 'Süreçleri ve iş akışlarını görselleştirin' },
  { name: 'Sıralı Diyagram', description: 'Sistemler ve aktörler arasındaki etkileşimleri gösterin' },
  { name: 'Sınıf Diyagramı', description: 'Sınıflar, özellikleri ve ilişkileri' },
  { name: 'Gantt Şeması', description: 'Proje zaman çizelgesi ve görevler' },
  { name: 'ER Diyagramı', description: 'Veri modelleri ve ilişkiler' },
  { name: 'Durum Diyagramı', description: 'Sistem durumları ve geçişleri' },
  { name: 'Pasta Grafik', description: 'Oransal verilerin görselleştirilmesi' },
  { name: 'Git Diyagramı', description: 'Git dalları ve sürüm geçmişi' }
];

const templates = [
  {
    name: 'Basit Akış Şeması',
    description: 'Basit bir iş akışı şeması şablonu',
    type: 'flowchart',
    code: `flowchart TD
    A[Başla] --> B{Karar?}
    B -->|Evet| C[İşlem 1]
    B -->|Hayır| D[İşlem 2]
    C --> E[Bitir]
    D --> E`
  },
  {
    name: 'Proje Zaman Çizelgesi',
    description: 'Proje görevleri için Gantt şeması',
    type: 'gantt',
    code: `gantt
    title Proje Zaman Çizelgesi
    dateFormat  YYYY-MM-DD
    section Planlama
    Gereksinim analizi      :a1, 2023-01-01, 7d
    Tasarım                 :after a1, 10d
    section Geliştirme
    Kodlama                 :2023-01-18, 20d
    Test                    :2023-02-08, 7d`
  },
  {
    name: 'Sıralı Diyagram',
    description: 'Kullanıcı ve sistem arasındaki iletişim',
    type: 'sequenceDiagram',
    code: `sequenceDiagram
    participant Kullanıcı
    participant Sistem
    Kullanıcı->>Sistem: Giriş yap
    Sistem->>Sistem: Kimlik doğrula
    Sistem-->>Kullanıcı: Giriş başarılı
    Kullanıcı->>Sistem: Veri talep et
    Sistem-->>Kullanıcı: Veriyi döndür`
  },
  {
    name: 'Sınıf Diyagramı',
    description: 'Nesne yönelimli yapı gösterimi',
    type: 'classDiagram',
    code: `classDiagram
    class Kullanıcı {
      +String ad
      +String soyad
      +login()
      +logout()
    }
    class Admin {
      +yönet()
    }
    Kullanıcı <|-- Admin`
  }
];

const useTemplate = (template) => {
  // Seçilen şablonu yerel depolamaya kaydet ve oluşturma sayfasına yönlendir
  localStorage.setItem('mermaidTemplate', template.code);
  router.push('/mermaid/create');
};

onMounted(() => {
  // Mermaid'i başlat
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
  });

  // Örnek diyagramı render et
  const exampleCode = `graph TD
    A[Başla] --> B{Koşul?}
    B -->|Evet| C[Sonuç 1]
    B -->|Hayır| D[Sonuç 2]
    C --> E[Bitir]
    D --> E`;

  if (exampleChart.value) {
    mermaid.render('exampleDiagram', exampleCode).then(({ svg }) => {
      exampleChart.value.innerHTML = svg;
    });
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style> 