'use strict';

var diff = require('deep-diff').diff;
var _ = require('lodash');

const productionObjectAfterComparison = (data1, data2) => {
    let pathToRemoveKeys = [];
    const differenceArray = diff(data1, data2);
    if (differenceArray) {
        _.forEach(differenceArray, (value) => {
            pathToRemoveKeys.push(value.path);
        });
    }
    return pathToRemoveKeys;
}

const stagingProductionComparison = (stagingData, productionData, keysToIgnore) => {
    _.forEach(keysToIgnore, (keyPath) => {
        _.unset(stagingData, keyPath);
        _.unset(productionData, keyPath);
    });
    return _.isEqual(stagingData, productionData);
}

const refactorResult = (stagingData, productionData, productionData2) => {
    const volatileKeys = productionObjectAfterComparison(productionData, productionData2);
    return stagingProductionComparison(stagingData, productionData, volatileKeys);
}
