/*
 * api.comparisons
 *  Communication with API for comparisons
 */
import shared from './shared'

const ENDPOINT = shared.API_URL + 'comparisons/'

export default {
  // Get all comparisons for this user
  // Returns a promise, success with a comparison array, error with error
  index(context) {
    return new Promise((resolve, reject) => {
      context.$http
        .get(ENDPOINT, shared.getAuthHeader()).then(response => {
          resolve(response.body)
        }, error => {
          reject(error)
        })
    })
  },
  // Get a specific comparison
  // Returns a promise, success with the comparison object, error with error
  get(context, id) {
    return new Promise((resolve, reject) => {
      context.$http
        .get(ENDPOINT + id, shared.getAuthHeader()).then(response => {
          resolve(response.body)
        }, error => {
          reject(error)
        })
    })
  },
  // Create a comparison
  // Returns a promise; success with the created object, error with error
  create(context, title) {
    var params = {
      comparison: {
        'title': title.trim()
      }
    }
    return new Promise((resolve, reject) => {
      context.$http
        .post(ENDPOINT, params, shared.getAuthHeader()).then(response => {
          resolve(response.body)
        }, error => {
          reject(error)
        })
    })
  },
  // Delete a comparison by ID
  // Returns a promise; success with raw response, error with error
  delete(context, id) {
    return new Promise((resolve, reject) => {
      context.$http
        .delete(ENDPOINT + id, shared.getAuthHeader()).then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  }
}
