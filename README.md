# javascript-s2huffman
web / url safe Huffman Greedy Algo-3

I was sick to death of using Base64 encoding as it can potentially make a string up to 3 times its original size so I have implemented the Huffman Greedy Algo-3, now I can actually send data between client and server with smaller than original rather than larger packets.

var huff = new s2huffman();

var c = huff.compress("aaaaabbbbbbbbbccccccccccccdddddddddddddeeeeeeeeeeeeeeeefffffffffffffffffffffffffffffffffffffffffffff");

/* c equals s2[66ML63M64]ML61M62]M65K].00e0CCCCCDDDDDDDDD924924924B6DB6DB6DBFFFFFFFFFFFE00000000000 */

var result = huff.decompress(c);

/* result equals aaaaabbbbbbbbbccccccccccccdddddddddddddeeeeeeeeeeeeeeeefffffffffffffffffffffffffffffffffffffffffffff */
