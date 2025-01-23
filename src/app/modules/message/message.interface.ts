export interface IChatMessage {
  senderId: string; // The user who sent the message
  receiverId: string; // The user who receives the message
  message: string; // The message content

  isRead: boolean; // Whether the message has been read
}
