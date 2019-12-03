const rootElement = document.querySelector('.banner');
const textNodes = textNodesUnder(rootElement);

let nodesThatNeedTheAttribute = [];
let workingNodes = [];

textNodes.forEach(node => {

    if( node.nodeValue.replace(/\s/g, '').length !== 0 ) {
        let hasAttr = node.parentElement.hasAttribute(['data-token']);

        // TODO validate that there is no nesting...

        if(hasAttr) {
            workingNodes.push(node);
        } else {
            nodesThatNeedTheAttribute.push(node);
        }
    }

});

// These should be reported as needing translations.
console.log({nodesThatNeedTheAttribute});

// These should be passed to our CSV generator if needed
console.log({workingNodes});

/**
 * Create CSV with two columns initially
 *
 * 1. The data-token key
 * 2. Example content from the HTML
 */

/**
 *
 * @param el
 * @return {[]}
 */
function textNodesUnder(el){
    let n;
    let a = [];
    let walk = document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
    while(n = walk.nextNode()) a.push(n);
    return a;
}

