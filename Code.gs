function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Get unique SBM_MACHINE_IDs for the dropdown
function getSBMIds() {
  const sheet = SpreadsheetApp.openById('12Y-vkdpFKoeOCMHt1QRZt-czAgbWskaHZsPD6mAAbpI').getSheetByName('Data');
  const data = sheet.getDataRange().getValues();
  const ids = new Set();

  for (let i = 1; i < data.length; i++) {
    ids.add(data[i][3]); // Column 4: SBM_MACHINE_ID
  }

  return [...ids]; // Convert Set to Array
}

// Get location data filtered by SBM_MACHINE_ID
function getLocationsBySBMId(sbmId) {
  const sheet = SpreadsheetApp.openById('12Y-vkdpFKoeOCMHt1QRZt-czAgbWskaHZsPD6mAAbpI').getSheetByName('Data');
  const data = sheet.getDataRange().getValues();
  const results = [];

  for (let i = 1; i < data.length; i++) {
    if (data[i][3] === sbmId) {
      results.push({
        name: data[i][4], // NAME
        acid : data[i][0], //accout id
        mob: data[i][6], // mobile
        lat: parseFloat(data[i][1]), // LATITUDE
        lng: parseFloat(data[i][2])  // LONGITUDE
      });
    }
  }

  return results;
}

