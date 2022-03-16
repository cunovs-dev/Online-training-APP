import { useRequest } from 'umi';
import { useEffect, useState } from 'react';
import { message, Form } from 'antd';
import { history } from 'umi';

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1)
    .match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};
export default function useApp() {
  const token = queryURL('token');
  const tokenArr =  typeof(token)==='string'?token.split(','):[];
  const [result, setResult] = useState({});
  const [summaryData, setSummaryData] = useState([]);
  const [itemRes, setItemRes] = useState({});
  const [pagination, setPagination] = useState({ nowPage: 1, pageSize: 20 });
  const submitService = useRequest((values) => (token?{
      url: 'http://mobile.cunovs.com:8111/vote/submit',
      method: 'post',
      data: values,
      requestType: 'form',
      headers: {
        [tokenArr[0]]: tokenArr[1]
      }
    }:{
      url: 'http://mobile.cunovs.com:8111/vote/sample/submit',
      method: 'post',
      data: values,
      requestType: 'form',
    }),
    {
      manual: true,
      formatResult: 'json',
      onSuccess: (result) => {
        if (result) {
          history.push('/result');
          setResult(result);
        } else {
          message.error('提交失败，请稍后再试');
        }
      },
      onError: (err) => {
        message.error(err.message);
      }
    }
  );

  const resultService = useRequest((values) => {
      const { pageSize = 20, nowPage = 1 } = values;
      return {
        // url: 'http://192.168.0.204:8083/vote/list',

        url: `http://mobile.cunovs.com:8111/vote/sample/list?pageSize=${pageSize}&nowPage=${nowPage}`,
        data: values
        // headers: {
        //   [tokenArr[0]]: tokenArr[1]
        // },
      };
    },
    {

      formatResult: 'json',
      manual: true,
      paginated: true,
      onSuccess: (result) => {
        if (result.success) {
          const { data: { pageSize = 10, nowPage = 1, totalCount, data } } = result;
          setSummaryData(data);
          setPagination({
            nowPage,
            pageSize,
            total: totalCount
          });
        } else {
          message.error('提交失败，请稍后再试');
        }
      },
      onError: (err) => {
        message.error(err.message);
      }
    }
  );

  const submit = async (params) => {
    try {
      submitService.run(params);
      setItemRes(params);
    } catch (error) {
      message.error('未知错误，请稍后再试');
    }
  };

  const paging = async (params) => {
    try {
      resultService.run(params);
      setItemRes(params);
    } catch (error) {
      message.error('未知错误，请稍后再试');
    }
  };

  return {
    submit,
    submitting: submit.loading,
    result,
    itemRes,
    paging,
    pagination,
    setPagination,
    summaryLoading: paging.loading,
    summaryData
  };
}
