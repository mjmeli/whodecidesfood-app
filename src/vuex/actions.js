import auth from '../auth'

const actions = {
  addComparison: ({ commit }, comparison) => {
    return new Promise((resolve, reject) => {
      commit('addComparison', comparison)
      resolve(true)
    })
  },
  deleteComparison: ({ commit }, comparisonId) => {
    commit('deleteComparison', comparisonId)
  },
  clearComparisons: ({ commit }) => {
    commit('clearComparisons')
  },
  getComparisons: ({ commit }, context) => {
    // Get comparisons for this user
    return new Promise((resolve, reject) => {
      context.$http
        .get('http://localhost:3000/api/comparisons', {
          headers: auth.getAuthHeader()
        }).then(response => {
          response.body.forEach((data) => commit('addComparison', data))
          resolve(response)
        }, error => {
          reject(error)
        })
    })
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
}

export default actions
