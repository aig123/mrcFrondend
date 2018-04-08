import axios from 'axios';
import config from './apiConfig';
import { Notification } from 'element-ui';
axios.interceptors.response.use(
    response => {
      if(response.data.code!='0'&&response.data.result == 'failure'){
          Notification.error({
            message: response.data.messages
          });
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 500 :
                    Notification.error({
                        message: '系统异常请稍后在试！'
                    });
                    break;
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    }
    );
export default {
  post (url, param){
    return axios.post(url, param?param:{}, config);
  },
  get (url){
    return axios.get(url, config);
  }
};
