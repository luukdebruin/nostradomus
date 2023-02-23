import React, { useEffect } from 'react'
import { Listener } from 'src/nostr/app'
import { now } from 'src/lib/time'
import { relays } from 'src/nostr/relay'

const GlobalFeed = () => {
	let listener: Listener

	useEffect(() => {
		if (relays && Object.values(relays).length) {
			const lastSync = now() - 60 * 60
			listener = new Listener([{ since: lastSync, kinds: [0, 1, 3, 5, 7] }], 'globalfeed')
			listener.start()
		}
		return () => listener.stop()
	}, [relays])
	// const ids: string[] | undefined = undefined
	// const since: MutableRefObject<Date> = useRef<Date>(new Date())
	// const authors: string[] | undefined = undefined

	// const { events } = useNostrEvents({
	// 	filter: {
	// 		ids,
	// 		since: dateToUnix(since.current),
	// 		kinds: [1],
	// 		authors,
	// 	},
	// })

	// const orderedEvents = events.sort((a, b) => b.created_at - a.created_at)

	return (
		<>
			{/* {orderedEvents.map((event) => (
				<div className="p-4 bg-slate-200 rounded-xl mb-2 flex flex-col w-full overflow-hidden" key={event.id}>
					<p className="text-sm text-slate-400 inline-block text-ellipsis overflow-hidden ...">{event.pubkey}</p>
					<p className="text-slate-800 inline-block text-ellipsis overflow-hidden ...">{event.content}</p>
				</div>
			))} */}
		</>
	)
}

export default GlobalFeed
