class UserDTO {
  constructor(data) {
    this.username = data.data.username;
    this.email = data.data.email;
    this.avatar = data.data.avatar;
  }
}

export default UserDTO;
