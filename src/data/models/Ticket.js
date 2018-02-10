import DataType from 'sequelize';
import Model from '../sequelize';

const Ticket = Model.define('Ticket', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  topic: {
    type: DataType.STRING(255),
  },

  closed: {
    type: DataType.BOOLEAN,
    defaultValue: 0,
  },

  pinned: {
    type: DataType.BOOLEAN,
    defaultValue: 0,
  },
});

export default Ticket;
