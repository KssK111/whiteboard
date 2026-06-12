import { Circle, Group, Text } from "react-konva";
import type { Cursor } from "../../types";

function RenderCursor(cursor: Cursor) {
	const radius = 3

	return <Group
		key={crypto.randomUUID()}
		x={cursor.x}
		y={cursor.y}
	>
		<Circle
			x={0}
			y={0}
			fill={cursor.color}
			radius={radius}
		/>

		<Text
			x={radius / 2}
			y={radius * 1.5}
			text={cursor.initials}
			fontSize={10}
			fill={cursor.color}
		/>

	</Group>
}

export default RenderCursor