import orderDetailService from './orderDetail.service.js';

async function getOrderDetail(req, res) {
  try {
    const orderDetail = await orderDetailService.get(id);
  } catch (e) {

  }
}
