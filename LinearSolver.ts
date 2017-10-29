/*
Solves the system x_i = c_i + sum(a_ij*x_j, j != i) with a_ij := a[i*n+j].
*/
function SolveLinear(c: number[], a: number[]): number[] {
    console.log(c, a);
    var n = c.length;
    if (n == 1) return [c[0]];
    var new_c = new Array<number>(n-1);
    var new_a = new Array<number>((n-1)*(n-1));
    for (var i = 0; i < n-1; ++i) {
        var d = 1 - a[i*n+(n-1)]*a[(n-1)*n+i];
        new_c[i] = (c[i] + a[i*n+(n-1)]*c[n-1]) / d;
        for (var j = 0; j < n-1; ++j) {
            if (i == j) {
                new_a[i*(n-1)+j] = 0;
            } else {
                new_a[i*(n-1)+j] = (a[i*n+j] + a[i*n+(n-1)]*a[(n-1)*n+j]) / d;
            }
        }
    }
    var result = SolveLinear(new_c, new_a);
    var last_x = c[n-1];
    for (var i = 0; i < n-1; ++i) {
        last_x += a[(n-1)*n+i] * result[i];
    }
    result.push(last_x);
    return result;
}
