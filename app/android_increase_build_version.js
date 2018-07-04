const replace = require('replace-in-file');

const buildGradle = './android/app/build.gradle';
const pjson = require('./package.json');


const version = pjson.version;
const code = version.replace(/\./g, '');


replace({
  files: buildGradle,
  from: /versionCode\s\d*\n/g,
  to: `versionCode ${code}\n`,
}).then(changes => {
	replace({
	  files: buildGradle,
	  from: /versionName\s\"\d+\.\d+\.\d+\"\n/g,
	  to: `versionName "${version}"\n`,
	});
});
