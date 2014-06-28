'use strict';
var batchdir  = require('batchdir');
var prompt    = require('prompt');

var targetDirectory   = null; 
var folderName        = null;
var howManyFolders    = null;
var foldersToMake     = [];


function validateFolderSyntax(folder) {
  if(folder.lastIndexOf('/') !== folder.length-1) {
    console.log('Adding / to the end of the target directory');
    folder += '/';
  }
  return folder;
}

function makeFolders() {
  for (var i = howManyFolders; i > 0; i--) {
    var folder = targetDirectory + folderName + i;
    console.log('Making folder : ' + folder);
    foldersToMake.push(folder);
  }

  batchdir(foldersToMake).mkdirs(function(err) {
    if (err) {
      console.log('ERROR making folders' + err);
    }
    else {
      console.log('Finished! :)');
    }
  });
}

prompt.start();
prompt.get(['targetDirectory', 'folderName', 'howManyFolders'], function(err, result) {
  if (err) {
    console.log('error' + err);
  }

  targetDirectory = validateFolderSyntax(result.targetDirectory);
  folderName      = result.folderName;
  howManyFolders  = result.howManyFolders;

  makeFolders();
});