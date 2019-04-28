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

function getProjectHTMLFiles(partner, project) {

    const path = join(partnerPath, partner, project);
    const splitPoint = "multi-project-build-script";
    const relativeFilePath = path.substring(path.indexOf(splitPoint) + splitPoint.length + 1);

    return readdirSync(path).map((fileName) => {
        if( fileName.indexOf('.html') > - 1 ) {
            return join(relativeFilePath, fileName);
        } else {
            return false;
        }
    }).filter(e => e !== false);

}

function getPartners(path, targetFile = 'config.yml') {

    const directories = readdirSync(path).map((check) => {

        const dir_name = join(path, check);
        const is_directory = statSync(dir_name).isDirectory();
        const splitPoint = "multi-project-build-script";
        const relativeFilePath = dir_name.substring(dir_name.indexOf(splitPoint) + splitPoint.length + 1);
        const relativeFilePathParts = relativeFilePath.split('/');

        let configFile = false;

        if ( is_directory ) {
            try {
                configFile = readFileSync(dir_name + `/${targetFile}`, 'utf8');
                try {
                    let parsedConfigFile = yaml.safeLoad(configFile);
                        parsedConfigFile['path'] = relativeFilePathParts;
                    return parsedConfigFile;
                } catch (e) {
                    console.error(`[ERROR] Unreadable ${targetFile} in "${relativeFilePath}".`);
                }
            } catch (e) {
                console.error(`[ERROR] Missing project ${targetFile} file for "${relativeFilePath}"`);
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
            const configYaml = yaml.safeLoad(configFile);
                  configYaml['html'] = getProjectHTMLFiles(partner, project);
            return configYaml;
        } catch (e) {
            console.error(`[ERROR] Unreadable config.yml in "${configFile}". Please make sure the syntax is correct.`);
        }
    } catch (e) {
        console.error(`[ERROR] Missing project config file for "${configFile}"`);
        return { name: configFile, 'error': 'Missing config file' };
    }
}
