export class HandleCalculate {
  calculate(
    x: number,
    y: number,
    z: number,
    densidade: number,
    valor: number,
    sobreMetal: number,
    margem: number
  ) {
    if (z) {
      if (sobreMetal) {
        x = x + sobreMetal;
        y = y + sobreMetal;
        z = z + sobreMetal;
      }
      let result = (x * y * z * densidade) / 1000000;
      let value = result * valor;
      if (margem) {
        value = result * valor * (margem / 100 + 1);
      }

      return { result, value };
    } else {
      if (sobreMetal) {
        x = x + sobreMetal;
        y = y + sobreMetal;
      }
      let result = ((Math.PI / 4) * Math.pow(x, 2) * y * densidade) / 1000000;
      let value = result * valor;
      if (margem) {
        value = result * valor * (margem / 100 + 1);
      }
      return { result, value };
    }
  }
}
