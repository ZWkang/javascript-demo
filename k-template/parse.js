/**
 * support if else for while 
 */
const AST = {}
const ifRegExp = 
/**
 * <ul {{%  %}}
 * <li for(var i = 0;i<3;i++){ >
 * 
 * <{{% } %}}/li>
 * </ul>
 */

function initString(){

}

function load(){

}

function xssEscape(string) {
    return [
      ["&", "&amp;"],
      [" ", "&nbsp;"],
      ["<", "&lt;"],
      [">", "&gt;"],
      ["\r\n", "<br/>"],
      ["\n", "<br/>"],
      ["\"", "&quot;"],
    ].reduce(
      function(string, [pattern, replacement]) {
        return string.replace(new RegExp(pattern, "g"), replacement);
      }, string);
  }