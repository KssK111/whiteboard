export interface Init {
	id: `${string}-${string}-${string}-${string}-${string}`
	color: string
}

export interface UserCursorInfo extends Init {
	initials: string
}

export interface Cursor extends UserCursorInfo {
	x: number
	y: number
}