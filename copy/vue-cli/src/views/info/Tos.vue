<template>
    <div class="container mx-auto px-4 py-12 max-w-4xl">
        <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div class="bg-primary/10 p-6 border-b border-primary/20">
                <h1 class="text-3xl font-bold text-primary">Kullanım Şartları</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Son güncelleme: {{ new Date().toLocaleDateString('tr-TR') }}</p>
            </div>
            
            <div class="p-6 space-y-8">
                <section class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <span class="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Fikri Mülkiyet, Kullanım ve Telif Hakları
                    </h2>
                    <div class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        <p class="mb-4">
                            Kullanacağınız bu web arayüz ve araişlerliği tüm telif ve kullanım hakları 5846 kanun numaralı FSEK/m.1/B- g,h,ı bendlerinde tanımlanan unsurlara haiz ve dolayısıyla "sitename.com"a aittir. İlgili domainin kod yapısı, sayfa tasarımı ve yer alan her türlü içerik unsuru aynı yasa çerçevesinde korunmaktadır. Hiçbir suretle bu içerikler kopyalanamaz, çoğaltılamaz, dağıtılamaz.
                        </p>
                    </div>
                </section>
                
                <section class="space-y-4">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                        <span class="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Gizlilik Politikası
                    </h2>
                    <div class="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p>
                                Kişisel bilgileriniz mahremiyete olan saygımız doğrultusunda yasal mecraların talebi haricinde hiçbir suretle paylaşılmaz ve kullanılmaz.
                            </p>
                        </div>
                        
                        <div class="border-l-4 border-primary pl-4 py-2">
                            <p>
                                Arayüz ile oluşturulan içeriklerden kullanıcı sorumludur. Bu sayede oluşturulan ve araişlerlik sayesinde kullanıcıya aktarılan her nevi pdf dokümanın kullanımı, saklanması, çoğaltılması vs. her türlü iş ve işlemelerin sorumluluğunu kullanıcıya aittir. Bu noktada kullanıcıların oluşturacağı içeriklerin telif ve kullanım hakları ihlali konusunda "sitename.com" sorumluluk kabul etmediğini ve sorumlu tutulamayacağını beyan eder.
                            </p>
                        </div>
                        
                        <div class="flex items-center gap-3 p-3 bg-base-200 dark:bg-gray-700 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>
                                Arayüz kullanıcılarının ürettiği dokümanları depolamaz. Üretilen içeriğin saklanması, depolanması, güvenliği vs. kullanıcıya aittir.
                            </p>
                        </div>
                        
                        <div class="flex items-start gap-3">
                            <div class="mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <p>
                                Arayüz de diğer bağlantılı web unsurlarının bağlantı veya reklamları bulunabilir. Bunlar kişisel verilerinizi mahremiyetine aykırılık teşkil etmez. Bu araçların kullanımı "sitename.com" takdirindedir.
                            </p>
                        </div>
                        
                        <div class="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-6">
                            <div class="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p>
                                    Arayüzüdeki güncellemeler ve geliştirmeler yapılırken veya arayüz bakımda iken kullanıcıya arayüz de bilgilendirme yapılacaktır. Bunun harici arayüzün kullanılamamasından, elde olmayan sebep veya mücbir nedenlerden kaynaklanan veyahut kullanıcı hatasından hasıl, teknik ve diğer aksaklıklardan "sitename.com" sorumlu tutulamaz.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup>
// No additional script needed
</script>

