var storeFortishield = stores.open('storeFortishield');
var deleteUser = storeFortishield.load('deleteUser');

switch (deleteUser) {
  case false:
    respond().withStatusCode(200).withFile('security/users/get-users.json');
    break;
  case true:
    storeFortishield.save('deleteUser', false);
    respond()
      .withStatusCode(200)
      .withFile('security/users/get-users-after-delete.json');
    break;
  default:
    respond().withStatusCode(200).withFile('security/users/get-users.json');
    break;
}
