<template>
  <button 
    @click="toggleLanguage"
    class="fixed top-6 right-6 z-50 px-4 py-2 rounded-lg bg-cosmic-purple/50 backdrop-blur-md border border-cosmic-accent/30 hover:border-cosmic-accent transition-all duration-300 flex items-center gap-2"
  >
    <span class="text-sm font-medium">{{ currentLocale === 'zh-CN' ? '中文' : 'EN' }}</span>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const toggleLanguage = () => {
  const newLocale = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}
</script>

