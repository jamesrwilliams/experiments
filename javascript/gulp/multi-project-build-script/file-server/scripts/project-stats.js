const { readdirSync, statSync, readFileSync } = require('fs');
const yaml = require('js-yaml');
const { join } = require('path');

exports.partners = function() {
    return dirs(join(__dirname, '../../partners/'));
};

function dirs(path) {

    const directories = readdirSync(path).map((check) => {
        let dir_name = join(path, check);
        let is_directory = statSync(dir_name).isDirectory();

        if ( is_directory ) {

            let configFile = false;

            try {
                configFile = readFileSync(dir_name + `/config.yml`, 'utf8');
                try {
                    return yaml.safeLoad(configFile);
                } catch (e) {
                    console.log('caught!');
                }
            } catch (e) {
                console.log('caught!');
            }

            return (configFile ? configFile : false );

        } else {
            return false;
        }
    });

    return directories.filter(e => e !== false);

    // const directories = readdirSync(p).filter((f) => {
    //     let dir_name = join(p, f);
    //     let is_directory = statSync(dir_name).isDirectory();
    //     console.log({
    //         is_directory,
    //         dir_name,
    //     });
    //     return is_directory;
    // });

    return directories;
};
