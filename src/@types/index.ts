export interface iRoomUser {
  socket_id?: string;
  username: string;
  room: string;
}

export interface iMessage {
  room: string;
  text: string;
  username: string;
  created_at?: Date;
}
