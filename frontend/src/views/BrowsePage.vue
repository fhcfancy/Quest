<template>
  <div class="min-h-screen bg-cosmic-dark">
    <Navigation />
    <LanguageSwitch />
    
    <div class="container mx-auto px-6 pt-32 pb-16">
      <h1 class="text-4xl font-light mb-12 text-center">{{ $t('browse.title') }}</h1>
      
      <!-- Filters Section -->
      <div class="mb-12 space-y-6">
        <!-- Category Filters -->
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="px-6 py-2 rounded-lg border transition-all duration-300"
            :class="selectedCategory === category 
              ? 'bg-cosmic-accent border-cosmic-accent' 
              : 'bg-cosmic-purple/30 border-cosmic-accent/30 hover:border-cosmic-accent'"
          >
            {{ $t(`browse.filters.${category}`) }}
          </button>
        </div>
        
        <!-- Type Filters -->
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="type in types"
            :key="type"
            @click="selectedType = type"
            class="px-4 py-2 rounded-lg border text-sm transition-all duration-300"
            :class="selectedType === type 
              ? 'bg-cosmic-glow/30 border-cosmic-glow' 
              : 'bg-cosmic-purple/20 border-cosmic-accent/20 hover:border-cosmic-accent/50'"
          >
            {{ $t(`browse.types.${type}`) }}
          </button>
        </div>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('browse.search')"
            class="w-full px-6 py-3 rounded-lg bg-cosmic-purple/30 border border-cosmic-accent/30 focus:border-cosmic-accent outline-none transition-all duration-300"
          />
        </div>
      </div>
      
      <!-- Questions Grid -->
      <div v-if="loading" class="text-center py-12">
        <p class="text-lg opacity-70">{{ $t('common.loading') }}</p>
      </div>
      
      <div v-else-if="filteredQuestions.length === 0" class="text-center py-12">
        <p class="text-lg opacity-70">{{ $t('browse.noResults') }}</p>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="question in filteredQuestions"
          :key="question.id"
          @click="goToQuestion(question.id)"
          class="card cursor-pointer hover:scale-105 transform transition-all duration-300"
        >
          <div class="flex items-start justify-between mb-3">
            <span class="text-xs px-3 py-1 rounded-full bg-cosmic-accent/20 border border-cosmic-accent/40">
              {{ question.category }}
            </span>
            <span class="text-xs opacity-50">
              {{ question.type === 'text' ? '📝' : question.type === 'image' ? '🖼️' : '🎥' }}
            </span>
          </div>
          
          <h3 class="text-lg font-medium mb-2">{{ question.title || question.content.substring(0, 50) + '...' }}</h3>
          
          <p class="text-sm opacity-70 mb-4 line-clamp-3">
            {{ question.content }}
          </p>
          
          <div class="flex items-center justify-between text-xs opacity-50">
            <span>{{ formatDate(question.created_at) }}</span>
            <span>{{ question.answers_count || 0 }} {{ $t('detail.answers') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navigation from '../components/Navigation.vue'
import LanguageSwitch from '../components/LanguageSwitch.vue'
import { questionsAPI } from '../api'

const router = useRouter()

const categories = ['all', 'philosophy', 'science', 'life', 'existence', 'custom']
const types = ['all', 'text', 'image', 'video']

const selectedCategory = ref('all')
const selectedType = ref('all')
const searchQuery = ref('')
const questions = ref([])
const loading = ref(true)

const filteredQuestions = computed(() => {
  return questions.value.filter(q => {
    const categoryMatch = selectedCategory.value === 'all' || q.category === selectedCategory.value
    const typeMatch = selectedType.value === 'all' || q.type === selectedType.value
    const searchMatch = !searchQuery.value || 
      q.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return categoryMatch && typeMatch && searchMatch
  })
})

const goToQuestion = (id) => {
  router.push(`/question/${id}`)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

onMounted(async () => {
  try {
    const response = await questionsAPI.getAll()
    questions.value = response.data
  } catch (error) {
    console.error('Failed to fetch questions:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

