import DataType from 'sequelize';
import Model from '../sequelize';

const Post = Model.define('Post', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  content: {
    type: DataType.STRING(255),
  },
});

export default Post;
