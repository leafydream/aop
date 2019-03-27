export default class AOP {
  constructor() {
    if (this instanceof AOP) {
      throw new Error("Constructors cannot be instantiated。");
    }
  }
  static before(func) {
    let [, ...args] = arguments;
    return (target, name, descriptor) => {
      debugger;
      var oldValue = descriptor.value;
      descriptor.enumerable = false;
      descriptor.value = function() {
        func.apply(this, args);
        return oldValue.apply(this, arguments);
      };
      return descriptor;
    };
  }

  static after(func) {
    let [, ...args] = arguments;
    return (target, name, descriptor) => {
      var oldValue = descriptor.value;
      descriptor.enumerable = false;
      descriptor.value = function() {
        let ret = oldValue.apply(this, arguments);
        func.apply(this, args);
        return ret;
      };
      return descriptor;
    };
  }

  static around(func) {
    let [, ...args] = arguments;
    return (target, name, descriptor) => {
      var oldValue = descriptor.value;
      descriptor.enumerable = false;
      descriptor.value = function() {
        func.apply(this, args);
        let ret = oldValue.apply(this, arguments);
        func.apply(this, args);
        return ret;
      };
      return descriptor;
    };
  }

  static asyncBefore(func) {
    let [, ...args] = arguments;
    return (target, name, descriptor) => {
      var oldValue = descriptor.value;
      descriptor.enumerable = false;
      descriptor.value = function() {
        return new Promise((resolve, reject) => {
          func
            .apply(this, args)
            .then(res => {
              return res;
            })
            .then(data => {
              resolve(oldValue.call(this, data, arguments));
            })
            .catch(err => {
              reject(err);
            });
        });
      };
      return descriptor;
    };
  }

  static asyncAfter(func) {
    let [, ...args] = arguments;
    return (target, name, descriptor) => {
      var oldValue = descriptor.value;
      descriptor.enumerable = false;
      descriptor.value = function() {
        return new Promise((resolve, reject) => {
          Promise.resolve(oldValue.apply(this, arguments))
            .then(res => {
              func
                .apply(this, args)
                .then(data => {
                  resolve({ res, data });
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        });
      };
      return descriptor;
    };
  }

  static asyncAround(func) {
    let [, ...args] = arguments;
    return (target, name, descriptor) => {
      var oldValue = descriptor.value;
      descriptor.enumerable = false;
      descriptor.value = function() {
        return new Promise((resolve, reject) => {
          func
            .apply(this, args)
            .then(res => res)
            .then(data => {
              let ret = oldValue.call(this, data, arguments);
              func.apply(this, args).then(response => {
                resolve({ ret, response });
              });
            })
            .catch(err => {
              reject(err);
            });
        });
      };
      return descriptor;
    };
  }
}
