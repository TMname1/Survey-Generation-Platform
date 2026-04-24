/**
 * 节流函数：在指定时间内多次触发，只执行一次
 * @param fn 需要节流的函数
 * @param delay 延迟时间（毫秒）,默认1000ms
 * @returns 节流后的函数
 */
export function throttle<A extends unknown[], R, T = unknown>(
  fn: (this: T, ...args: A) => R,
  delay: number = 1000,
) {
  let lastTime = 0;
  return function (this: T, ...args: A) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      return fn.apply(this, args);
    }
  };
}
