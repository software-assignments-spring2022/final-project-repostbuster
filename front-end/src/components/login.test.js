import * as axios from "axios";
import { handleSubmit} from './src/Login';
// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");

// ...

test("good response", () => {
  axios.post.mockImplementation((url) => {
    const loginData = { name: 'test' , password: 'testpass'};

    if(url == "http://localhost:3001/login", data){
        return Promise.resolve({ data: {
            token: 'testToken'
        }});
    }

//     if(url == "http://localhost:3001/register"){
//         return Promise.resolve({ data: {...} }));
//     }
    
//   }
//   // ...
});

// test("bad response", () => {
//     axios.post.mockImplementation((url) => {
//       const loginData = { name: 'test' , password: 'testpass'};
  
//       if(url == "http://localhost:3001/login", data){
//           return Promise.reject({ data: {
//               token: 'testToken'
//           }});
//       }
  
//     }
//   });