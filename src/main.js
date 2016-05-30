'use strict';

const productionData = require('../mock/production.json');
const productionData2 = require('../mock/production2.json');
const stagingData = require('../mock/staging.json');
var diff = require('deep-diff').diff;
var _ = require('lodash');

const productionObjectAfterComparison = (productionData, productionData2) => {
    let pathToRemoveKeys = [];
    const differenceArray = diff(productionData, productionData2);
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

const productionObject = productionObjectAfterComparison(productionData, productionData2);

const comparisonResult = stagingProductionComparison(stagingData, productionData, productionObject);
