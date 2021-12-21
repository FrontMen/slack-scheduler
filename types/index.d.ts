type Employee = {
  id?: string;
  email: string;
  birthDate: string;
  birthDay: string;
  startDate?: string;
};

type Message = {
  id?: string;
  title: string;
  text: string;
  createDate: number;
  createdBy: string;
  lastUpdateDate: number;
  lastUpdatedBy: string;
  plannedSendDate: string;
  sendDate: string;
  messageType: MessageType;
};

type User = {
  id: string;
  isAdmin: boolean;
};

enum MessageType {
  TRANSFER = 'TRANSFER',
  NEWEMPLOYEE = 'NEWEMPLOYEE',
  WORKANNIVERSARY = 'WORKANNIVERSARY',
  PHOTOEVENT = 'PHOTOEVENT',
}
