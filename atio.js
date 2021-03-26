/*
    在找到第一个非空字符之前，需要移除掉字符串中的空格字符。如果第一个非空字符是正号或负号，选取该符号，并将其与后面尽可能多的连续的数字组合起来，这部分字符即为整数的值。如果第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
    字符串可以在形成整数的字符后面包括多余的字符，这些字符可以被忽略，它们对于函数没有影响。
    当字符串中的第一个非空字符序列不是个有效的整数；或字符串为空；或字符串仅包含空白字符时，则不进行转换。
    若函数不能执行有效的转换，返回 0。
*/

var myAtoi = function(str) {
	var arr = str.replace(/(^\s*)|(\s*$)/g, '').split('');
	var result = '',
		flag = '';
	for (var i = 0; i < arr.length; i++) {
		if (arr[0] === '-' && flag === '') {
			flag = '-';
			arr.splice(0, 1);
		}
		if (arr[0] === '+' && flag === '') {
			falg = ' ';
			arr.splice(0, 1);
		}
		if (isNaN(arr[i]) || arr[i] === ' ' && (arr[0] !== '-' || arr[0] !== '+')) {
			break;
		}
		result += arr[i];
	}
	result = flag + result;
	if (result < -2147483648) {
		return -2147483648;
	}
	if (result > 2147483648) {
		return 2147483648;
	}
	if (result === '') {
		return 0;
	}
	return isNaN(~~result) ? 0 : result - 0;
};

//      给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
//      给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
var letterCombinations = function(digits) {
	if (!digits) return [];
	var n_s_map = {
		2: ['a', 'b', 'c'],
		3: ['d', 'e', 'f'],
		4: ['g', 'h', 'i'],
		5: ['j', 'k', 'l'],
		6: ['m', 'n', 'o'],
		7: ['p', 'q', 'r', 's'],
		8: ['t', 'u', 'v'],
		9: ['w', 'x', 'y', 'z']
	};
	var arr = digits.split('');
	if (arr.length < 1) return
	if (arr.length === 1) return n_s_map[arr[0]] || digits;
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		result.push(n_s_map[arr[i]]);
	}
	return result.reduce(reduceArr);

	function reduceArr(arr1, arr2) {
		var arr = [];
		for (var j = 0; j < arr1.length; j++) {
			for (var k = 0; k < arr2.length; k++) {
				arr.push(arr1[j] + arr2[k]);
			}
		}
		return arr;
	}
};


//  给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
//  此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
	if (nums.length < 2) return
	for (var i = 0; i < nums.length; i++) {
		for (var j = 0; j < nums.length; j++) {
			if (nums[i] < nums[j]) {
				var result = nums[i];
				nums[i] = nums[j];
				nums[j] = result;
			}
		}
	}
};


//  编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
//  每行中的整数从左到右按升序排列。
//  每行的第一个整数大于前一行的最后一个整数。

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
	for (var i = 0; i < matrix.length; i++) {
		var arr = matrix[i];
		if (arr[0] > target || arr[arr.length - 1] < target) {
			continue;
		} else {
			for (var j = 0; j < arr.length; j++) {
				if (arr[j] === target) {
					return true;
				}
			}
		}
	}
	return false;
};

//  给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
	var point = [];
	for (var i = 0; i < matrix.length; i++) {
		var arr = matrix[i];
		for (var j = 0; j < arr.length; j++) {
			if (arr[j] === 0) {
				point.push([i, j]);
			}
		}
	}
	for (var m = 0; m < point.length; m++) {
		var num = point[m][0];
		for (var n = 0; n < matrix[num].length; n++) {
			matrix[num][n] = 0;
		}
		for (var a = 0; a < matrix.length; a++) {
			var arr = matrix[a];
			for (var b = 0; b < arr.length; b++) {
				arr[point[m][1]] = 0;
			}
		}
	}
};



//  执行时间检测
// console.time('time');
// setTimeout(()=>{
//  console.timeEnd('time');
// },1200)

//  宽度优先搜索   BFS

const map = {
	'武汉': {
		'广州': {},
		'西藏': {},
		'上海': {}
	},
	'上海': {
		'武汉': {},
		'广州': {}
	}
};

function breadthSearch(obj, target, arr = ['北京']) {
	for (var key in obj) {
		if (arr.indexOf(key) < 0) {
			arr.push(key);
			if (key === target) {
				return arr;
			} else {
				return breadthSearch(obj[key], target, arr);
			}
		}
	}
}

// console.log(breadthSearch(map,'广州',['北京']));


//  给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
var singleNumber = function(nums) {
	var hash = {};
	for (var i = 0; i < nums.length; i++) {
		var key = nums[i];
		if (!hash[key]) {
			hash[key] = 1;
		} else {
			hash[key]++;
		}
	}
	for (var key in hash) {
		if (hash[key] === 1) {
			return Number(key);
		}
	}
};



//  给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
	for (var i = 0; i < nums.length; i++) {
		if (nums.indexOf(nums[i], nums.indexOf(nums[i]) + 1) === -1) {
			return nums[i];
		}
	}
};


//  给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词
//  说明：
//  拆分时可以重复使用字典中的单词。
//  你可以假设字典中没有重复的单词。
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
	var num = 0;
	for (var i = 0; i < wordDict.length; i++) {
		if (s.indexOf(wordDict[i], num) === -1) {
			return false;
		}
		num += wordDict[i].length;
	}
	return true;
};


//  给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
//  有效字符串需满足：
//  左括号必须用相同类型的右括号闭合。
//  左括号必须以正确的顺序闭合。
//  注意空字符串可被认为是有效字符串。
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
	var stack = []; //  模仿栈后进先出，实现匹配
	for (var i = 0, len = s.length; i < len; i++) {
		if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
			stack.push(s[i]);
		} else if (s[i] === ')' || s[i] === '}' || s[i] === ']') {
			if (stack.length <= 0) return false;
			if ((s[i] === ')' && stack[stack.length - 1] === '(') ||
				(s[i] === ']' && stack[stack.length - 1] === '[') ||
				(s[i] === '}' && stack[stack.length - 1] === '{')) {
				stack.pop();
				continue;
			} else {
				return false;
			}
		}
	}
	if (stack.length !== 0) return false;
	return true;
};


