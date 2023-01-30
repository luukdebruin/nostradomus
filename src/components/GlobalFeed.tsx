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
				<p key={event.id}>
					{event.pubkey} posted: {event.content}
				</p>
			))}
		</>
	)
}

export default GlobalFeed
