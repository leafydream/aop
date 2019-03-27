# aop
基于ES6装饰器实现的aop面向切面

> 使用示例如下：

 ```
import AOP from "./index";

class BaseService {
  @AOP.before
  test1() {
    console.info("test1 runing...");
  }
  @AOP.after
  test2() {
    console.info("test2 runing...");
  }
}

let baseService = new BaseService();
baseService.test1();
baseService.test2();

 
 ```