//  eval调用  VS  switch - case
function ScanNode() {
	console.log('scan');
}

function ConfigNode() {
	console.log('config');
}

var types = {
	SCAN: "SCAN",
	CONFIG: "CONFIG"
}

var factory = function(type) {
	// var constructorName = type[0] + type.slice(1).toLowerCase() + "Node";
	// return new (eval(constructorName))()
	switch (type) {
		case 'SCAN':
			{
				ScanNode();
				break;
			}
		case 'CONFIG':
			{
				ConfigNode();
				break;
			}
		default:
			break;
	}
}
// 调用
// factory(types.SCAN);
// factory(types.CONFIG);



var countSegments = function(s) {
	var s = s.replace(/(^\s*)|(\s*$)/g, '').replace(/([^a-zA-Z]$)/g, '');
	if (!s) return 0;
	console.log(s.split(/[^a-zA-Z\-']+/g));
	return s.split(/[^a-zA-Z\-']+/g).length;
};

var findErrorNums = function(nums) {
	var nums = nums.sort((a, b) => a - b),
		result = [];
	for (var i = 0; i < nums.length; i++) {
		if (nums.indexOf(nums[i], nums.indexOf(nums[i]) + 1) !== -1) {
			result.push(nums[i]);
			nums.splice(i, 1);
			break;
		}
	}
	for (var i = 0; i < nums.length; i++) {
		if (nums[0] !== 1) {
			result.push(1);
			break;
		}
		if (nums[i] + 1 !== nums[i + 1]) {
			result.push(nums[i] + 1);
			break;
		}
	}
	return result;
};

//  统计所有小于非负数整数 n 的质数的数量。
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
	var count = 0;
	for (var i = 0; i < n; i++) {
		if (isPrimes(i)) {
			count++;
		}
	}
	return count;

	function isPrimes(num) {
		if (typeof num !== "number" || !Number.isInteger(num) || num === 1) {
			return false;
		}
		if (num == 2) {
			return true;
		} else if (num % 2 == 0) {
			return false;
		}
		var squareRoot = Math.sqrt(num);
		for (var i = 3; i <= squareRoot; i += 2) {
			if (num % i === 0) {
				return false;
			}
		}
		return true;
	}
};


//  编写一个算法来判断一个数是不是“快乐数”。
//  一个“快乐数”定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是无限循环但始终变不到 1。如果可以变为 1，那么这个数就是快乐数。
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
	if (n === 4) { //  当结果出现4时，会陷入一个循环 4->16,16->37 ... ->4，不是快乐数
		return false;
	}
	if (n === 1) {
		return true;
	}
	var arr = ('' + n).split(''),
		num = 0;
	for (var i = 0; i < arr.length; i++) {
		num += Math.pow((arr[i] - 0), 2);
	}
	return arguments.callee(num);
};

//  给定一种 pattern(模式) 和一个字符串 str ，判断 str 是否遵循这种模式。
//  这里的 遵循 指完全匹配，例如在pattern里的每个字母和字符串 str 中的每个非空单词存在双向单映射关系
//  说明:你可以假设 pattern 只包含小写字母， str 包含了由单个空格分开的小写单词
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function(pattern, str) {
	var map = {},
		arr = str.split(/\s+/),
		match = [];
	if (pattern.length !== arr.length) return false;
	for (var i = 0; i < pattern.length; i++) {
		if (map[pattern[i]]) {
			continue;
		}
		map[pattern[i]] = arr[i];
		match.push(map[pattern[i]]);
	}
	for (var k = 0; k < match.length - 1; k++) {
		if (match.indexOf(match[k], match.indexOf(match[k]) + 1) !== -1) {
			//console.log(match.indexOf(match[k],match.indexOf(match[k]) + 1));
			return false;
		}
	}
	for (var j = 0; j < arr.length; j++) {
		if (arr[j] !== map[pattern[j]]) {
			return false;
		}
	}
	return true;
};


//  数组去重，更改原数组，返回新长度
var removeDuplicates = function(nums) {
	nums.sort((a, b) => a - b);
	for (var i = 0; i < nums.length - 1; i++) {
		if (nums[i] === nums[i + 1]) {
			nums.splice(i, 1);
			i--;
		}
	}
	return nums.length;
};


//  数组扁平化 
var flatten = function(array) {
	if (array.length <= 0) return array;
	array = Array.prototype.concat.apply([], array)
	for (var i = 0; i < array.length; i++) {
		if (Object.prototype.toString.call(array[i]) === '[object Array]') {
			return arguments.callee(array);
		}
	}
	return array;
}
//  var arr = [1,2,[3,4],[5,6,7,[8,9,[10,11,12,[13,14,15,[16,17,[18,19,20]]]]]],21];


//  连字符-命名 转换为 驼峰式命名
var camelize = function(str) {
	return str.replace(/-+(.)?/g, function(match, chr) {
		return chr ? chr.toUpperCase() : ''
	})
}
//  var str = 'hip-hop-style';


//  将JS数据类型映射到 class2type 
var class2type = {};
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(type) {
	class2type["[object " + type + "]"] = type.toLowerCase();
})
//  返回数据类型
function type(obj) {
	return obj == null ? String(obj) : class2type[Object.prototype.toString.call(obj)] || 'object';
}
//  判断是否是全局对象
function isGlobal(obj) {
	return 'object' === type(obj) && obj === obj.global;
}
//  判断是否是服务端环境
function isServers() {
	return typeof global === 'object' && global === global.global && typeof window === 'undefined';
}

// console.log(isServers());


//  删除最小数目的无效括号，使输入的字符串有效，返回所有可能的结果。
//  注意: 输入可能包含了除 ( 和 ) 以外的元素。
//  "()())()" -> ["()()()", "(())()"]
//  "(a)())()" -> ["(a)()()", "(a())()"]
//  ")(" -> [""]
/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
	var left = [],
		right = [],
		result = [];
	for (var i = 0; i < s.length; i++) {
		if (s[i] === '(') {
			left.push(i);
		}
		if (s[i] === ')') {
			right.push(i);
		}
	}
	if (left.length > right.length) {
		var count = left.length - right.length;
		for (var i = 0; i < left.length - count; i++) {
			var str = s;

		}
	}
	if (right.length > left.length) {
		var count = right.length - left.length;
	}

	//  测试括号是否正常关闭
	function isValid(s) {
		var stack = [];
		for (var i = 0, len = s.length; i < len; i++) {
			if (s[i] === '(') {
				stack.push(s[i]);
			} else if (s[i] === ')') {
				if (stack.length <= 0) return false;
				if (stack[stack.length - 1] === '(') {
					stack.pop();
					continue;
				} else {
					return false;
				}
			}
		}
		if (stack.length !== 0) return false;
		return true;
	};
};


//  js：写一个递归。就是每隔5秒调用一次自身，一共100次
var zz = (function() {
	var count = 0;
	return function() {
		if (count >= 100) {
			return
		} else {
			setTimeout(() => {
				count++;
				console.log(`第${count}次调用！`);
				arguments.callee();
			}, 5000)
		}
	}
})()

// zz();


//  字符串全排列
function Permutation(str) {
	var result = [];
	if (str.length <= 0) {
		return [];
	}
	var sortTemp = "";
	var arr = str.split("");
	result = sortString(arr, sortTemp, []);
	return result;
}

function sortString(arr, sortTemp, res) {
	if (arr.length == 0) {
		res.push(sortTemp);
	} else {
		var isRepeat = {};
		for (var i = 0; i < arr.length; i++) {
			if (!isRepeat[arr[i]]) {
				var temp = arr.splice(i, 1)[0]; // 取出第i个字符
				sortTemp += temp; // 第i个字符设为前缀
				sortString(arr, sortTemp, res);
				arr.splice(i, 0, temp); // 补全取出的元素，恢复原字符串
				sortTemp = sortTemp.slice(0, sortTemp.length - 1); // 清空sortTemp
				isRepeat[temp] = true;
			}
		}
	}
	return res;
}

// console.log(Permutation('abc'));


//  给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
//  说明：本题中，我们将空字符串定义为有效的回文串。
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
	var str = s.replace(/[^\da-zA-Z]/g, '');
	if (str.length <= 1) return true;
	if (str.slice(0, 1).toLowerCase() === str.slice(str.length - 1).toLowerCase()) {
		str = str.slice(1, str.length - 1);
		return isPalindrome(str);
	} else {
		return false;
	}
};

