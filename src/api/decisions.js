/*
 * api.decisions
 *  Communication with API for decisions
 */
import shared from './shared'

const ENDPOINT = shared.API_URL + 'comparisons/:id/decisions/'

function getEndPointURL(comparisonId) {
  return ENDPOINT.replace(":id", comparisonId)
}

export default {
  // Create a decision
  // Returns a promise; success with the created object, error with error
  create(context, comparisonId, participant_id, meal, location) {
    var params = {
      decision: {
        'meal': meal.trim(),
        'location': location.trim(),
        'participant_id': participant_id
      }
    }
    return new Promise((resolve, reject) => {
      context.$http
        .post(getEndPointURL(comparisonId), params, shared.getAuthHeader()).then(response => {
          resolve(response.body)
        }, error => {
          reject(error)
        })
    })
  }
}
