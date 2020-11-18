import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({
     adapter: new Adapter() 
});
// 而为了避免每个测试文件都这么写，可以再test目录下新建一个配置文件：