var countSegments = function(s) {
	var s = s.replace(/(^\s*)|(\s*$)/g, '').replace(/([^a-zA-Z\-']$)/g, ' ');
	if (!s) return 0;
	return s.split(/[^a-zA-Z\-']+/g).filter(item => !!item).length;
};


var arr = [{
	"Event_code": "AB-001",
	"Interest_area": "Arts and Education",
	"Start_time": "9:00 AM",
	"End_time": "3:00 PM",
	"Session_type": "Course information session"
}, {
	"Event_code": "AB-002",
	"Interest_area": "Arts and Education",
	"Start_time": "12:30 PM",
	"End_time": "1:00 PM",
	"Session_type": "Course information session"
}, {
	"Event_code": "AB-003",
	"Interest_area": "",
	"Start_time": "9:00 AM",
	"End_time": "3:00 PM",
	"Session_type": "Course information session"
}, {
	"Event_code": "AB-004",
	"Interest_area": "Business",
	"Start_time": "10:30 AM",
	"End_time": "11:00 AM",
	"Session_type": "Course information session"
}, {
	"Event_code": "AB-005",
	"Interest_area": "General Interest",
	"Start_time": "9:30 AM",
	"End_time": "1:30 PM",
	"Session_type": "Experience"
}, {
	"Event_code": "AB-006",
	"Interest_area": "Environment,Business",
	"Start_time": "11:00 AM",
	"End_time": "11:30 AM",
	"Session_type": "Course information session"
}];

/*
 *   @param {arr}  Array  
 *	@param {contrast}  String  
 *	@param {interest} String
 *	@return []
 */
function interestSet(arr, contrast, interest) {
	if (!Array.isArray(arr)) throw new Error(`${arr} is not an Array.`);
	var results = [];
	arr.forEach(val => {
		for (var _key in val) {
			if (val[_key] === contrast) {
				val[interest].indexOf(',') === -1 ? results.push(val[interest]) : results = results.concat(val[interest].split(','));
			}
		}
	})
	return results.filter((val, index, arr) => {
		return arr.indexOf(val) === index && val;
	})
}

//  console.log(interestSet(arr,'Course information session','Interest_area'));

//  混入函数  --> 函数插入before事件和after事件  -->  通过Function.prototype实现
Function.prototype.before = function(beforeFn) {
	var self = this;
	return function() {
		beforeFn.apply(this, Array.prototype.slice.call(arguments));
		return self.apply(this, Array.prototype.slice.call(arguments));
	}
}
Function.prototype.after = function(afterFn) {
	var self = this;
	return function() {
		var ret;
		ret = self.apply(this.Array.prototype.slice.call(arguments));
		afterFn.apply(this.Array.prototype.slice.call(arguments));
		return ret;
	}
}

var func = function() {
	console.log('func');
}
func = func.before(function() {
	console.log('before func');
}).after(function() {
	console.log('after func');
})
//  func();


//  currying
var curry = function(fn) {
	var args = [];
	var ret = function(n) {
		args.push(n);
		return ret;
	}
	//  延迟求值
	ret.valueOf = function() {
		var ret = args.reduce(fn);
		args = [];
		return ret;
	}
	return ret;
}
var func = curry(function(a, b) {
	return a * b;
})

// console.log(func(1));
// console.log(func(1)(2));
// console.log(func(1)(2)(3));

//  给定一个没有重复数字的序列，返回其所有可能的全排列。
/*
 *	数组全排列
 *	@param {number[]} arr
 *	@return {number[][]}
 */
function fullSort(arr) {
	var result = [];
	if (arr.length == 1) {
		result.push(arr);
		return result;
	}
	for (var i = 0; i < arr.length; i++) {
		var temp = [];
		temp.push(arr[i]); //取任意一项放到temp的第一项
		var remain = arr.slice(); //深复制原数组到remain
		remain.splice(i, 1); //去掉那一项
		var temp2 = fullSort(remain); // 剩下的项全排列,返回[[1,2],[1,3]]这样的数据
		for (var j = 0; j < temp2.length; j++) {
			temp2[j].unshift(temp[0]); // [[5,1,2],[5,1,3]]这样的数据
			result.push(temp2[j]);
		}
	}
	console.log('length != 1 ->' + result);
	return result;
}


//  fullSort([1,2,3]);

function permute(input) {
	var permArr = [],
		usedChars = [];

	function main(input) {
		var i, ch;
		for (i = 0; i < input.length; i++) {
			ch = input.splice(i, 1)[0];
			usedChars.push(ch);
			if (input.length == 0) {
				permArr.push(usedChars.slice());
			}
			main(input);
			input.splice(i, 0, ch);
			usedChars.pop();
		}
		return permArr
	}
	return main(input);
};
// console.log(permute([5, 3, 7]));

//  加一问题
//给定一个非负整数组成的非空数组，在该数的基础上加一，返回一个新的数组。
// 最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。
// 你可以假设除了整数 0 之外，这个整数不会以零开头。
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
	var result = '',
		n = 1;
	while (digits.length || n) {
		n += ~~digits.pop();
		result = n % 10 + result;
		n = n > 9;
	}
	return result.replace(/^0+/, '').split('').map(val => ~~val);
};
//  console.log(plusOne([1,2,9]));


// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// 示例:
// 输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]
// 说明:
// 必须在原数组上操作，不能拷贝额外的数组。
// 尽量减少操作次数。
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
	var n = nums.length;
	while (n >= 0) {
		nums.splice(nums.indexOf(0), 1);
		nums.push(0);
		n--;
	}
}
//  moveZeroes([0,1,2,0,12]);



// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
// 注意你不能在买入股票前卖出股票。
// 输入: [7,1,5,3,6,4]
// 输出: 5
// 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit1 = function(prices) {
	var result = [];
	return (function(prices) {
		if (prices.length < 2) {
			result.push(0);
			return Math.max(...result);
		}
		var buying = prices[0],
			sell = 0,
			flag = -1;
		for (var i = 0; i < prices.length; i++) {
			if (prices[i] < buying) {
				buying = prices[i];
				flag = i;
			}
		}
		for (var j = flag; j < prices.length; j++) {
			if (prices[j] > buying && prices[j] > sell) {
				sell = prices[j];
			}
		}
		result.push(sell - buying > 0 ? sell - buying : 0);
		prices.splice(flag, 1);
		return arguments.callee(prices);
	})(prices)
};

//  console.log(maxProfit1([7,1,5,3,6,4]));


// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
	if (x < 0) return false;
	if (x < 10) return true;
	var arr = ('' + x).split('');
	while (arr.length > 1) {
		if (arr.shift() !== arr.pop()) {
			return false;
		}
	}
	return true;
};

// console.log(isPalindrome(101));


// 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
	if (nums.length < 3) return nums.length;
	var mark = 0;
	for (var i = 0; i < nums.length;) {
		mark = nums[i];
		if (mark === nums[i + 1]) {
			i += 2;
		} else {
			i++;
		}
		if (mark === nums[i]) {
			nums.splice(i, 1);
			i -= 2;
		}
	}
	return nums.length;
};

