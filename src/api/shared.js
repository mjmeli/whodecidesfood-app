/*
 * api.shared
 *  Shared constants and methods for accessing the whodecidesfood api
 */

import auth from '../auth'

// Global constants
const API_URL = process.env.NODE_ENV === 'production' ? 'https://www.whodecidesfood.com/api/' : 'http://localhost:3000/api/'

export default {
  API_URL,
  getAuthHeader() {
    return { headers: auth.getAuthHeader() }
  }
}
