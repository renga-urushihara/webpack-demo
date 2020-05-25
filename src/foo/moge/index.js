import Moge from "./test";
import Lib from "../../lib";
import lib from "../../lib";

Moge.action();
Moge.action();

setTimeout(() => {
  import(/* webpackChunkName: "foo/moge/dynamic" */ "./dynamic").then((module) =>
    module.Dynamic()
    );
}, 10000);

lib.hoge;