// console.log(removeDuplicates([1,1,1,2,2,3]));



// 比较两个版本号 version1 和 version2。
// 如果 version1 > version2 返回 1，如果 version1 < version2 返回 -1， 除此之外返回 0。
// 你可以假设版本字符串非空，并且只包含数字和 . 字符。
//  . 字符不代表小数点，而是用于分隔数字序列。
// 例如，2.5 不是“两个半”，也不是“差一半到三”，而是第二版中的第五个小版本。
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function(version1, version2) {
	if (version1 && !version2) return 1;
	if (!version1 && version2) return -1;
	if (version1 === version2) return 0;
	var reg = /(\.0*)*$/g;
	var v1 = version1.replace(reg, '').split('.'),
		v2 = version2.replace(reg, '').split('.');
	console.log(`v1 -> ${v1} <=> v2 -> ${v2} `);
	var len = v1.length > v2.length ? v1.length : v2.length;
	for (var i = 0; i < len; i++) {
		if (!v1[i] && v2[i]) return -1;
		if (v1[i] && !v2[i]) return 1;
		if (~~v1[i] === ~~v2[i]) {
			continue;
		}
		if (~~v1[i] > ~~v2[i]) {
			return 1;
		} else {
			return -1;
		}
	}
	return 0;
};



// 实现一个基本的计算器来计算一个简单的字符串表达式的值。
// 字符串表达式仅包含非负整数，+， - ，*，/ 四种运算符和空格  。 整数除法仅保留整数部分。
// 例:  输入: " 3+5 / 2 "
// 	   输出: 5
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
	if (s.search(/[(\+)|(\-)|(\*)|(\/)]/g) === -1) return s;
	var nums = [],
		punctuation = [],
		result = 0;
	var arr = s.replace(/\s*/g, '').split('');
	while (arr.length) {
		if (!isNaN(arr[0])) {
			nums.push(arr.shift());
			while (!isNaN(arr[0])) {
				nums[nums.length - 1] = nums[nums.length - 1] + arr.shift();
			}
		} else {
			if (arr[0] === '*' || arr[0] === '/') {
				var n = arr.shift();
				while (!isNaN(arr[1])) {
					arr[0] = arr.shift() + arr[0];
				}
				if (n === '*') {
					nums.push(~~nums.pop() * ~~arr.shift());
				}
				if (n === '/') {
					nums.push(Math.floor(~~nums.pop() / ~~arr.shift()));
				}
			} else {
				punctuation.push(arr.shift());
			}
		}
	}
	result += ~~nums.shift();
	while (punctuation.length) {
		var m = punctuation.shift();
		if (m === '+') result += ~~nums.shift();
		if (m === '-') result -= ~~nums.shift();
	}
	return result;
};



