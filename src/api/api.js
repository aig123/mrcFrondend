import BaseAPI from './baseApi';
//region 全局通用接口
export const getTableData = params => BaseAPI.post('/api/tableData', params); //获取table列表
export const addTable = params => BaseAPI.post('/api/addTable', params); //增加
export const delTable = params => BaseAPI.post('/api/delTable', params); //删除
export const saveTable = params => BaseAPI.post('/api/saveTable', params); //保存
//endregion
