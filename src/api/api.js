import BaseAPI from './baseApi';
//region 全局通用接口
const base="http://VMCCSYSWFDEWEB.faw-vw.in:9000";
// http://VMCCSYSWFDEWEB.faw-vw.in:9001/webapi/GetEtravelApplyInfo?app=YDBG&key=BefD34ksaf290243d8w89s81
/**
 * @api {post} /api/tableData tableData
 * @apiDescription 获取表格数据
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiParamExample {json} Request-Example:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "3",
 *     }
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }

 */
//endregion
export const getTableData = params => BaseAPI.post('/api/tableData', params); //获取table列表
export const addTable = params => BaseAPI.post('/api/addTable', params); //增加
export const delTable = params => BaseAPI.post('/api/delTable', params); //删除
export const saveTable = params => BaseAPI.post('/api/saveTable', params); //保存
export const getInfo = params => BaseAPI.post('http://vmccsyswfdeweb.faw-vw.in:9000/webapi/GetTrackingInfo?app=YDBG&key=BefD34ksaf290243d8w89s81', params); //保存