// 编写一个程序，找出第 n 个丑数。
// 丑数就是只包含质因数 2, 3, 5 的正整数。
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
	function isUgly(num) {
		if (num <= 0) return false;
		while (num % 2 == 0) num /= 2;
		while (num % 3 == 0) num /= 3;
		while (num % 5 == 0) num /= 5;
		if (num == 1) {
			return true;
		} else
			return false;
	}
	var key = 0,
		i = 0;
	while (true) {
		i++;
		if (isUgly(i)) {
			key++;
		}
		if (key === n) {
			return i;
		}
		if (key > 1691) {
			break;
		}
	}
	return 0;
};
// console.log(nthUglyNumber(1352));



// 给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）, 其中有些元素出现两次而其他元素出现一次。
// 找到所有出现两次的元素。
// 你可以不用到任何额外空间并在O(n)时间复杂度内解决这个问题吗？
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
	var result = [];
	for (var i = 0, len = nums.length; i < len; i++) {
		if (nums.indexOf(nums[i], nums.indexOf(nums[i]) + 1) !== -1) {
			result.push(nums[i]);
		}
	}
	return [...new Set(result)];
};
// console.log(findDuplicates([4,3,2,7,8,2,3,1]));



// 设计一个简化版的推特(Twitter)，可以让用户实现发送推文，关注/取消关注其他用户，能够看见关注人（包括自己）的最近十条推文。你的设计需要支持以下的几个功能：
// postTweet(userId, tweetId): 创建一条新的推文
// getNewsFeed(userId): 检索最近的十条推文。每个推文都必须是由此用户关注的人或者是用户自己发出的。推文必须按照时间顺序由最近的开始排序。
// follow(followerId, followeeId): 关注一个用户
// unfollow(followerId, followeeId): 取消关注一个用户
// Twitter twitter = new Twitter();
// // 用户1发送了一条新推文 (用户id = 1, 推文id = 5).
// twitter.postTweet(1, 5);
// // 用户1的获取推文应当返回一个列表，其中包含一个id为5的推文.
// twitter.getNewsFeed(1);
// // 用户1关注了用户2.
// twitter.follow(1, 2);
// // 用户2发送了一个新推文 (推文id = 6).
// twitter.postTweet(2, 6);
// // 用户1的获取推文应当返回一个列表，其中包含两个推文，id分别为 -> [6, 5].
// // 推文id6应当在推文id5之前，因为它是在5之后发送的.
// twitter.getNewsFeed(1);
// // 用户1取消关注了用户2.
// twitter.unfollow(1, 2);
// // 用户1的获取推文应当返回一个列表，其中包含一个id为5的推文.
// // 因为用户1已经不再关注用户2.
// twitter.getNewsFeed(1);
/**
 * Initialize your data structure here.
 */
var Twitter = function() {

};

/**
 * Compose a new tweet. 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {

};

/**
 * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {

};

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op. 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {

};

/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op. 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {

};

/** 
 * Your Twitter object will be instantiated and called as such:
 * var obj = Object.create(Twitter).createNew()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */


// 给定一组字符，使用原地算法将其压缩。
// 压缩后的长度必须始终小于或等于原数组长度。
// 数组的每个元素应该是长度为1 的字符（不是 int 整数类型）。
// 在完成原地修改输入数组后，返回数组的新长度。
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function(chars) {
	/************* - -模拟stack实现 - - **************/
	//    if(chars.length <= 1) return chars.length;
	//    var result = [],num = 1;
	// 	var flag = chars.shift();
	//    while(chars.length){
	//    	var n = chars.shift();
	//    	if(n === flag){
	//    		num ++;
	//    	}else{
	//    		result.push(flag);
	//    		flag = n;
	//    		if(num === 1){
	//    			continue;
	//    		}else{
	//    			num > 9 ? result = result.concat((num + '').split('')) : result.push('' + num);
	//    			num = 1;
	//    		}
	//    	}
	//    }
	//    if(num !== 1){
	//    	result.push(flag);
	//    	num > 9 ? result = result.concat((num + '').split('')) : result.push('' + num);
	//    }
	//    return result;
	/****************** ---->  原地算法实现 ********************/
	var num = 1,
		flag = chars[0],
		n = 0;
	for (var i = 1; i < chars.length; i++) {
		if (flag === chars[i]) {
			num++;
			if (num > 2) {
				chars.splice(i, 1);
				i--;
			}
		} else {
			flag = chars[i + 1];
			if (num > 1) {
				if (num < 9) {
					chars.splice(i - 1, 1, num + '');
				} else {
					chars.splice(i - 1, 1, ...(num + ''.split('')));
					i += (num + '').split('').length - 1;
				}
				num = 1;
			}
			continue;
		}
	}
	if (num > 1) {
		chars.splice(chars.length - 1, 1);
		num > 9 ? chars = chars.concat(('' + num).split('')) : chars.push('' + num);
	}
	//console.log(chars);
};

// console.log(compress(["a","b","b","b","b","b","b","b","b","b","b","b","b"]));


// 请实现下面的自定义事件 Event 对象的接口，功能见注释(测试1)
// 该 Event 对象的接口需要能被其他对象拓展复用(测试2)
// 测试1
var Event = {
	// 通过on接口监听事件eventName
	// 如果事件eventName被触发，则执行callback回调函数
	on: function(eventName, callback) {
		if (!this.handles) {
			//this.handles = {};
			Object.defineProperty(this, "handles", {
				value: {},
				enumerable: false,
				configurable: true,
				writable: true
			})
		}
		if (!this.handles[eventName]) {
			this.handles[eventName] = [];
		}
		this.handles[eventName].push(callback);
	},
	// 触发事件 eventName
	emit: function(eventName) {
		if (this.handles[arguments[0]]) {
			for (var i = 0; i < this.handles[arguments[0]].length; i++) {
				this.handles[arguments[0]][i](arguments[1]);
			}
		}
	}
};
// Event.on('test', function (result) {
//     console.log(result);
// });
// Event.on('test', function () {
//     console.log('test');
// });
// Event.emit('test', 'hello world'); // 输出 'hello world' 和 'test'
// // 测试2
// var person1 = {};
// var person2 = {};
// Object.assign(person1, Event);
// Object.assign(person2, Event);
// person1.on('call1', function () {
//     console.log('person1');
// });
// person2.on('call2', function () {
//     console.log('person2');
// });
// person1.emit('call1'); // 输出 'person1'
// person1.emit('call2'); // 没有输出
// person2.emit('call1'); // 没有输出
// person2.emit('call2'); // 输出 'person2'



