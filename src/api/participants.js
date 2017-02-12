/*
 * api.participants
 *  Communication with API for participants
 */
import shared from './shared'

const ENDPOINT = shared.API_URL + 'comparisons/:id/participants/'

function getEndPointURL(comparisonId) {
  return ENDPOINT.replace(":id", comparisonId)
}

export default {
  // Get all participants for a comparison
  // Returns a promise; success with a participant array, error with error
  index(context, comparisonId) {
    return new Promise((resolve, reject) => {
      context.$http
        .get(getEndPointURL(comparisonId), shared.getAuthHeader()).then(response => {
          resolve(response.body)
        }, error => {
          reject(error)
        })
    })
  },
  // Get a specific participant
  // Returns a promise; success with the participant object, error with error
  get(context, comparisonId, id) {
    return new Promise((resolve, reject) => {
      context.$http
        .get(getEndPointURL(comparisonId) + id, shared.getAuthHeader()).then(response => {
          resolve(response.body)
        }, error => {
          reject(error)
        })
    })
  },
  // Create a participant
  // Returns a promise; success with the created object, error with error
  create(context, comparisonId, name) {
    var params = {
      participant: {
        'name': name.trim()
      }
    }
    return new Promise((resolve, reject) => {
      context.$http
        .post(getEndPointURL(comparisonId), params, shared.getAuthHeader()).then(response => {
          resolve(response.body)
        }, error => {
          console.log(error)
          reject(error)
        })
    })
  },
  // Delete a participant by ID
  // Returns a promise; success with raw response, error with error
  delete(context, comparisonId, id) {
    return new Promise((resolve, reject) => {
      context.$http
        .delete(getEndPointURL(comparisonId) + id, shared.getAuthHeader()).then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  }
}
