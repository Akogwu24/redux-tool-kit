import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';

export const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => userId === user.id);

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};
