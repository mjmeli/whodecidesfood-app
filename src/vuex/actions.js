import auth from '../auth'

const actions = {
  addComparison: ({ commit }, comparison) => {
    commit('addComparison', comparison)
  },
  deleteComparison: ({ commit }, comparisonId) => {
    commit('deleteComparison', comparisonId)
  },
  clearComparisons: ({ commit }) => {
    commit('clearComparisons')
  },
  updateComparison: ({ commit }, comparison) => {
    commit('updateComparison', comparison)
  },
  setCurrentComparison: ({ commit }, comparisonId) => {
    commit('setCurrentComparison', comparisonId)
  },
  addParticipantToComparison: ({ commit }, data) => {
    commit('addParticipantToComparison', data)
  },
  deleteParticipantFromComparison: ({ commit }, data) => {
    commit('deleteParticipantFromComparison', data)
  },
  updateParticipantNameInComparison: ({ commit }, data) => {
    commit('updateParticipantNameInComparison', data)
  }
}

export default actions
