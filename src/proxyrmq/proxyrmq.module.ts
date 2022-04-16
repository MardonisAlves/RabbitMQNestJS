import { Module } from '@nestjs/common';
import {ClienteProxySmartRank} from '../proxyrmq/cliente-proxy';

@Module({
	providers: [ClienteProxySmartRank],
	exports: [ClienteProxySmartRank]
})

export class ProxyrmqModule {}
