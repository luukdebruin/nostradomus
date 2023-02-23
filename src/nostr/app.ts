import { Event, Filter, Relay, Sub } from 'nostr-tools'
import { now } from 'src/lib/time'
import { pool, waitForOpenConnection } from './relay'

export async function isAlive() {
	const promises = []

	Object.values(pool.getRelays()).forEach((relay: Relay) => {
		if (relay.status === 0 || relay.status === 2 || relay.status === 3) {
			const promise = waitForOpenConnection(relay)
			promises.push(promise)
		}
	})

	return Promise.all(promises).then(() => {
		return true
	})
}

export class Listener {
	filters: Array<Filter>
	subs: { [key: string]: Sub } = {}
	id: string
	timer: string | number | NodeJS.Timeout

	constructor(filters: Array<Filter>, id?: string) {
		this.filters = filters
		if (!id) {
			this.id = 'listener' + now()
		} else {
			this.id = id
		}
		this.timer = null
	}
	async start() {
		for (const [url, sub] of Object.entries(this.subs)) {
			sub.unsub()
			console.log(`Stop listening to relay ${url} by unsubscribe to events en eose`)
		}

		await pool.start()
		for (const [url, relay] of Object.entries(pool.getRelays())) {
			if (relay.status !== 1) {
				try {
					await waitForOpenConnection(relay)
				} catch (error) {
					console.error(error)
				}
				console.log(`Start listening to relay ${url} with listener subscribe id ${this.id} and filter(s)`, this.filters)

				this.subs[url] = relay.sub(this.filters, { id: this.id })
				this.subs[url].on('event', (event: Event) => {
					// TODO: add blocklist
					// if (npub !== event.pubkey) {
					// 	if (blocklist)
					// }
					onEvent(event, url)
				})

				this.subs[url].on('eose', () => {
					console.log(`Eose from ${url}`)
				})
			}

			this.timer = setInterval(isAlive, 1000 * 60 * 5) // 5 minutes

			// TODO: implement own events first
		}
	}
	stop() {
		for (const [url, sub] of Object.entries(this.subs)) {
			sub.unsub()
			console.log(`Stop listening to relay ${url} by unsubscribe to events and eose`)
		}
		pool.close()
		clearInterval(this.timer)
	}
}

export async function onEvent(evt: Event, relay: string) {
	if (pool.hasRelay('ws://localhost:8008') && relay != 'ws://localhost:8008') {
		pool.getRelays()['ws://localhost:8008'].publish(evt)
	}

	//TODO: Write all events

	switch (evt.kind) {
		case 0:
			break
		case 1:
			break
		default:
	}
}

// const npub = useAppSelector((state) => state.auth.npub)