// 给定两个字符串 s 和 t，它们只包含小写字母。
// 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
// 请找出在 t 中被添加的字母。
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
	s = s.split('');
	t = t.split('');
	while (t.length) {
		var str = t.shift();
		if (s.indexOf(str) === -1) {
			return str;
		}
		s.splice(s.indexOf(str), 1);
		if (t.length === 0) {
			return str;
		}
	}
};

// console.log(findTheDifference('a','aa'));


// 给定一个从1 到 n 排序的整数列表。
// 首先，从左到右，从第一个数字开始，每隔一个数字进行删除，直到列表的末尾。
// 第二步，在剩下的数字中，从右到左，从倒数第一个数字开始，每隔一个数字进行删除，直到列表开头。
// 我们不断重复这两步，从左到右和从右到左交替进行，直到只剩下一个数字。
// 返回长度为 n 的列表中，最后剩下的数字。
/**
 * @param {number} n
 * @return {number}
 */
var lastRemaining = function(n) {
	var arr = [],
		k = 1;
	while (n >= k) {
		arr.push(k++);
	}
	return (function(n) {
		var i = 0;
		while (n.length >= i) {
			if (n.length === 1) return n[0];
			n.splice(i, 1);
			i++;
		}
		i = n.length - 1;
		while (i >= 0) {
			if (n.length === 1) return n[0];
			n.splice(i, 1);
			i -= 2;
		}
		return arguments.callee(n);
	})(arr)
};

// console.log(lastRemaining(1000000));


// 给定一个经过编码的字符串，返回它解码后的字符串。
// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
// s = "3[a]2[bc]", 返回 "aaabcbc"
// s = "3[a2[c]]", 返回 "accaccacc"
// s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef"
/**
 * @param {string} s
 * @return {string}
 */
//  思路有问题，待修改
var decodeString = function(s) {
	var result = '',
		arr = [],
		cache = '';
	s = s.split('');
	while (s.length) {
		var str = s.pop();
		if (str !== ']' && str !== '[' && isNaN(str)) {
			result = str + result;
			continue;
		}
		if (!isNaN(str)) {
			if (isNaN(s[s.length - 1]) && s.length !== 0) {
				cache ? result = result.repeat(~~cache) : result = result.repeat(~~str);
			} else {
				cache ? cache = str + cache : cache = str;
			}
			continue;
		}
		if (str === ']' || s.length === 0) {
			if (!isNaN(str)) cache = str + cache;
			if (cache) {
				if (str === ']') {
					arr.unshift(result.repeat(~~cache));
				} else {
					cache = str + cache;
					arr.unshift(result.repeat(~~cache));
				}
				cache = '';
			} else {
				arr.unshift(result);
			}
			result = '';
		}
	}
	if (cache) {
		arr.unshift(result.repeat(~~cache));
	} else {
		arr.unshift(result);
	}
	return arr.join('');
};
// console.log(decodeString('3[a]2[bc]'));
// console.log(decodeString('3[a2[c]]'));
// console.log(decodeString("2[abc]3[cd]ef"));
// console.log(decodeString('100[leetcode]').length);
// console.log(decodeString('"3[a]2[b4[F]c]"'));  //  "aaabFFFFcbFFFFc"



//  八皇后
// var n = 8; //总行（列）数  8*8
// var iCount = 0; //n皇后的解法数
// var arr = [];
// //arr是长度为n*n的一维数组，保存着n*n个对象（li）并有各自的坐标，默认index都为-1，表示没有被任何皇后标记过  arr[ i*n + j ].y = i; arr[ i*n + j ].x = j;
// for (var i = 0; i < n; i++) {
// 	for (var j = 0; j < n; j++) {
// 		arr[i * n + j] = -1;
// 		arr[i * n + j].x = j;
// 		arr[i * n + j].y = i;
// 	}
// }
// //iQueen从0开始，即皇后0
// function setQueen(iQueen) {
// 	if (iQueen == n) {
// 		iCount++;
// 		console.log(iCount)
// 		return;
// 	}
// 	for (var i = 0; i < n; i++) {
// 		if (arr[iQueen * n + i].index == -1) {
// 			arr[iQueen * n + i].index = iQueen;
// 			var x = arr[iQueen * n + i].x;
// 			var y = arr[iQueen * n + i].y;

// 			for (var j = 0; j < arr.length; j++) {
// 				if (arr[j].index == -1 && (arr[j].x == x || arr[j].y == y || arr[j].x - arr[j].y == x - y || arr[j].x + arr[j].y == x + y)) {
// 					arr[j].index = iQueen;
// 				}
// 			}
// 			//执行到这里，就会跳到下一层函数中，在执行完下一层的函数后，才会回溯到上一层继续执行for循环（此时的for循环是上一层的for循环），包括后面的所有代码
// 			//需要注意的是，例如当前函数的iQueen=1，跳到下一层函数 iQueen=2，下一层函数执行完后，回溯到上一层，此时的执行环境已经是上一层的执行环境了，即iQueen是等于1，而不是等于2
// 			//递归
// 			setQueen(iQueen + 1);
// 			//回溯
// 			for (var j = 0; j < arr.length; j++) {
// 				if (arr[j].index == iQueen) {
// 					arr[j].index = -1;
// 				}
// 			}
// 		}
// 	}
// }

// setQueen(0);

