// import { relayInit } from 'nostr-tools'

export const relayUrls: Relays = [
	{ id: '4D3BAE98-0FAD-4659-A4FF-EFD8B75DC559', address: 'wss://nostr.zebedee.cloud', active: true },
	{ id: '709D8449-4094-46F7-87DF-3A0A0F782E26', address: 'wss://nostr.openchain.fr', active: true },
	// 'wss://relay.nostr.ch',
	// 'wss://nostr-relay.alekberg.net',
	// 'wss://nostr.bitcoiner.social',
	// 'wss://nostr.openchain.fr',
	// 'wss://nostr.zebedee.cloud',
	// 'wss://nostr.chaker.net',
	// 'wss://relay.cryptocculture.com',
	// 'wss://nostr.coollamer.com',
	// 'wss://relay.nostrich.de',
	// 'wss://no-str.org',
	// 'wss://relay.nostr.scot',
	// 'wss://jiggytom.ddns.net',
	// '/wss://nostr.nodeofsven.com',
	// 'wss://nostr.drss.io',
	// 'wss://relay.damus.io',
	// 'wss://nostr.p2sh.co',
	// 'wss://nostr.yael.at',
	// 'wss://relay.taxi',
]

// export async function connect(relayUrls: string[]) {
// 	relayUrls.forEach((relayUrl) => {
// 		const relay = relayInit(relayUrl)
// 		relay.connect()
// 		return relay
// 		// relayInit(relay)
// 		// 	.connect()
// 		// 	.then((response) => console.log(response))
// 		// 	.catch((err) => console.log('error', err))
// 	})
// }
