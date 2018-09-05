const a = () => {};
const b = () => () => {};
const c = () => a;

console.time(1);
for (let i = 0; i < 10000000; i++) {
  a()
}
console.timeEnd(1);

console.time(2);
for (let i = 0; i < 10000000; i++) {
  b()()
}
console.timeEnd(2);

console.time(3);
for (let i = 0; i < 10000000; i++) {
  c()()
}
console.timeEnd(3);

console.time(4);
for (let i = 0; i < 10000000; i++) {
  a.bind()()
}
console.timeEnd(4);

console.time(5);
for (let i = 0; i < 10000000; i++) {
  ()=>a()
}
console.timeEnd(5);
