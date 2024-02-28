
var storeFortishield = stores.open('storeFortishield');
var attemptRestart = storeFortishield.load('attempt');


if(attemptRestart < 5){
    storeFortishield.save('attempt', attemptRestart + 1);
    respond()
        .withStatusCode(200)
        .withFile('cluster/cluster_sync_no_sync.json')
} else {
    storeFortishield.save('attempt', 0);
    respond()
        .withStatusCode(200)
        .withFile('cluster/cluster_sync.json')
}
