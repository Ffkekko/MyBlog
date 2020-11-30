import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Francesco',
      email: 'fnc.franzese1@gmail.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },

    {
      name: 'Sara',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
    },
  ],
  
  posts: [], 
};
export default data;
