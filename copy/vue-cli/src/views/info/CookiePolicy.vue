<template>
    <div class="container mx-auto px-4 py-12 max-w-4xl">
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div class="bg-primary/10 p-6 border-b border-primary/20">
                <h1 class="text-3xl font-bold text-primary">Çerez Politikası</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Son güncelleme: {{ new Date().toLocaleDateString('tr-TR') }}</p>
            </div>
            
            <div class="p-6 space-y-8">
                <section class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <span class="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Çerezler Hakkında
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza çerezler yerleştirilmektedir. Bu çerezler, hizmetlerimizi daha etkin ve daha kullanışlı hale getirmek amacıyla kullanılmaktadır.
                    </p>
                </section>
                
                <section class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <span class="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Çerez Nedir?
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalarda, ziyaret ettiğiniz web sayfaları, kullanım süreniz gibi bilgiler saklanır. Böylece siteyi bir sonraki ziyaretinizde kullanım kolaylığı sağlanır.
                    </p>
                </section>
                
                <section class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <span class="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Çerez Türleri
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 class="font-medium text-primary mb-2">Oturum Çerezleri</h3>
                            <p class="text-gray-600 dark:text-gray-300 text-sm">
                                Geçici çerezlerdir, tarayıcınızı kapattığınızda silinirler.
                            </p>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 class="font-medium text-primary mb-2">Kalıcı Çerezler</h3>
                            <p class="text-gray-600 dark:text-gray-300 text-sm">
                                Tarayıcınızı kapattıktan sonra da bilgisayarınızda veya mobil cihazınızda kalırlar.
                            </p>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 class="font-medium text-primary mb-2">Zorunlu Çerezler</h3>
                            <p class="text-gray-600 dark:text-gray-300 text-sm">
                                Sitemizin düzgün çalışması için gereklidir.
                            </p>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 class="font-medium text-primary mb-2">Analitik Çerezler</h3>
                            <p class="text-gray-600 dark:text-gray-300 text-sm">
                                Ziyaretçilerin site kullanımları hakkında bilgi toplar.
                            </p>
                        </div>
                    </div>
                </section>
                
                <section class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <span class="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Çerezleri Nasıl Kontrol Edebilirsiniz?
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Tarayıcınızın ayarlarını değiştirerek çerezleri kabul veya reddetme hakkına sahipsiniz. Çerezleri nasıl silmeyi veya engellemeyi öğrenmek için tarayıcınızın yardım kısmına bakabilirsiniz.
                    </p>
                </section>
                
                <section class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <span class="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Çerezleri Neden Kullanıyoruz?
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">
                        Çerezleri aşağıdaki amaçlar doğrultusunda kullanmaktayız:
                    </p>
                    <ul class="space-y-2">
                        <li class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            Web sitemizin daha verimli çalışmasını sağlamak
                        </li>
                        <li class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            Kullanıcı deneyimini iyileştirmek
                        </li>
                        <li class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            Tercihlerinizi hatırlamak
                        </li>
                        <li class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            Web sitemizin performansını analiz etmek
                        </li>
                    </ul>
                </section>
                
                <section class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <span class="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Değişiklikler
                    </h2>
                    <div class="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <p class="text-gray-700 dark:text-gray-300">
                            Bu çerez politikası periyodik olarak güncellenebilir. Politikadaki önemli değişiklikleri size bildireceğiz. Bu politika en son {{ new Date().toLocaleDateString('tr-TR') }} tarihinde güncellenmiştir.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup>
// No additional script needed
</script> 