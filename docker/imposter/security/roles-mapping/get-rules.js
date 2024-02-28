var storeFortishield = stores.open('storeFortishield');
var deleteRolesMapping = storeFortishield.load('deleteRolesMapping');

switch (deleteRolesMapping) {
  case false:
    respond()
      .withStatusCode(200)
      .withFile('security/roles-mapping/get-rules.json');
    break;
  case true:
    storeFortishield.save('deleteRolesMapping', false);
    respond()
      .withStatusCode(200)
      .withFile('security/roles-mapping/get-rules-after-delete.json');
    break;
  default:
    respond()
      .withStatusCode(200)
      .withFile('security/roles-mapping/get-rules.json');
    break;
}
