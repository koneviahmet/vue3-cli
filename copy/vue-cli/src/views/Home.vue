<template>
  <!-- Hero Section with gradient background -->
  <section class="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center">
    <div class="container mx-auto px-4 py-16">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
        <!-- Content Column -->
        <div class="lg:w-1/2 space-y-8">
          <div class="space-y-2">
            <span class="badge badge-accent text-xs font-medium py-2">Yeni Özelliklerle</span>
            <h1 class="text-5xl md:text-6xl font-bold leading-tight">Modern ve Yenilikçi<br /><span class="text-primary">Çözümler</span></h1>
          </div>
          <p class="text-base-content/80 text-lg max-w-lg">
            İhtiyacınız olan tüm dijital araçlar tek bir platformda. Hızlı, güvenli ve kullanımı kolay.
            Projeleriniz için modern çözümler sunuyoruz.
          </p>
          <div class="flex flex-wrap gap-4">
            <button class="btn btn-primary btn-lg">Hemen Başla</button>
            <button class="btn btn-ghost btn-lg">Daha Fazla Bilgi</button>
          </div>
          
          <!-- Stats -->
          <div class="stats stats-vertical lg:stats-horizontal shadow bg-base-100">
            <div class="stat">
              <div class="stat-title">Müşteriler</div>
              <div class="stat-value text-primary">2,500+</div>
            </div>
            <div class="stat">
              <div class="stat-title">Projeler</div>
              <div class="stat-value">10,000+</div>
            </div>
            <div class="stat">
              <div class="stat-title">Müşteri Memnuniyeti</div>
              <div class="stat-value text-accent">98%</div>
            </div>
          </div>
        </div>
        
        <!-- Image Column with Floating Elements -->
        <div class="lg:w-1/2 relative">
          <div class="relative z-10">
            <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=800" alt="Dashboard Preview" class="rounded-xl shadow-2xl object-cover max-w-full" />
            
            <!-- Decorative elements -->
            <div class="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-lg -z-10"></div>
            <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-lg -z-10"></div>
          </div>
          
          <!-- Floating notification card -->
          <div class="absolute top-5 -left-10 bg-base-100 shadow-lg rounded-lg p-4 w-64 animate-bounce-slow hidden lg:block">
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img src="https://randomuser.me/api/portraits/women/22.jpg" />
                </div>
              </div>
              <div>
                <p class="font-medium">Yeni Bildirim</p>
                <p class="text-sm text-base-content/70">Ayşe yeni projeyi onayladı</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-20 bg-base-100">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Öne Çıkan Özellikler</h2>
        <p class="text-base-content/70 max-w-2xl mx-auto">
          Platformumuz, projenizi hızla ölçeklendirmeniz için ihtiyaç duyduğunuz tüm araçları sunar.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature Card 1 -->
        <div class="card bg-base-200 hover:shadow-lg transition-shadow duration-300">
          <div class="card-body">
            <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25l-9.75 21.75-12-11.25z" />
              </svg>
            </div>
            <h3 class="card-title text-xl">Hızlı İşlemler</h3>
            <p>Gelişmiş algoritmalarımız sayesinde saniyeler içinde sonuç alın.</p>
          </div>
        </div>
        
        <!-- Feature Card 2 -->
        <div class="card bg-base-200 hover:shadow-lg transition-shadow duration-300">
          <div class="card-body">
            <div class="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-secondary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 class="card-title text-xl">Güvenli Altyapı</h3>
            <p>Verileriniz en yüksek güvenlik standartlarıyla korunmaktadır.</p>
          </div>
        </div>
        
        <!-- Feature Card 3 -->
        <div class="card bg-base-200 hover:shadow-lg transition-shadow duration-300">
          <div class="card-body">
            <div class="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-accent">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 class="card-title text-xl">Kolay Özelleştirme</h3>
            <p>İhtiyaçlarınıza göre kolay özelleştirme seçenekleri sunuyoruz.</p>
          </div>
        </div>

        <!-- Feature Card 4 -->
        <div class="card bg-base-200 hover:shadow-lg transition-shadow duration-300">
          <div class="card-body">
            <div class="w-14 h-14 bg-info/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-info">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <h3 class="card-title text-xl">7/24 Destek</h3>
            <p>Teknik ekibimiz her zaman yanınızda, sorularınızı hızlıca yanıtlıyoruz.</p>
          </div>
        </div>
        
        <!-- Feature Card 5 -->
        <div class="card bg-base-200 hover:shadow-lg transition-shadow duration-300">
          <div class="card-body">
            <div class="w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-success">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <h3 class="card-title text-xl">Gerçek Zamanlı Analiz</h3>
            <p>Detaylı analizlerle projelerinizin performansını anlık olarak takip edin.</p>
          </div>
        </div>
        
        <!-- Feature Card 6 -->
        <div class="card bg-base-200 hover:shadow-lg transition-shadow duration-300">
          <div class="card-body">
            <div class="w-14 h-14 bg-warning/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-warning">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
            </div>
            <h3 class="card-title text-xl">Çoklu Platform Desteği</h3>
            <p>Tüm cihazlardan kesintisiz erişim sağlayın, her platformda aynı deneyimi yaşayın.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-20 bg-base-200">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Müşteri Yorumları</h2>
        <p class="text-base-content/70 max-w-2xl mx-auto">
          Çözümlerimiz hakkında müşterilerimizin ne düşündüğünü öğrenin.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Testimonial 1 -->
        <div class="card bg-base-100 hover:shadow-lg transition-shadow duration-300">
          <div class="card-body">
            <div class="flex items-center gap-4 mb-4">
              <div class="rating">
                <input type="radio" name="rating-1" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-1" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-1" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-1" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-1" class="mask mask-star-2 bg-primary" checked />
              </div>
            </div>
            <p class="mb-6 italic">"Bu platformu kullanmaya başladıktan sonra iş süreçlerimiz %40 hızlandı. Ekip olarak daha verimli çalışıyoruz."</p>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img src="https://randomuser.me/api/portraits/women/50.jpg" />
                </div>
              </div>
              <div>
                <p class="font-medium">Ayşe Yılmaz</p>
                <p class="text-sm text-base-content/70">Pazarlama Direktörü, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Testimonial 2 -->
        <div class="card bg-base-100 hover:shadow-lg transition-shadow duration-300">
          <div class="card-body">
            <div class="flex items-center gap-4 mb-4">
              <div class="rating">
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-2" class="mask mask-star-2 bg-primary" />
              </div>
            </div>
            <p class="mb-6 italic">"Kullanıcı dostu arayüzü ve kapsamlı analizleri ile projelerimizi çok daha iyi yönetiyoruz. Kesinlikle tavsiye ederim."</p>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img src="https://randomuser.me/api/portraits/men/36.jpg" />
                </div>
              </div>
              <div>
                <p class="font-medium">Mehmet Kaya</p>
                <p class="text-sm text-base-content/70">CEO, InnovateTR</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Testimonial 3 -->
        <div class="card bg-base-100 hover:shadow-lg transition-shadow duration-300">
          <div class="card-body">
            <div class="flex items-center gap-4 mb-4">
              <div class="rating">
                <input type="radio" name="rating-3" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-3" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-3" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-3" class="mask mask-star-2 bg-primary" checked />
                <input type="radio" name="rating-3" class="mask mask-star-2 bg-primary" checked />
              </div>
            </div>
            <p class="mb-6 italic">"7/24 destek ekibi sayesinde karşılaştığımız tüm sorunlar anında çözüldü. Bu kadar hızlı yanıt veren başka bir platform görmedim."</p>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" />
                </div>
              </div>
              <div>
                <p class="font-medium">Zeynep Demir</p>
                <p class="text-sm text-base-content/70">CTO, FutureSoft</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-gradient-to-br from-primary/20 to-secondary/20">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-10 bg-base-100 rounded-2xl p-8 lg:p-12 shadow-xl">
        <div class="lg:w-2/3">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">Hemen Şimdi Başlayın</h2>
          <p class="text-base-content/70 mb-6 lg:pr-12">
            İşletmenizi büyütmek ve süreçlerinizi optimize etmek için gerekli tüm araçlara erişim sağlayın. 
            İlk 14 gün tamamen ücretsiz.
          </p>
          <div class="flex flex-wrap gap-4">
            <button class="btn btn-primary">Ücretsiz Dene</button>
            <button class="btn btn-outline">Demo İzle</button>
          </div>
        </div>
        
        <div class="lg:w-1/3">
          <div class="stat-value text-primary text-5xl font-bold mb-2">14</div>
          <div class="text-lg">Günlük ücretsiz deneme</div>
          <div class="text-base-content/60 mt-2">Kredi kartı gerekmez</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-20 bg-base-100">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4">Sık Sorulan Sorular</h2>
        <p class="text-base-content/70 max-w-2xl mx-auto">
          Merak ettiğiniz soruların cevapları burada. Daha fazla bilgi için bize ulaşın.
        </p>
      </div>
      
      <div class="max-w-3xl mx-auto space-y-4">
        <div class="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" checked="checked" /> 
          <div class="collapse-title text-xl font-medium">
            Üyelik ücretli mi?
          </div>
          <div class="collapse-content"> 
            <p>Evet, ücretsiz ve premium üyelik planlarımız mevcuttur. Premium üyelik ile daha fazla özelliğe erişim sağlayabilirsiniz. 14 günlük ücretsiz deneme süresi sunuyoruz.</p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" /> 
          <div class="collapse-title text-xl font-medium">
            Verilerim güvende mi?
          </div>
          <div class="collapse-content"> 
            <p>Tüm verileriniz en yüksek güvenlik standartlarıyla korunmaktadır. SSL şifreleme, düzenli yedekleme ve çok faktörlü kimlik doğrulama gibi önlemler kullanıyoruz.</p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" /> 
          <div class="collapse-title text-xl font-medium">
            Kaç kullanıcı ekleyebilirim?
          </div>
          <div class="collapse-content"> 
            <p>Üyelik paketinize göre değişmektedir. Ücretsiz pakette 3 kullanıcı, Pro pakette 10 kullanıcı ve Enterprise pakette sınırsız kullanıcı ekleyebilirsiniz.</p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" /> 
          <div class="collapse-title text-xl font-medium">
            İade politikanız nedir?
          </div>
          <div class="collapse-content"> 
            <p>Satın alma işleminizden itibaren 30 gün içinde, herhangi bir sebeple memnun kalmazsanız %100 para iade garantisi sunuyoruz.</p>
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" /> 
          <div class="collapse-title text-xl font-medium">
            Teknik destek nasıl alabilirim?
          </div>
          <div class="collapse-content"> 
            <p>7/24 canlı destek, e-posta desteği ve kapsamlı yardım merkezi ile hizmetinizdeyiz. Premium üyelerimiz için öncelikli destek sağlıyoruz.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Newsletter Section -->
  <section class="py-16 bg-base-200">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">Gelişmelerden Haberdar Olun</h2>
        <p class="text-base-content/70 mb-8">
          Yeni özellikler, güncellemeler ve özel teklifler hakkında bilgi almak için bültenimize abone olun.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <input type="email" placeholder="E-posta adresinizi girin" class="input input-bordered w-full max-w-xs" />
          <button class="btn btn-primary">Abone Ol</button>
        </div>
        <p class="text-xs text-base-content/50 mt-4">
          Gizliliğinize saygı duyuyoruz. Dilediğiniz zaman abonelikten çıkabilirsiniz.
        </p>
      </div>
    </div>
  </section>


</template>

<script setup>
// Custom animation for floating elements
import { onMounted } from 'vue';

onMounted(() => {
  // Add custom animation class
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes bounce-slow {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    .animate-bounce-slow {
      animation: bounce-slow 5s infinite ease-in-out;
    }
  `;
  document.head.appendChild(style);
});
</script>

<style scoped>
/* Additional custom styling if needed */
</style>