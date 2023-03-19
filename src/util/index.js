/**
 * 封装LocalStorage操作类
 */
class LocalStorage {
  /**
   * 创建一个新的LocalStorage实例
   * @param {string} prefix - 键名前缀
   */
  constructor(prefix) {
    this.prefix = prefix;
  }

  /**
   * 获取指定键名对应的值
   * @param {string} key - 键名
   * @returns {any} 值
   */
  get(key) {
    const val = localStorage.getItem(this.prefix + key);
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }

  /**
   * 设置指定键名对应的值
   * @param {string} key - 键名
   * @param {any} value - 值
   */
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(this.prefix + key, value);
  }

  /**
   * 删除指定键名对应的值
   * @param {string} key - 键名
   */
  remove(key) {
    localStorage.removeItem(this.prefix + key);
  }

  /**
   * 清空所有存储的数据
   */
  clear() {
    localStorage.clear();
  }
}

export { 
  LocalStorage
}