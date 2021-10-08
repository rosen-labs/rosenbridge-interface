import { InjectedConnector } from '@web3-react/injected-connector'

const supportedChainIds = [137]

export const injected = new InjectedConnector({ supportedChainIds })