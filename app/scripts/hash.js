
function hashshuju(b,j){
       for (var a = j + "password error", i = "", E = [];;)
                    if (i.length <= a.length) {
                        if (i += b, i.length == a.length) break;
                    } else {
                        i = i.slice(0, a.length);
                        break;
                    }
                for (var c = 0; c < i.length; c++) E[c] = i.charCodeAt(c) ^ a.charCodeAt(c);
                a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
                i = "";
                for (c = 0; c < E.length; c++) {
                	i += a[E[c] >> 4 & 15];
                	 i += a[E[c] & 15];
                }
                return i;
}