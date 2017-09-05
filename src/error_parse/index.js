export default {
  parseErrors(errors) {
    if (errors == undefined) return;

    var re = ""
    errors = errors.errors

    if (!errors) return null

    for (var key in errors) {
      var keyErrors = errors[key]
      for (var keyError in keyErrors) {
        re += toTitleCase(key) + " " + keyErrors[keyError] + '; '
      }
    }

    return re.substring(0, re.length - 2);
  }
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
