export type MessageType = "element" | "cursor"

export interface Message {
	type: MessageType
	data: any
}