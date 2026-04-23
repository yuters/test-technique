<script setup lang="ts">
definePageMeta({
  path: '/',
})

useHead({
  title: 'Test technique - Frontend - Équipes',
})

const { useTeamsIndex } = useTeamsApi()
const { data, error } = await useTeamsIndex()

const teams = computed(() => data.value?.data ?? [])
</script>

<template>
  <main class="page">
    <section class="hero">
      <h1>Équipes</h1>
    </section>

    <StateCard
      v-if="error"
      tone="error"
    >
      Une erreur est survenue.
    </StateCard>

    <section
      v-else
      class="grid"
    >
      <NuxtLink
        v-for="team in teams"
        :key="team.id"
        :to="`/teams/${team.id}`"
        class="team-card"
      >
        <div class="team-card__header">
          <h2>{{ team.name }}</h2>
          <span class="team-card__count">{{ team.brokers.length }} courtiers</span>
        </div>

        <ul class="team-card__preview">
          <li
            v-for="broker in team.brokers.slice(0, 3)"
            :key="broker.id"
          >
            <span>{{ broker.name }}</span>
            <small>{{ broker.email }}</small>
          </li>
        </ul>

        <span
          v-if="team.brokers.length > 3"
          class="team-card__more"
        >
          +{{ team.brokers.length - 3 }} plus
        </span>
      </NuxtLink>

      <StateCard
        v-if="!teams.length"
      >
        Aucune équipe n'est disponible pour le moment.
      </StateCard>
    </section>
  </main>
</template>

<style scoped>
.page {
  width: min(1120px, calc(100vw - 2rem));
  margin: 0 auto;
  padding: 4rem 0 5rem;
}

.hero {
  max-width: 42rem;
  margin-bottom: 2.5rem;
}

.eyebrow {
  margin: 0 0 0.75rem;
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(2.4rem, 4vw, 4.5rem);
  line-height: 0.95;
}

.lede {
  margin: 1rem 0 0;
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.7;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.team-card {
  border: 1px solid var(--surface-border);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: var(--shadow);
  backdrop-filter: blur(20px);
}

.team-card {
  display: block;
  padding: 1.4rem;
  text-decoration: none;
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.team-card:hover {
  transform: translateY(-4px);
  border-color: rgba(29, 143, 86, 0.25);
  box-shadow: 0 30px 70px rgba(16, 97, 58, 0.12);
}

.team-card__header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.team-card__header h2 {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.3;
}

.team-card__count {
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(29, 143, 86, 0.1);
  color: var(--accent-strong);
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}

.team-card__preview {
  display: grid;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.team-card__preview li {
  display: grid;
  gap: 0.15rem;
}

.team-card__preview small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-secondary);
}

.team-card__more {
  display: inline-block;
  margin-top: 1rem;
  color: var(--accent-strong);
  font-size: 0.9rem;
  font-weight: 700;
}

@media (max-width: 640px) {
  .page {
    width: min(100vw - 1.25rem, 1120px);
    padding-top: 2.5rem;
  }

  .team-card__header {
    flex-direction: column;
  }
}
</style>
