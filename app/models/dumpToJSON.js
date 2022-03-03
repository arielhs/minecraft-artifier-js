export function dumpToJSON(store) {

    const arr = store.history.currentPos === -1 ? store.imageConvertedHexBackup : store.imageConvertedHex

    const LIME_CONCRETE = 165 // land
    const GREEN_CONCRETE = 173 // estate land
    const BLUE_CONCRETE = 171 // unpurchasable land
    const GOLD_BLOCK = 55 // road

    const PLOT_TYPES = {
        [LIME_CONCRETE]: 'land',
        [GREEN_CONCRETE]: 'estate-land',
        [BLUE_CONCRETE]: 'water',
        [GOLD_BLOCK]: 'road',
    }

    const result = []
    arr.forEach((blockId, idx) => {
        const x = idx % store.imageWidth
        const y = Math.floor(idx / store.imageHeight);
        result.push({
            x,
            y,
            plot_type: PLOT_TYPES[blockId]

        })
    })
    
    downloadObjectAsJson(result, 'plot_data')
}

function downloadObjectAsJson(exportObj, exportName){
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}