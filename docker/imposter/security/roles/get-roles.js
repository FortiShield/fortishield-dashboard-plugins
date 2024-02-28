var storeFortishield = stores.open('storeFortishield');
var deleteRole = storeFortishield.load('deleteRole');

switch (deleteRole) {
  case false:
    respond().withStatusCode(200).withFile('security/roles/get-roles.json');
    break;
  case true:
    storeFortishield.save('deleteRole', false);
    respond()
      .withStatusCode(200)
      .withFile('security/roles/get-roles-after-delete.json');
    break;
  default:
    respond().withStatusCode(200).withFile('security/roles/get-roles.json');
    break;
}
