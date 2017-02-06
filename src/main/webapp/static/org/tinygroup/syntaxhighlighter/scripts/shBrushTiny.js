/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 *
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	/**
	 * 关键字及指令字符串转成正则表达式字符串
	 * @param {String} str	  空格隔开的关键字及指令
	 * @return {String}       返回正则表达式字符串
	 */
	function getTinyKeywords(str)
	{
		str = str
			.replace(/^\s+|\s+$/g, '')
			.replace(/\s+/g, '|');

		return '#\\b(?:' + str + ')\\b'; // 匹配 # + 指令及关键字
	}

	function Brush()
	{
		// tiny template 指令及关键字
		var tinyDirectives = 'if elseif for include break continue macro import '
			+ 'set stop return else end b eol t bodyContent pageContent call';

		this.regexList = [
			{ regex: /##.*/g,											css: 'comments' },		// one line comments ##
			{ regex: /#--([^\*][\s\S]*)?--#/gm,							css: 'comments' },	 	// multiline comments #-- --#
			{ regex: /#\*([^\*][\s\S]*)?\*#/gm,							css: 'comments' },	 	// multiline comments #* *#
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },		// strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },		// strings
			{ regex: /\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,				css: 'value' },			// numbers
			{ regex: /\$\{.*\}/g,										css: 'color2' },		// value ${user.name}
			{ regex: /\$\!\{.*\}/g,										css: 'color2' },		// value $!{user.name}
			{ regex: /#\@.*\(\)/g, 										css: 'keyword' },		// 宏的调用
			{ regex: new RegExp(getTinyKeywords(tinyDirectives), 'g'),  css: 'keyword' },		// 指令 及 关键字
			{ regex: /#\{\w.*\}/g,										css: 'keyword' },		// 指令 #{eol}
			{ regex: /#\!set/g, 										css: 'keyword' }		// 指令 #!set
			];

		this.forHtmlScript({
			left	: /(&lt;|<)%[@!=]?/g,
			right	: /%(&gt;|>)/g
		});
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['tiny'];

	SyntaxHighlighter.brushes.tiny = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
