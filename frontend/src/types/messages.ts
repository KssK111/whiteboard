import type { WhiteboardElement } from "./elements"
import type { Cursor, Init } from "./message_data"

export interface ElementMessage {
	type: "element"
	data: WhiteboardElement
}

export interface InitMessage {
	type: "init"
	data: Init
}

export interface CursorMessage {
	type: "cursor"
	data: Cursor
}

export type MessageType = "element" | "cursor" | "init"
export type Message = ElementMessage | CursorMessage | InitMessage