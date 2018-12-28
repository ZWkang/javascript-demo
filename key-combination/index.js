/**
 * @description 快捷使用组合键
 * @author ZWkang
 * @Date 12/28/2018
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory;
	} else {
		root.keyCombination = factory(root);
	}
})(this, function (root) {
  'use strict';
  /**
   * see in https://github.com/wesbos/keycodes
   */
  var keyCodes = {
    0: 'That key has no keycode',
    3: 'break',
    8: 'backspace / delete',
    9: 'tab',
    12: 'clear',
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    19: 'pause/break',
    20: 'caps lock',
    21: 'hangul',
    25: 'hanja',
    27: 'escape',
    28: 'conversion',
    29: 'non-conversion',
    32: 'spacebar',
    33: 'page up',
    34: 'page down',
    35: 'end',
    36: 'home',
    37: 'left arrow',
    38: 'up arrow',
    39: 'right arrow',
    40: 'down arrow',
    41: 'select',
    42: 'print',
    43: 'execute',
    44: 'Print Screen',
    45: 'insert',
    46: 'delete',
    47: 'help',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    58: ':',
    59: 'semicolon (firefox), equals',
    60: '<',
    61: 'equals (firefox)',
    63: 'ß',
    64: '@ (firefox)',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    91: 'Windows Key / Left ⌘ / Chromebook Search key',
    92: 'right window key',
    93: 'Windows Menu / Right ⌘',
    95: 'sleep',
    96: 'numpad 0',
    97: 'numpad 1',
    98: 'numpad 2',
    99: 'numpad 3',
    100: 'numpad 4',
    101: 'numpad 5',
    102: 'numpad 6',
    103: 'numpad 7',
    104: 'numpad 8',
    105: 'numpad 9',
    106: 'multiply',
    107: 'add',
    108: 'numpad period (firefox)',
    109: 'subtract',
    110: 'decimal point',
    111: 'divide',
    112: 'f1',
    113: 'f2',
    114: 'f3',
    115: 'f4',
    116: 'f5',
    117: 'f6',
    118: 'f7',
    119: 'f8',
    120: 'f9',
    121: 'f10',
    122: 'f11',
    123: 'f12',
    124: 'f13',
    125: 'f14',
    126: 'f15',
    127: 'f16',
    128: 'f17',
    129: 'f18',
    130: 'f19',
    131: 'f20',
    132: 'f21',
    133: 'f22',
    134: 'f23',
    135: 'f24',
    144: 'num lock',
    145: 'scroll lock',
    160: '^',
    161: '!',
    162: '؛ (arabic semicolon)',
    163: '#',
    164: '$',
    165: 'ù',
    166: 'page backward',
    167: 'page forward',
    168: 'refresh',
    169: 'closing paren (AZERTY)',
    170: '*',
    171: '~ + * key',
    172: 'home key',
    173: 'minus (firefox), mute/unmute',
    174: 'decrease volume level',
    175: 'increase volume level',
    176: 'next',
    177: 'previous',
    178: 'stop',
    179: 'play/pause',
    180: 'e-mail',
    181: 'mute/unmute (firefox)',
    182: 'decrease volume level (firefox)',
    183: 'increase volume level (firefox)',
    186: 'semi-colon / ñ',
    187: 'equal sign',
    188: 'comma',
    189: 'dash',
    190: 'period',
    191: 'forward slash / ç',
    192: 'grave accent / ñ / æ / ö',
    193: '?, / or °',
    194: 'numpad period (chrome)',
    219: 'open bracket',
    220: 'back slash',
    221: 'close bracket / å',
    222: 'single quote / ø / ä',
    223: '`',
    224: 'left or right ⌘ key (firefox)',
    225: 'altgr',
    226: '< /git >, left back slash',
    230: 'GNOME Compose Key',
    231: 'ç',
    233: 'XF86Forward',
    234: 'XF86Back',
    235: 'non-conversion',
    240: 'alphanumeric',
    242: 'hiragana/katakana',
    243: 'half-width/full-width',
    244: 'kanji',
    251: "unlock trackpad (Chrome/Edge)",
    255: 'toggle touchpad',
  };
  var keyCodesChangeKV = Object.entries(keyCodes).reduce((prev, next) => ({
    ...prev,
    [next[1]]: next[0]
  }), {})


	if (root.keyCombination) {
		root.preKeyCombination = root.keyCombination;
	}
	// 存储全局变量减少引用查找
  var win = root;
  
  // 组合键检测。当keydown命中事件集后，我们再对子集做判断执行

  // 数据结构
  /**
   * 两个组合键
   * {
   *  '13,75': []
   * }
   */
  var noop = function () {}

  /**
   * @description 构造函数
   * @param {Object} options 
   * @default {isElement: false, bindElement: {removeEventListener: noop}, element: null, _tempMap: []}
   */
  function keyCombination(options){
    var isElement,
        element,
        _tempMap,
        bindElement

    if (!(this instanceof keyCombination)) {
      return new keyCombination(arguments)
    }

    var eventMap = {}


    // 初始化函数
    function init (options) {
      options = options || {}
      isElement = options.element && options.element
      element = options.element || null
      _tempMap = []
      bindElement = !isElement ? window : 
                                  (element instanceof HTMLElement) ? element :
                                                                  {removeEventListener: noop}
    }
    // 初始化参数
    init(options)



    // 移除判断
    var removeEventAction = function removeEventAction (e) {
      _tempMap = []
    }.bind(this)

    // 绑定动作函数
    var bindEventAction = function bindEventAction (e) {
      console.log(e)
      const tempMapLength = _tempMap.length 
      if (tempMapLength >= 0 && _tempMap[tempMapLength - 1] !== e.keyCode) {
        _tempMap.push(e.keyCode)
      } 
      const eventList =  eventMap[_tempMap.toString()]
      eventList && eventList.forEach(v => {
        v && v()
      })
    }.bind(this)

    // 绑定存储事件回调
    /**
     * @param {String} keyCode 绑定组合键
     * @param {function} callback 回调函数
     */
    var bindEvent = function binEvent(keyCode, callback) {
      const keyCodeList = keyCode.split(' ')
      const [first, second] = keyCodeList.map(v => keyCodesChangeKV[v])
      const eventKeys = [first, second].toString()
      eventMap[eventKeys] = eventMap[eventKeys] || []
      eventMap[eventKeys].push(callback)
    }.bind(this)
    
    // 移除绑定存储事件回调
    function removeListeners(keyCode, callback) {
      const keyCode = keyCode.split(' ')
      const [first, second] = keyCode.map(v => keyCodesChangeKV[v])
      const eventKeys = [first, second].toString()
      eventMap[eventKeys] && (eventMap = eventMap[eventKeys].filter(v => v === callback))
    }
    // 判断绑定对象
    
    // 解绑事件
    function detach (element) {
        bindElement.removeEventListener('keydown', bindEventAction, false)
        bindElement.removeEventListener('keyUp', removeEventAction, false)
    }

    // 重新绑定事件
    function subscribeAction () {
      bindElement.addEventListener('keydown', bindEventAction, false)
      bindElement.addEventListener('keyup', removeEventAction, false)
    }
    
    subscribeAction()

    return {
      bindEvent: bindEvent,
      removeListeners: removeListeners,
      detach: detach,
      subscribeAction: subscribeAction,
      init: init,
      eventMap: eventMap
    }
  }
	//导出接口
	return keyCombination;
});
