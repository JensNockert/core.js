window.CSStringToBuffer = (string) ->
	a = new Uint8Array(string.length)
	
	a[i] = string.charCodeAt(i) for i in [0 ... string.length] by 1
	
	return a.buffer

window.CSCopyFromString = (dst, dstOffset, src, srcOffset, n) ->
	destination = new Uint8Array(dst, dstOffset, n)
	
	destination[i] = src.charCodeAt(srcOffset + i) for i in [0 ... n] by 1
	
	return dst

window.CSCompareToString = (a, aOffset, b, bOffset, n) ->
	return CSCompare(a, aOffset, CSStringToBuffer(string), bOffset, n)