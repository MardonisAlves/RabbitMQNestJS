import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';
import {Injectable} from '@nestjs/common';


@Injectable()
export  class ClienteProxySmartRank{

	getClienteProxyBackendInstance(): ClientProxy {
	return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:{
        urls: ['amqp://guest:guest@localhost:5672'],
        queue:'filas_martrank',
        queueOptions: {
          durable: true
        }
      }
    })
	}
}