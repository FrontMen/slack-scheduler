import {
  Adjust,
  CalendarToday,
  PersonAdd,
  PhotoAlbum,
  TransferWithinAStation,
} from '@mui/icons-material';

export const getMessageTypeIcon = (messageType: MessageType): React.FC => {
  switch (messageType) {
    case 'TRANSFER':
      return TransferWithinAStation;
    case 'NEWEMPLOYEE':
      return PersonAdd;
    case 'WORKANNIVERSARY':
      return CalendarToday;
    case 'PHOTOEVENT':
      return PhotoAlbum;
  }
  return Adjust;
};
