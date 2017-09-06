/*
 * api
 *  Contains methods for communicating with the whodecidesfood api backend.
 *  Methods will return promises.
 */

import store from '../vuex/store'
import Comparisons from './comparisons'
import Participants from './participants'
import Decisions from './decisions'
import Shared from './shared'

export default {
  comparisons: Comparisons,
  participants: Participants,
  decisions: Decisions,
  shared: Shared
}
