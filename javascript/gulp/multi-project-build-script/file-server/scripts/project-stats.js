const { readdirSync, statSync, readFileSync } = require('fs');
const yaml = require('js-yaml');
const { join } = require('path');

const partnerPath = join(__dirname, '../../partners/');

exports.getPartners = function() {
    return getPartners(partnerPath);
};

exports.getPartner = function(query) {
    return getPartners(partnerPath).filter(partner => partner.configName.includes(query))[0];
};

exports.getProjects = function(partner) {
    return getPartners(join(partnerPath, partner));
};

exports.getProject = function(partner, project) {
    return getProject(partner, project);
};

function getPartners(path) {

    const directories = readdirSync(path).map((check) => {

        const dir_name = join(path, check);
        const is_directory = statSync(dir_name).isDirectory();
        const splitPoint = "multi-project-build-script";
        const relativeFilePath = dir_name.substring(dir_name.indexOf(splitPoint) + splitPoint.length + 1);
        const relativeFilePathParts = relativeFilePath.split('/');

        let configFile = false;

        if ( is_directory ) {
            try {
                configFile = readFileSync(dir_name + `/config.yml`, 'utf8');
                try {
                    let parsedConfigFile = yaml.safeLoad(configFile);
                    parsedConfigFile['path'] = relativeFilePathParts;
                    return parsedConfigFile;
                } catch (e) {
                    console.error(`[ERROR] Unreadable config.yml in "${relativeFilePath}". Please make sure the syntax is correct.`);
                }
            } catch (e) {
                console.error(`[ERROR] Missing project config file for "${relativeFilePath}"`);
                return { name: relativeFilePath, 'error': 'Missing config file' };
            }
            return (configFile ? configFile : false );
        } else {
            return false;
        }
    });

    return directories.filter(e => e !== false);
}
function getProject(partner, project) {

    let input = join(partnerPath, partner, project);
    let configFile = '';

    try {
        configFile = readFileSync(input + `/config.yml`, 'utf8');
        try {
            return yaml.safeLoad(configFile);
        } catch (e) {
            console.error(`[ERROR] Unreadable config.yml in "${configFile}". Please make sure the syntax is correct.`);
        }
    } catch (e) {
        console.error(`[ERROR] Missing project config file for "${configFile}"`);
        return { name: configFile, 'error': 'Missing config file' };
    }
}
function parsePath(pathArray) {
    let object = {
        partner: pathArray[0],
        project: pathArray[1]
    }
}
