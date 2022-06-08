ace.define(
  'ace/theme/grammar',
  ['require', 'exports', 'module', 'ace/lib/dom'],
  function (require, exports, module) {
    exports.isDark = true
    exports.cssClass = 'ace-grammar'
    exports.cssText = ''
    exports.$selectionColorConflict = true
    var dom = require('../lib/dom')
    dom.importCssString(exports.cssText, exports.cssClass, false)
  }
)
;(function () {
  ace.require(['ace/theme/dracula'], function (m) {
    if (typeof module == 'object' && typeof exports == 'object' && module) {
      module.exports = m
    }
  })
})()
