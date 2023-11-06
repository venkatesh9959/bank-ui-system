import axios from 'axios';
const Service = {
  postData: (url: string, bodyData: any, onSuccess?: any, onFailure?: any) => {
    axios
      .post(url, bodyData)
      .then((response: any) => {
        if (response?.status === 200) {
          onSuccess && onSuccess(response?.data);
        } else {
          throw response;
        }
      })
      .catch((error: any) => {
        onFailure && onFailure(error);
      });
  },
  getData: (url: string, onSuccess?: any, onFailure?: any) => {
    axios
      .get(url, {
        headers: {
          AccessControlAllowOrigin: '*',
        },
      })
      .then((response: any) => {
        const data = response.data;

        if (response?.status === 200) {
          onSuccess && onSuccess(data);
        } else {
          throw response;
        }
      })
      .catch((error: any) => {
        onFailure && onFailure(error);
      });
  },
};

export default Service;
