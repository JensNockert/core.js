(function() {
  var endianBuffer;
  var __slice = Array.prototype.slice;
  window.CSAlloc = function(n) {
    return new ArrayBuffer(n);
  };
  window.CSRealloc = function(buffer, n) {
    return window.CSCopy(CSAlloc(n), 0, buffer, 0, Math.min(n, buffer.byteLength));
  };
  window.CSByteBuffer = function() {
    var array, bytes, i, result, _ref;
    bytes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    result = CSAlloc(bytes.length);
    array = new Uint8Array(result);
    for (i = 0, _ref = bytes.length; i < _ref; i += 1) {
      array[i] = bytes[i];
    }
    return result;
  };
  window.CSRead = function(src, offset, n) {
    return window.CSCopy(CSAlloc(n), 0, src, offset, n);
  };
  window.CSReadNative16 = function(src, offset) {
    return window.CSRead(src, offset, 2);
  };
  window.CSReadNative32 = function(src, offset) {
    return window.CSRead(src, offset, 4);
  };
  window.CSReadNative64 = function(src, offset) {
    return window.CSRead(src, offset, 8);
  };
  window.CSReadBig16 = function(src, offset) {
    return window.CSBigToNative16(CSAlloc(2), 0, src, offset, 2);
  };
  window.CSReadBig32 = function(src, offset) {
    return window.CSBigToNative32(CSAlloc(4), 0, src, offset, 4);
  };
  window.CSReadBig64 = function(src, offset) {
    return window.CSBigToNative64(CSAlloc(8), 0, src, offset, 8);
  };
  window.CSReadLittle16 = function(src, offset) {
    return window.CSLittleToNative16(CSAlloc(2), 0, src, offset, 2);
  };
  window.CSReadLittle32 = function(src, offset) {
    return window.CSLittleToNative32(CSAlloc(4), 0, src, offset, 4);
  };
  window.CSReadLittle64 = function(src, offset) {
    return window.CSLittleToNative64(CSAlloc(8), 0, src, offset, 8);
  };
  window.CSBitwiseAND = function(dst, dstOffset, a, aOffset, b, bOffset, n) {
    var aArray, bArray, dstArray, i, _ref;
    _ref = [new Uint8Array(dst, dstOffset, n), new Uint8Array(a, aOffset, n), new Uint8Array(b, bOffset, n)], dstArray = _ref[0], aArray = _ref[1], bArray = _ref[2];
    for (i = 0; i < n; i += 1) {
      dstArray[i] = aArray[i] & bArray[i];
    }
    return dst;
  };
  window.CSBitwiseNAND = function(dst, dstOffset, a, aOffset, b, bOffset, n) {
    var aArray, bArray, dstArray, i, _ref;
    _ref = [new Uint8Array(dst, dstOffset, n), new Uint8Array(a, aOffset, n), new Uint8Array(b, bOffset, n)], dstArray = _ref[0], aArray = _ref[1], bArray = _ref[2];
    for (i = 0; i < n; i += 1) {
      dstArray[i] = ~(aArray[i] & bArray[i]);
    }
    return dst;
  };
  window.CSBitwiseNOR = function(dst, dstOffset, a, aOffset, b, bOffset, n) {
    var aArray, bArray, dstArray, i, _ref;
    _ref = [new Uint8Array(dst, dstOffset, n), new Uint8Array(a, aOffset, n), new Uint8Array(b, bOffset, n)], dstArray = _ref[0], aArray = _ref[1], bArray = _ref[2];
    for (i = 0; i < n; i += 1) {
      dstArray[i] = ~(aArray[i] | bArray[i]);
    }
    return dst;
  };
  window.CSBitwiseNOT = function(dst, dstOffset, a, aOffset, n) {
    var aArray, dstArray, i, _ref;
    _ref = [new Uint8Array(dst, dstOffset, n), new Uint8Array(a, aOffset, n)], dstArray = _ref[0], aArray = _ref[1];
    for (i = 0; i < n; i += 1) {
      dstArray[i] = ~aArray[i];
    }
    return dst;
  };
  window.CSBitwiseOR = function(dst, dstOffset, a, aOffset, b, bOffset, n) {
    var aArray, bArray, dstArray, i, _ref;
    _ref = [new Uint8Array(dst, dstOffset, n), new Uint8Array(a, aOffset, n), new Uint8Array(b, bOffset, n)], dstArray = _ref[0], aArray = _ref[1], bArray = _ref[2];
    for (i = 0; i < n; i += 1) {
      dstArray[i] = aArray[i] | bArray[i];
    }
    return dst;
  };
  window.CSBitwiseXOR = function(dst, dstOffset, a, aOffset, b, bOffset, n) {
    var aArray, bArray, dstArray, i, _ref;
    _ref = [new Uint8Array(dst, dstOffset, n), new Uint8Array(a, aOffset, n), new Uint8Array(b, bOffset, n)], dstArray = _ref[0], aArray = _ref[1], bArray = _ref[2];
    for (i = 0; i < n; i += 1) {
      dstArray[i] = aArray[i] ^ bArray[i];
    }
    return dst;
  };
  window.CSCopy = function(dst, dstOffset, src, srcOffset, n) {
    var destination, source, _ref;
    _ref = [new Uint8Array(dst, dstOffset, n), new Uint8Array(src, srcOffset, n)], destination = _ref[0], source = _ref[1];
    destination.set(source);
    return dst;
  };
  window.CSCompare = function(a, aOffset, b, bOffset, n) {
    var i, _ref;
    _ref = [new Uint8Array(a, aOffset, n), new Uint8Array(b, bOffset, n)], a = _ref[0], b = _ref[1];
    for (i = 0; i < n; i += 1) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  };
  endianBuffer = new Uint16Array(1);
  endianBuffer[0] = 0x00FF;
  window.CSBigEndian = new Uint8Array(endianBuffer.buffer)[0] === 0x00;
  window.CSSwap16 = function(dst, dstOffset, src, srcOffset, n) {
    var dstArray, i, srcArray, _ref, _ref2;
    _ref = [new Uint8Array(dst, dstOffset, n), new Uint8Array(src, srcOffset, n)], dstArray = _ref[0], srcArray = _ref[1];
    for (i = 0; i < n; i += 2) {
      _ref2 = [srcArray[i], srcArray[i + 1]], dstArray[i + 1] = _ref2[0], dstArray[i] = _ref2[1];
    }
    return dst;
  };
  window.CSSwap32 = function(dst, dstOffset, src, srcOffset, n) {
    var dstArray, i, srcArray, _ref, _ref2;
    _ref = [new Uint8Array(dst, dstOffset, n), new Uint8Array(src, srcOffset, n)], dstArray = _ref[0], srcArray = _ref[1];
    for (i = 0; i < n; i += 4) {
      _ref2 = [srcArray[i], srcArray[i + 1], srcArray[i + 2], srcArray[i + 3]], dstArray[i + 3] = _ref2[0], dstArray[i + 2] = _ref2[1], dstArray[i + 1] = _ref2[2], dstArray[i] = _ref2[3];
    }
    return dst;
  };
  window.CSSwap64 = function(dst, dstOffset, src, srcOffset, n) {
    var dstArray, i, srcArray, _ref, _ref2;
    _ref = [new Uint8Array(dst, dstOffset, n), new Uint8Array(src, srcOffset, n)], dstArray = _ref[0], srcArray = _ref[1];
    for (i = 0; i < n; i += 4) {
      _ref2 = [srcArray[i], srcArray[i + 1], srcArray[i + 2], srcArray[i + 3], srcArray[i + 4], srcArray[i + 5], srcArray[i + 6], srcArray[i + 7]], dstArray[i + 7] = _ref2[0], dstArray[i + 6] = _ref2[1], dstArray[i + 5] = _ref2[2], dstArray[i + 4] = _ref2[3], dstArray[i + 3] = _ref2[4], dstArray[i + 2] = _ref2[5], dstArray[i + 1] = _ref2[6], dstArray[i] = _ref2[7];
    }
    return dst;
  };
  if (window.CSBigEndian) {
    window.CSBigToNative16 = window.CSCopy;
    window.CSBigToNative32 = window.CSCopy;
    window.CSBigToNative64 = window.CSCopy;
    window.CSLittleToNative16 = window.CSSwap16;
    window.CSLittleToNative32 = window.CSSwap32;
    window.CSLittleToNative64 = window.CSSwap64;
  } else {
    window.CSBigToNative16 = window.CSSwap16;
    window.CSBigToNative32 = window.CSSwap32;
    window.CSBigToNative64 = window.CSSwap64;
    window.CSLittleToNative16 = window.CSCopy;
    window.CSLittleToNative32 = window.CSCopy;
    window.CSLittleToNative64 = window.CSCopy;
  }
  window.CSStringToBuffer = function(string) {
    var a, i, _ref;
    a = new Uint8Array(string.length);
    for (i = 0, _ref = string.length; i < _ref; i += 1) {
      a[i] = string.charCodeAt(i);
    }
    return a.buffer;
  };
  window.CSCopyFromString = function(dst, dstOffset, src, srcOffset, n) {
    var destination, i;
    destination = new Uint8Array(dst, dstOffset, n);
    for (i = 0; i < n; i += 1) {
      destination[i] = src.charCodeAt(srcOffset + i);
    }
    return dst;
  };
  window.CSCompareToString = function(a, aOffset, b, bOffset, n) {
    return CSCompare(a, aOffset, CSStringToBuffer(b), bOffset, n);
  };
}).call(this);
