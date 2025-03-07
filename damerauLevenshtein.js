// its used in ispell lib from 70-80's
// usefull for text inputs/fraud detection and so on
// dosen't satisfy triangle equality .. so probably will not play well with
// metric/vantage trees
// https://en.wikipedia.org/wiki/Triangle_inequality
// https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance

/*
 Copyright (c) 2012, Sid Nallu, Chris Umbel

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/*
 * contribution by sidred123
 */

/*
 * Compute the Levenshtein distance between two strings.
 * Algorithm based from Speech and Language Processing - Daniel Jurafsky and James H. Martin.
 */


// https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance#Optimal_string_alignment_distance

function DamerauLevenshteinDistance(source, target, options) {
    options = options || {};
    if (isNaN(options.insertion_cost)) options.insertion_cost = 1;
    if (isNaN(options.deletion_cost)) options.deletion_cost = 1;
    if (isNaN(options.substitution_cost)) options.substitution_cost = 1;

    const sourceLength = source.length;
    var targetLength = target.length;
    var distanceMatrix = [[0]];

    for (var row = 1; row <= sourceLength; row++) {
        distanceMatrix[row] = [];
        distanceMatrix[row][0] = distanceMatrix[row - 1][0] + options.deletion_cost;
    }

    for (var column = 1; column <= targetLength; column++) {
        distanceMatrix[0][column] = distanceMatrix[0][column - 1] + options.insertion_cost;
    }

    for (var row = 1; row <= sourceLength; row++) {
        for (var column = 1; column <= targetLength; column++) {
            var costToInsert = distanceMatrix[row][column - 1] + options.insertion_cost;
            var costToDelete = distanceMatrix[row - 1][column] + options.deletion_cost;

            var sourceElement = source[row - 1];
            var targetElement = target[column - 1];
            var costToSubstitute = distanceMatrix[row - 1][column - 1];
            if (sourceElement !== targetElement) {
                costToSubstitute = costToSubstitute + options.substitution_cost;
            }

            // a[i] = b[j-1] and a[i-1] = b[j]
            if (row > 1 && column > 1) {
                distanceMatrix[row][column] = Math.min(
                    distanceMatrix[row][column],
                    distanceMatrix[row - 2][column - 2] + costToSubstitute // transposition
                )
                // console.log('<<', distanceMatrix[row][column])
            }
            distanceMatrix[row][column] = Math.min(costToInsert, costToDelete, costToSubstitute);
            // console.log('>>', distanceMatrix[row][column])
        }
    }
    return distanceMatrix[sourceLength][targetLength];
}

module.exports = DamerauLevenshteinDistance;
