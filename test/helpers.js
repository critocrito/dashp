import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import "babel-polyfill";

chai.use(chaiAsPromised);
chai.should();

process.on("unhandledRejection", up => {
  throw up;
});
