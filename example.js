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
