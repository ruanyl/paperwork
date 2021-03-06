paperworkModule.controller('paperworkWaybackController', function($scope, $rootScope, $location, $routeParams, paperworkNetService, paperworkNotesService){
  $('#paperworkViewParent').off('picked.freqselector').on('picked.freqselector', function(e) {
    var itemId = $(e.item).data('itemid');

    paperworkNetService.apiGet('/notebooks/' + $rootScope.getNotebookSelectedId() + '/notes/' + ($rootScope.getNoteSelectedId(true)).noteId + '/versions/' + itemId, function(status, data) {
      if(status == 200) {
        $rootScope.note.title = data.response.title;
        $rootScope.note.content = data.response.content;
        if(data.response.next_id === null) {
          itemId = 0;
        }
        $rootScope.note.version = itemId;
      }
    });

    paperworkNotesService.getNoteVersionAttachments($rootScope.getNotebookSelectedId(), ($rootScope.getNoteSelectedId(true)).noteId, itemId, function(response) {
      $rootScope.fileList = response;
    });


  });
});