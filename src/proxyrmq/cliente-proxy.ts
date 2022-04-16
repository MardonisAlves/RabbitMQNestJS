import {ClientProxy, ClientProxyFactory, Transport} from '@nestjs/microservices';
import {Injectable} from '@nestjs/common';


@Injectable()
export  class ClienteProxySmartRank{

	getClienteProxyBackendInstance(): ClientProxy {
	return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:{
        urls: ['amqp://admin:admin@localhost:5672'],
        queue:'filas_martrank',
        queueOptions: {
          durable: true
        }
      }
    })
	}
}