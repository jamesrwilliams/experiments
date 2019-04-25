const fs = require('fs');
const path = require('path');

exports.partners = function () {

    return new Promise((resolve, reject) => {

        const baseDir = './partners';
        const config_file = 'partner-config.yml';

        let partners_list = [];

        fs.readdirSync(baseDir).forEach((file) => {
            const current_path = path.join(baseDir, file);
            const stat = fs.statSync(current_path);

            if (stat.isDirectory()) {

                const config_file_path = path.join(current_path,config_file);
                const has_config = fs.existsSync(config_file_path);

                if ( has_config ) {
                    let partner_data = JSON.parse(fs.readFileSync(config_file_path, 'utf8'));
                        partners_list.push(partner_data);
                }
            }

            resolve(partners_list);
        });
    });
};
