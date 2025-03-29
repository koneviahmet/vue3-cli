import { useHead } from 'unhead'
import { createHead } from 'unhead/client'
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

// Global unhead instance
const unhead = typeof window !== 'undefined' ? createHead() : null

export function useSeo(initialSeo) {
  const route = useRoute()
  
  // SEO verilerini hazırla
  const seoData = reactive({
    title: initialSeo?.title || 'sitename',
    description: initialSeo?.description || 'Akıllı tahta da interaktif ders içerikleri',
    url: initialSeo?.url || 'https://www.sitename.com',
    image: initialSeo?.image || 'https://placehold.co/1200x800?text=sitename.com',
  })


  // Router durumuna göre SEO ayarlarını yap
  const updateSeoFromRoute = () => {
    
    // Ana sayfa için varsayılan değerleri kullan
    if (route.path === '/') {
      return
    }
    
    //burada route yapısına göre seo ayarları yapılabilir

 
  }
  
  // Route değişimlerini izle
  watch(() => route.path, () => {
    updateSeoFromRoute()
  }, { immediate: true })

  // Direct usage of useHead function with the head metadata
  const headData = computed(() => ({
    title: seoData.title,
    meta: [
      { name: 'title', content: seoData.title },
      { name: 'description', content: seoData.description },
      { property: 'og:title', content: seoData.title },
      { property: 'og:description', content: seoData.description },
      { property: 'og:image', content: seoData.image },
      { property: 'og:url', content: seoData.url },
      { name: 'twitter:title', content: seoData.title },
      { name: 'twitter:description', content: seoData.description },
      { name: 'twitter:image', content: seoData.image },
      { rel: 'canonical', href: seoData.url }
    ],
    htmlAttrs: {
      lang: 'tr'
    }
  }))
  
  // Pass both the unhead instance and headData to useHead
  useHead(unhead, headData.value)

  return seoData // SEO bilgilerini dışarıya aktarıyoruz (değiştirmek için)
}
