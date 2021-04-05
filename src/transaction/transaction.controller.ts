import { Body, Controller, Get, Post, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudRequestInterceptor, ParsedRequest } from '@nestjsx/crud';
import { TransactionService } from './transaction.service';
import { TransactionEntity } from './transaction.entity';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { OrderService } from 'src/order/order.service';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(public service: TransactionService, private orderService: OrderService) { }

  @UseGuards(AuthenticatedGuard)
  @Post('user-pay')
  async userPay(@Request() req, @Res() res) {
    try {
      let tongTien = 0;
      const tranSactionInfo = req.body;
      tranSactionInfo.userId = req.user.userId
      tranSactionInfo.payment = 'TT_Online'
      const tranSaction = await this.service.userPay(tranSactionInfo);
      const orders = await this.orderService.getCarts(req.user.userId)
      const qty = orders.length;

      orders.forEach(async order => {
        tongTien += order.tongTien;
        this.orderService.updateOrderTransaction(tranSaction.transactionId, order.orderId)
      })
      console.log(tongTien);

      await this.service.updateOrderTransaction(tongTien, qty, tranSaction.transactionId);
      return res.status(200).send('Thanh toán thành công')
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