// n queens problem  
function nQueens(n) {
	var result = [];
	var k = 0;
	result[k] = 0;
	while (k >= 0) { //when k<0; there is no solution for this 'n'  
		result[k]++;
		while (result[k] <= n && !place(result, k))
			result[k]++; //find proper position for the current queen  
		if (result[k] <= n) {
			if (k == n - 1) break; //the last queen is put at a proper position, end  
			else {
				k++;
				result[k] = 0; //turn to next queen and init her position  
			}
		} else {
			result[k] = 0; //before feedback, we should reset the position or it will influence next time we find proper position for her  
			k--;
		}
	}
	return result;
}

//judge the current position is proper or not  
//k is the serial number of the queen  
//res is the array of a partial solution  
function place(res, k) {
	var abs = Math.abs;
	for (var i = 0; i < k; i++) {
		if (res[i] == res[k] || abs(res[i] - res[k]) == abs(i - k))
			return false;
	}
	return true;
}

// var start = Date.now();  
// var result = nQueens(30);  
// var end = Date.now();  
// console.log(result, end - start); 

var n = [1, 3, 35, 24, 21, 56, 26, 12, 16, 19];
var quickSort = function(arr) {
	if (arr.length <= 1) {
		return arr;
	}
	var middle = Math.floor(arr.length / 2);
	var base = arr[middle];
	arr.splice(middle, 1);
	var left = [],
		right = [];
	for (var i = 0, len = arr.length; i < len; i++) {
		if (arr[i] <= base) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat(base, quickSort(right));
}
// console.time('quick sort');
// console.log(quickSort(n));
// console.timeEnd('quick sort');

var insertSort = function(arr) {
	for (var i = 1; i < arr.length; i++) {
		var mark = arr[i];
		for (var j = i - 1; arr[j] > mark; j--) {
			arr[j + 1] = arr[j];
		}
		arr[j + 1] = mark;
	}
	return arr;
}
// console.time('insert sort');
// console.log(insertSort([2,3,6,4,2,1,90,100,20,5,1]));
// console.timeEnd('insert sort');

var shellSort = function(arr) {
	var mark = Math.floor(arr.length / 2);
	while (mark > 0) {
		for (var i = mark; i < arr.length; i++) {
			var temp = arr[i];
			for (var j = i; arr[j - mark] > temp; j -= mark) {
				arr[j] = arr[j - mark];
			}
			arr[j] = temp;
		}
		mark = Math.floor(mark / 2);
	}
	return arr;
}
// console.time('shell sort');
// console.log(shellSort([2,3,6,4,2,1,90,100,20,5,1]));
// console.timeEnd('shell sort');



//  函数柯里化  -->  隋性求值
function sum(a, b, c) {
	return a + b + c;
}

function currying(fn) {
	var args = [].slice.call(arguments, 1);
	if (args.length === fn.length) return fn.apply(null, args);

	function inner(len, arg) {
		if (len <= 0) {
			return fn.apply(null, arg);
		}
		return function() {
			return inner(len - arguments.length, arg.concat([].slice.call(arguments)));
		}
	}
	return inner(fn.length, []);
}

var curry = currying(sum);

//  要求全部输出 6
// console.log(currying(sum,1,2,3));
// console.log(curry(1)(2)(3));
// console.log(curry(1,2)(3));
// console.log(curry()(1)(2)(3));
// console.log(curry(1,2,3));


//  KMP算法  -> 字符串匹配
/**
 *   @param string ts
 *	@param string ps
 *	@return number
 **/
var KMP = function(ts, ps) {
	var t = ts.split(''),
		p = ps.split('');
	var k = 0,
		j = 0,
		i = 0;
	while (i < t.length && j < p.length) {
		if (t[i] === p[j]) {
			i++;
			j++;
		} else {
			i = i - j + 1;
			j = 0;
		}
	}
	if (j === p.length) {
		return i - j;
	} else {
		return -1;
	}
}
// console.time('kmp');
// console.log(KMP('BBC ABCDAB ABCDABCDABDE','ABCDABD'));
// console.timeEnd('kmp');


//   Sunday算法  --> 字符串匹配
/**
 *   @param string s  {母串}
 *	@param string t  {模板字符串}
 *	@return number
 **/
var sunday = function(s, t) {
	var i = 0,
		j = 0;
	while (i < s.length && j < t.length) {
		if (s[i] === t[j]) {
			i++;
			j++;
		} else {
			j = 0;
			var k = s[t.length + i];
			if (t.indexOf(k) === -1) {
				i += t.length + 1;
			} else {
				i += t.length - t.indexOf(k);
			}
		}
	}
	if (j === t.length) {
		return i - j;
	} else {
		return -1;
	}
}

// console.log(sunday('BBC ABCDAB ABCDABCDABDE','ABCDABD'));
// console.log(sunday('substring searching algorithm','search'));



// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为1000。
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {

};

//  数组中值的对比

var a = [0, 1, 2, 3, 4, 5, 6, 7],
	b = [7, 5, 3, 6, 4, 2, 1, 0];

function compareArray(arr1, arr2) {
	var toString = Object.prototype.toString;
	if (toString.call(arr1) !== '[object Array]' || toString.call(arr2) !== '[object Array]') {
		console.error('param error,need array');
		return false;
	}
	var a = arr1.length,
		b = arr2.length;
	if (a !== b) return false;
	var n = 0;
	for (var i = 0; i < a; i++) {
		n ^= arr1[i];
		n ^= arr2[i];
	}
	return n === 0;
}

// console.log(compareArray(a, b));

//  给定一个数字，从0开始到这个数字的奇数队列中，统计3出现的次数
var n = 866278171,
	k = 0;

function foo(n, key) {
	for (var i = 0; i <= n; i++) {
		if (i % 2 === 1) {
			var str = i.toString();
			if (str.indexOf(key) !== -1) {
				k += bar(str, 0, key);
			}
		}
	}
	return k;
}

function bar(n, index, key) {
	var a = n.indexOf(key, index);
	if (a === -1) {
		return 0;
	} else {
		if (a + 1 >= n.length) {
			return 1;
		}
		return 1 + bar(n, a + 1, key);
	}
}

// console.log(foo( 103, '3'));

Array.prototype.map = function(fn, ctx) {
	if (typeof fn !== 'function') throw new TypeError(arguments[0] + ' is not a function');
	var context = ctx || null;
	var result = [];
	for (var i = 0; i < this.length; i++) {
		result.push(fn.call(context, this[i], i, this))
	}
	return result;
}

// console.log([1, 2, 3].map(item => item * 2));

var url = "/onu_allow_list?form=resource&port_id=8&onu_id=26";

//console.log(url.replace(/((?<=.+port_id\=)\d+)|((?<=.+onu_id\=)\d+)/g,'1'));


function fn() {}

fn.prototype._apply = function(ctx, ...args) {
	ctx = ctx || window;
	args = args || [];
	const key = Symbol();
	//  ex:  obj = { symbol: fn }  对象调用方法时，this隐式绑定调用方法的对象
	ctx[key] = this;
	let result = ctx[key](...args);
	delete ctx[key]
	return result;
}

// 拍平数组，n代表要拍平的层级
function flat(arr, n) {
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (Array.isArray(item)) {
			if (n) {
				const _item = flat(item, n - 1);
				result = result.concat(_item);
			} else {
				result.push(item);
			}
		} else {
			result.push(item);
		}
	}
	return result;
}

