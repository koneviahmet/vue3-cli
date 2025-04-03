<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="bg-blue-600 text-white p-6">
        <h1 class="text-3xl font-bold">PocketBase Docker Kurulumu</h1>
        <p class="mt-2">PocketBase'i Docker ortamında çalıştırmak için gerekli bilgiler</p>
      </div>
      
      <div class="p-6">
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Genel Bakış</h2>
          <p class="text-gray-600">
            PocketBase, basit projeler için kullanışlı bir backend çözümüdür. Burada Docker kullanarak
            PocketBase'i nasıl hızlıca kurabileceğinizi öğreneceksiniz.
          </p>
        </div>
        
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Kurulum Adımları</h2>
          
          <div class="steps steps-vertical">
            <div class="step step-primary">
              <div class="step-content ml-4">
                <h3 class="font-bold">Docker ve Docker Compose Kurulumu</h3>
                <p class="text-sm">Docker ve Docker Compose'un sisteminizde kurulu olduğundan emin olun.</p>
              </div>
            </div>
            <div class="step step-primary">
              <div class="step-content ml-4">
                <h3 class="font-bold">Klasöre Gidin</h3>
                <div class="mt-2 p-3 bg-gray-100 rounded">
                  <code class="text-sm">cd docker/pocketbase</code>
                </div>
              </div>
            </div>
            <div class="step step-primary">
              <div class="step-content ml-4">
                <h3 class="font-bold">Docker Konteyneri Başlatın</h3>
                <div class="mt-2 p-3 bg-gray-100 rounded">
                  <code class="text-sm">docker-compose up -d</code>
                </div>
              </div>
            </div>
            <div class="step step-primary">
              <div class="step-content ml-4">
                <h3 class="font-bold">PocketBase'e Erişin</h3>
                <p class="text-sm">Tarayıcınızda PocketBase'e erişmek için:</p>
                <div class="mt-2 p-3 bg-gray-100 rounded">
                  <code class="text-sm">http://localhost:8090</code>
                </div>
                <p class="text-sm mt-2">Admin paneline erişmek için:</p>
                <div class="mt-2 p-3 bg-gray-100 rounded">
                  <code class="text-sm">http://localhost:8090/_/</code>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Docker Dosyaları</h2>
          
          <div class="tabs">
            <a class="tab tab-lifted tab-active">Dockerfile</a>
            <a class="tab tab-lifted">docker-compose.yml</a>
          </div>
          
          <div class="bg-gray-900 p-4 rounded-b-md">
            <pre class="text-white overflow-x-auto text-sm"><code>FROM alpine:latest

# Install necessary tools
RUN apk add --no-cache unzip ca-certificates

# Set working directory
WORKDIR /app

# Download and unzip PocketBase
ARG PB_VERSION=0.20.7
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
    && unzip pocketbase_${PB_VERSION}_linux_amd64.zip \
    && rm pocketbase_${PB_VERSION}_linux_amd64.zip

# Create a directory for the PocketBase data
RUN mkdir -p /pb_data

# Expose the default PocketBase port
EXPOSE 8090

# Run PocketBase
CMD ["/app/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data"]</code></pre>
          </div>
        </div>
        
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Yönetim Komutları</h2>
          
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th class="bg-blue-600 text-white">İşlem</th>
                  <th class="bg-blue-600 text-white">Komut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-medium">Servisi Başlatma</td>
                  <td><code>docker-compose up -d</code></td>
                </tr>
                <tr>
                  <td class="font-medium">Servisi Durdurma</td>
                  <td><code>docker-compose down</code></td>
                </tr>
                <tr>
                  <td class="font-medium">Logları Görüntüleme</td>
                  <td><code>docker-compose logs -f</code></td>
                </tr>
                <tr>
                  <td class="font-medium">Servisi Yeniden Başlatma</td>
                  <td><code>docker-compose restart</code></td>
                </tr>
                <tr>
                  <td class="font-medium">Verileri Silme</td>
                  <td><code>docker-compose down -v</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <h4 class="font-bold">Önemli Not</h4>
              <p class="text-sm">PocketBase veri tabanı Docker volume'unda saklanır. Bu sayede konteyner yeniden başlatıldığında verileriniz korunur.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
  document.title = "Docker - PocketBase Kurulumu";
});
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style> 