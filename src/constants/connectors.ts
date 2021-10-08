import { InjectedConnector } from '@web3-react/injected-connector'

const supportedChainIds: Array<number> = [80001]

export const injected = new InjectedConnector({ supportedChainIds })