// console.log(flat([1,2,[3,4,[5,6]],7, [8, 9, [10, 11, 12, [13, 14]]]], 2));


// 给定不同面额的硬币 coins 和一个总金额 count。
// 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
/*
 * @param {Array<number>} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = (coins, count) => {
	const dp = new Array(count + 1).fill(count + 1);
	dp[0] = 0;
	// 生成从0-count的集合，i的值为以icons项生成i所需要的最小数量
	for (let i = 0; i < dp.length; i++) {
		for (let j = 0; j < coins.length; j++) {
			const coin = coins[j];
			if (i - coin < 0) {
				continue;
			}
			// ( 所需要的数量 - 当前默认项 ) 需要的数量 + 1
			// e.x.  [1, 2, 5]  9  ->  分别为 1，2，5 时， 取构成 8(9-1)， 7(9-2)， 4(9-5) 所需要的数量中的最小值 + 1 (项，值可能为[1,2,5]中的任何一个值) ，就是构成9所需的最小值
			dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
		}
	}
	return dp[count] === count + 1 ? -1 : dp[count];
}

/*
 *  给定一个无序的整数数组 
 *  输出最长上升子序列的长度
 *  ex: [10, 9, 2, 5, 3, 7, 101, 18] -> [2, 3, 7, 101] -> 4
 */

function lengthOfLIS(nums) {
	const dp = Array.from(nums).fill(1);
	for (let i = 0; i < nums.length; i++) {
		for (j = 0; j < i; j++) {
			if (nums[i] > nums[j]) {
				dp[i] = Math.max(dp[i], dp[j] + 1)
			}
		}
	}
	return Math.max.apply(null, dp);
}

// console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));

/*
 *  最小编辑距离
 */
function minDistance(s1, s2) {
	const m = s1.length,
		n = s2.length;

	function dp(i, j) {
		if (i === -1) return j + 1;
		if (j === -1) return i + 1;
		if (s1[i] === s2[j]) {
			return dp(i - 1, j - 1);
		} else {
			return Math.min(
				dp(i - 1, j) + 1, // 删除字符  s1指针左移一位，s2不变，操作数 +1
				dp(i, j - 1) + 1, // 插入字符  s1指针不变，s2左移一位，操作数 +1
				dp(i - 1, j - 1) + 1 // 替换字符  s1，s2同时左移一位，操作数 +1
			)
		}
	}
	return dp(s1.length - 1, s2.length - 1);
}

// console.log(minDistance('intention', 'execution'));


function breakArray(condition, arr) {
	let result = [],
		flag = 0;
	condition.forEach(item => {
		const sub = arr.slice(flag, flag + item);
		if (sub.length) {
			flag += item;
			result.push(sub);
		}
	})
	if (flag < arr.length) {
		result = result.concat(breakArray(condition, arr.slice(flag)));
	}
	return result;
}
const resultArray = breakArray([2, 3, 1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
// console.log(resultArray);

const test = [{
	port_id: 5,
	splitter_id: 1,
	name: "uflvgqwpyxenmvtjrczwi",
	description: "cngnxtqdmup",
	parent: 0,
}, {
	port_id: 5,
	splitter_id: 2,
	name: "olmq",
	description: "qnriovc",
	parent: 0,
}, {
	port_id: 5,
	splitter_id: 3,
	name: "mdbwvsmnybkoej",
	description: "qeydgradirmxefbdreeqktdvhkyoqthtkjowlwwsdxmofrvtdgtvwkpfvrrj",
	parent: 1,
}, {
	port_id: 5,
	splitter_id: 4,
	name: "uompplwtcrhkqlhdghbj",
	description: "lgtqllgtienumtsjvbmqfghwhstzdnugeotsfdajtsbabxn",
	parent: 1,
}, {
	port_id: 5,
	splitter_id: 5,
	name: "mgbcrbeodrjwdaljbtmxk",
	description: "smxjmoexiqwxxul",
	parent: 2,
}, {
	port_id: 5,
	splitter_id: 6,
	name: "hhbkqbdhiiyhronqqqghouuwiv",
	description: "pzhhxnlfviibebatqqx",
	parent: 2,
}, {
	port_id: 5,
	splitter_id: 7,
	name: "rcltkymcvbz",
	description: "lckwfqqarqxcftlmpjgjidahnhabcibemgv",
	parent: 3,
}, {
	port_id: 5,
	splitter_id: 8,
	name: "ub",
	description: "lecamgprsenmefgivtnzpgcybiwwsyfyfrbpsrvexm",
	parent: 3,
}, ];

const result = test.reduce((pre, item) => {
	if(item.parent === 0) {
		pre.push(item);
	}else{
		const fn = (arr, item) => {
			arr.forEach(v => {
				if(v.splitter_id === item.parent) {
					if(!v.children) {
						v.children = [];
					}
					v.children.push(item);
					return;
				}
				if(v.children) {
					fn(v.children, item);
				}
			})
		}
		fn(pre, item);
	}
	return pre;
}, []);

console.log(JSON.stringify(result));
