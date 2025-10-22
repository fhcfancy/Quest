<template>
  <div class="min-h-screen bg-cosmic-dark">
    <Navigation />
    <LanguageSwitch />
    
    <div class="container mx-auto px-6 pt-32 pb-16 max-w-4xl">
      <div v-if="loading" class="text-center py-12">
        <p class="text-lg opacity-70">{{ $t('common.loading') }}</p>
      </div>
      
      <div v-else-if="question" class="space-y-8">
        <!-- Question Card -->
        <div class="card">
          <div class="flex items-start justify-between mb-4">
            <span class="text-sm px-3 py-1 rounded-full bg-cosmic-accent/20 border border-cosmic-accent/40">
              {{ question.category }}
            </span>
            <span class="text-xs opacity-50">
              {{ formatDate(question.created_at) }}
            </span>
          </div>
          
          <h1 class="text-3xl font-light mb-4">
            {{ question.title || question.content.substring(0, 100) }}
          </h1>
          
          <p class="text-lg opacity-90 mb-6 whitespace-pre-wrap">
            {{ question.content }}
          </p>
          
          <!-- Media Display -->
          <div v-if="question.media_url" class="mt-6">
            <img 
              v-if="question.type === 'image'"
              :src="question.media_url"
              alt="Question image"
              class="max-w-full rounded-lg border border-cosmic-accent/20"
            />
            <video 
              v-else-if="question.type === 'video'"
              :src="question.media_url"
              controls
              class="max-w-full rounded-lg border border-cosmic-accent/20"
            ></video>
          </div>
        </div>
        
        <!-- Answers Section -->
        <div class="card">
          <h2 class="text-2xl font-light mb-6">
            {{ $t('detail.answers') }} ({{ answers.length }})
          </h2>
          
          <!-- Answer List -->
          <div v-if="answers.length > 0" class="space-y-4 mb-8">
            <div
              v-for="answer in answers"
              :key="answer.id"
              class="p-4 rounded-lg bg-cosmic-purple/20 border border-cosmic-accent/10"
            >
              <p class="mb-2 whitespace-pre-wrap">{{ answer.content }}</p>
              <p class="text-xs opacity-50">
                {{ $t('detail.postedOn') }} {{ formatDate(answer.created_at) }}
              </p>
            </div>
          </div>
          
          <div v-else class="text-center py-8 opacity-50">
            {{ $t('detail.noAnswers') }}
          </div>
          
          <!-- Add Answer Form -->
          <div class="pt-6 border-t border-cosmic-accent/20">
            <h3 class="text-xl font-light mb-4">{{ $t('detail.addAnswer') }}</h3>
            <form @submit.prevent="submitAnswer" class="space-y-4">
              <textarea
                v-model="answerContent"
                rows="4"
                :placeholder="$t('detail.answerPlaceholder')"
                class="w-full px-4 py-3 rounded-lg bg-cosmic-purple/30 border border-cosmic-accent/30 focus:border-cosmic-accent outline-none transition-all duration-300 resize-none"
                required
              ></textarea>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="submitting"
                  class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ submitting ? $t('common.loading') : $t('detail.submit') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12">
        <p class="text-lg opacity-70">{{ $t('common.error') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from '../components/Navigation.vue'
import LanguageSwitch from '../components/LanguageSwitch.vue'
import { questionsAPI } from '../api'

const route = useRoute()

const question = ref(null)
const answers = ref([])
const answerContent = ref('')
const loading = ref(true)
const submitting = ref(false)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

const loadQuestion = async () => {
  try {
    const response = await questionsAPI.getById(route.params.id)
    question.value = response.data.question
    answers.value = response.data.answers || []
  } catch (error) {
    console.error('Failed to load question:', error)
  } finally {
    loading.value = false
  }
}

const submitAnswer = async () => {
  if (!answerContent.value.trim()) return
  
  submitting.value = true
  try {
    await questionsAPI.addAnswer(route.params.id, answerContent.value)
    
    // Reload answers
    await loadQuestion()
    answerContent.value = ''
  } catch (error) {
    console.error('Failed to submit answer:', error)
    alert('Failed to submit answer')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadQuestion()
})
</script>

