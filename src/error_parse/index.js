export default {
  parseErrors(errors) {
    var re = ""
    errors = errors.errors

    if (!errors) return null

    for (var key in errors) {
      var keyErrors = errors[key]
      for (var keyError in keyErrors) {
        re += key + ': ' + keyErrors[keyError] + '\n'
      }
    }

    return re
  }
}
