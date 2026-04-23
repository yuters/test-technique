<script setup lang="ts">
import type { Broker } from '#shared/types/broker'

const route = useRoute()
const teamId = computed(() => route.params.id as string)
const { deleteTeam, useTeam } = useTeamsApi()

const { data, error, refresh } = await useTeam(teamId)

const team = computed(() => data.value?.data ?? null)
const brokers = computed<Broker[]>(() => team.value?.brokers ?? [])
const handleDeleteTeam = () => deleteTeam(teamId.value)
const handleBrokerCreated = async () => {
  await refresh()
}

useHead(() => ({
  title: team.value ? `${team.value.name} | Teams` : 'Team details',
}))
</script>

<template>
  <main class="page">
    <NuxtLink
      to="/"
      class="back-link"
    >
      <span
        aria-hidden="true"
        class="back-link__arrow"
      >
        ←
      </span>
      <span>Retour aux équipes</span>
    </NuxtLink>

    <StateCard
      v-if="error"
      tone="error"
    >
      Une erreur est survenue.
    </StateCard>

    <section
      v-else-if="team"
      class="detail-card"
    >
      <header class="detail-card__header">
        <div>
          <p class="eyebrow">Profil de l'équipe</p>
          <h1>{{ team.name }}</h1>
        </div>

        <div class="summary-chip">
          {{ brokers.length }} courtiers
        </div>
      </header>

      <section class="brokers">
        <article
          v-for="broker in brokers"
          :key="broker.id"
          class="broker-card"
        >
          <h2>{{ broker.name }}</h2>
          <a :href="`mailto:${broker.email}`">{{ broker.email }}</a>
        </article>

        <StateCard v-if="!brokers.length">
          Aucun courtier n'est associé à cette équipe.
        </StateCard>

        <TeamCreateBrokerAction
          :team-id="teamId"
          @created="handleBrokerCreated"
        />
      </section>

      <footer class="detail-card__footer">
        <div class="detail-card__footer-copy">
          <p class="detail-card__footer-label">
            Zone sensible
          </p>
          <p class="detail-card__footer-text">
            Supprime définitivement l'équipe et retire l'accès à cette fiche.
          </p>
        </div>

        <ConfirmAction
          :action="handleDeleteTeam"
          confirm-label="Confirmer la suppression"
          description="Cette action est définitive. L'équipe et ses courtiers ne seront plus accessibles."
          error-message="La suppression de cette équipe a échoué. Veuillez réessayer."
          pending-label="Suppression..."
          success-label="Équipe supprimée. Redirection en cours..."
          success-redirect-to="/"
          title="Supprimer cette équipe ?"
          trigger-label="Supprimer l'équipe"
          trigger-variant="danger"
        />
      </footer>
    </section>
  </main>
</template>

<style scoped>
.page {
  width: min(1120px, calc(100vw - 2rem));
  margin: 0 auto;
  padding: 3rem 0 5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 1.5rem;
  color: var(--accent-strong);
  font-weight: 700;
  text-decoration: none;
}

.back-link:hover {
  color: var(--accent);
}

.back-link__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  line-height: 1;
  transform: translateY(-3px);
  transition: transform 180ms ease;
}

.back-link:hover .back-link__arrow {
  transform: translate(-4px, -3px);
}

.detail-card,
.broker-card {
  border: 1px solid var(--surface-border);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: var(--shadow);
  backdrop-filter: blur(20px);
}

.detail-card {
  padding: 1.5rem;
}

.detail-card__header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
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
  font-size: clamp(2.2rem, 4vw, 4rem);
  line-height: 1;
}

.summary-chip {
  align-self: start;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  background: rgba(29, 143, 86, 0.12);
  color: var(--accent-strong);
  font-weight: 700;
  white-space: nowrap;
}

.brokers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.detail-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--surface-border);
}

.detail-card__footer-copy {
  max-width: 32rem;
}

.detail-card__footer-label {
  margin: 0 0 0.35rem;
  color: #9f2929;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-card__footer-text {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.broker-card {
  padding: 1.25rem;
}

.broker-card h2 {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
}

.broker-card a {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-secondary);
  text-decoration: none;
}

.broker-card a:hover {
  color: var(--accent-strong);
}

@media (max-width: 640px) {
  .page {
    width: min(100vw - 1.25rem, 1120px);
    padding-top: 2rem;
  }

  .detail-card__header {
    flex-direction: column;
    align-items: start;
  }

  .detail-card__footer {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
