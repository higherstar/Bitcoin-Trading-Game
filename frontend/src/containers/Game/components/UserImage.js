const users = [
  'user1',
  'user2',
  'user3',
  'user4',
  'user5',
  'user6',
  'user7',
  'user8',
  'user9'
];

export const ProfileUserImage = () =>  {
  return `Users/${users[Math.floor(Math.random() * 8)]}.png`
}
