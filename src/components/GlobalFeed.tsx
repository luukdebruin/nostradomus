import React, { useRef } from 'react'
import { useNostrEvents, dateToUnix } from 'nostr-react'

const GlobalFeed = () => {
	const now = useRef(new Date()) // Make sure current time isn't re-rendered

	const { events } = useNostrEvents({
		filter: {
			since: dateToUnix(now.current), // all new events from now
			kinds: [1],
		},
	})

	return (
		<>
			{events.map((event) => (
				<div className="p-4 bg-slate-200 rounded-xl mb-2 flex flex-col" key={event.id}>
					<p className="text-slate-400 inline-block">{event.pubkey}</p>
					<p className="text-slate-800 inline-block">{event.content}</p>
				</div>
			))}
		</>
	)
}

export default GlobalFeed
