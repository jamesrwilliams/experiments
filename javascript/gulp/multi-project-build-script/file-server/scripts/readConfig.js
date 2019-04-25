const yaml = require('js-yaml');
const fs   = require('fs');
const path = require('path');

const base_path = path.join(__dirname, '../../partners/');

exports.debug = function(partner, project = false) {

    const partnerPath = path.join(base_path, partner);
    const projectPath = path.join(partnerPath, project);

    const queryPath = (project ? projectPath : partnerPath );
    const queryFile = (project ? 'project' : 'config' );

    const configFile = fs.readFileSync(queryPath + `/${queryFile}.yml`, 'utf8');

    if ( configFile ) {
        try {
            return yaml.safeLoad(configFile);
        } catch (e) {
            throw new Error('Error :)');
        }
    } else {
        throw new Error('ConfigNotFound');
    }
};

