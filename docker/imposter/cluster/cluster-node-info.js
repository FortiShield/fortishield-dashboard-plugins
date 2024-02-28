
var selectedNode = context.request.queryParams.select

switch (selectedNode) {
  case 'name':
    respond()
      .withStatusCode(200)
      .withFile('cluster/node/select-name.json');
    break;
  default:
    respond()
      .withStatusCode(200)
      .withFile('cluster/node/response-with-everything.json');
    break;
}

// Commented code is used to test the restart only
//
// var storeFortishield = stores.open('storeFortishield');
// var attemptRestart = storeFortishield.load('attempt');
// var callRestart = storeFortishield.load('callRestart');
// if (callRestart) {
//   if (attemptRestart < 10) {
//     storeFortishield.save('attempt', attemptRestart + 1);
//     respond()
//       .withStatusCode(200)
//       .withFile('cluster/cluster-node-info-no-restart.json')
//   } else {
//     storeFortishield.save('attempt', 0);
//     storeFortishield.save('callRestart', false);
//     respond()
//       .withStatusCode(200)
//       .withFile('cluster/cluster-node-info.json')
//   }
// } else {
//   respond()
//     .withStatusCode(200)
//     .withFile('cluster/cluster-node-info.json')
// }
